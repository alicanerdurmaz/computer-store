import React, { createContext, useContext, useReducer, useState, useEffect } from 'react'
import { IUserContext, Action, User, Product, ActionCart } from './interfaces'

export const UserContext = createContext<IUserContext | undefined>(undefined)

const userReducer = (state: User | null, action: Action): User | null => {
  let oldState = { ...state } as User

  switch (action.type) {
    case 'save':
      return action.payload as User
    case 'delete':
      return null

    case 'add-to-cart-one':
      oldState = { ...state } as User
      oldState.shoppingCart.push(action.payload as string)
      return oldState

    case 'delete-from-cart-one':
      oldState = { ...state } as User
      oldState.shoppingCart.filter(e => e !== (action.payload as string))
      return oldState

    case 'delete-from-cart-all':
      oldState = { ...state } as User
      oldState.shoppingCart = []
      return oldState

    case 'save-cart':
      oldState = { ...state } as User
      oldState.shoppingCart = action.payload as string[]
      return state

    default:
      return state
  }
}
const cartInLocalStorageReducer = (state: string[], action: ActionCart): string[] => {
  let oldState = { ...state }

  switch (action.type) {
    case 'save':
      return action.payload as any

    case 'delete':
      return []

    case 'add-to-cart-one':
      oldState = [...state]

      oldState.push(action.payload)
      window.localStorage.setItem('cart', JSON.stringify(oldState))
      return oldState

    case 'delete-from-cart-one':
      oldState = [...state]
      oldState.filter(e => e !== action.payload)
      window.localStorage.setItem('cart', JSON.stringify(oldState))
      return oldState

    case 'delete-from-cart-all':
      window.localStorage.setItem('cart', JSON.stringify([]))
      return []

    default:
      return state
  }
}

export const UserContextProvider: React.FC = ({ children }) => {
  const [userState, dispatchUserState] = useReducer(userReducer, null, () => null)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [cartInLocalStorage, dispatchCartInLocalStorage] = useReducer(cartInLocalStorageReducer, [], () => {
    try {
      const item = window.localStorage.getItem('cart')
      if (item) {
        return JSON.parse(item)
      } else {
        window.localStorage.setItem('cart', JSON.stringify([]))
        return []
      }
    } catch (error) {
      return []
    }
  })

  useEffect(() => {
    if (userState) {
      const mergedArrays = userState.shoppingCart.concat(
        cartInLocalStorage.filter(item => userState.shoppingCart.indexOf(item) < 0),
      )
      window.localStorage.removeItem('cart')
      dispatchUserState({ type: 'save-cart', payload: mergedArrays })
    } else {
      window.localStorage.removeItem('cart')
    }
  }, [userState])

  const addOneToCart = (id: string) => {
    const type = 'add-to-cart-one'
    if (!userState) {
      dispatchCartInLocalStorage({ type: type, payload: id })
    } else {
      dispatchUserState({ type: type, payload: id })
    }
  }
  const removeOneFromCart = (id: string) => {
    const type = 'delete-from-cart-one'
    if (!userState) {
      dispatchCartInLocalStorage({ type: type, payload: id })
    } else {
      dispatchUserState({ type: type, payload: id })
    }
  }
  const removeAllFromCart = () => {
    const type = 'delete-from-cart-all'
    if (!userState) {
      dispatchCartInLocalStorage({ type: type, payload: '' })
    } else {
      dispatchUserState({ type: type, payload: '' })
    }
  }

  return (
    <UserContext.Provider
      value={{
        userState,
        accessToken,
        dispatchUserState,
        setAccessToken,
        cartInLocalStorage,
        dispatchCartInLocalStorage,
        addOneToCart,
        removeOneFromCart,
        removeAllFromCart,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('UserContext must be used within a UserProvider')
  }
  return context
}
