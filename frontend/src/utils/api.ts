export const BASE_URL = 'https://computer-store-demo.herokuapp.com'

export const API_Login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })

    if (response.status === 401) {
      return { error: 'Email or Password is invalid. Please try again later.' }
    }
    if (response.status !== 201) {
      return { error: 'Something went wrong. Please try again later' }
    }

    const data = await response.json()
    return data
  } catch (error) {
    return { error: 'Something went wrong. Please try again later' }
  }
}
export const API_Signup = async (name: string, email: string, password: string) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    })

    if (response.status === 401) {
      return { error: 'Email or Password is invalid. Please try again later' }
    }

    if (response.status === 409) {
      return { error: 'Email already exist' }
    }

    if (response.status !== 201) {
      return { error: 'Something went wrong. Please try again later' }
    }

    const data = await response.json()
    return data
  } catch (error) {
    return { error: 'Something went wrong. Please try again later' }
  }
}

export const API_GetUser = async (accessToken: string) => {
  try {
    const response = await fetch(`${BASE_URL}/user`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: 'Bearer ' + accessToken,
      },
    })

    if (response.status === 401) {
      return null
    }
    const data = await response.json()

    return data
  } catch (error) {
    return null
  }
}

export const API_GetProducts = async (cartArray: string) => {
  try {
    const response = await fetch(`${BASE_URL}/product/find-many?idArray=${cartArray}`)
    const data = await response.json()

    if (data.error) {
      return []
    }

    return data
  } catch (error) {
    return []
  }
}

export const API_MergeLocalStorageCartWithDatabase = async (accessToken: string) => {
  try {
    const cart = window.localStorage.getItem('cart')
    if (!cart) return

    await fetch(`${BASE_URL}/user/cart/add?productId=${cart.slice(0, -1)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + accessToken,
      },
    })
    window.localStorage.removeItem('cart')
  } catch (error) {}
}

export const API_AddOneToCart = async (id: string, accessToken: string) => {
  try {
    const response = await fetch(`${BASE_URL}/user/cart/add?productId=${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + accessToken,
      },
    })
    const data = await response.json()

    if (data.error) {
      return null
    } else {
      return data
    }
  } catch (error) {}
}

export const API_RemoveOneFromCart = async (id: string, accessToken: string) => {
  try {
    const result = await fetch(`${BASE_URL}/user/cart/remove?productId=${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + accessToken,
      },
    })
    const data = await result.json()
    return data
  } catch (error) {
    return null
  }
}

export const API_RemoveAllFromCart = async (accessToken: string) => {
  try {
    const result = await fetch(`${BASE_URL}/user/cart/remove-all`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + accessToken,
      },
    })
    const data = await result.json()
    return data
  } catch (error) {
    return null
  }
}
