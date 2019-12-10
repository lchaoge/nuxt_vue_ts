<template>
  <div class="container">
    <div>
      <h1 class="title">kslab-PC</h1>
      <h2 class="subtitle">Welcome to the iView + Nuxt.js template</h2>
      <div class="links">
        <Button type="primary" target="_blank" to="https://nuxtjs.org/"
          >Documentation</Button
        >
        <Button target="_blank" to="https://github.com/nuxt/nuxt.js"
          >GitHub</Button
        >
        <Button target="_blank" to="https://www.iviewui.com/">iView</Button>
        <nuxt-link to="/demo">demo page</nuxt-link>
        <nuxt-link to="/error">error page</nuxt-link>
        <div>{{ pageData.orgTreeInfoList }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
// import { getList } from '~/api/index'
import { getPageData } from '~/api/demo'

@Component({
  created() {}
  // props: {}
})
export default class IndexPage extends Vue {
  pageData: any = {
    tableLoading: false,
    reasonList: [],
    dateArr: [],
    userInfo: {
      orgNo: null, // 门店号
      regionNo: undefined, // 区域号
      userName: undefined, // 用户名称
      userType: 0 // 用户类型 0-总部 1-门店
    },
    orgTreeInfoList: [], // 组织机构
    uploadVisible: false
  }

  created() {
    this.initFunc()
  }

  // 初始化页面数据
  initFunc() {
    const params = {}
    getPageData(params).then((res: any) => {
      if (res.code === '0000') {
        this.pageData.orgTreeInfoList = res.data.orgTreeInfoList
        this.pageData.reasonList = res.data.reasonList
        this.pageData.userInfo = res.data.userInfo
      } else {
        this.$message({
          type: 'error',
          message: res.msg,
          duration: 5000
        })
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
.links {
  padding-top: 15px;
}
</style>
