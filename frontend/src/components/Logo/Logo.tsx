import React from 'react'

import cx from 'classnames'
import styles from './logo.module.css'
import { useFilterContext } from 'src/context/FilterContext/FilterContext'
import { useRouter } from 'next/router'

interface Props {
  className?: string
}
const Logo: React.FC<Props> = ({ className }: Props) => {
  const router = useRouter()
  const { filterDispatch, setPagination } = useFilterContext()

  const onClickHandler = () => {
    router.push('/').then(() => {
      setPagination(null)
      filterDispatch({
        type: 'delete-all',
        payload: {
          category: '',
          value: '',
        },
      })
    })
  }
  return (
    <h1 onClick={onClickHandler}>
      <a className={cx(styles.logo, className)}>Computer&nbsp;Store</a>
    </h1>
  )
}

export default Logo
