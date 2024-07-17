"use client"
import React, { useEffect, useRef } from 'react';
import { SliderAction } from '@repo/types';
import { useRouter } from "next/navigation";
import MenuCards from './menuCards';
import db from '@repo/db/client'
import { useSession } from 'next-auth/react';
import { editorPage } from '../../../apps/client-app/app/api/actions/projectActions';

const Slider = ({ isOpen, onClose }: SliderAction) => {
  const router = useRouter();
  const sliderRef = useRef<HTMLDivElement>(null);
  const session = useSession()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sliderRef.current && !sliderRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.classList.add('no-scroll');
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.classList.remove('no-scroll');
    };
  }, [isOpen, onClose]);

  const handleEditorClick = async () => {

   const userIsEditor=await editorPage(session?.data?.user?.email|| "")
    if(!userIsEditor){
      router.push('/role');
    }else{
      window.location.href = 'http://localhost:3001/dashboard';
    }
   
  };

  return (
    <div
      ref={sliderRef}
      className={`fixed left-0 w-80 h-full bg-black text-white transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out z-50`}
    >
      <div className="flex flex-cols p-4 mt-2">
        <button onClick={onClose} className="text-white text-lg hover:bg-slate-800 p-2 px-5 rounded-2xl">
          Close
        </button>
      </div>
      <div>
        <MenuCards page='home'>Home</MenuCards>
        {/* <MenuCards page='' children='Videos'/> */}
        <MenuCards page='dashboard'>Dashboard</MenuCards>
        <MenuCards page="upload">Upload</MenuCards>
        <MenuCards onClick={handleEditorClick}>Editor</MenuCards>
        <MenuCards page='explorer'>Explore</MenuCards>
        <MenuCards page='about'>About</MenuCards>
      </div>
    </div>
  );
};

export default Slider;
