import React, { createContext, useContext, useReducer, useState, useEffect } from 'react'
import { API_AddOneToCart, API_RemoveAllFromCart, API_RemoveOneFromCart } from 'src/utils/api'
import { IUserContext, Action, User, ActionCart } from './interfaces'

export const UserContext = createContext<IUserContext | undefined>(undefined)

const userReducer = (state: User | null, action: Action): User | null => {
  let oldState = null
  switch (action.type) {
    case 'save':
      const newState = { ...(action.payload as User) }
      newState.shoppingCart = Array.from(new Set(newState.shoppingCart))
      return newState

    case 'delete':
      return null

    case 'update-cart':
      return { ...(state as User), shoppingCart: action.payload as string[] }

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
const cartInLocalStorageReducer = (state: string, action: ActionCart): string => {
  let oldState = state

  switch (action.type) {
    case 'add-to-cart-one':
      oldState += action.payload + ','
      window.localStorage.setItem('cart', oldState)
      return oldState

    case 'delete-from-cart-one':
      const deleted = oldState.replace(action.payload + ',', '')
      window.localStorage.setItem('cart', deleted)
      return deleted

    case 'delete-from-cart-all':
      window.localStorage.setItem('cart', '')
      return ''

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
        return item
      } else {
        return ''
      }
    } catch (error) {
      return ''
    }
  })

  const addOneToCart = async (id: string) => {
    const type = 'add-to-cart-one'
    if (userState && accessToken) {
      const newCart = await API_AddOneToCart(id, accessToken)
      if (newCart) {
        dispatchUserState({
          type: 'update-cart',
          payload: newCart,
        })
      }
    } else {
      dispatchCartInLocalStorage({ type: type, payload: id })
    }
  }
  const removeOneFromCart = async (id: string) => {
    const type = 'delete-from-cart-one'
    if (userState && accessToken) {
      const newCart = await API_RemoveOneFromCart(id, accessToken)
      if (!newCart) return

      dispatchUserState({
        type: 'update-cart',
        payload: newCart,
      })
    } else {
      dispatchCartInLocalStorage({ type: type, payload: id })
    }
  }
  const removeAllFromCart = async () => {
    const type = 'delete-from-cart-all'
    if (userState && accessToken) {
      const result = await API_RemoveAllFromCart(accessToken)
      dispatchUserState({
        type: 'delete-from-cart-all',
        payload: result,
      })
    } else {
      dispatchCartInLocalStorage({ type: type, payload: '' })
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
