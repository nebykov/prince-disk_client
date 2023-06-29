import React from 'react'
import { motion as mf } from 'framer-motion'
import { IUploadFile } from '../../../types/types'


interface UploaderFileProps {
    file: IUploadFile
}

const UploaderFile: React.FC<UploaderFileProps> = ({file}) => {
    return (
        <div className='uploader__file'>
            <div className='fileDescription'>
            <span className='name'>{file.name.substring(0, 10)}</span>
            <span>{file.progress}%</span>
            </div>
            <div className="progress-bar">
                <mf.div
                    className="progress-bar__fill"
                    initial={{ width: '0%' }}
                    animate={{ width: `${file.progress}%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>
        </div>
    )
}

export default UploaderFile