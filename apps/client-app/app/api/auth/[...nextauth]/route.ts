import NextAuth, { User } from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";
import db from "@repo/db/client"
import { Session } from "next-auth";
import { PrismaClient } from "@prisma/client"
import { JWT } from "next-auth/jwt";
// const client = new PrismaClient

const handler = NextAuth({
  providers: [
    CredentialsProvider({
        name: 'Credentials',
        credentials: {
          username: { label: 'name', type: 'text', placeholder: 'name' },
          email:{ label: 'email', type: 'text', placeholder:'email' },
          password: { label: 'password', type: 'password', placeholder: 'password' },
        },
        async authorize(credentials: any) {
            
            return {
                id: "user1"
            };
        },
      }),
      GoogleProvider({
        clientId:process.env.GOOGLE_ID||"",
        clientSecret:process.env.GOOGLE_SECRET||"",
    })
  ],
  callbacks:{
    signIn:async ({user})=>{
        console.log("this is user",user)
        if (user.email) {
            try {
              // const registered = await client.google_auth_user.create({
              //   data: {
              //     name: user.name,
              //     email: user.email,
              //   }
              // });
            const existingUser = await db.google_auth_user.findUnique({ where: { email: user.email } });
            const existingUser_original = await db.user.findUnique({ where: { email: user.email } });  
            if (!existingUser&&!existingUser_original) {
                       const registered= await db.google_auth_user.create({
                          data: {
                            name: user.name,
                            email: user.email,
                          },
                         });
                         const register_main = await db.user.create({
                          data: {
                            name: user.name,
                            email: user.email,
                           
                          },
                         })
                    user.isNewUser = true;
                    console.log('Registered user:', registered,register_main);
                  
                  }
                  else{
                    user.isNewUser = false;
                    console.log('User already exists:', existingUser);
                    return true
                  }
              
              
            } catch (error) {
              console.error('Error creating user:', error);
              return false; // Prevent sign-in if there's an error
            }
          }
        return true
        },
        session: async({ session, token })=> {

            session.user.isNewUser = token.isNewUser === true ? true : undefined;
            console.log('New user:', session.user)

          return session;
        },
        jwt:async({token,user}) =>{
          if (user) {
            token.isNewUser = user.isNewUser;
          }
          return token;
        },
  },
  
//   callbacks: {
//     async session({ session, user }:any) {
//       session.user.id = user.id;
//       return session;
//     },
//     async signIn({ user, account, email, credentials }:any) {
//       if (account.provider === 'google') {
//         const existingUser = await db.user.findUnique({ where: { email: user.email } });
//         if (!existingUser) {
//           await db.user.create({
//             data: {
//               name: user.name || "Unknown",
//               email: user.email,
//               number: null,
//               password:null
//             },
//           });
//         }
//       }
//       return true;
//     },
//   },
  secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }