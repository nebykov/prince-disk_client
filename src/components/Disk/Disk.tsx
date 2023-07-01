import React from 'react';
import FileList from "./FileList/FileList";
import DiskControl from './DiskControl/DiskControl';
import { getFiles, uploadFile } from '../../utils/api/fileApi';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import './disk.scss';
import Uploader from './Uploader/Uploader';
import { hideCreateFolder } from '../../store/reducers/appSlice';
import FileModule from './FileModuleView/FileModuleView';


const Disk = () => {
  const [dragEnter, setDragEnter] = React.useState(false)
  const { currentDir, folderName } = useAppSelector(state => state.file)
  const { sortBy } = useAppSelector(state => state.app)
  const { isCreateFolder } = useAppSelector(state => state.app)
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    dispatch(getFiles(currentDir, sortBy))
  }, [currentDir, sortBy])

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
    const uploadedFiles = Array.from(e.dataTransfer.files)
    uploadedFiles.forEach(file => dispatch(uploadFile(file, currentDir))
      .then(() => setDragEnter(false))
      .catch(e => alert(e.response.data.message))
    )
  }

  const onHideCreating = () => {
    if (isCreateFolder) {
      dispatch(hideCreateFolder())
    }
  }

  return (
    <>
      {!dragEnter ?
        <section
          className="diskPage"
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDragOver={onDragEnter}
          onClick={onHideCreating}
        >
          <h1 className="diskPage__title" key={folderName}>{folderName || 'Folder'}</h1>
          <DiskControl />
          {/* <FileList /> */}
          <FileModule/>
          <Uploader />
        </section>
        :
        <div className='dragSection' onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDrop={onDrop} onDragOver={onDragEnter}>Drag And Drop Your Files</div>
      }
    </>
  )
}

export default Disk