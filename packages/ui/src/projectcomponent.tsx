"use client";
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Modal from './modal';
import Button from './button';
import { UploadDropzone } from "@uploadthing/react";
import { OurFileRouter } from "../../../apps/client-app/app/api/uploadthing/core";
import axios from 'axios';
import { FaArrowAltCircleDown } from 'react-icons/fa';
import { useRef } from 'react';
import { useEffect } from 'react';
import db from "@repo/db/client"
import { useSession } from 'next-auth/react';
import { thumbnailupdate, vidupdate } from '../../../apps/client-app/app/api/actions/projectActions';
import { CreateTitle } from '../../../apps/client-app/app/api/actions/projectActions';
import { useAppSelector, useAppDispatch } from '../../../apps/client-app/app/lib/Projectshooks';
import { RootState, AppDispatch } from '../../../apps/client-app/app/lib/ProjectsStore';
import { createproject } from '../../../apps/client-app/app/lib/features/ProjectSlice';

export interface ProjectComponentProps {
  isOpen: boolean;
  title:string;
}

const ProjectComponent = ({isOpen,title}:ProjectComponentProps) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const [imageFiles, setImageFiles] = useState([]);
  const [thumbnails,setthumbnails] = useState("")
  const [videoFiles, setVideoFiles] = useState([]);
  const [uploadedVideoNames, setUploadedVideoNames] = useState([]); // Updated state for video names
  const session=useSession()
  const dispatch=useAppDispatch<AppDispatch>()


  const onDropImages = useCallback((acceptedFiles) => {
    setImageFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
  }, []);

  const onDropVideos = useCallback((acceptedFiles:any) => {
    setVideoFiles(prevFiles => [
      ...prevFiles,
      ...acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      }))
    ]);
    setUploadedVideoNames((prevNames) => [
      ...prevNames,
      ...acceptedFiles.map(file => file.path)
    ]);
  }, []);

  const handleUpload = async () => {
    
    if (videoFiles) {
      for (const file of videoFiles) {
        const url = `https://prac2.priyanshu-paul003.workers.dev/${file.name}`;
        const headers = {
          'X-Custom-Auth-Key': 'collabminds',
          'Content-Type': file.type,
        };
  
        try {
          const response = await axios.put(url, file, { headers });
          console.log(response.data)
          console.log('File size:', Buffer.byteLength(JSON.stringify(title,file.name), 'utf8'), 'bytes');
          if (file.name) {
            const data=await vidupdate(title,file.name)
          }
          setIsModalOpen((prev)=>!prev)
            alert(`Video uploaded: ${file.name}`);
          
        } catch (error) {
          console.error('Error uploading video:', error);
          alert('Error uploading video. Please try again.');
        }
      }
    }
    if (thumbnails) {
      console.log("this is thumbnails",title);
      const thumnaildata=await thumbnailupdate(title,thumbnails)
    }
    else{
      setIsModalOpen((prev)=>!prev)
    }
    setVideoFiles([])
    setthumbnails("")
   

  };

  const { getRootProps: getVideoRootProps, getInputProps: getVideoInputProps } = useDropzone({
    onDrop: onDropVideos,
    accept: 'video/*'
  });

  const renderThumbnails = (files) => files.map(file => (
    <div key={file.name} className="m-2">
      <img src={file.preview} className="w-24 h-24 object-cover" alt={file.name} />
    </div>
  ));

  return (
    <div>
     

      <Modal isOpen={isModalOpen}>
        <div className='flex flex-cols'>
          <div>
            <div className='flex justify-end m-2'>
              <button onClick={() => setIsModalOpen((prev)=>!prev)} className="bg-transparent border-none text-4xl text-white hover:font-extrabold">
                &times;
              </button>
            </div>
            <div>
            <div className="flex h-1/3 flex-col items-center rounded-3xl justify-between border-2 border-slate-800 shadow-2xl p-10 bg-black">
              <div className="w-full">
                <div className='flex justify-center'>
                  <h2 className="text-white font-mono text-lg font-bold">Only Upload Thumbnails</h2>
                </div>
                <UploadDropzone<OurFileRouter, "imageUploader">
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    console.log("Files: ", res);
                    console.log(res[0].url)
                    setthumbnails(res[0].url)

                    alert("Upload Completed");
                  }}
                  onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
                  }}
                />
               
              </div>
              <div className="w-full">
                <div className='flex justify-center border-t-2 border-slate-800'>
                  <h2 className="text-white text-xl font-mono font-bold mb-2 mt-4">Upload Videos</h2>
                </div>
                <div {...getVideoRootProps({ className: 'dropzone p-4 border-2 border-dashed border-gray-500 rounded-lg text-center cursor-pointer hover:border-blue-500' })}>
                  <input {...getVideoInputProps()} />
                  <p className="text-white">Drag & drop videos here, or click to select files</p>
                </div>
               
               
                <div className="max-h-32 overflow-y-auto mt-2">
                {uploadedVideoNames.length > 0 && (
                  <div className="text-white font-sans-serif text-xl">
                    {uploadedVideoNames.map((video, i) => (
                      <div key={i}>
                        {video.substring(0, 20)}....
                      </div>
                    ))}
                  </div>
                )}
                </div>
              </div>
              <div className=' flex justify-center mt-4'>
              </div>
              <div className=' flex justify-center mt-4'>
               <Button onClick={handleUpload}>
                  Create
                </Button>
               </div>
            </div>

            </div>
            
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProjectComponent;
