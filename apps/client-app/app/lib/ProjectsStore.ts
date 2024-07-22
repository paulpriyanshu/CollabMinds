import { configureStore } from "@reduxjs/toolkit"
import projectReducer from "./features/ProjectSlice"


export const ProjectsStore=() => {
    return configureStore({
        reducer:{
            projects:projectReducer
        }
    })
}



export type AppStore = ReturnType<typeof ProjectsStore>

export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']