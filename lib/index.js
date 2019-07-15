const vueRouterReader = require('@which-route/vue-router-reader')
const nuxtRouterReader = require('@which-route/nuxt-router-reader')
const matcher = require('@which-route/matcher')

const inferWhetherNuxt = require('./helpers/inferWhetherNuxt')

module.exports = async function (opts) {
  const {
    pathStartsWith,
    pathNotStartsWith,
    isNuxt: isNuxtFromOpts,
    routes: routesFromOpts,
    dir,
    chainWebpackConfig,
    relativePathOfPages
  } = opts

  let routes

  if (routesFromOpts) {
    routes = routesFromOpts
  } else {
    const isNuxt = isNuxtFromOpts !== null && isNuxtFromOpts !== undefined ? !!isNuxtFromOpts : inferWhetherNuxt(dir)
    if (isNuxt) {
      routes = nuxtRouterReader(dir, relativePathOfPages)
    } else {
      const router = await vueRouterReader(dir, chainWebpackConfig)
      routes = router.routes
    }
  }
  return async function (ctx, next) {
    // console.log(ctx);
    if (!ctx || !ctx.request) return
    const notStartsWithArr = Array.isArray(pathNotStartsWith) ? pathNotStartsWith : [pathNotStartsWith]
    if (notStartsWithArr.some(v => ctx.request.path.startsWith(v))) return
    if (!ctx.request.path.startsWith(pathStartsWith)) return

    const rpath = ctx.request.path
    ctx.footprint = matcher(routes, rpath.substring(pathStartsWith.length))
    await next()
  }
}