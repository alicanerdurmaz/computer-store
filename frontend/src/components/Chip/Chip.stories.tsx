import React, { useState } from 'react'
import Chip from './Chip'

export default {
  component: Chip,
  title: 'Chip',
}

export const Default = () => {
  return (
    <div
      style={{
        width: '200px',
      }}
    >
      <Chip category="Manufacturer" value="Asus" onClick={() => alert('click')}></Chip>
    </div>
  )
}
