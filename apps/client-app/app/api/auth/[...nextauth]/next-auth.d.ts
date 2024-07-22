// next-auth.d.ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      isNewUser?: boolean;
    } & DefaultSession["user"];
    access_token: string;
    idToken: string;
  }

  interface User {
    isNewUser?: boolean;
  }

  interface JWT {
    isNewUser?: boolean;
  }
}
