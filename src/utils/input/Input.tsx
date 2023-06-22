import React from 'react'
import './input.scss'

interface InputProps {
    value: string,
    placeholder: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<InputProps> = ({value, onChange, placeholder}) => 
(
    <input 
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e)}
    />
  )

export default Input