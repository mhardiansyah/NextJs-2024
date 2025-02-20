/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import GithubProvider from "next-auth/providers/github";

const authOptions: NextAuthOptions = {
  providers: [
    // ...add more providers here
    GithubProvider({
      clientId: "", //process.env.GITHUB_ID
      clientSecret: "", // process.env.GITHUB_SECRET
    }),
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      authorize(credentials: any, req: any) {
        return {
          ...credentials,
        };
      },
    }),
  ],
};

export default NextAuth(authOptions);
