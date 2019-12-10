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

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      pageData: {
        title: '导入模板',
        formLabelWidth: '120px',
        visible: false
      },
      upload: {
        limit: 1,
        action: undefined,
        list: []
      }
    };
  },
  computed: {
    ...mapGetters({
      // 'setLoading'
    })
  },
  mounted() {
    this.pageData.visible = this.visible;
  },
  created() {
    // this.initFunc();
  },
  methods: {
    ...mapActions([
      // 'setLoading'
    ]),
    downloadEvt() {
      window.location.href = '/static/files/仓位商品库存导入模板.xlsx';
    },
    submitUpload() {
      this.$refs.upload.submit();
      this.closeEvt();
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePreview(file) {
      // console.log(file);
    },
    closeEvt() {
      this.visible = false;
      this.$emit('callback');
    }
  }
};
</script>
<style lang="less" scoped></style>
