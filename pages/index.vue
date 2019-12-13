<template>
  <el-main>
    <!-- 面包屑 -->
    <section class="wmui-breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'homeLink' }">首页</el-breadcrumb-item>
      </el-breadcrumb>
    </section>
    <!-- 面包屑 end -->

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
// import { State, Getter, namespace } from 'vuex-class';

@Component({})
export default class PageIndex extends Vue {
  pageData: any = {
    datetime: new Date()
  };

  created() {
    console.log(this.$store.state);
  }
}
</script>
