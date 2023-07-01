import axios from "axios"
import { IFile, IUploadFile } from "../../types/types"
import { AppDispatch } from '../../store';
import { addFile, setFiles } from "../../store/reducers/fileSlice";
import { addUploadFile, changeUploadFile, showUploader } from "../../store/reducers/uploadSlice";



export const getFiles = (dirId: string, sortBy: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            let url = 'http://localhost:5000/file';
            if (sortBy) {
               url = `http://localhost:5000/file?sort=${sortBy}` 
            } 
            if (dirId) {
                url = `http://localhost:5000/file?parent=${dirId}`
            }
            if (dirId && sortBy) {
                url = `http://localhost:5000/file?parent=${dirId}&sort=${sortBy}`
            }
            console.log(url)
            const { data } = await axios.get(url, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
            return dispatch(setFiles(data))
        } catch (e) {
            throw e
        }
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


export const uploadFile = (file: File, dirId: string) => {
      return async (dispatch: AppDispatch) => {
        try {
            const formData = new FormData()
            formData.append('file', file);
            if (dirId) {
                formData.append('parent', dirId)
            }

            const fileObject: IUploadFile = {id: Date.now(), name: file.name , progress: 0}
            dispatch(addUploadFile(fileObject))
            dispatch(showUploader())
            const { data } = await axios.post('http://localhost:5000/file/upload', 
            formData, 
            {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
            onUploadProgress: (progresEvent) => {
                if (progresEvent.total) {
                    const loadProgress = Math.round((progresEvent.loaded / progresEvent?.total) * 100)
                    const progressObject = {...fileObject, progress: loadProgress}
                    dispatch(changeUploadFile(progressObject))
                }
            }
        })

            dispatch(addFile(data))
        } catch (e) {
            throw e
        }
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
    }).catch(e => {
        throw e
    })
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


export const searchFiles = (query: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            const {data} = await axios.get(`http://localhost:5000/file/search?query=${query}`, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
            dispatch(setFiles(data))
       } catch (e) {
          throw e
       }
    }
}