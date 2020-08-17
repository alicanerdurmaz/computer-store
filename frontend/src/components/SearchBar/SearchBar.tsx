import React, { useState, useEffect } from 'react'

import cx from 'classnames'
import styles from './SearchBar.module.css'
import SearchIcon from '../Icons/SearchIcon'
import { useFilterContext } from '../../context/FilterContext/FilterContext'
import { useDebounce } from '../../hooks/useDebounce'

interface Props {
  className?: string
}
const SearchBar: React.FC<Props> = ({ className }: Props) => {
  const { searchTerm, setSearchTerm } = useFilterContext()

  return (
    <form
      className={cx(styles.form, className)}
      aria-label="search products"
      role="search"
      onSubmit={e => e.preventDefault()}
    >
      <input
        value={searchTerm}
        className={styles.input}
        type="search"
        placeholder="Search Product"
        onChange={e => setSearchTerm(e.currentTarget.value)}
      ></input>
      <SearchIcon />
    </form>
  )
}

export default SearchBar
