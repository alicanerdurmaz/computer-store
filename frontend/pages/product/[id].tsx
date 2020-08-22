import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'

interface Props {
  product: any
}

const Product = ({ product }: Props) => {
  console.log(product)
  return <div></div>
}

export default Product

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('http://localhost:3001/product/get-all-ids')
  const ids = await res.json()

  const paths = ids.map((id: string) => ({
    params: { id: id },
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`http://localhost:3001/product/${params?.id}`)
  const product = await res.json()

  return { props: { product } }
}
