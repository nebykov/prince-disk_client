import React from 'react'
import { MdOutlineDownloadDone, MdOutlineFileUpload } from 'react-icons/md'
import { uploadFile } from '../../../utils/api/fileApi'
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux'
import { addFile } from '../../../store/reducers/fileSlice'


const UploadFile = () => {
  const [file, setFile] = React.useState<File[] | null>(null)
  const [errorMessage, setErrorMessage] = React.useState('')
  const {currentDir} = useAppSelector(state => state.file)
  const [uploadProgress, setUploadProgress] = React.useState(0)
  const [fileLoading, setFileLoading] = React.useState(false)
  const dispatch = useAppDispatch()
  const ref = React.useRef<HTMLInputElement>(null)


  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploadFiles = Array.from(e.target.files)
      setFile(prevState => {
        if (prevState === null) {
            return uploadFiles;
        } else {
         return [...prevState, ...uploadFiles]
        }
      })
    }
  }

  const onError = (e: React.MouseEvent<HTMLButtonElement>) => {
         e.stopPropagation()
         setErrorMessage('')
         setFile(null)
  }

  const onUpload = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (file) {
      setFileLoading(true)
      file.forEach((file) => uploadFile(file, currentDir, setUploadProgress)
      .then(data => dispatch(addFile(data)))
      .then(() => setFile(null)).then(() => {
        setUploadProgress(0)
        setFileLoading(false)
      })
      .catch(e => setErrorMessage(e.response.data.message))) 
    }
  }

  return (
    <div onClick={() => ref.current?.click()}>
      <input type="file" ref={ref} style={{ display: 'none' }} onChange={onChange} multiple={true}/>
      {!file ?
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
        <button className='diskControl__btn active' onClick={onUpload} title='norm' >Loading {uploadProgress}%</button>
        :
        <button className='diskControl__btn active' onClick={onUpload} title='norm' ><MdOutlineDownloadDone /> Click to Upload ({file.length})</button>
      }
    </div>
  )
}

export default UploadFile