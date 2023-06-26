import React from 'react';
import FileList from "./FileList/FileList";
import DiskControl from './DiskControl/DiskControl';
import { getFiles, uploadFile } from '../../utils/api/fileApi';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { addFile, setFiles } from '../../store/reducers/fileSlice';
import './disk.scss';
import Uploader from './Uploader/Uploader';


const Disk = () => {
  const [dragEnter, setDragEnter] = React.useState(false)
  const { currentDir, folderName } = useAppSelector(state => state.file)
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    getFiles(currentDir).then(data => dispatch(setFiles(data))).catch(e => alert(e))
  }, [currentDir])

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
    uploadedFiles.forEach(file => uploadFile(file, currentDir, () => { })
      .then(data => dispatch(addFile(data)))
      .then(() => setDragEnter(false))
      .catch(e => alert(e.response.data.message)))
  }

  return (
    <>
      {!dragEnter ?
        <section className="diskPage" onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDragOver={onDragEnter}>
          <h1 className="diskPage__title" key={folderName}>{folderName || 'Folder'}</h1>
          <DiskControl />
          <FileList />
          <Uploader/>
        </section>
        :
        <div className='dragSection' onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDrop={onDrop} onDragOver={onDragEnter}>Drag And Drop Your Files</div>
      }
    </>
  )
}

export default Disk