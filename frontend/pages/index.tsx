import CardList from '../src/components/Card/CardList'

import styles from './index.module.css'
import Sidebar from '../src/components/Sidebar/Sidebar'
import ProductListHeader from '../src/components/ProductListHeader/ProductListHeader'

interface Props {
  filters: Record<string, any>
}
export default function Home({ filters }: Props) {
  return (
    <div className={styles.body}>
      <div className={styles.sidebar}>
        <Sidebar filters={filters}></Sidebar>
      </div>
      <div className={styles.content}>
        <ProductListHeader></ProductListHeader>
        <CardList></CardList>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:3001/product/filters`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { filters: data } }
}
