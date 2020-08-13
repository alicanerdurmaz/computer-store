import React, { useState, useEffect } from 'react'

import styles from './Sidebar.module.css'

import Slider from '../Slider/Slider'
import CheckboxList from '../CheckBox/CheckboxList'

const Sidebar = () => {
  const [filters, setFilters] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true)
        const response = await fetch('http://localhost:3001/product/filters')
        const data = await response.json()
        setFilters(data)
        setLoading(false)
      } catch (error) {
        setError(true)
      }
    }
    getData()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Loading...</div>
  }

  return (
    <div className={styles.container}>
      {filters.filterOrder.map((key: string) => {
        if (filters?.sliders.includes(key)) {
          return <Slider key={key} title={key} minRange={filters[key][0]} maxRange={filters[key][1]}></Slider>
        } else {
          return <CheckboxList key={key} title={key} checkboxList={filters[key]}></CheckboxList>
        }
      })}
    </div>
  )
}

export default Sidebar
