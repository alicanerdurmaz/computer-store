import Slider from '../src/components/Slider/Slider'
import CardList from '../src/components/Card/CardList'

import styles from './index.module.css'

export default function Home() {
  return (
    <div className={styles.body}>
      <div className={styles.content}>
        <CardList></CardList>
      </div>
    </div>
  )
}
