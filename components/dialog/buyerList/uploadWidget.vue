<template>
  <el-dialog
    :title="pageData.title"
    :visible.sync="pageData.visible"
    width="50%"
    @close="closeEvt"
  >
    <el-form
      :label-width="pageData.formLabelWidth"
      class="form-horizontal"
      label-position="right"
    >
      <el-form-item label="模板下载：">
        <el-button style="padding:0;" type="text" @click="downloadEvt"
          >模板.xlsx</el-button
        >
      </el-form-item>
      <el-form-item label="数据导入：" style="height:inherit;">
        <el-upload
          ref="upload"
          :action="upload.action"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="upload.list"
          :limit="upload.limit"
          :auto-upload="false"
        >
          <el-button
            slot="trigger"
            :disabled="upload.list.length >= 1"
            size="small"
            type="primary"
            icon="el-icon-upload2"
            >选取文件</el-button
          >
          <el-button
            :disabled="upload.list.length === 1"
            style="margin-left: 10px;"
            size="small"
            type="success"
            icon="el-icon-upload"
            @click="submitUpload"
            >上传到服务器</el-button
          >
          <div slot="tip" class="el-upload__tip">
            支持扩展名：.xlsx，大小不超过50MB
          </div>
        </el-upload>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import { Vue, Component, Emit } from 'vue-property-decorator';
import { pricechgadminExport } from '~/api/demo';
@Component({
  props: {
    visible: Boolean
  },
  watch: {},
  components: {}
})
export default class BuyerListUploadWidget extends Vue {
  pageData: any = {
    title: '导入模板',
    formLabelWidth: '120px',
    visible: false
  };
  upload: any = {
    limit: 1,
    action: pricechgadminExport(),
    list: []
  };
  mounted() {
    this.pageData.visible = this.visible;
  }
  downloadEvt() {
    window.location.href = '/files/仓位商品库存导入模板.xlsx';
  }
  submitUpload() {
    this.$refs.upload.submit();
    this.closeEvt();
  }
  handleRemove(file, fileList) {
    // console.log(file, fileList);
  }
  handlePreview(file) {
    // console.log(file);
  }
  closeEvt() {
    this.visible = false;
    this.callback();
  }
  @Emit()
  callback(): void {}
}
</script>
<style lang="less" scoped></style>
