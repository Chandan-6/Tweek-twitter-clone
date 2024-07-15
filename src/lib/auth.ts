import GoogleProvider from "next-auth/providers/google";
import { redirect } from "next/dist/server/api-utils";

export const NEXT_AUTH_CONFIG = {
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  secret : process.env.NEXTAUTH_SECRET!,
  callbacks : {
    redirect : ({ url, baseUrl }: any) => {
        return `${baseUrl}/auth`;
    },
    jwt : async ({ user, token }: any) => {
        if(user){
            token.uid = user.id;
        }

        return token;
    },
    session : async ({ session, token, user }: any) => {
        if (session.user){
            session.user.id = token.uid;
            session.user.googleImage = token.picture;
        }
        return session;
    },
  },
};
