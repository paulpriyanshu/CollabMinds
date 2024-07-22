// pages/index.tsx
"use server"
import { signIn, signOut, useSession } from 'next-auth/react';
import { getToken } from 'next-auth/jwt';

import axios from 'axios';
import { getServerSession } from 'next-auth';


export default async function channel_list(access_token:any,channel_id:any) {
  //const { data: session, status } = useSession();

  const session = await getServerSession()
    console.log('Fetching YouTube Channel');


      // console.log("this is session",session)
      // console.log("this is access_token",access_token)
      const channel_data = await axios.get(`https://www.googleapis.com/youtube/v3/search?key=${process.env.API_KEY}&channelId=${channel_id}&part=snippet,id&order=date&maxResults=50`);
      return channel_data.data
  }


  

