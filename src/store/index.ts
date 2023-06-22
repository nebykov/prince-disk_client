import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice";
import fileSlice from "./reducers/fileSlice";




export const store = configureStore({
    reducer: {
        user: userSlice,
        file: fileSlice
    }
})



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch