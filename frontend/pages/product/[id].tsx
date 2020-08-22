import React from 'react'
import Error from 'next/error'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'

interface Props {
  product: any
}

const Product = ({ product }: Props) => {
  const { isFallback } = useRouter()

  if (!!isFallback && !product) {
    return <Error statusCode={404} title="This product could not be found" />
  }

  return <div>asdasd</div>
}

export default Product

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('http://localhost:3001/product/get-all-ids')
  const ids = await res.json()

  const paths = ids.map((id: string) => ({
    params: { id: id },
  }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`http://localhost:3001/product/${params?.id}`)
  const product = await res.json()

  return { props: product ? { product } : {} }
}
