import React, { useState } from 'react'
import FileList from "./File/FileList"
import './disk.scss'
import { getFiles, uploadFile } from '../../utils/api/fileApi'
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux'
import { addFile, popFromStack, setCurrentDir, setFiles } from '../../store/reducers/fileSlice'
import { MdOutlineSubdirectoryArrowLeft } from 'react-icons/md'
import CreateFolder from './Creating/CreateFolder'
import UploadFile from './Creating/UploadFile'


const Disk = () => {
  const [dragEnter, setDragEnter] = useState(false)
  const { currentDir, folderName, stack } = useAppSelector(state => state.file)
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    getFiles(currentDir).then(data => dispatch(setFiles(data))).catch(e => alert(e))
  }, [currentDir])

  const backDir = () => {
    const dirPop = String(stack.slice(-1))
    dispatch(setCurrentDir(dirPop))
    dispatch(popFromStack())
  }

  const onDragEnter = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragEnter(true)
  }

  const onDragLeave = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragEnter(false)
  }

  const onDrop = (e: React.DragEvent<HTMLElement>) => {
    e.stopPropagation()
    e.preventDefault()
    const uploadedFiles = [...e.dataTransfer.files]
    uploadedFiles.forEach(file => uploadFile(file, currentDir)
    .then(data => dispatch(addFile(data)))
    .then(() => setDragEnter(false))
    .catch(e => alert(e.response.data.message)))
  }

  return (
    <>
      {!dragEnter ?
        <section className="diskPage" onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDragOver={onDragEnter}>
          <h1 className="diskPage__title" key={folderName}>{folderName || 'Folder'}</h1>
          <article className="diskControl">
            {stack.length > 0 && <MdOutlineSubdirectoryArrowLeft className="arrow" onClick={() => backDir()} />}
            <div className="createPanel">
              <CreateFolder />
              <UploadFile />
            </div>
          </article>
          <FileList />
        </section>
        :
        <div className='dragSection' onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDrop={onDrop} onDragOver={onDragEnter}>Drag And Drop Your Files</div>
      }
    </>
  )
}

export default Disk