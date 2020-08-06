import React from 'react'
import cx from 'classnames'

import styles from './Button.module.css'

interface Props {
  bgColor?: string
  badge?: JSX.Element
  icon?: JSX.Element
  children?: React.ReactNode
}
const Button: React.FC<Props> = ({
  children,
  icon,
  badge,
  bgColor = 'bg-primary',
}: Props) => {
  return (
    <button className={cx(styles.button, styles[bgColor])}>
      {icon}
      {badge}
    </button>
  )
}

export default Button
