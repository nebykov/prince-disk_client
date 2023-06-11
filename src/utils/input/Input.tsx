import React from 'react'
import './input.scss'

interface InputProps {
    value: string,
    placeholder: string,
    onChange: Function,
}

const Input: React.FC<InputProps> = ({value, onChange, placeholder}) => 
(
    <input 
    placeholder={placeholder}
    value={value}
    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
    />
  )

export default Input