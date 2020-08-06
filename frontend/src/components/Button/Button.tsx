import React from 'react'

import styles from './Button.module.css'

interface Props {
  badge?: JSX.Element
  icon?: JSX.Element
  children?: React.ReactNode
}
const Button: React.FC<Props> = ({children, icon, badge}: Props) => {
  return (
    <button className={styles.button}>
      {icon}
      {badge}
    </button>
  )
}

export default Button
