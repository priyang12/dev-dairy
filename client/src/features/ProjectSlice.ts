import { createSlice } from '@reduxjs/toolkit';
import type { IProject, ProjectState } from '../interface';

const initialState: ProjectState = {
  projects: [],
  project: null,
  error: null,
  alert: null,
};

const ProjectSlice = createSlice({
  name: 'ProjectSlice',
  initialState,
  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
    deleteProject: (state, action) => {
      state.projects = state.projects.filter(
        (project: IProject) => project._id !== action.payload,
      );
    },
    setProject: (state, action) => {
      state.project = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setAlert: (state, action) => {
      state.alert = action.payload;
    },
  },
});

export const { setError, setAlert, deleteProject, setProject, setProjects } =
  ProjectSlice.actions;

export default ProjectSlice.reducer;
