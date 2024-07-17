"use client"
import React from 'react'
import Slider from './slider';
import { useState } from 'react';
function Sliderbutton() {
    const [isSliderOpen, setIsSliderOpen] = useState(false);
    const openSlider = () => {
        setIsSliderOpen(true);
      };
    
      const closeSlider = () => {
        setIsSliderOpen(false);
      };
  return (
    <div>
    <button onClick={isSliderOpen?closeSlider:openSlider} className="mt-3 lg:mt-6 text-5xl  px-2 left-0 z-50 text-white hover:bg-slate-800 rounded-2xl">
    &#9776;
    </button>
    <Slider isOpen={isSliderOpen} onClose={closeSlider} />
    </div>
  )
}

export default Sliderbutton