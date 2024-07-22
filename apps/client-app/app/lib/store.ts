import { configureStore } from '@reduxjs/toolkit'
import channelSlice from './features/ChannelDetailsSlice'


export const makeStore = () => {
  return configureStore({
    reducer: {
        channel:channelSlice.reducer
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']