import React from 'react'
import Header from '../Header/Header'

import cx from 'classnames'
import styles from './site-layout.module.css'

const SiteLayout: React.FC = ({ children }) => {
  return (
    <div className={cx(styles.container)}>
      <Header />
      {children}
    </div>
  )
}

export default SiteLayout
