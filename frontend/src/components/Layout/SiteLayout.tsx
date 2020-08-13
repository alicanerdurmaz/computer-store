import React from 'react'
import Header from '../Header/Header'

import cx from 'classnames'
import styles from './site-layout.module.css'
import { FilterProvider } from '../../context/FilterContext/FilterContext'

const SiteLayout: React.FC = ({ children }) => {
  return (
    <FilterProvider>
      <div className={cx(styles.container)}>
        <Header />
        {children}
      </div>
    </FilterProvider>
  )
}

export default SiteLayout
