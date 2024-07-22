import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import db from "@repo/db/client";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
      authorization: {
        url: 'https://accounts.google.com/o/oauth2/v2/auth',
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
          scope: 'openid email profile https://www.googleapis.com/auth/youtube'
        }
      },
    })
  ],
  jwt: {
    maxAge: 7 * 24 * 60 * 60,
  },
  callbacks: {
    signIn: async ({ user }: any) => {
      console.log("this is user", user);
      if (user.email) {
        try {
          const existingUser = await db.google_auth_user.findUnique({ where: { email: user.email } });
          const existingUserOriginal = await db.user.findUnique({ where: { email: user.email } });

          if (!existingUser || !existingUserOriginal) {
            if (!existingUser) {
              await db.google_auth_user.create({
                data: {
                  name: user.name,
                  email: user.email,
                },
              });
            }

            if (!existingUserOriginal) {
              await db.user.create({
                data: {
                  name: user.name,
                  email: user.email,
                },
              });
            }
            user.isNewUser = true;
          } else {
            user.isNewUser = false;
            console.log('User already exists:', existingUser);
            return true;
          }
        } catch (error) {
          console.error('Error creating user:', error);
          return false; // Prevent sign-in if there's an error
        }
      }
      return true;
    },
    jwt: async ({ token, user, account }: any) => {
      if (user) {
        token.isNewUser = user.isNewUser;
        if (account?.access_token) {
          token.access_token = account.access_token;

        }
        if (account?.idToken) {
          token.idToken = account.idToken; 
        }
      }
      return token;
    },
    session: async ({ session, token }: any) => {
      session.user.isNewUser = token.isNewUser === true ? true : undefined;
      if (typeof token.access_token === 'string') {
        session.access_token = token.access_token;
        session.idToken = token.idToken as string;
      }
      return session;
    },
    redirect: async ({ url, baseUrl}: any) => {
      console.log("this is url: " + url);
      console.log("this is baseUrl: " + baseUrl);
      if (url) {
        return `${baseUrl}/home`;
      }
      return baseUrl;
    }
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token-${process.env.SERVER_NAME}`, // Unique cookie name for each server
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Ensure this is unique for each server
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
