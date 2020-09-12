import React from 'react'
import styles from './Button.module.css'
import cx from 'classnames'

interface Props {
  children?: React.ReactNode
  className?: string | null
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  type?: 'button' | 'submit' | 'reset' | undefined
  disabled?: boolean
  style?: React.CSSProperties | undefined
  variant?: 'ghost' | 'primary'
}
const Button = ({ variant = 'ghost', children, className, type = 'button', onClick, disabled, style }: Props) => {
  return (
    <button
      style={style}
      disabled={disabled}
      type={type}
      className={cx(className, styles.button, styles[variant])}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
