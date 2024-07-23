"use server"
export default async function channel_list(channel_id:any) {
    const axios=(await(import('axios'))).default
      const channel_data = await axios.get(`https://www.googleapis.com/youtube/v3/search?key=${process.env.API_KEY}&channelId=${channel_id}&part=snippet,id&order=date&maxResults=50`);
      return channel_data.data
  }


  

