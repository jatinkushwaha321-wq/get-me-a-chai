import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import mongoose from "mongoose"
import User from "@/models/User"
import Payment from "@/models/Payment"
import connectDB from "@/db/connectDb"

export const authOptions = NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider === "github") {
        await connectDB()
        const currentUser = await User.findOne({ email: user.email })
        if(!currentUser) {
          const newUser = await User.create({
            email: user.email,
            username: user.email.split("@")[0],
          })
          
          
        }
        return true
      }
    },
    async session({ session, token, user }) {
      await connectDB()
      const dbUser = await User.findOne({ email: session.user.email })
      session.user.name = dbUser.username
      return session
  }
}})
export { authOptions as GET, authOptions as POST }