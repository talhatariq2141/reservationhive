// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"

const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.trim()
        const password = credentials?.password
        if (!email || !password) return null

        // 1) Authenticate via DRF SimpleJWT
        const loginRes = await fetch("http://localhost:8000/api/token/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: email, email, password }),
        })

        const loginData = await loginRes.json().catch(() => ({}))
        if (!loginRes.ok || !loginData?.access || !loginData?.refresh) return null

        // 2) Fetch current user for role + hotel/tenant
        const meRes = await fetch("http://localhost:8000/api/accounts/me/", {
          headers: { Authorization: `Bearer ${loginData.access}` },
        })
        if (!meRes.ok) return null

        const me = await meRes.json().catch(() => ({}))

        return {
          id: me?.id ?? 0,
          email: me?.email ?? email,
          access: loginData.access,
          refresh: loginData.refresh,
          role: me?.role ?? "admin",
          hotel_id: me?.tenant?.id ?? null,
        }
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.access = (user as any).access
        token.refresh = (user as any).refresh
        token.role = (user as any).role
        token.hotel_id = (user as any).hotel_id
      }
      return token
    },
    async session({ session, token }) {
      ;(session.user as any).access = (token as any).access
      ;(session.user as any).role = (token as any).role
      ;(session.user as any).hotel_id = (token as any).hotel_id
      return session
    },
  },

  // We'll control redirects in middleware + login form
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authConfig)
export { handler as GET, handler as POST }
