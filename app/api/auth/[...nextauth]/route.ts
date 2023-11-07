import NextAuth, { type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import Cryptr from "cryptr"
import { Server } from "@/types"

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 30, // 30 minutes
  },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "server",
      name: "server credentials",
      credentials: {
        host: {
          label: "Server",
          type: "text",
          placeholder: "ftp.example.com",
        },
        user: { label: "User", type: "text" },
        password: { label: "Password", type: "password" },
        port: { label: "Port", type: "number" },
        passkey: {
          label: "Passkey",
          type: "password",
          placeholder: "Admin key",
        },
      },
      async authorize(credentials): Promise<any> {
        const cryptr = new Cryptr(process.env.ENCRYPT_KEY as string)

        const isAdmin =
          credentials?.passkey &&
          credentials?.passkey?.includes(process.env.PASS_KEY as string)
        const isAuthorized = isAdmin || credentials?.host

        let server: Server = {
          host: isAdmin ? String(process.env.FTP_HOST) : credentials?.host,
          port: Number(credentials?.port) || 21,
          user: isAdmin ? String(process.env.FTP_USER) : credentials?.user,
          password: isAdmin
            ? String(process.env.FTP_PASSWORD)
            : credentials?.password,
          passkey: credentials?.passkey,
        }

        const user = {
          id: credentials?.user || "server",
          // server: credentials?.server,
          server: cryptr.encrypt(JSON.stringify(server)),
        }

        if (isAuthorized) {
          return user
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  // Creates a custom signIn page, prevents the default /api/auth/signin page from working
  // pages: {
  //   signIn: "/"
  // },
  callbacks: {
    async signIn({ user, account, profile }: any) {
      // if (account.provider === "discord") {

      //   // Grant access only if the member has the required role
      //   return user.isAuthorized
      // }

      // Allow sign-in for other providers
      return true
    },
    async jwt({ token, user, account, profile }: any) {
      return token
    },
    async session({ session, user, token }: any) {
      session.server = token.server

      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
