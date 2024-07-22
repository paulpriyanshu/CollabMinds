"use client"
import { signIn, signOut, useSession } from "next-auth/react"; 
export default function Home() {
  const {data:session,status}=useSession()
  console.log(session)
  return (
   <div>
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
