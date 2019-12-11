<template>
  <el-dialog
    :visible.sync="pageData.visible"
    :title="pageData.title"
    width="50%"
    @close="closeEvt"
  >
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      :label-width="pageData.formLabelWidth"
      class="form-horizontal"
      label-position="right"
    >
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="ruleForm.name" clearable></el-input>
      </el-form-item>
      <el-form-item label="活动区域" prop="region">
        <el-select
          v-model="ruleForm.region"
          clearable
          filterable
          placeholder="请选择活动区域"
        >
          <el-option
            v-for="item in pageData.reasonList"
            :key="item.key"
            :label="item.value"
            :value="item.key"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间" required>
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker
              v-model="ruleForm.date1"
              type="date"
              placeholder="选择日期"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="tc" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="date2">
            <el-time-picker
              v-model="ruleForm.date2"
              placeholder="选择时间"
              style="width: 100%;"
            ></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="即时配送" prop="delivery">
        <el-switch v-model="ruleForm.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="活动性质" prop="type">
        <el-checkbox-group v-model="ruleForm.type">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="特殊资源" prop="resource">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动形式" prop="desc">
        <el-input v-model="ruleForm.desc" type="textarea"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :loading="saveLoading"
          @click.stop="submitForm('ruleForm')"
          >立即创建</el-button
        >
        <el-button type="info" @click.stop="resetForm('ruleForm')"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script lang="ts">
import { Vue, Component, Emit } from 'vue-property-decorator';
import { getPageData, getList } from '~/api/demo';
@Component({
  props: {
    config: Object
  },
  watch: {},
  components: {}
})
export default class BuyerListDialogWidget extends Vue {
  saveLoading: boolean = false;
  ruleForm: any = {
    name: undefined,
    region: undefined,
    date1: undefined,
    date2: undefined,
    delivery: false,
    type: [],
    resource: undefined,
    desc: undefined
  };
  rules: any = {
    name: [
      { required: true, message: '请输入活动名称', trigger: 'blur' },
      { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    ],
    region: [{ required: true, message: '请选择活动区域', trigger: 'change' }],
    date1: [
      { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
    ],
    date2: [
      { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
    ],
    type: [
      {
        type: 'array',
        required: true,
        message: '请至少选择一个活动性质',
        trigger: 'change'
      }
    ],
    resource: [
      { required: true, message: '请选择活动资源', trigger: 'change' }
    ],
    desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }]
  };
  pageData: any = {
    formLabelWidth: '120px',
    visible: false,
    mode: 'add',
    title: undefined,
    reasonList: []
  };

  mounted() {
    this.initFunc();
    this.pageData.mode = this.config.mode;
    this.pageData.visible = this.config.visible;
    this.pageData.title = this.config.title;
    if (this.config.mode === 'edit') {
      this.ruleForm.sku = this.config.data.sku;
      this.ruleForm.grossMarginRatio = this.config.data.grossMarginRatio;
    }
  }
  // 初始化页面数据
  initFunc() {
    const loading = this.$loading({
      lock: true,
      spinner: 'wm-icon-loading',
      background: 'rgba(0, 0, 0, 0.3)'
    });
    getPageData()
      .then(res => {
        setTimeout(() => {
          loading.close();
        }, 500);
        if (res.code === '0000') {
          this.pageData.reasonList = res.data.reasonList;
        } else {
          this.$message.error(res.msg);
        }
      })
      .catch(() => {
        loading.close();
        this.$message.error('初始化数据失败！');
      });
  }
  submitForm(formName) {
    this.$refs[formName].validate(valid => {
      if (valid) {
        this.saveEvt();
      } else {
        console.log('error submit!!');
        return false;
      }
    });
  }
  resetForm(formName) {
    this.$refs[formName].resetFields();
  }
  saveEvt() {
    const params = this.ruleForm;
    const loading = this.$loading({
      lock: true,
      spinner: 'wm-icon-loading',
      background: 'rgba(0, 0, 0, 0.3)'
    });
    this.saveLoading = true;
    getList(params)
      .then(res => {
        setTimeout(() => {
          loading.close();
          this.saveLoading = false;
        }, 500);
        if (res.code === '0000') {
          this.config.visible = false;
          this.callback(true);
        } else {
          this.$message.error(res.msg);
        }
      })
      .catch(() => {
        loading.close();
        this.saveLoading = false;
        this.$message.error('保存失败');
      });
  }
  closeEvt() {
    this.config.visible = false;
    this.callback(false);
  }
  @Emit()
  callback(visible: boolean) {
    return visible;
  }
}
</script>
