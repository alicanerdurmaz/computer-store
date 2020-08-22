import React, { createContext, useReducer, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/dist/client/router'
import { initial } from 'cypress/types/lodash'
import { ParsedUrlQuery } from 'querystring'
import { networkInterfaces } from 'os'

export const FilterContext = createContext<Record<string, any>>({})

interface Action {
  type: 'add' | 'delete' | 'add-string' | 'delete-string' | 'delete-all'
  payload: {
    category: string
    value: string
  }
}

const filterReducer = (state: any, action: Action) => {
  switch (action.type) {
    case 'add': {
      const oldState = { ...state }

      if (!oldState.hasOwnProperty(action.payload.category)) {
        oldState[action.payload.category] = []
      }
      oldState[action.payload.category].push(action.payload.value)

      return { ...oldState }
    }
    case 'delete': {
      const newArray = state[action.payload.category].filter((e: string) => e !== action.payload.value)

      if (!newArray.length) {
        delete state[action.payload.category]
      } else {
        state[action.payload.category] = newArray
      }

      return { ...state }
    }

    case 'add-string': {
      const oldState = { ...state }

      oldState[action.payload.category] = action.payload.value

      return { ...oldState }
    }

    case 'delete-string': {
      const oldState = { ...state }

      delete oldState[action.payload.category]

      return { ...oldState }
    }

    case 'delete-all': {
      return {}
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const init = (query: any) => {
  if (!query) return
  const shouldBeString = ['Weight', 'Price']
  const ignore = ['search', 'page']

  const newObject: Record<string, string | string[]> = {}

  Object.keys(query).map((e: string) => {
    if (ignore.includes(e)) return

    if (shouldBeString.includes(e)) {
      newObject[e] = query[e]
      return
    } else {
      newObject[e] = query[e].split(',')
    }
  })

  return newObject
}

interface IFilterProvider {
  children: React.ReactNode
  query: any
}
export const FilterProvider: React.FC<IFilterProvider> = ({ children, query }: IFilterProvider) => {
  const [filterState, filterDispatch] = useReducer(filterReducer, {}, () => init(query))
  const [searchTerm, setSearchTerm] = useState(query.search || '')
  const [sortBy, setSortBy] = useState('')

  return (
    <FilterContext.Provider value={{ filterState, searchTerm, sortBy, setSortBy, filterDispatch, setSearchTerm }}>
      {children}
    </FilterContext.Provider>
  )
}

export const useFilterContext = () => {
  const context = useContext(FilterContext)
  if (context === undefined) {
    throw new Error('useCountState must be used within a CountProvider')
  }
  return context
}
