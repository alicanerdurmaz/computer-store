import React, { useState } from 'react'

import Slider from './Slider'

export default {
  component: Slider,
  title: 'Slider',
}

export const Default = () => {
  return (
    <div style={{ width: '220px' }}>
      <Slider title="Price" minRange={1000} maxRange={4331}></Slider>
    </div>
  )
}
