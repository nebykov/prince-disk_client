import { MdOutlineSubdirectoryArrowLeft } from 'react-icons/md'
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux'
import { popFromStack, setCurrentDir } from '../../../store/reducers/fileSlice'
import CreateFolder from '../Creating/CreateFolder'
import FileUpload from '../Creating/FileUpload'

const DiskControl = () => {
  const dispatch = useAppDispatch()
  const { stack } = useAppSelector(state => state.file)

  const backDir = () => {
    if (stack.length > 0) {
      const dirPop = String(stack.slice(-1))
      dispatch(setCurrentDir(dirPop))
      dispatch(popFromStack())
    }
  }
  return (
    <article className="diskControl">
      <MdOutlineSubdirectoryArrowLeft className={`arrow ${stack.length <= 0 ? 'disable' : ''}`} onClick={() => backDir()} />
      <div className="createPanel">
        <CreateFolder />
        <FileUpload/>
      </div>
    </article>
  )
}

export default DiskControl