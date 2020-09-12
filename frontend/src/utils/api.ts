export const API_Login = async (email: string, password: string) => {
  try {
    const response = await fetch('http://localhost:3001/auth/login', {
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
    const response = await fetch('http://localhost:3001/auth/register', {
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
    const response = await fetch('http://localhost:3001/user', {
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
