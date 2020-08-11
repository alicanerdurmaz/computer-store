import React from 'react'

import styles from './Sidebar.module.css'

import data from './filters.json'
import Slider from '../Slider/Slider'
import CheckboxList from '../CheckBox/CheckboxList'
import Checkbox from '../CheckBox/Checkbox'

const Sidebar = () => {
  return (
    <div className={styles.container}>
      {/* {Object.keys(data).map(e => {
        if (e === 'Price' || e === 'Weight') {
          return (
            <Slider
              key={e}
              title={e}
              rangeMin={parseFloat(data[e][0])}
              rangeMax={parseFloat(data[e][1])}
              value1={5}
              value2={5}
              value1_OnChange={e => e}
              value2_OnChange={e => e}
            ></Slider>
          )
        } else {
          // return (
          //   <CheckboxList>
          //     <Checkbox></Checkbox>
          //   </CheckboxList>
          // )
        }
      })} */}
    </div>
  )
}

export default Sidebar
