import React from 'react'

import cx from 'classnames'
import styles from './Spinner.module.css'

interface Props {
  className?: string
}

const Spinner = ({ className }: Props) => {
  return <div className={cx(styles.spinner, className)} aria-label="loading screen"></div>
}

export default Spinner
