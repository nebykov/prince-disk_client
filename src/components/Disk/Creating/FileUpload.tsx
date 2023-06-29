import React from 'react'
import { MdOutlineDownloadDone, MdOutlineFileUpload } from 'react-icons/md'
import { uploadFile } from '../../../utils/api/fileApi'
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux'
import { addUploadFile } from '../../../store/reducers/uploadSlice'
import { IUploadFile } from '../../../types/types'


const FileUpload = () => {
  const [files, setFiles] = React.useState<File[] | null>(null)
  const [errorMessage, setErrorMessage] = React.useState('')
  const [uploadProgress, setUploadProgress] = React.useState(0)
  const [fileLoading, setFileLoading] = React.useState(false)
  const {currentDir} = useAppSelector(state => state.file)
  const dispatch = useAppDispatch()
  const ref = React.useRef<HTMLInputElement>(null)


  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploadFiles = Array.from(e.target.files);
      uploadFiles.map(file => {
        dispatch(uploadFile(file, currentDir))
      })
    }
  }

  const onError = (e: React.MouseEvent<HTMLButtonElement>) => {
         e.stopPropagation()
         setErrorMessage('')
         setFiles(null)
  }

  // const onUpload = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.stopPropagation()
  //   if (files) {
  //     setFileLoading(true)
  //     files.forEach((file) => uploadFile(file, currentDir, setUploadProgress)
  //     .then(data => dispatch(addFile(data)))
  //     .then(() => setFiles(null)).then(() => {
  //       setUploadProgress(0)
  //       setFileLoading(false)
  //     })
  //     .catch(e => setErrorMessage(e.response.data.message))) 
  //   }
  // }

  return (
    <div onClick={() => ref.current?.click()}>
      <input type="file" ref={ref} style={{ display: 'none' }} onChange={onChange} multiple={true}/>
      {!files ?
        <button className='diskControl__btn'><MdOutlineFileUpload /> Add your File</button>
        :
        errorMessage 
        ? 
        <div className="errorBlock">
          <span className='errorBlock__title'>{errorMessage}</span>
          <button className='diskControl__btn error' onClick={onError}>Error!</button>
        </div>
        :
        fileLoading?
        <button className='diskControl__btn active'  title='norm' >Loading {uploadProgress}%</button>
        :
        <button className='diskControl__btn active'  title='norm' ><MdOutlineDownloadDone /> Click to Upload ({files.length})</button>
      }
    </div>
  )
}

export default FileUpload