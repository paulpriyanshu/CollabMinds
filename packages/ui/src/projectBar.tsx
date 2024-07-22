"use client"
import React, { useState } from 'react';
import Button from './button';
import ProjectComponent from './projectcomponent';
import { deleteprojects } from '../../../apps/client-app/app/api/actions/projectActions';
import { useDispatch, useSelector } from 'react-redux';
import { removeProject } from '../../../apps/client-app/app/lib/features/ProjectSlice';
import { RootState } from '../../../apps/client-app/app/lib/ProjectsStore';
import { AccessCode } from '../../../apps/client-app/app/api/actions/projectActions';
import Modal from './modal';
import ShareCode from "@repo/ui/sharecodecomponent"
interface ProjectProps {
    title: string;
}

function ProjectBar({ title }: ProjectProps) {
    const [secondModal, setSecondModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const [showAccessCode,setShowAccessCode] = useState(false);
    const [accessCode,setAccessCode]=useState("")
    const projdata = useSelector((state: RootState) => state.projects.projects);

    const handleSecondModal = () => {
        console.log("this is file ", title);
        
        setSecondModal((prev)=>!prev);
    }

    const handleDeleteProject = async () => {
        setIsLoading(prev => !prev);

        try {
            const response = await deleteprojects(title);
            dispatch(removeProject(title));
        } catch (error) {
            console.log(error);
        }

        setIsLoading(prev => !prev);
    }

    const shareProject=async()=>{
        const data=await AccessCode(title)
        setShowAccessCode((prev)=>!prev)
        setAccessCode(data)
        console.log(data)

    }
    return (
        <div>
            <div className='flex justify-center'>
                <div className={`flex justify-between text-white ${isLoading ? 'bg-slate-300' : 'bg-black'} lg:w-2/3 w-full border-2 border-slate-800 rounded-2xl p-5 m-5 lg:text-xl sm:text-sm font-mono font-bold`}>
                    <div className='mt-2'>{title}</div>
                    <div className='flex justify-end'>
                        <div className='lg:text-xl sm:text-sm  lg:p-3 p-1 rounded-xl hover:bg-slate-800'>
                            <button onClick={handleSecondModal} >AddMedia</button>
                        </div>
                        <div>
                            <button className='text-xl px-3 hover:bg-slate-800 p-3 rounded-2xl' onClick={shareProject}>Share</button>
                        </div>
                        <div className='lg:px-4 m-1 px-1'>
                            <button className='hover:bg-slate-800 px-1 p-2 rounded-2xl text-md' onClick={handleDeleteProject} disabled={isLoading}>❌</button>
                        </div>
                    </div>
                </div>
            </div>
            { secondModal && 
                <div className={`overflow-hidden transition-max-height duration-500 ${secondModal ? 'max-h-[500px]' : 'max-h-0'}`}>
                <ProjectComponent isOpen={secondModal} title={title} />
            </div>
            }
            {  showAccessCode && 
                <ShareCode isOpen={showAccessCode} title={title} code={accessCode}/>
               
            }
            
             
        </div>
    );
}

export default ProjectBar;
