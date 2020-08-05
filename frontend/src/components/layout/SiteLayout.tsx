import React from 'react'

import cx from 'classnames'
import styles from './site-layout.module.css'

const SiteLayout: React.FC = ({children}) => {
  return <div className={cx(styles.container)}>{children}</div>
}

export default SiteLayout
