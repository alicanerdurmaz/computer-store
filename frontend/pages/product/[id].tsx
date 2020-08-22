import React from 'react'

const Product = () => {
  return <div></div>
}

export default Product

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}

export async function getStaticProps() {}
