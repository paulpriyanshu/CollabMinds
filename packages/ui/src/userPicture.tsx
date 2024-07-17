import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { truncateTextType, userPictureType } from '@repo/types';
const UserProfile = ({ name, username, subscribers, videos, image, description }:userPictureType) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const {data:session}=useSession()
  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  const truncateText = ({text, length}:truncateTextType) => {
    if (text.length <= length) return text;
    return isExpanded ? text : text.substring(0, length) + '...';
  };
  
  return (
    <div>

    
    {!session &&(
        <div className='flex justify-center items-center h-screen'>
            <div className='text-3xl bg-black text-white p-4  rounded-2xl max-w-lg mx-auto font-mono'>
            You are not Logged in ! 
            </div>
       
        </div>
    )}
    {session &&(
            <div className="bg-black text-white p-4 rounded-2xl max-w-5xl h-96  mx-auto mt-5">
            <div className="flex items-center">
              <img
                className="w-36 h-36 rounded-full m-5"
                src={image}
                alt={''}
              />
              <div className="m-10">
                <h1 className="text-3xl font-bold">{name}</h1>
                <p className="text-gray-400">{username}</p>
                <p className="mt-1">{subscribers} subscribers · {videos} video{videos!== 1 ? 's' : ''}</p>
              </div>
            </div>
            <div className="ml-10 text-xl">
              <p>
                {truncateText({text:description,length:100})}
                {description.length > 100 && (
                  <button 
                    onClick={handleToggleExpand} 
                    className="text-blue-500 ml-2">
                    {isExpanded ? 'Show less' : 'More'}
                  </button>
                )}
              </p>
            </div>

             
            </div>

        )
    }
    </div>
  );
  
};

export default UserProfile;
