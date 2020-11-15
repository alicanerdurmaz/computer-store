import React from 'react'
import Header from '../Header/Header'

import cx from 'classnames'
import styles from './site-layout.module.css'
import { FilterContextProvider } from 'src/context/FilterContext/FilterContext'

const SiteLayout: React.FC = ({ children }) => {
  return (
    <div className={cx(styles.container)}>
      <FilterContextProvider>
        <Header />
        {children}
      </FilterContextProvider>
    </div>
  )
}

export default SiteLayout
