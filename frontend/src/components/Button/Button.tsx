import React from 'react'
import cx from 'classnames'

import styles from './Button.module.css'

interface Props {
  text?: string
  bgColor?: string
  badge?: JSX.Element
  icon?: JSX.Element
  children?: React.ReactNode
}
const Button: React.FC<Props> = ({
  icon,
  badge,
  bgColor = 'bg-primary',
  text,
}: Props) => {
  return (
    <button className={cx(styles.button, styles[bgColor])}>
      <span className={styles.icon}>{icon}</span>
      {badge}
      {text ? (
        <span className={styles.text}>
          <span>Hello,</span>
          <br></br>
          {text}
        </span>
      ) : null}
    </button>
  )
}

export default Button
