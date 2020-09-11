import React, { useState, useEffect } from 'react'
import CardList from '../src/components/Card/CardList'
import styles from './index.module.css'
import Sidebar from '../src/components/Sidebar/Sidebar'
import ProductListHeader from '../src/components/ProductListHeader/ProductListHeader'
import cx from 'classnames'
import SidebarSkeleton from 'src/components/Sidebar/SidebarSkeleton'

interface Props {
  filters: Record<string, any>
}
export default function Home() {
  const [sidebar, setSideBar] = useState(false)
  const [filters, setFilters] = useState(null)
  useEffect(() => {
    const getFilters = async () => {
      try {
        const res = await fetch(`http://localhost:3001/product/filters`)
        const data = await res.json()
        setFilters(data)
      } catch (error) {
        //  @TODO Proper way to error handling
      }
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
          {!filters ? <SidebarSkeleton /> : <Sidebar filters={filters}></Sidebar>}
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
