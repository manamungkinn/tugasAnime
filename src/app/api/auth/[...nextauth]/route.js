import nextAuth from "next-auth";
import githubProvider from "next-auth/providers/github";
import googleProvider from "next-auth/providers/google";

const options = {
  providers: [
    githubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    googleProvider({
      clientId:process.env.GOOGLE_CLIENT_ID,
      clientSecret:process.env.GOOGLE_SECRET_ID,
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

export const session = {
  providers: [
    githubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    googleProvider({
      clientId:process.env.GOOGLE_CLIENT_ID,
      clientSecret:process.env.GOOGLE_SECRET_ID,
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = nextAuth(options);

export { handler as GET, handler as POST };