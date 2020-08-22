import React from 'react'
import Header from '../Header/Header'

import cx from 'classnames'
import styles from './site-layout.module.css'
import { FilterProvider } from '../../context/FilterContext/FilterContext'

import { useRouter } from 'next/dist/client/router'

const SiteLayout: React.FC = ({ children }) => {
  const router = useRouter()

  return (
    <FilterProvider query={router.query}>
      <div className={cx(styles.container)}>
        <Header />
        {children}
      </div>
    </FilterProvider>
  )
}

export default SiteLayout
