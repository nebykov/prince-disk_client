import React from 'react'
import Input from '../../utils/input/Input'
import './authform.scss'

interface AuthFormProps {
    title: string,
    buttonTitle: string
}

const AuthForm: React.FC<AuthFormProps> = ({title, buttonTitle}) => {
    return (
        <article className="authform">
            <h3>{title}</h3>
            <Input onChange={() => {}} placeholder='Норм' value=''/>
            <Input onChange={() => {}} placeholder='Норм' value='Валюэ'/>
            <button className='authform__btn'>{buttonTitle}</button>
        </article>
    )
}

export default AuthForm