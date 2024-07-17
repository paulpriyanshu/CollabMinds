import { withUt } from "uploadthing/tw";

export default withUt({
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      keyframes: {
        gradientMove: {
          '0%, 200%': { backgroundPosition: '0% 100%' },   // Start from bottom left
          '10%': { backgroundPosition: '10% 90%' },
          '20%': { backgroundPosition: '20% 80%' },
          '30%': { backgroundPosition: '30% 70%' },
          '40%': { backgroundPosition: '40% 60%' },
          '50%': { backgroundPosition: '50% 50%' },
          '60%': { backgroundPosition: '60% 40%' },
          '70%': { backgroundPosition: '70% 30%' },
          '80%': { backgroundPosition: '80% 20%' },
          '90%': { backgroundPosition: '90% 10%' },
          '100%': { backgroundPosition: '100% 0%' },      // Reach top right
          '110%': { backgroundPosition: '90% 10%' },
          '120%': { backgroundPosition: '80% 20%' },
          '130%': { backgroundPosition: '70% 30%' },
          '140%': { backgroundPosition: '60% 40%' },
          '150%': { backgroundPosition: '50% 50%' },
          '160%': { backgroundPosition: '40% 60%' },
          '170%': { backgroundPosition: '30% 70%' },
          '180%': { backgroundPosition: '20% 80%' },
          '190%': { backgroundPosition: '10% 90%' },
        },
        // ballMove: {
        //   '0%': { transform: 'translate(0, 0)' },
        //   '25%': { transform: 'translate(100vw, 100vh)' },
        //   '50%': { transform: 'translate(50vw, -50vh)' },
        //   '75%': { transform: 'translate(-50vw, 50vh)' },
        //   '100%': { transform: 'translate(0, 0)' },
        // },
      },
      animation: {
        gradientMove: 'gradientMove 5s ease infinite',
        // ballMove: 'ballMove 10s ease-in-out infinite',
      },
    },
    
  },
  plugins: [],
});