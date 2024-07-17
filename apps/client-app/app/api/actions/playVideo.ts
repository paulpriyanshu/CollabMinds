"use server"
export const openVideo = (videoId: string) => {
    if (!videoId) {
      throw new Error('Video ID is required');
    }
  
    const url = `https://www.youtube.com/watch?v=${videoId}`;
    return url;
  };