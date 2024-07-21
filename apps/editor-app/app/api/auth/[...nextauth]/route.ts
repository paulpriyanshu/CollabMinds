import NextAuth, { User } from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";
import db from "@repo/db/client"
import { Session } from "next-auth";
import { PrismaClient } from "@prisma/client"
import { JWT } from "next-auth/jwt";
import Email from "next-auth/providers/email";

import { RedirectType, redirect } from "next/navigation";
const client = new PrismaClient

const authOptions={
  providers: [
    CredentialsProvider({
        name: 'Credentials',
        credentials: {
          username: { label: 'name', type: 'text', placeholder: 'name' },
          email:{ label: 'email', type: 'text', placeholder:'email' },
          password: { label: 'password', type: 'password', placeholder: 'password' },
        },
        async authorize(credentials: any) {
          const {email}=credentials
          const user=await db.user.findUnique({
            where:{
              email:email
            }
          })
          if(!user) return {id:"user",email:email,isNewUser:true}
          return {
                id: "1",
                email: email,
                isNewUser:false

                

            };
        },
      }),
      GoogleProvider({
        clientId:process.env.GOOGLE_ID||"",
        clientSecret:process.env.GOOGLE_SECRET||"",
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
    maxAge:7*24*60*60
  },
  callbacks:{
    signIn:async ({user}:any)=>{
        // console.log("this is user",user)
        if (user.email) {
            try {
            const existingUser = await db.google_auth_user.findUnique({ where: { email: user.email } });
            const existingUser_original = await db.user.findUnique({ where: { email: user.email } });  
            //const existing_project=await db.projects.findUnique({ where: { userId:user.email } });
            if (!existingUser||!existingUser_original) {
                      if(!existingUser){
                        const registered= await db.google_auth_user.create({
                          data: {
                            name: user.name,
                            email: user.email,
                          },
                         });

                      }
                       
                         if (!existingUser_original) {
                          const register_main = await db.user.create({
                           data: {
                             name: user.name,
                             email: user.email,
                            
                           },
                          })
                         }
                      user.isNewUser = true;
                    
              
                  
                  }
                  else{
                    user.isNewUser = false;
                    // console.log('User already exists:', existingUser);
                    return true
                  }
              
              
            } catch (error) {
              console.error('Error creating user:', error);
              return false; // Prevent sign-in if there's an error
            }
          }
        return true
        },
        jwt:async({token,user,account}:any) =>{
          if (user) {
            token.isNewUser = user.isNewUser;
            // console.log("will prrint access token")
            // console.log("this is token's newuser",token.isNewUser)
            // console.log("this is account access token",account?.access_token)
            if(account?.access_token){
              token.access_token = account.access_token
              // console.log("this is accesstoken",token.access_token)
            }
            if (account?.idToken) {
              token.idToken = account.idToken; // Ensure idToken is handled
            }
          }
          return token;
        },
       
        session: async({ session, token }:any)=> {
          // console.log("this is session",session)
            // console.log("this is token",token)
            session.user.isNewUser = token.isNewUser === true ? true : undefined;
            // console.log('New user:', session.user)
            if (typeof token.access_token === 'string') {
              session.access_token = token.access_token;
              session.idToken = token.idToken as string;
              
            }  

          return session;
        },
        async redirect({url,baseUrl,token,session}:any){
          // if(token.isNewUser){
          //   return `${baseUrl}/welcome`
          // }
          // console.log("this is url: " + url)
          // console.log("this is baseUrl: " + baseUrl)
          // const data= await db.user.findUnique({
          //   where:{
          //     email:session.user.email
          //   }
          // })
          if(url){
            //if(data?.Role==="None") return `${baseUrl}/role`;
            return `${baseUrl}/dashboard`;
          }

          return baseUrl
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
  secret: process.env.NEXTAUTH_SECRET
}

const handler=NextAuth(authOptions)

export { handler as GET, handler as POST }