export const createQuery = (queryObject: Record<string, string[]>) => {
  let queryString = '?'
  Object.keys(queryObject).map((key: string) => {
    queryString += `&${key}=${queryObject[key].toString()}`
  })

  return queryString.length > 1 ? queryString : '/'
}
