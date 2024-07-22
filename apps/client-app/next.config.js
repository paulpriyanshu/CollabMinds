/** @type {import('next').NextConfig} */
 
module.exports = {
  
    experimental: {
        serverActions: {
          bodySizeLimit: '5mb', // Keep or modify if needed
        },
       
        
      },
      typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
      },

  }