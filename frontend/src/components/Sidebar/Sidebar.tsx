import React from 'react'

import styles from './Sidebar.module.css'

import Slider from '../Slider/Slider'
import CheckboxList from '../CheckBox/CheckboxList'
import Checkbox from '../CheckBox/Checkbox'

interface Filters {
  [key: string]: Record<string, any>[] | string[]
}
const Sidebar = () => {
  const filters: Filters = mockData

  return (
    <div className={styles.container}>
      {/* {Object.keys(data).map(e => {
        if (e === 'Price' || e === 'Weight') {
          return <Slider key={e} title={e} minRange={parseFloat(data[e][0])} maxRange={parseFloat(data[e][1])}></Slider>
        } else {
          data[e].map(v => console.log(v))
        }
      })} */}
    </div>
  )
}

export default Sidebar

const mockData = {
  Manufacturer: [
    {
      name: 'Asus',
      count: 39,
    },
    {
      name: 'Acer',
      count: 39,
    },
    {
      name: 'Razer',
      count: 14,
    },
    {
      name: 'MSI',
      count: 41,
    },
    {
      name: 'HP',
      count: 38,
    },
    {
      name: 'Apple',
      count: 12,
    },
    {
      name: 'Gigabyte',
      count: 24,
    },
  ],
  Weight: ['770', '3000'],
  Price: ['199', '6499'],
}
