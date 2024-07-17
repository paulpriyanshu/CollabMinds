/** @type {import('next').NextConfig} */
 
module.exports = {
    experimental: {
        serverActions: {
          bodySizeLimit: '5mb', // Keep or modify if needed
        },
      },
  }