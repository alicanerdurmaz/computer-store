import {configure} from '@storybook/react'

// automatically import all files ending in *.stories.(ts|tsx)
const req = require.context('../src/components/', true, /.stories.tsx?$/)

// the first argument can be an array too, so if you want to load from different locations or
// different extensions, you can do it like this: configure([req1, req2], module)
configure(req, module)
