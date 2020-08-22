import React from 'react'

import cx from 'classnames'
import styles from './logo.module.css'
import Link from 'next/link'

interface Props {
  className?: string
}
const Logo: React.FC<Props> = ({ className }: Props) => {
  return (
    <Link href="/">
      <a className={cx(styles.logo, className)}>Computer&nbsp;Store</a>
    </Link>
  )
}

export default Logo
