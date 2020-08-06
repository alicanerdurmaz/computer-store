import React from 'react'

import cx from 'classnames'
import styles from './logo.module.css'

interface Props {
  className?: string
}
const Logo: React.FC<Props> = ({ className }: Props) => {
  return <h1 className={cx(styles.logo, className)}>Computer&nbsp;Store</h1>
}

export default Logo
