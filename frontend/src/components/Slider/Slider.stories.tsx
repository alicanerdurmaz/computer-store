import React, { useState } from 'react'

import Slider from './Slider'

export default {
  component: Slider,
  title: 'Slider',
}

const rangeMin = 1000
const rangeMax = 4331

export const Default = () => {
  return <Slider title="Price" minRange={1000} maxRange={4331}></Slider>
}
