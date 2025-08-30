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
        // 1) Authenticate via DRF SimpleJWT
        const loginRes = await fetch("http://localhost:8000/api/token/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
        })

        const loginData = await loginRes.json()
        if (!loginRes.ok || !loginData.access || !loginData.refresh) return null

        // 2) Fetch current user with normalized role from backend
        const meRes = await fetch("http://localhost:8000/api/accounts/me/", {
          headers: { Authorization: `Bearer ${loginData.access}` },
        })
        if (!meRes.ok) return null
        const me = await meRes.json()

        return {
          id: me.id ?? 0,
          email: me.email ?? credentials?.username,
          access: loginData.access,
          refresh: loginData.refresh,
          role: me.role,
          hotel_id: me?.tenant?.id ?? null,
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
