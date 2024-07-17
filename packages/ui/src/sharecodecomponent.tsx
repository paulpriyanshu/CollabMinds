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
import { SendProject, thumbnailupdate, vidupdate } from '../../../apps/client-app/app/api/actions/projectActions';
import { CreateTitle } from '../../../apps/client-app/app/api/actions/projectActions';
import { useAppSelector, useAppDispatch } from '../../../apps/client-app/app/lib/Projectshooks';
import { RootState, AppDispatch } from '../../../apps/client-app/app/lib/ProjectsStore';
import { createproject } from '../../../apps/client-app/app/lib/features/ProjectSlice';

export interface ShowCodeProps {
  isOpen: boolean;
  title:string;
  code:string;
}

const ShareCode = ({isOpen,title,code}:ShowCodeProps) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const [email,setemail]=useState("")
  const session=useSession()

  
  
  
  const sendcode=async()=>{
    const data=await SendProject(email,code)
  }





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
            <div className="flex h-full   flex-col items-center rounded-3xl justify-between border-2 border-slate-800 shadow-2xl p-10 bg-black">
             <div className='text-white text-4xl font-extrabold font-sans m-3'>
                ACCESS CODE
             </div>
             <div className='text-white text-3xl m-3 border-2 border-slate-800 p-3 px-10 rounded-2xl'>
                {code}
             </div>
             <input className='bg-black border-2 border-slate-800 text-2xl text-white p-3 rounded-2xl m-4' placeholder='editor email address' onChange={(e)=>setemail(e.target.value)}/>
             <Button onClick={sendcode}>
                Share
             </Button>
          
            </div>

            </div>
            
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ShareCode;
