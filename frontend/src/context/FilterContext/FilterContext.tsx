import { useRouter } from 'next/router'
import React, { createContext, useReducer, useContext, useEffect } from 'react'
import { createQuery } from 'src/utils/changeQuery'

interface IFilterContext {
  filterDispatch: React.Dispatch<IAction>
  filterState: any
}
const FilterContext = createContext<IFilterContext | undefined>(undefined)

export interface IAction {
  type: 'add' | 'delete' | 'add-string' | 'delete-string' | 'delete-all' | 'toggle'
  payload: {
    category: string
    value: string
  }
}

const filterReducer = (state: any, action: IAction) => {
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
      if (!state || !state.hasOwnProperty(action.payload.category)) return { ...state }

      const newArray = state[action.payload.category]?.filter((e: string) => e !== action.payload.value)

      if (newArray.length === 0) {
        delete state[action.payload.category]
        return { ...state }
      }

      state[action.payload.category] = newArray
      return { ...state }
    }

    case 'add-string': {
      const oldState = state

      oldState[action.payload.category] = [action.payload.value]

      return { ...oldState }
    }

    case 'delete-string': {
      if (!state || !state.hasOwnProperty(action.payload.category)) return { ...state }
      const oldState = state

      delete oldState[action.payload.category]

      return { ...oldState }
    }

    case 'toggle': {
      const oldState = state

      oldState[action.payload.category] = [action.payload.value]

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

export const FilterContextProvider: React.FC = ({ children }) => {
  const [filterState, filterDispatch] = useReducer(filterReducer, {})
  const router = useRouter()

  useEffect(() => {
    const query = createQuery(filterState)
    router.push(router.pathname, query)
  }, [filterState])

  return <FilterContext.Provider value={{ filterState, filterDispatch }}>{children}</FilterContext.Provider>
}

export const useFilterContext = () => {
  const context = useContext(FilterContext)
  if (context === undefined) {
    throw new Error('useFilterContext must be used within a FilterProvider')
  }
  return context
}
