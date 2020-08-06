import React, { useState } from 'react'

import Slider from './Slider'

export default {
  component: Slider,
  title: 'Slider',
}

const rangeMin = 1000
const rangeMax = 4331

export const Default = () => {
  const [rangeValue1, setRangeValue1] = useState(rangeMin)
  const [rangeValue2, setRangeValue2] = useState(rangeMax)

  return (
    <Slider
      rangeMin={rangeMin}
      rangeMax={rangeMax}
      value1={rangeValue1}
      value2={rangeValue2}
      value1_OnChange={e => setRangeValue1(parseFloat(e.target.value))}
      value2_OnChange={e => setRangeValue2(parseFloat(e.target.value))}
    ></Slider>
  )
}
