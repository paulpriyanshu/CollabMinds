"use client"
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const UploadComponent = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach(async (file) => {
      const url = `https://prac2.priyanshu-paul003.workers.dev/${file.name}`;
      const headers = {
        'X-Custom-Auth-Key': 'collabminds',
        'Content-Type': file.type,
      };

      try {
        const response = await axios.put(url, file, {
          headers,
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percent = Math.floor((loaded * 100) / total);
            setUploadProgress((prevProgress) => ({
              ...prevProgress,
              [file.name]: percent,
            }));
          },
        });
        console.log('Upload successful:', response.data);

        if (file.type.startsWith('video/')) {
          const thumbnailUrl = await generateVideoThumbnail(file);
          setUploadedFiles((prevFiles) => [
            ...prevFiles,
            { type: 'video', url: URL.createObjectURL(file), thumbnailUrl, name: file.name },
          ]);
        } else {
          setUploadedFiles((prevFiles) => [
            ...prevFiles,
            { type: 'image', url: URL.createObjectURL(file), name: file.name },
          ]);
        }
        // Reset the upload progress for the file
        setUploadProgress((prevProgress) => {
          const updatedProgress = { ...prevProgress };
          delete updatedProgress[file.name];
          return updatedProgress;
        });
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    });
  }, []);

  const generateVideoThumbnail = async (file) => {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.src = URL.createObjectURL(file);
      video.crossOrigin = 'anonymous';
      video.addEventListener('loadeddata', () => {
        video.currentTime = 1;
      });
      video.addEventListener('seeked', async () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const thumbnailUrl = canvas.toDataURL('image/png');
        resolve(thumbnailUrl);
      });
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*,video/*',
  });

  return (
    <div>
      <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <div className="preview-container">
        {uploadedFiles.map((file, index) => (
          <div key={index} className="preview">
            {file.type === 'video' ? (
              <img src={file.thumbnailUrl} alt="Video thumbnail" />
            ) : (
              <img src={file.url} alt="Preview" />
            )}
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadComponent;
