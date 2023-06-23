import React from 'react'
import Input from '../../utils/input/Input'
import './authform.scss'
import useInput from '../../hooks/useInput'
import { login, registration } from '../../utils/api/userApi'
import { useAppDispatch } from '../../hooks/useRedux'
import { setUser } from '../../store/reducers/userSlice'

interface AuthFormProps {
    title: string,
    buttonTitle: string,
    isLogin?: boolean
}

const AuthForm: React.FC<AuthFormProps> = ({title, buttonTitle, isLogin}) => {
    const email = useInput('')
    const password = useInput('')
    const dispatch = useAppDispatch()

    const authHandler = () => {
        if (isLogin) {
            login(email.value, password.value).then((data) => dispatch(setUser(data.user))).catch(e => alert(e.response.data.message))
        } else {
            registration(email.value, password.value).then((data) => dispatch(setUser(data.user)))
        }
    }
    return (
        <article className="authform">
            <h3>{title}</h3>
            <Input onChange={email.onChange} placeholder='Enter your email' value={email.value}/>
            <Input onChange={password.onChange} placeholder='Enter your password' value={password.value}/>
            <button className='authform__btn' onClick={() => authHandler()}>{buttonTitle}</button>
        </article>
    )
}

export default AuthForm