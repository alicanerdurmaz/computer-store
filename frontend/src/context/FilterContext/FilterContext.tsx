import React, { createContext, useReducer, useContext } from 'react'

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
      const oldState = state

      if (!oldState.hasOwnProperty(action.payload.category)) {
        oldState[action.payload.category] = []
      }
      oldState[action.payload.category].push(action.payload.value)

      return { ...oldState }
    }
    case 'delete': {
      const newArray = state[action.payload.category].filter((e: string) => e !== action.payload.value)

      state[action.payload.category] = newArray

      return { ...state }
    }

    case 'add-string': {
      const oldState = state

      oldState[action.payload.category] = action.payload.value

      return { ...oldState }
    }

    case 'delete-string': {
      const oldState = state

      oldState[action.payload.category] = null

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

export const FilterProvider: React.FC = ({ children }) => {
  const [filterState, filterDispatch] = useReducer(filterReducer, {})

  return <FilterContext.Provider value={{ filterState, filterDispatch }}>{children}</FilterContext.Provider>
}

export const useFilterContext = () => {
  const context = useContext(FilterContext)
  if (context === undefined) {
    throw new Error('useCountState must be used within a CountProvider')
  }
  return context
}
