import React from 'react'
import cx from 'classnames'
import styles from './search-bar.module.css'
import SearchIcon from '../Icons/SearchIcon'

const SearchBar: React.FC = () => {
  return (
    <form
      className={styles.form}
      aria-label="search products"
      role="search"
      onSubmit={e => e.preventDefault()}
    >
      <input
        className={styles.input}
        type="search"
        placeholder="Search Product"
      ></input>
      <SearchIcon />
    </form>
  )
}

export default SearchBar
