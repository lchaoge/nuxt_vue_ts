<template>
  <div class="wm-title-box" :class="{ border_bottom: config.showLine }">
    <h1 class="wm-title">{{ config.title }}</h1>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component({
  props: {
    config: Object
  },
  watch: {},
  components: {}
})
export default class WmTitleWidget extends Vue {}
</script>
<style lang="less" scoped>
.wm-title-box {
  position: relative;
  padding: 5px 0 10px 17px;
  display: flex;
  justify-content: left;
  align-items: center;
  &.border_bottom {
    border-bottom: 1px solid #dcdfe6;
    margin-bottom: 10px;
  }
  &::before {
    display: block;
    content: ' ';
    position: absolute;
    top: 5px;
    left: 0;
    bottom: 10px;
    width: 5px;
    background: #48a7f2;
  }
  .wm-title {
    color: #4a4a4a;
    font-size: 18px;
    line-height: 20px;
  }
}
</style>
