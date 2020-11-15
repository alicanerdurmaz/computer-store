import React, { useState, useEffect } from 'react'
import styles from './index.module.css'
import cx from 'classnames'
import SidebarSkeleton from 'src/components/Sidebar/SidebarSkeleton'
import Sidebar from 'src/components/Sidebar/Sidebar'
import ProductListHeader from 'src/components/ProductListHeader/ProductListHeader'
import CardList from 'src/components/Card/CardList'
import { BASE_URL } from 'src/utils/api'

const Home = () => {
  const [sidebar, setSideBar] = useState(false)
  const [filters, setFilters] = useState(null)

  useEffect(() => {
    const getFilters = async () => {
      try {
        const res = await fetch(`${BASE_URL}/product/filters`)
        const data = await res.json()
        setFilters(data)
      } catch (error) {}
    }
    getFilters()
  }, [])
  return (
    <>
      <button className={styles.btn_set_sidebar} onClick={() => setSideBar(!sidebar)}>
        Filters
      </button>
      <div className={styles.body}>
        {sidebar && (
          <div
            className={styles.sidebar_background}
            onClick={() => {
              setSideBar(false)
            }}
          ></div>
        )}
        <div className={cx(styles.sidebar, sidebar ? styles.sidebar_open : null)}>
          {!filters ? <SidebarSkeleton /> : <Sidebar filters={filters as any}></Sidebar>}
        </div>
        <div className={cx(styles.on_background)} />
        <div className={styles.content}>
          <ProductListHeader></ProductListHeader>
          <CardList></CardList>
        </div>
      </div>
    </>
  )
}

export default Home
