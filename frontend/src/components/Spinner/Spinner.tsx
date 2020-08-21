import React from 'react'

import styles from './Spinner.module.css'

const Spinner = (className: any) => {
  return <div className={styles.spinner} aria-label="loading screen"></div>
}

export default Spinner
