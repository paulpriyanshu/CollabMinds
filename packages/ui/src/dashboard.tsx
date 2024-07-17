"use client"
import { Appbar } from '@repo/ui/appbar';
import { signIn, signOut } from 'next-auth/react';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Slider from './slider';
import Sliderbutton from './sliderbutton';

function Dashboard() {

  
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className='text-white'>
      <Appbar
        onSignin={() => signIn('google')}
        onSignout={async () => {
          await signOut();
          router.push("/signup");
        }}
        user={session?.user}
      />

    </div>
  );
}

export default Dashboard;
