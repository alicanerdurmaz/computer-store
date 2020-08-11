import React from 'react'

interface Props {
  url: string
  className: string
}
const Image: React.FC<Props> = ({ url, className }: Props) => {
  return <img src={url} className={className}></img>
}

export default Image
