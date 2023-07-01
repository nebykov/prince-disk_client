import React from 'react'
import { IFile } from '../../../../types/types'

interface FileModuleItemProps {
    file: IFile
}

const FileModuleItem: React.FC<FileModuleItemProps> = ({file}) => {
  return (
    <div>{file.name}</div>
  )
}

export default FileModuleItem