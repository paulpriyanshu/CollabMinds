"use client";
 
import { UploadButton } from "../utils/uploadthing";
import React from "react";
import UploadComponent from "@repo/ui/imgupload"
import { UploadDropzone } from "@uploadthing/react";
import { generateUploadDropzone } from "@uploadthing/react";
import Dashboard from "@repo/ui/dashboard";
import { OurFileRouter } from "../api/uploadthing/core";

 
export default function Home() {
    const [ready, setReady] = React.useState(true);
    const [isUploading, setIsUploading] = React.useState(false);
  
  return (
    <>
    <Dashboard/>
       </>
  );
}