<template>
  <el-main class="page-index">
    <section class="wmui-breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'homeLink' }">首页</el-breadcrumb-item>
      </el-breadcrumb>
    </section>

    <section class="wmui-table-box">
      <h1 class="wm-title-h1">物美后台管理系统</h1>
      <el-calendar v-model="pageData.datetime"></el-calendar>
      <el-row :gutter="10">
        <el-col :span="6">
          <el-link icon="el-icon-download" type="primary">使用手册</el-link>
        </el-col>
        <el-col :span="6">
          <el-link icon="el-icon-download" type="primary">使用手册</el-link>
        </el-col>
        <el-col :span="6">
          <el-link icon="el-icon-download" type="primary">使用手册</el-link>
        </el-col>
        <el-col :span="6">
          <el-link icon="el-icon-download" type="primary">使用手册</el-link>
        </el-col>
      </el-row>
    </section>
  </el-main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  created() {}
  // props: {}
})
export default class PageIndex extends Vue {
  pageData: any = {
    datetime: new Date()
  };
  created() {}
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
