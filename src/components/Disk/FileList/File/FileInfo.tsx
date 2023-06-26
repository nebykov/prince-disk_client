import React from 'react'
import { IFile } from '../../../../types/types'
import { MdFileCopy, MdFolder } from 'react-icons/md'
import sizeFormat from '../../../../utils/sizeFormat'

interface FileInfoProps {
    count: number,
    file: IFile
}

const FileInfo: React.FC<FileInfoProps> = ({ count, file }) => {
    return (
        <>
            <div className="fileName">
                <span>{count}</span>
                {file.type === 'dir' ? <MdFolder /> : <MdFileCopy />}
                <span className="name">{file.name.slice(0, 20) || 'folder'}</span>
            </div>
            <span className={`date ${file.type !== 'dir' && 'dateHover'}`}>{file.date.slice(0, 10)}</span>
            {file.type !== 'dir' && <span className="size">{sizeFormat(file.size)}</span>}
        </>
    )
}

export default FileInfo