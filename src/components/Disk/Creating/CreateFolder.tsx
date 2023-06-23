import React from 'react'
import { MdCreateNewFolder, MdDoneOutline } from 'react-icons/md'
import useInput from '../../../hooks/useInput'
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux'
import { createDir } from '../../../utils/api/fileApi'
import { addFile } from '../../../store/reducers/fileSlice'

const CreateFolder = () => {
    const [creatingForm, setCreatingForm] = React.useState(false)
    const {currentDir} = useAppSelector(state => state.file)
    const dispatch = useAppDispatch()
    const folder = useInput('')

    const addDir = () => {
         if (folder.value && currentDir) {
            createDir(folder.value, currentDir).then(data => dispatch(addFile(data)))
            folder.onClear()
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
     <input type="text" placeholder='Enter Folder Name' value={folder.value} onChange={folder.onChange}/>
     <span className="done" onClick={() => addDir()}>
       <MdDoneOutline />
     </span>
   </div>
    }
  </div>
  )
}

export default CreateFolder