import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IFile } from "../../types/types";


interface FileState {
    files: IFile[] | null,
    currentDir: string | null,
    folderName: string | null
}

const initialState: FileState = {
    files: [],
    currentDir: null,
    folderName: null
}

export const fileSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {
        setFiles: (state, action: PayloadAction<IFile[]>) => {
            state.files = action.payload
        },
         addFolder: (state, action: PayloadAction<IFile>) => {
              state.files?.push(action.payload)
         },
        setCurrentDir: (state, action: PayloadAction<string>) => {
            state.currentDir = action.payload
        },
        setFolderName: (state, action: PayloadAction<string>) => {
             state.folderName = action.payload
        }
    }
})

export const { setFiles, setCurrentDir, setFolderName, addFolder } = fileSlice.actions

export default fileSlice.reducer