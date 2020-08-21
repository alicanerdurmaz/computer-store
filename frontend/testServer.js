import { rest } from 'msw'
import { setupServer } from 'msw/node'

import filtersData from './src/test/data/filters.json'
import productData from './src/test/data/product.json'

const server = setupServer(
  rest.get('http://localhost:3001/product/filters', (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(filtersData))
  }),
)

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

export { server, rest }
