export interface User {
  _id: string
  shoppingCart: string[]
  name: string
  email: string

  addresses: []
}

export interface Action {
  type: 'save' | 'delete' | 'add-to-cart-one' | 'delete-from-cart-one' | 'delete-from-cart-all' | 'save-cart'
  payload: User | string | string[]
}
export interface ActionCart {
  type: 'save' | 'delete' | 'add-to-cart-one' | 'delete-from-cart-one' | 'delete-from-cart-all'
  payload: string
}
export interface IUserContext {
  userState: User | null
  accessToken: string | null
  dispatchUserState: React.Dispatch<Action>
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>
  cartInLocalStorage: string[]
  dispatchCartInLocalStorage: React.Dispatch<ActionCart>
  addOneToCart: (id: string) => void
  removeOneFromCart: (id: string) => void
  removeAllFromCart: () => void
}

export interface Product {
  _id: string
  Manufacturer: string
  Model: string
  Part: string
  Type: string
  'Screen Size': string
  'Screen Panel Type': string
  Resolution: string
  'Refresh Rate': string
  Dimensions: string
  Weight: number
  'CPU Core Count': number
  'CPU Core Clock': number
  'CPU Boost Clock': number
  Memory: number
  CPU: string
  'CPU Microarchitecture': string
  'SSD Storage': string
  'SSD Type': string
  Storage: string
  GPU: string
  'GPU Memory': number
  'Operating System': string
  'SD Card Reader': string
  'Front Facing Webcam': string
  Images: string[]
  Name: string
  Price: number
  SellerName: string
  Seller: string
}
