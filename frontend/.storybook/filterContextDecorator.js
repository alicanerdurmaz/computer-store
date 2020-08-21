import React from 'react'
import { FilterProvider } from '../src/context/FilterContext/FilterContext'

const FilterContextDecorator = storyFn => <FilterProvider>{storyFn()}</FilterProvider>

export default FilterContextDecorator
