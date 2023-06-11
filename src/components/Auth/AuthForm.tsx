import Input from '../../utils/input/Input'
import './authform.scss'

const AuthForm = () => {
    return (
        <article className="authform">
            <h3>Authorization</h3>
            <Input onChange={() => {}} placeholder='Норм' value='Валюэ'/>
        </article>
    )
}

export default AuthForm