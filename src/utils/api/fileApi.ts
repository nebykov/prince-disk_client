import axios from "axios"
import { IFile } from "../../types/types"



export const getFiles = async (dirId: string): Promise<IFile[]> => {
    try {
        const { data } = await axios.get(`http://localhost:5000/file${dirId ? `?parent=${dirId}` : ''}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
        return data
    } catch (e) {
        throw e
    }
}

export const createDir = async (name: string, dirId: string): Promise<IFile> => {
    try {
        const { data } = await axios.post('http://localhost:5000/file/create', {name, parent: dirId}, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
        return data
    } catch (e) {
        throw e
    }
}


export const uploadFile = async (file: File, dirId: string): Promise<IFile> => {
    try {
        const formData = new FormData()
        if (dirId) {
            formData.append('parent', dirId)
        }
        formData.append('file', file)
        const { data } = await axios.post('http://localhost:5000/file/upload', formData, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
        return data
    } catch (e) {
        throw e
    }
}