import React from 'react'
import { MdCreateNewFolder, MdDoneOutline } from 'react-icons/md'
import useInput from '../../../hooks/useInput'
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux'
import { createDir } from '../../../utils/api/fileApi'
import { addFolder } from '../../../store/reducers/fileSlice'

const FileCreating = () => {
    const [creatingForm, setCreatingForm] = React.useState(false)
    const {currentDir} = useAppSelector(state => state.file)
    const dispatch = useAppDispatch()
    const fileName = useInput('')

    const addDir = () => {
         if (fileName.value && currentDir) {
            createDir(fileName.value, currentDir).then(data => dispatch(addFolder(data)))
            fileName.onClear()
            setCreatingForm(false)
         }
    }

  return (
    <div className="diskControl__creating">
    <button className="diskControl__btn" onClick={() => setCreatingForm(true)}>
      <MdCreateNewFolder /> New Folder
    </button>
    {creatingForm &&
     <div className="creatingForm">
     <input type="text" placeholder='Enter Folder Name' value={fileName.value} onChange={fileName.onChange}/>
     <span className="done" onClick={() => addDir()}>
       <MdDoneOutline />
     </span>
   </div>
    }
  </div>
  )
}

export default FileCreating