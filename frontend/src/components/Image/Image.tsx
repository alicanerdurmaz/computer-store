import React from 'react'

interface Props {
  url: string
}
const Image: React.FC<Props> = ({ url }: Props) => {
  return <img src={url}></img>
}

export default Image
