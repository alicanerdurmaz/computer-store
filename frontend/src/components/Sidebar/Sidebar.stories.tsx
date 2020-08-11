import React from 'react'

import Sidebar from './Sidebar'

export default {
  component: Sidebar,
  title: 'Sidebar',
}

export const Default = () => (
  <div style={{ width: '220px' }}>
    <Sidebar />
  </div>
)
