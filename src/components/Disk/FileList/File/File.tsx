import React from "react";
import FileInfo from "./FileInfo";
import FileControl from "./FileControl";
import { IFile } from "../../../../types/types";
import { useAppDispatch, useAppSelector } from "../../../../hooks/useRedux";
import { pushToStack, setCurrentDir, setFolderName } from "../../../../store/reducers/fileSlice";
import { motion as mf } from "framer-motion";
import './file.scss'

interface FileProps {
  file: IFile,
  count: number
}

const File: React.FC<FileProps> = ({ file, count }) => {
  const { currentDir } = useAppSelector(state => state.file)
  const dispatch = useAppDispatch()

  const setDir = () => {
    dispatch(setCurrentDir(file._id))
    dispatch(setFolderName(file.name))
    dispatch(pushToStack(currentDir))
  }


  return (
    <mf.div className="fileItem" 
    onClick={file.type === 'dir' ? () => setDir() : () => { }} 
    initial={{opacity: 0, y: 50}} 
    animate={{opacity: 1, y: 0}} 
    transition={{duration: 0.1}}
    whileHover={{scale: 1.01}}
    >
      <FileInfo count={count} file={file} />
      <FileControl file={file} />
    </mf.div>
  )
}

export default File