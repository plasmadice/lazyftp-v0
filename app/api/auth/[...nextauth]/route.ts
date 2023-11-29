import NextAuth, { type NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import DiscordProvider from "next-auth/providers/discord"
import { UpstashRedisAdapter } from "@auth/upstash-redis-adapter"
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();
const scopes = ["identify", "email"].join(" ")

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "database",
  },
  adapter: UpstashRedisAdapter(redis, { baseKeyPrefix: "lazyftp:" }),
  // Configure one or more authentication providers
  providers: [
    // CredentialsProvider({
    //   id: "server",
    //   name: "server credentials",
    //   credentials: {
    //     host: {
    //       label: "Server",
    //       type: "text",
    //       placeholder: "ftp.example.com",
    //     },
    //     user: { label: "User", type: "text" },
    //     password: { label: "Password", type: "password" },
    //     port: { label: "Port", type: "number" },
    //     passkey: {
    //       label: "Passkey",
    //       type: "password",
    //       placeholder: "Admin key",
    //     },
    //   },
    //   async authorize(credentials): Promise<any> {
    //     const cryptr = new Cryptr(process.env.ENCRYPT_KEY as string)

    //     const isAdmin =
    //       credentials?.passkey &&
    //       credentials?.passkey?.includes(process.env.PASS_KEY as string)
    //     const isAuthorized = isAdmin || credentials?.host

    //     let server: Server = {
    //       host: isAdmin ? String(process.env.FTP_HOST) : credentials?.host,
    //       port: Number(credentials?.port) || 21,
    //       user: isAdmin ? String(process.env.FTP_USER) : credentials?.user,
    //       password: isAdmin
    //         ? String(process.env.FTP_PASSWORD)
    //         : credentials?.password,
    //       passkey: credentials?.passkey,
    //     }

    //     const user = {
    //       id: credentials?.user || "server",
    //       // server: credentials?.server,
    //       server: cryptr.encrypt(JSON.stringify(server)),
    //     }

    //     if (isAuthorized) {
    //       return user
    //     }
    //   },
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    DiscordProvider({
      clientId: String(process.env.DISCORD_CLIENT_ID),
      clientSecret: String(process.env.DISCORD_CLIENT_SECRET),
      authorization: {
        params: { scope: scopes }
      }
    }),
  ],
  // Creates a custom signIn page, prevents the default /api/auth/signin page from working
  // pages: {
  //   signIn: "/"
  // },
  
  callbacks: {
    async signIn({ user, account, profile }: any) {
      /* Auth values */
      // Discord: profile.verified: bool
      // Google profile.email_verified: bool
      // Both: profile.id: string, unique? 

      // console.log({ user, account, profile })

      // Check db for

      // if (account.provider === "discord") {

      //   // Grant access only if the member has the required role
      //   return user.isAuthorized
      // }

      // Allow sign-in for other providers

      // console.log('user in signIn callback', user)
      // console.log('account in signIn callback', account)
      // console.log('profile in signIn callback', profile)
      // console.log("Sign in successful")
      return true
    },
    async jwt({ token, user, account, profile }: any) {
      return token
    },
    async session({ session, user, token }: any) {
      session.user.id = user.id
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
