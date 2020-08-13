import React from 'react'

import Sidebar from './Sidebar'

export default {
  component: Sidebar,
  title: 'Sidebar',
}

export const Default = async () => {
  const res = await fetch(`http://localhost:3001/product/filters`)
  const data = await res.json()
  return (
    <div style={{ width: '220px' }}>
      <Sidebar filters={data} />
    </div>
  )
}
