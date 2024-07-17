"use client"
import Image from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import { signIn, signOut, useSession } from "next-auth/react"; 
export default function Home() {
  const {data:session,status}=useSession()
  console.log(session)
  return (
   <div>
    hello 
    
   {/* {
    session && (
      <>
      <button onClick={async()=> await signOut()}>SignOut</button>
      </>
      
    )}
    {
      !session && (
        <>
          <button onClick={()=>signIn('google')}>
            SignIn
          </button>
        </>
      )
    } */}
    {session ? (
      <button onClick={async () => await signOut()}>SignOut</button>
    ) : (
      <button onClick={() => signIn("google")}>
        SignIn
      </button>
    )}
  </div>

  );
}
