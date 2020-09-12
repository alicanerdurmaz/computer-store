import { ParsedUrlQuery } from 'querystring'

const shouldBeString = ['Weight', 'Price', 'page', 'search', 'sort']

export const addToQuery = (queryObj: ParsedUrlQuery, category: string, value: string) => {
  const copyQueryObj = { ...queryObj }

  if (category !== 'page') {
    delete copyQueryObj['page']
  }

  if (shouldBeString.includes(category)) {
    copyQueryObj[category] = value
  } else {
    if (copyQueryObj.hasOwnProperty(category)) {
      copyQueryObj[category] += ',' + value
    } else {
      copyQueryObj[category] = value
    }
  }

  return objToString(copyQueryObj)
}

export const deleteFromQuery = (queryObj: any, category: string, value: string) => {
  const copyQueryObj = { ...queryObj }

  if (category !== 'page') {
    delete copyQueryObj['page']
  }

  if (shouldBeString.includes(category)) {
    delete copyQueryObj[category]
    return objToString(copyQueryObj)
  }

  const newArray = copyQueryObj[category].split(',').filter((e: string) => e !== value)

  if (!newArray.length) {
    delete copyQueryObj[category]
  } else {
    copyQueryObj[category] = newArray
  }
  return objToString(copyQueryObj)
}

const objToString = (oby: any) => {
  let newQuery = '?'
  Object.keys(oby).forEach((e: any) => {
    newQuery += '&' + e + '=' + oby[e]?.toString()
  })
  return newQuery
}
