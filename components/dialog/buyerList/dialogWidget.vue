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
      <el-form-item label="购方名称" prop="name">
        <el-input
          v-model="ruleForm.name"
          placeholder="请输入购方名称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="购方纳税人识别号" prop="name">
        <el-input
          v-model="ruleForm.name"
          placeholder="请输入购方纳税人识别号"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="地址、电话">
        <el-input
          v-model="ruleForm.name"
          placeholder="请输入地址、电话"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="开户行及账号">
        <el-input
          v-model="ruleForm.name"
          placeholder="请输入开户行及账号"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱" prop="name">
        <el-input
          v-model="ruleForm.name"
          placeholder="请输入电子邮箱"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input
          v-model="ruleForm.name"
          placeholder="请输入手机号"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="可用性">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="是"></el-radio>
          <el-radio label="否"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-document-checked"
          :loading="saveLoading"
          @click.stop="submitForm()"
          >保存</el-button
        >
        <el-button type="info" icon="el-icon-refresh" @click.stop="resetForm()"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script lang="ts">
import { Vue, Component, Emit, Prop } from 'vue-property-decorator';
import { getPageData, getList } from '~/api/demo';
@Component({})
export default class BatchInvoiceBuyerDialogWidget extends Vue {
  @Prop({
    type: Object
  })
  config: {
    mode: String;
    visible: Boolean;
    title: String;
    data: any;
  };

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
    getPageData().then((res: any) => {
      setTimeout(() => {
        loading.close();
      }, 500);
      if (res.code === '0000') {
        this.pageData.reasonList = res.data.reasonList;
      } else {
        this.$message.error(res.msg);
      }
    });
  }

  submitForm() {
    const form: any = this.$refs.ruleForm;
    form.validate(valid => {
      if (valid) {
        this.saveEvt();
      } else {
        console.log('error submit!!');
        return false;
      }
    });
  }

  resetForm() {
    const form: any = this.$refs.ruleForm;
    form.resetFields();
  }

  saveEvt() {
    const params = this.ruleForm;
    const loading = this.$loading({
      lock: true,
      spinner: 'wm-icon-loading',
      background: 'rgba(0, 0, 0, 0.3)'
    });
    this.saveLoading = true;
    getList(params).then((res: any) => {
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
