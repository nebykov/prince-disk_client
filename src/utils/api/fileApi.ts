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


export const uploadFile = async (file: File, dirId: string, onProgress: Function): Promise<IFile> => {
    try {
        const formData = new FormData()
        if (dirId) {
            formData.append('parent', dirId)
        }
        formData.append('file', file)
        const { data } = await axios.post('http://localhost:5000/file/upload', 
        formData, 
        {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
        onUploadProgress: (progresEvent) => {
            if (progresEvent.total) {
                const progress = Math.round((progresEvent.loaded / progresEvent?.total) * 100)
                onProgress(progress)
            }
        }})
        return data
    } catch (e) {
        throw e
    }
}


export const downloadFile = async (file: IFile) => {
    await axios.get(`http://localhost:5000/file/download/${file._id}`, 
    {responseType: 'blob', headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
    .then((res) => {
     const url = window.URL.createObjectURL(new Blob([res.data]));
     const link = document.createElement('a');
     link.href = url
     link.setAttribute('download', file.name)
     document.body.appendChild(link)
     link.click()
    }).catch(e => console.log(e))
}


export const deleteFile = async (file: IFile)=> {
  try {
    const {data} = await axios.delete(`http://localhost:5000/file/delete/${file._id}`, 
    {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
    return data
  } catch(e) {
    throw e
  }
}