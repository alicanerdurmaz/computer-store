import Card from './Card'
import CardList from './CardList'

export default {
  component: Card,
  title: 'Card',
}

export const Default = () => {
  return (
    <div style={{ width: '300px' }}>
      <Card></Card>
    </div>
  )
}
export const List = () => {
  return <CardList></CardList>
}
