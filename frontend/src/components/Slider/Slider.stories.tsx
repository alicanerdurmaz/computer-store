import React, { useState } from 'react'

import Slider from './Slider'

export default {
  component: Slider,
  title: 'Slider',
}

export const Default = () => {
  return <Slider title="Price" minRange={1000} maxRange={4331}></Slider>
}
