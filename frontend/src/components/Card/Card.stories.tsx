import Card from './Card'
import CardList from './CardList'

export default {
  component: Card,
  title: 'Card',
}

const mockFunction = async (...props: any) => {}

export const Default = () => {
  return (
    <div style={{ width: '300px' }}>
      <Card
        addOneToCart={async () => mockFunction()}
        removeOneFromCart={async () => mockFunction()}
        isInCart={true}
        id="1"
        image="https://m.media-amazon.com/images/I/41FSyBId9TL.jpg"
        name={`Asus ROG Mothership GZ700 17.3\" 1920 x 1080 144 Hz Core i9-9980HK 2.4 GHz 64 GB Memory 1.5 TB NVME SSD Storage Laptop`}
        price="6499"
      ></Card>
    </div>
  )
}

export const List = () => {
  return <CardList></CardList>
}
