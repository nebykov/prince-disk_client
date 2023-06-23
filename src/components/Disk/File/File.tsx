import { MdFileCopy, MdFolder } from "react-icons/md";
import { IFile } from "../../../types/types";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux";
import { pushToStack, setCurrentDir, setFolderName } from "../../../store/reducers/fileSlice";

interface FileProps {
  file: IFile,
  count: number
}

const File: React.FC<FileProps> = ({ file, count }) => {
  const { currentDir, stack } = useAppSelector(state => state.file)
  const dispatch = useAppDispatch()

  const setDir = () => {
    dispatch(setCurrentDir(file._id))
    dispatch(setFolderName(file.name))
    dispatch(pushToStack(currentDir))
  }

  return (
    <div className="fileList__item" onClick={file.type === 'dir' ? () => setDir() : () => { }}>
      <div className="fileName">
        <span>{count}</span>
        {file.type === 'dir' ? <MdFolder /> : <MdFileCopy />}
        <span className="name">{file.name.slice(0, 20) || 'folder'}</span>
      </div>
      <span className="date">{file.date.slice(0, 10)}</span>
      <span className="size">{file.size}</span>
    </div>
  )
}

export default File