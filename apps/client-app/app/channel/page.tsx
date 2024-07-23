"use client";
import React, { useCallback, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { fetchChannelId } from '../lib/features/ChannelDetailsSlice';
import { AppDispatch } from '../lib/store';
import { openVideo } from '../api/actions/playVideo';
import dynamic from 'next/dynamic';
import channel_list from '../api/actions/getVideo';
import { getTitleBeforeHash } from '../api/actions/selectTitle';

// Dynamically import components
const Dashboard = dynamic(() => import('@repo/ui/dashboard'), { ssr: false });
const VideoCard = dynamic(() => import('@repo/ui/card'), { ssr: false });
const UserPicture = dynamic(() => import('@repo/ui/userPicture'), { ssr: false });

function Videos() {
  const [channelId, setChannelId] = useState<string>("");
  const [dp, setDp] = useState<string>("");
  const [statistics, setStatistics] = useState<any>({});
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [videos, setVideos] = useState<any[]>([]);
  const [username, setUsername] = useState<string>("");
  const { data: session } = useSession();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const getChannelId = async () => {
      if (session?.access_token) {
        try {
          const result = await dispatch(fetchChannelId(session.access_token));

          if (fetchChannelId.fulfilled.match(result)) {
            const user_info = result.payload.items[0];
            setDp(user_info?.snippet?.thumbnails?.high?.url || "");
            setStatistics(user_info?.statistics || {});
            setTitle(user_info?.snippet?.localized?.title || "");
            setDescription(user_info?.snippet?.localized?.description || "");
            setUsername(user_info?.snippet?.customUrl || "");
            setChannelId(user_info?.id || "");
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

    getChannelId();
  }, [session, dispatch]);

  const handleGetData = useCallback(async () => {
    if (session?.access_token && channelId) {
      try {
        const result = await channel_list(channelId);
        setVideos(result.items);
        setIsLoaded(true);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    } else {
      console.error('Session or channel ID is not available');
    }
  }, [session?.access_token, channelId]);

  const handleClickVideo = useCallback(async (videoId: string) => {
    try {
      const url = await openVideo(videoId);
      window.open(url, '_blank');
    } catch (error) {
      console.error('Error opening video URL:', error);
    }
  }, []);

  return (
    <div className='min-h-screen text-white'>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Dashboard />
        <div>
          <UserPicture
            name={title}
            username={username}
            subscribers={statistics?.subscriberCount}
            videos={statistics?.videoCount}
            image={dp}
            description={description}
          />
          <button onClick={handleGetData}>Videos</button>
          <div className={`flex flex-wrap justify-center mt-6 ${isLoaded ? 'opacity-100 transition-opacity duration-500' : 'opacity-0'}`}>
            {videos.map((video: any, index: number) => (
              <div key={index} className='cursor-pointer' onClick={() => handleClickVideo(video.id.videoId)}>
                <VideoCard
                  image={video.snippet?.thumbnails?.high?.url}
                  title={getTitleBeforeHash(video.snippet.title)}
                />
              </div>
            ))}
          </div>
        </div>
      </React.Suspense>
    </div>
  );
}

export default React.memo(Videos);
