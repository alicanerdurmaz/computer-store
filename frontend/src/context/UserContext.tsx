import React, { createContext, useContext, useReducer, useState } from 'react'

interface IUser {
  _id: string
  shoppingCart: []
  name: string
  email: string
  addresses: []
}

interface IAction {
  type: 'save' | 'delete'
  payload: IUser
}
interface IUserContext {
  userState: IUser | null
  accessToken: string | null
  dispatchUserState: React.Dispatch<IAction>
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>
}

export const UserContext = createContext<IUserContext | undefined>(undefined)

const userReducer = (state: IUser | null, action: IAction): IUser | null => {
  switch (action.type) {
    case 'save':
      return action.payload
    case 'delete':
      return null
    default:
      return state
  }
}

export const UserContextProvider: React.FC = ({ children }) => {
  const [userState, dispatchUserState] = useReducer(userReducer, null, () => null)
  const [accessToken, setAccessToken] = useState<string | null>(null)

  return (
    <UserContext.Provider value={{ userState, accessToken, dispatchUserState, setAccessToken }}>
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
