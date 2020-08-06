import Slider from '../src/components/Slider/Slider'

export default function Home() {
  return (
    <div style={{ gridArea: 'content' }}>
      <Slider rangeMin={1000} rangeMax={4331}></Slider>
    </div>
  )
}
