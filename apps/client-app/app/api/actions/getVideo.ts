"use server"
import { getServerSession } from 'next-auth';


export default async function channel_list(channel_id:any) {
  const session = await getServerSession()
    console.log('Fetching YouTube Channel');
    const axios=(await(import('axios'))).default
      const channel_data = await axios.get(`https://www.googleapis.com/youtube/v3/search?key=${process.env.API_KEY}&channelId=${channel_id}&part=snippet,id&order=date&maxResults=50`);
      return channel_data.data
  }


  

