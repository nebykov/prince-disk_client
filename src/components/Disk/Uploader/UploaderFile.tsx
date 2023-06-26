import React from 'react'
import { motion as mf } from 'framer-motion'

const UploaderFile: React.FC = () => {
    return (
        <div className='uploader__file'>
            <div className='fileDescription'>
            <span className='name'>File Name</span>
            <span>98%</span>
            </div>
            <div className="progress-bar">
                <mf.div
                    className="progress-bar__fill"
                    initial={{ width: '0%' }}
                    animate={{ width: `70%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>
        </div>
    )
}

export default UploaderFile