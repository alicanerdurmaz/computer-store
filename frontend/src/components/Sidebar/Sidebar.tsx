import React from 'react'

import styles from './Sidebar.module.css'

import Slider from '../Slider/Slider'
import CheckboxList from '../CheckBox/CheckboxList'
import Checkbox from '../CheckBox/Checkbox'

const Sidebar = () => {
  const filters: any = mockData

  return (
    <div className={styles.container}>
      {filters.dataKeys.map((key: string) => {
        if (filters.sliders.includes(key)) {
          return <Slider key={key} title={key} minRange={filters[key][0]} maxRange={filters[key][1]}></Slider>
        } else {
          return <CheckboxList key={key} title={key} checkboxList={filters[key]}></CheckboxList>
        }
      })}
    </div>
  )
}

export default Sidebar

const mockData = {
  dataKeys: ['Price', 'Manufacturer', 'Weight'],
  sliders: ['Price', 'Weight'],
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
