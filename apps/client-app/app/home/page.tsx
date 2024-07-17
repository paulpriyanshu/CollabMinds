// pages/index.tsx
"use client"
import { Appbar } from '@repo/ui/appbar';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);

  const fetchYouTubeChannel = async () => {
   
    console.log('Fetching YouTube Channel');
    setLoading(true);
    

    try {
      if (session && session.access_token) {
        const res = await fetch('http://localhost:3000/api/access/', {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        console.log('YouTube Channel data:', data);
      } else {
        console.log('No access token available');
      }
    } catch (error) {
      console.error('Error fetching YouTube channel:', error);
    } finally {
      setLoading(false);
    }
  };
  const router=useRouter()
  

  return (
    <>
   <Appbar onSignin={()=>signIn('google')} onSignout={async () => {
        await signOut()
        router.push("/signup")
      }} user={session?.user} />
    <div className="min-h-screen flex flex-col justify-center items-center">
      
      {!session && (
        <div className="text-center">
          <p className="text-lg font-semibold mb-4">You are not signed in</p>
          <button
            onClick={() => signIn('google')}
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign in with Google
          </button>
        </div>
      )}
      {session && (
        <div className="text-center">
          <p className="text-lg font-semibold mb-4">Signed in as {session.user.email}</p>
          <button
            onClick={async () => await signOut()}
            className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 mr-2"
          >
            Sign out
          </button>
          <button
            onClick={fetchYouTubeChannel}
            className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 mr-2"
            disabled={loading}
          >
            {loading ? 'Fetching...' : 'Get My YouTube Channel'}
          </button>
          <button
            onClick={()=>router.push('/dashboard')}
            className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Dashboard
          </button>

        </div>
      )}
    </div>
    </>
  );
}
