import { useAppSelector } from "../../../hooks/useRedux"
import File from "./File"
import './file.scss'


const FileList = () => {
  const {files} = useAppSelector(state => state.file)
  return (
    <div className="fileList">
      <div className="fileList__header">
        <span>#</span>
        <span className="name">file name</span>
        <span className="date">date</span>
        <span className="size">size</span>
      </div>
        {files &&
         files.map((file, id) => (
          <File key={file._id} file={file} count={id+1}/>
         ))
        }
    </div>
  )
}

export default FileList