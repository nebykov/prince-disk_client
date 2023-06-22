import { MdFolder } from "react-icons/md";
import { IFile } from "../../../types/types";
import React from "react";
import { useAppDispatch } from "../../../hooks/useRedux";
import { setCurrentDir, setFolderName } from "../../../store/reducers/fileSlice";

interface FileProps {
  file: IFile,
  count: number
}

const File: React.FC<FileProps> = ({file, count}) => {
  const dispatch = useAppDispatch()

  const setDir = () => {
    dispatch(setCurrentDir(file._id))
    dispatch(setFolderName(file.name))
  }

  return (
    <div className="fileList__item" onClick={() => setDir()}>
        <div className="fileName">
          <span>{count}</span>
          <MdFolder />
          <span className="name">{file.name || 'folder'}</span>
        </div>
      <span className="date">{file.date.slice(0,10)}</span>
      <span className="size">{file.size}</span>
    </div>
  )
}

export default File