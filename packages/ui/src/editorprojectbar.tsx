"use client";
import React, { useEffect, useState } from 'react';
import Modal from './modal';
import { fetchclientname, fetchprojectdata } from "../../../apps/editor-app/app/api/actions/editorActions";
import { fetchFileData } from '../../../apps/editor-app/app/api/download/download';
import {download} from '../../actions/src/download'
interface ProjectProps {
  title: string;
  useremail: string;
}

type Data = {
  id: number;
  userEmail: string;
  editorEmail: string | null;
  title: string;
  videoName: string[];
  thumbnailUrl: string[];
  accessCode: string | null;
  createdAt: Date;
  updatedAt: Date | null;
};

function EditorProjectBar({ title, useremail }: ProjectProps) {
  const [viewdata, setviewdata] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setdata] = useState<Data | null>(null);
  const [clientname, setclientname] = useState("");
  const [progress, setProgress] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(false);

  const handleDeleteProject = () => {
    // Handle project deletion
  };

  const viewMedia = async () => {
    setviewdata((prev) => !prev);
    if (title) {
      const proj = await fetchprojectdata(title);
      const info = localStorage.getItem('data');
      if (info) {
        const projdata = JSON.parse(info);
        const project = projdata.find((p: Data) => p.title === title);
        if (project) {
          setdata(project);
        }
      }
    }
  };

  const clientName = async () => {
    const name = await fetchclientname(useremail || "");
    if (name) {
      setclientname(name?.name);
    }
  };
  const handleClick = async () => {
    setLoading(true);
    setProgress({});
    const array = data?.videoName;
    await download(array,setProgress)
    setLoading(false);
  };

  useEffect(() => {
    clientName();
  }, [data]);

  useEffect(() => {
    clientName();
  }, []);

  return (
    <div>
      <div className='flex justify-center'>
        <div className={`flex justify-between text-white ${isLoading ? 'bg-slate-300' : 'bg-black'} lg:w-full w-full border-2 border-slate-800 rounded-2xl p-5 m-5 lg:text-xl sm:text-sm font-mono font-bold`}>
          <div className='mt-3'>{title}-{clientname}</div>
          <div className='flex justify-end'>
            <div>
              <button onClick={viewMedia} className='border-2 border-slate-800 p-2 px-5 rounded-2xl text-md'>View</button>
            </div>
            <div className='lg:px-4 px-1 mt-3'>
              <button className='hover:bg-slate-600 px-2 rounded-2xl text-md' onClick={handleDeleteProject} disabled={isLoading}>❌</button>
            </div>
          </div>
        </div>
      </div>
      {viewdata && (
        <Modal isOpen={viewMedia}>
          <div className='flex flex-cols'>
            <div>
              <div className='flex justify-end m-2'>
                <button onClick={() => setviewdata(false)} className="bg-transparent border-none text-4xl text-white hover:font-extrabold">
                  &times;
                </button>
              </div>
              <div>
                <div className="flex h-1/3 w-full flex-col items-center rounded-3xl justify-between border-4 border-slate-800 shadow-2xl p-16 bg-black">
                  <div>
                    <div className='text-4xl font-extrabold mb-5'>
                      {clientname}
                    </div>
                    {data && data.videoName.map((filename) => (
                      <div key={filename} className='text-lg font-bold'>
                        <div>{filename}</div>
                        {loading && progress[filename] !== undefined && (
                          <div>
                            <div style={{ marginTop: '10px' }}>
                              <div style={{ width: '100%', backgroundColor: '#e0e0e0', height: '10px' }}>
                                <div style={{ width: `${progress[filename]}%`, backgroundColor: '#76c7c0', height: '100%' }} />
                              </div>
                              <div>{Math.round(progress[filename])}%</div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <button onClick={handleClick} className='p-2 w-full m-3 mt-10 hover:bg-slate-600 bg-slate-800 w-2/3 rounded-2xl text-2xl font-semibold'>
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default EditorProjectBar;
