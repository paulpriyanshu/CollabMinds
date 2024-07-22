import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { Project } from '../../api/actions/projectActions';

interface ProjectState extends Project {
  id: string; // Change to `string` if `nanoid()` returns a string
}

interface ProjectsState {
  projects: ProjectState[];
}

const initialState: ProjectsState = {
  projects: [],
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    createProject: (state, action: PayloadAction<Omit<ProjectState, 'id'>>) => {
      const projectData: ProjectState = {
        id: nanoid(),
        ...action.payload,
      };
      state.projects.push(projectData);
    },
    removeProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter(project => project.title !== action.payload);
    },
    setProject: (state, action: PayloadAction<ProjectState[]>) => {
      state.projects = action.payload;
    }
  },
});

export const { createProject, setProject, removeProject } = projectSlice.actions;
export type { Project, ProjectState };
export default projectSlice.reducer;
