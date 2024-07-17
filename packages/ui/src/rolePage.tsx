"use client"
import React, { useEffect, useRef } from 'react';
import RoleCard from './roleCard';
import { useSession } from 'next-auth/react';
import { editor, editorcheck } from '../../../apps/client-app/app/api/actions/projectActions';

function RolePage() {
  const canvasRef = useRef(null);
  const shapes = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Utility function to interpolate between two values
    const interpolate = (start, end, factor) => start + (end - start) * factor;

    // Shape class
    class Shape {
      constructor(x, y, dx, dy, color, size) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.color = color;
        this.size = size;
        this.targetColor = this.randomColor();
        this.colorTransitionFactor = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        // Move shape
        this.x += this.dx;
        this.y += this.dy;

        // Check bounds and change direction
        if (this.x + this.size / 2 > canvas.width || this.x - this.size / 2 < 0) {
          this.dx = -this.dx;
        }
        if (this.y + this.size / 2 > canvas.height || this.y - this.size / 2 < 0) {
          this.dy = -this.dy;
        }

        // Handle collisions
        this.detectCollision();

        // Smoothly change color
        this.transitionColor();

        this.draw();
      }

      detectCollision() {
        shapes.current.forEach(shape => {
          if (shape !== this) {
            // Calculate distance between centers
            const dx = this.x - shape.x;
            const dy = this.y - shape.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Check collision
            if (distance < this.size / 2 + shape.size / 2) {
              // Swap velocities
              const tempDx = this.dx;
              const tempDy = this.dy;
              this.dx = shape.dx;
              this.dy = shape.dy;
              shape.dx = tempDx;
              shape.dy = tempDy;

              // Adjust positions to avoid sticking
              this.x += this.dx;
              this.y += this.dy;
              shape.x += shape.dx;
              shape.y += shape.dy;
            }
          }
        });
      }

      transitionColor() {
        // Interpolate color components
        const currentColorComponents = this.parseColor(this.color);
        const targetColorComponents = this.parseColor(this.targetColor);

        if (currentColorComponents && targetColorComponents) {
          const r = interpolate(currentColorComponents.r, targetColorComponents.r, this.colorTransitionFactor);
          const g = interpolate(currentColorComponents.g, targetColorComponents.g, this.colorTransitionFactor);
          const b = interpolate(currentColorComponents.b, targetColorComponents.b, this.colorTransitionFactor);

          this.color = `rgba(${r}, ${g}, ${b}, 0.8)`;

          // Update the transition factor
          this.colorTransitionFactor += 0.01;

          // Reset and set a new target color once transition is complete
          if (this.colorTransitionFactor >= 1) {
            this.colorTransitionFactor = 0;
            this.targetColor = this.randomColor();
          }
        }
      }

      randomColor() {
        return `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.8)`;
      }

      parseColor(color) {
        const match = color.match(/rgba?\((\d+), (\d+), (\d+), ([\d.]+)\)/);
        return match
          ? {
              r: parseFloat(match[1]),
              g: parseFloat(match[2]),
              b: parseFloat(match[3]),
            }
          : null;
      }
    }

    // Initialize shapes (only circles)
    const numShapes = 5; // Adjust number of shapes as needed
    for (let i = 0; i < numShapes; i++) {
      const size = Math.random() * 200 + 10; // Random size between 10 and 60
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const dx = (Math.random() - 0.5) * 4; // Random velocity for x
      const dy = (Math.random() - 0.5) * 4; // Random velocity for y
      const color = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.8)`; // Random color

      shapes.current.push(new Shape(x, y, dx, dy, color, size));
    }

    // Animation loop
    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      shapes.current.forEach(shape => {
        shape.update();
      });
    }

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  const session=useSession()
  const editorRole=async()=>{

    const email=session?.data?.user?.email || ""
    const user_exists=await editorcheck(email)
    if(user_exists){
      window.location.href="http://localhost:3001/dashboard"
      return;
    }
    const user=await editor(email)
    if(user){
      console.log('user is editor')
      window.location.href = 'http://localhost:3001/dashboard'
    }else{
      alert('user is not editor')
    }
   
  
  }


  return (
    <div className="relative flex justify-center items-center h-screen bg-gradient-to-r from-slate-800 via-slate-600 via-slate-400  via-red-200 via-red-400 via-red-600 via-red-900 via-red-700 via-red-500 via-red-300 via-yellow-300 via-yellow-600 via-yellow-700 via-yellow-800 via-yellow-900 via-slate-200 via-slate-400 via-slate-600 via-slate-800 to-slate-900 bg-[length:400%_400%] animate-gradientMove overflow-hidden">
      {/* Canvas for drawing */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-30"></canvas>
      
      {/* Panels with glassmorphism effect */}
      <div className='relative z-10 bg-white bg-opacity-10 backdrop-blur-lg h-screen w-full'>
        <div className="flex items-center justify-center h-full w-full p-8">

          <RoleCard onClick={()=>console.log("hello")}>CLIENT</RoleCard>

         
          <RoleCard onClick={editorRole}>EDITOR</RoleCard>

        

        </div>
      </div>
    </div>
  );
}

export default RolePage;
