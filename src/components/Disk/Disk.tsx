import React from 'react'
import FileList from "./File/FileList"
import './disk.scss'
import { getFiles } from '../../utils/api/fileApi'
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux'
import { setFiles } from '../../store/reducers/fileSlice'
import { MdOutlineSubdirectoryArrowLeft } from 'react-icons/md'
import FileCreating from './Creating/FileCreating'


const Disk = () => {
  const { currentDir, folderName } = useAppSelector(state => state.file)
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    getFiles(currentDir || '').then(data => dispatch(setFiles(data))).catch(e => alert(e))
  }, [currentDir])


  return (
    <section className="diskPage">
      <h1 className="diskPage__title" key={folderName}>{folderName || 'Folder'}</h1>
      {currentDir &&
        <article className="diskControl">
          <MdOutlineSubdirectoryArrowLeft className="arrow" />
          <FileCreating />
        </article>
      }
      <FileList />
    </section>
  )
}

export default Disk