"use client"
import Dashboard from '@repo/ui/dashboard';
import React, { useEffect, useState } from 'react';
import channel_list from '../api/actions/getVideo';
import { useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { fetchChannelId } from '../lib/features/ChannelDetailsSlice';
import { AppDispatch } from '../lib/store';
import { openVideo } from '../api/actions/playVideo';

import VideoCard from '@repo/ui/card';
import UserPicture from '@repo/ui/userPicture';

function Videos() {
  const [channel_id, setChannel_id] = useState("");
  const [dp, setDp] = useState("");
  const [statistics, setStatistics] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videos, setVideos] = useState([]);
  const [username, setUsername] = useState("");
  const { data: session } = useSession();
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  // Fetch channel ID once when component mounts
  useEffect(() => {
    const getChannelId = async () => {
      console.log("api called")
      if (session?.access_token) {
        try {
          
          const result = await dispatch(fetchChannelId(session.access_token));

          if (fetchChannelId.fulfilled.match(result)) {
            const user_info = result?.payload?.items[0];
            const id = user_info?.id || "";
            setDp(user_info?.snippet?.thumbnails?.high?.url || "")
            setStatistics(user_info?.statistics || {})
            setTitle(user_info?.snippet?.localized?.title || "")
            setDescription(user_info?.snippet?.localized?.description || "")
            setUsername(user_info?.snippet?.customUrl || "")
            setChannel_id(id);
          } else {
            console.error('Action was not fulfilled:', result);
          }
        } catch (error) {
          console.error('Error dispatching fetchChannelId:', error);
        }
      } else {
        console.error('Access token not available in session');
      }
    };

    getChannelId(); // Call the function immediately when component mounts

  }, [session]); // Empty dependency array ensures it runs only once on mount

  const handleGetData = async (channelId: string) => {
    console.log("vid list caled")
    if (session?.access_token && channelId) {
      try {
      
        const result = await channel_list(session.access_token, channelId);
        setVideos(result.items);
        setIsLoaded(true);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    } else {
      console.error('Session or channel ID is not available');
    }
  };

  const getTitleBeforeHash = (title: string) => {
    const index = title.indexOf('#');
    return index !== -1 ? title.substring(0, index) : title;
  };

  const handleClickVideo = async (videoId: string) => {
    try {
      const url = await openVideo(videoId);
      window.open(url, '_blank');
    } catch (error) {
      console.error('Error opening video URL:', error);
    }
  };

  return (
    <div className='min-h-screen text-white'>
      <Dashboard />
      <div>
        <UserPicture name={title} username={username} subscribers={statistics?.subscriberCount} videos={statistics?.videoCount} image={dp} description={description}/>
        <button onClick={() => handleGetData(channel_id)}>Videos</button>
        <div className={`flex flex-wrap justify-center mt-6 ${isLoaded ? 'opacity-100 transition-opacity duration-500' : 'opacity-0'}`}>
          {videos.map((video: any, index: number) => (
            <div key={index} className='cursor-pointer' onClick={async () => await handleClickVideo(video.id.videoId)}>
              <VideoCard
                image={video.snippet?.thumbnails?.high?.url}
                title={getTitleBeforeHash(video.snippet.title)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default React.memo(Videos);
