import { useAppSelector } from '../../../hooks/useRedux'
import FileModuleItem from './FileModuleItem/FileModuleItem'

const FileModule = () => {
    const { files } = useAppSelector(state => state.file)

    return (
        <div className='fileModule'>
            {files &&
                files.map((file) => (
                    <FileModuleItem file={file} key={file._id}/>
                ))
            }
        </div>
    )
}

export default FileModule