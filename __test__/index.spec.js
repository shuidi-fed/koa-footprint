const path = require('path')

const inferWhetherNuxt = require('../lib/helpers/inferWhetherNuxt')
const mw = require('../lib/index')

test('nuxt inference', () => {
  const isNuxtInference = inferWhetherNuxt(path.join(__dirname, 'program-demo'))
  expect(isNuxtInference).toBe(true)
})

test('mactch with routes from opts', async () => {
  const ctx = {
    request: {
      path: '/abc/detail/1'
    }
  }
  const next = async () => {
    console.log('next')
  }
  const mwFunc = await mw({
    pathStartsWith: '/abc',
    routes: [{
      path: '/detail',
      children: [{
        path: ':id'
      }]
    }]
  })
  await mwFunc(ctx, next)
  expect(ctx.footprint.route).toBe('/detail/:id')
})

test('mactch with vue router', async () => {
  const ctx = {
    request: {
      path: '/abc/module1/page1'
    }
  }
  const next = () => {
    console.log('next')
  }
  const mwFunc = await mw({
    pathStartsWith: '/abc',
    isNuxt: false,
    dir: path.join(__dirname, 'program-demo'),
    chainWebpackConfig: config => {
      config.resolve.alias.set('router', path.join(__dirname, 'program-demo', 'src', 'router'))
    }
  })
  await mwFunc(ctx, next)
  expect(ctx.footprint.route).toBe('/module1/page1')
})

test('mactch with nuxt router', async() => {
  const ctx = {
    request: {
      path: '/abc/route1/1'
    }
  }
  const next = () => {
    console.log('next')
  }
  const mwFunc = await mw({
    pathStartsWith: '/abc',
    dir: path.join(__dirname, 'program-demo'),
    relativePathOfPages: path.join('src','pages')
  })
  await mwFunc(ctx, next)
  expect(ctx.footprint.route).toBe('/route1/:id')
})
