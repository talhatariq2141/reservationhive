import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"

const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // 1. Authenticate via DRF SimpleJWT
        const loginRes = await fetch("http://localhost:8000/api/token/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password,
          }),
        })

        const loginData = await loginRes.json()

        if (!loginRes.ok || !loginData.access || !loginData.refresh) return null

        // 2. Use access token to fetch user role from backend
        let role = null
        let hotel_id = null

        // Check Admin
        const adminRes = await fetch("http://localhost:8000/api/accounts/admins/", {
          headers: { Authorization: `Bearer ${loginData.access}` },
        })

        if (adminRes.ok) {
          const admins = await adminRes.json()
          const current = admins.find((u: any) => u.user?.username === credentials.username)
          if (current) {
            role = "admin"
          }
        }

        // Check Vendor if not admin
        if (!role) {
          const vendorRes = await fetch("http://localhost:8000/api/accounts/vendors/", {
            headers: { Authorization: `Bearer ${loginData.access}` },
          })

          if (vendorRes.ok) {
            const vendors = await vendorRes.json()
            const current = vendors.find((u: any) => u.user?.username === credentials.username)
            if (current) {
              role = "vendor"
              hotel_id = current.id // or current.property_id if available
            }
          }
        }

        return {
          id: 1, // backend user ID if returned separately
          email: credentials.username,
          access: loginData.access,
          refresh: loginData.refresh,
          role,
          hotel_id,
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.access = user.access
        token.refresh = user.refresh
        token.role = user.role
        token.hotel_id = user.hotel_id
      }
      return token
    },
    async session({ session, token }) {
      session.user.access = token.access
      session.user.role = token.role
      session.user.hotel_id = token.hotel_id
      return session
    },
  },

  pages: {
    signIn: "/login", // Can redirect to /admin-login or /vendor-login conditionally
  },

  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authConfig)
export { handler as GET, handler as POST }
