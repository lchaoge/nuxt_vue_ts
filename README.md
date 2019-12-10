# nuxt_vue_ts

> My astounding Nuxt.js project

## 如何运行

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

## 代码规范

1. css 名称用中划线断开（eg.tab-box)
2. 图片命名用下划线断开（eg.order_all.png)
3. 文件用到多张图片请建立 images 文件夹并在统一的 index.ts 中导出，方便后续修改
4. 页面文件夹用驼峰命名，组件命名用中划线断开，命名都尽量用两个及以上字段，不用单字段

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).


# nuxt配置sass
```
1.安装 style-resources：
$ yarn add @nuxtjs/style-resources

2.根据需要安装：
SASS: $ yarn add sass-loader node-sass
LESS: $ yarn add less-loader less
Stylus: $ yarn add stylus-loader stylus

3.修改 nuxt.config.js:
export default {
  modules: [
    '@nuxtjs/style-resources',
  ],
  styleResources: {
    scss: './assets/variables.scss',
    less: './assets/**/*.less',
    // sass: ...
  }
}
⚠️您不能在此处使用路径别名(~ 和 @
⚠️ You cannot use path aliases here (~ and @)，你需要使用相对或绝对路径。
```
