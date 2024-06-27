"use client"
import Image from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import { signOut, useSession } from "next-auth/react"; 
export default function Home() {
  const session=useSession()
  return (
   <div>
    hello
    {JSON.stringify(session)}
    <button onClick={()=>signOut()}>SignOut</button>
   </div>

  );
}
