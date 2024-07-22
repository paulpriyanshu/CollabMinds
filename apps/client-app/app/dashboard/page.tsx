"use client";

import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../lib/ProjectsStore';
import { fetchProjects } from '../api/actions/projectActions';
import { useSession } from 'next-auth/react';
import { setProject } from '../lib/features/ProjectSlice';
import dynamic from 'next/dynamic';

// Dynamically import components with React.Suspense fallback
const Dashboard = dynamic(() => import('@repo/ui/dashboard'), { ssr: false });
const ProjectLabel = dynamic(() => import('@repo/ui/projectlabelling'), { ssr: false });
const ProjectBar = dynamic(() => import('@repo/ui/projectBar'), { ssr: false });

function Page() {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const projdata = useSelector((state: RootState) => state.projects.projects);

  const handlefetch = useCallback(async () => {
    if (session?.user?.email) {
      try {
        const email = session.user.email;
        const response = await fetchProjects(email);
        const projectsWithSerializedDates = response?.map(project => ({
          ...project,
          id: project.id.toString(),
          createdAt: new Date(project.createdAt).toISOString(),
        }));
        await dispatch(setProject(projectsWithSerializedDates));
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    }
  }, [session, dispatch]);

  useEffect(() => {
    if (status === 'authenticated') {
      handlefetch();
    }
  }, [status, handlefetch]);

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Dashboard />
      <div className='flex justify-end m-5 mr-10'>
        <ProjectLabel />
      </div>
      <div className='flex justify-center'>
        <h1 className='text-white text-4xl font-extrabold'>Projects</h1>
      </div>
      <div className='flex flex-col items-center'>
        {projdata.length > 0 ? (
          projdata.map((project) => (
            <div key={project.id} className='w-full'>
              <ProjectBar title={project.title} />
            </div>
          ))
        ) : (
          <p className='text-white'>No projects found</p>
        )}
      </div>
    </React.Suspense>
  );
}

export default React.memo(Page);
