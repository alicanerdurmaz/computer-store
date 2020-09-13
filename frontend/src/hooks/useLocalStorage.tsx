import { useState } from 'react'

type storedValue = string[]
type addOne = (key: string, value: string) => void
type deleteOne = (key: string, value: string) => void
type deleteAll = (key: string) => void

const useLocalStorage = (key: string) => {
  const [storedValue, setStoredValue] = useState<string[]>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      return null
    }
  })

  const addOne = (key: string, value: string): void => {
    try {
      const currentStore = localStorage.getItem(key)
      if (currentStore) {
        const currentStoreParsed = JSON.parse(currentStore)
        currentStoreParsed.push(value)
        localStorage.setItem(key, JSON.stringify(currentStoreParsed))
        setStoredValue(currentStoreParsed)
      } else {
        localStorage.setItem(key, JSON.stringify([value]))
        setStoredValue([value])
      }
    } catch (error) {
      // @ TODO better error implementation
      console.log(error)
    }
  }

  const deleteOne = (key: string, value: string) => {
    try {
      const currentStore = localStorage.getItem(key)
      if (currentStore) {
        const currentStoreParsed = JSON.parse(currentStore)
        const newStore = currentStoreParsed.filter((e: any) => e !== value)
        localStorage.setItem(key, JSON.stringify(newStore))
        setStoredValue(newStore)
      }
    } catch (error) {
      // @ TODO better error implementation
      console.log(error)
    }
  }
  const deleteAll = (key: string) => {
    try {
      localStorage.removeItem(key)
      setStoredValue([])
    } catch (error) {
      // @ TODO better error implementation
      console.log(error)
    }
  }

  return { storedValue, addOne, deleteOne, deleteAll }
}

export default useLocalStorage
