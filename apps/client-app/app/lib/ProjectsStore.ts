import { configureStore } from "@reduxjs/toolkit"
import projectReducer from "./features/ProjectSlice"


export const ProjectsStore=() => {
    return configureStore({
        reducer:{
            projects:projectReducer
        }
    })
}


// Infer the type of makeStore
export type AppStore = ReturnType<typeof ProjectsStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']