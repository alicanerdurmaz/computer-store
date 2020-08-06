import CheckboxList from '../src/components/CheckBox/CheckboxList'
import Checkbox from '../src/components/CheckBox/Checkbox'

export default function Home() {
  const Brands = [
    'Samsung',
    'Aorus',
    'Asus',
    'Acer',
    'Razer',
    'MSI',
    'HP',
    'Apple',
    'Gigabyte',
    'Lenovo',
    'Microsoft',
    'Dell',
  ]
  return (
    <div>
      <CheckboxList title="Brand">
        {Brands.map(e => (
          <Checkbox
            key={e}
            label={e}
            onChange={e => {
              console.log(e.currentTarget.name, e.currentTarget.checked)
            }}
          />
        ))}
      </CheckboxList>
    </div>
  )
}
