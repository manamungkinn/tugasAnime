import nextAuth from "next-auth";
import githubProvider from "next-auth/providers/github";

const options = {
  providers: [
    githubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

export const session = {
  providers: [
    githubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

// export async function OPTIONS() {
//   return new Response(null, {
//     status: 204, // No Content
//     headers: {
//       "Allow": "OPTIONS, GET, POST", // Tentukan metode yang diizinkan
//     },
//   });
// }

const handler = nextAuth(options);

export { handler as GET, handler as POST };