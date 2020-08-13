import React from 'react'

import Sidebar from './Sidebar'
import filters from '../../test/data/filters.json'

export default {
  component: Sidebar,
  title: 'Sidebar',
}

export const Default = () => {
  return (
    <div style={{ width: '220px' }}>
      <Sidebar filters={filters} />
    </div>
  )
}
