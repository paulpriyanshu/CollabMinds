import { createSlice,nanoid,PayloadAction } from '@reduxjs/toolkit';
// import { createProject, fetchProjects } from '../../api/actions/projectActions';
import { Project } from '../../api/actions/projectActions';


// interface ProjectState {
//   projects: Project[];
// }
interface ProjectState extends Project {
  id: string;
}

const initialState= {
  projects: [],
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    createproject: (state,action:PayloadAction<ProjectState>)=> {
      const projectData={
        id:nanoid(),
        title:action.payload.title,
        userEmail:action.payload.userEmail
      }
      state.projects.push(projectData);

    },
    removeProject:(state,action:PayloadAction<String>)=>{
   
      state.projects=state.projects.filter((project)=>project.title !== action.payload)
    },
    setProject:(state,action)=>{
      state.projects=action.payload
    }

  },
});

export const { createproject,setProject,removeProject} = projectSlice.actions
export type { Project}
export default projectSlice.reducer
