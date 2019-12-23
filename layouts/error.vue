<template>
  <el-main class="layouts-error">
    <el-row class="pt60 tc">
      <el-col :span="12" :offset="6">
        <h2>您访问的页面出去玩了!</h2>
        <h5>您访问的页面不存在，请点击页底的链接返回</h5>
        <span id="error-link">{{ error.statusCode }}</span>
        <h2>! {{ error.message }} !</h2>
      </el-col>
    </el-row>
    <el-row class="tc">
      <div :span="16" :offset="4">
        <div class="bigfont">
          <span class="glyphicon"></span>
        </div>
        <el-button type="primary" @click.stop="goHome">返回首页</el-button>
      </div>
    </el-row>
  </el-main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({
  props: {
    error: Object
  },
  watch: {},
  components: {}
})
export default class LayoutsError extends Vue {
  goHome() {
    const that: any = this;
    that.$router.push({ path: '/' });
  }
}
</script>

<style lang="less" scoped>
.layouts-error {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #a0cfff;
  color: #ffffff;
  .el-row {
    &.pt60 {
      padding-top: 100px;
    }
    h2 {
      margin-top: 20px;
      margin-bottom: 10px;
      font-size: 30px;
      font-weight: 500;
    }
    h5 {
      font-size: 14px;
    }
    #error-link {
      font-size: 150px;
      padding: 10px;
    }
    .bigfont {
      height: 80px;
    }
  }
}
</style>
