import React, { useState, useEffect } from 'react'

import cx from 'classnames'
import styles from './SearchBar.module.css'
import SearchIcon from '../Icons/SearchIcon'
import { useDebounce } from '../../hooks/useDebounce'
import { useFilterContext } from 'src/context/FilterContext/FilterContext'

interface Props {
  className?: string
}
const SearchBar: React.FC<Props> = ({ className }: Props) => {
  const { filterDispatch } = useFilterContext()
  const [inputValue, setInputValue] = useState('')
  const debouncedValue = useDebounce(inputValue, 200)

  useEffect(() => {
    if (debouncedValue.length >= 4) {
      filterDispatch({
        type: 'add-string',
        payload: {
          category: 'search',
          value: debouncedValue,
        },
      })
    } else {
      filterDispatch({
        type: 'delete-string',
        payload: {
          category: 'search',
          value: debouncedValue,
        },
      })
    }
  }, [debouncedValue])

  return (
    <form className={cx(styles.form, className)} aria-label="search products" role="search">
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
