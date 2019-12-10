module.exports = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/images/favicon.ico'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#15bafe',
    height: '10px'
  },
  /*
   ** Global CSS
   */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '~/assets/css/iconfont.css',
    '~/assets/css/transition.css',
    '~/assets/css/base.css',
    '~/assets/css/main.less'
  ],
  styleResources: {
    less: []
    // sass: ...
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: '~/plugins/element-ui', ssr: true }, '~/plugins/axios'],
  /*
   ** Nuxt.js dev-modules
   */
  devModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/style-resources',
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/pwa'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true
  },
  proxy: {
    '/wmInvoice': {
      target: 'http://dev-invoice.wumart.com/',
      changeOrigin: true,
      pathRewrite: {
        '^/wmInvoice': ''
      }
    },
    // 携出单
    '/operplat': {
      target: 'http://qa-operplat.wumart.com/',
      //  secure: true,
      changeOrigin: true,
      pathRewrite: {
        '^/operplat': ''
      }
    },
    '/api': {
      target:
        process.env.NODE_ENV === 'production'
          ? 'http://server.kooshua.com'
          : process.env.NODE_ENV === 'development'
          ? 'http://test.kslab.com'
          : 'http://test.kslab.com', // api主机
      changeOrigin: true
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    devtools: true,
    transpile: [/^element-ui/],
    vendor: ['@nuxtjs/axios', '@nuxtjs/proxy', 'element-ui'],
    extend(config, ctx) {}
  }
};
