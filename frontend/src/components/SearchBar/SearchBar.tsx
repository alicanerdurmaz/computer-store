import React, { useState, useEffect } from 'react'

import cx from 'classnames'
import styles from './SearchBar.module.css'
import SearchIcon from '../Icons/SearchIcon'
import { useDebounce } from '../../hooks/useDebounce'
import { useRouter } from 'next/router'
import { addToQuery, deleteFromQuery } from '../../utils/changeQuery'

interface Props {
  className?: string
}
const SearchBar: React.FC<Props> = ({ className }: Props) => {
  const router = useRouter()
  const [inputValue, setInputValue] = useState('')
  const debouncedValue = useDebounce(inputValue, 200)

  useEffect(() => {
    if (debouncedValue.length >= 3) {
      router.push(addToQuery(router.query, 'search', debouncedValue), undefined, { shallow: true })
    } else {
      router.push(deleteFromQuery(router.query, 'search', debouncedValue), undefined, { shallow: true })
    }
  }, [debouncedValue])

  useEffect(() => {
    if (router.query.search) {
      setInputValue(router.query.search as string)
    }
  }, [])

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputValue.length >= 3) {
      router.push(addToQuery(router.query, 'search', debouncedValue), undefined, { shallow: true })
    } else {
      router.push(deleteFromQuery(router.query, 'search', debouncedValue), undefined, { shallow: true })
    }
  }

  return (
    <form
      className={cx(styles.form, className)}
      aria-label="search products"
      role="search"
      onSubmit={e => submitHandler(e)}
    >
      <input
        value={inputValue}
        className={styles.input}
        type="search"
        placeholder="Search Product"
        onChange={e => setInputValue(e.currentTarget.value)}
      ></input>
      <SearchIcon />
    </form>
  )
}

export default SearchBar
