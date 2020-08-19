import React from 'react'

import Sidebar from './Sidebar'

export default {
  component: Sidebar,
  title: 'Sidebar',
}

export const Default = () => {
  return <div style={{ width: '220px' }}>{/* <Sidebar filters={getData()}></Sidebar> */}</div>
}
