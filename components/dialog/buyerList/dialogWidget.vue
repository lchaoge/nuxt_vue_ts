<template>
  <el-dialog
    :visible.sync="pageData.visible"
    :title="pageData.title"
    width="50%"
    @close="closeEvt"
  >
    <el-form
      :label-width="pageData.formLabelWidth"
      class="form-horizontal"
      label-position="right"
    >
      <el-form-item>
        <label slot="label">
          <i class="f-big-red pl5 pr5">*</i>购方名称：</label
        >
        <el-input
          v-model="detail.csId"
          placeholder="请输入购方名称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <label slot="label">
          <i class="f-big-red pl5 pr5">*</i>购方纳税人识别号：</label
        >
        <el-input
          v-model="detail.csId"
          placeholder="请输入购方纳税人识别号"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="地址、电话：">
        <el-input
          v-model="detail.csId"
          placeholder="请输入地址、电话"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="开户行及账号：">
        <el-input
          v-model="detail.csId"
          placeholder="请输入开户行及账号"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <label slot="label">
          <i class="f-big-red pl5 pr5">*</i>电子邮箱：</label
        >
        <el-input
          v-model="detail.csId"
          placeholder="请输入电子邮箱"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号：">
        <el-input
          v-model="detail.csId"
          placeholder="手机号："
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="可用性：">
        <el-radio v-model="detail.radio" label="1">是</el-radio>
        <el-radio v-model="detail.radio" label="2">否</el-radio>
      </el-form-item>
      <el-form-item>
        <el-col :span="16">
          <el-button type="primary" @click="saveEvt">确 定</el-button>
          <el-button @click="closeEvt">取 消</el-button>
        </el-col>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script lang="ts">
import { Vue, Component, Emit } from 'vue-property-decorator';
@Component({
  props: {
    config: Object
  },
  watch: {},
  components: {}
})
export default class BuyerListDialogWidget extends Vue {
  pageData: any = {
    formLabelWidth: '120px',
    visible: false,
    mode: 'add',
    title: undefined
  };
  detail: any = {
    csId: undefined
  };

  mounted() {
    this.pageData.mode = this.config.mode;
    this.pageData.visible = this.config.visible;
    this.pageData.title = this.config.title;
    if (this.config.mode === 'edit') {
      this.detail.sku = this.config.data.sku;
      this.detail.grossMarginRatio = this.config.data.grossMarginRatio;
    }
  }
  created() {
    // this.initFunc();
  }
  // 初始化页面数据
  initFunc() {
    const params = {};
    const loading = this.$loading({
      lock: true,
      spinner: 'wm-icon-loading',
      background: 'rgba(0, 0, 0, 0.3)'
    });
    this.$Axios
      .get(this.$Urls.POST_WMOPERCHECK_OPERORG_INIT, params)
      .then(res => {
        setTimeout(() => {
          loading.close();
        }, 500);
        if (res.code === '0000') {
          this.pageData.operOrgList = res.data.operOrgList;
          this.pageData.userInfo = res.data.userInfo;

          if (res.data.userInfo.orgNo) {
            this.detail.orgNos = [];
            this.detail.orgNos.push(res.data.userInfo.orgNo);
          }
        } else {
          this.$message.error(res.result);
        }
      })
      .catch(() => {
        loading.close();
        this.$message.error('初始化页面数据失败！');
      });
  }
  saveEvt() {
    const params = {
      orgNos: this.detail.orgNos,
      csId: this.detail.csId,
      startDate: this.detail.startDate,
      endDate: this.detail.endDate,
      currentPage: this.detail.currentPage,
      pageSize: this.detail.pageSize
    };
    const loading = this.$loading({
      lock: true,
      spinner: 'wm-icon-loading',
      background: 'rgba(0, 0, 0, 0.3)'
    });
    this.$Axios
      .post(this.$Urls.POST_CHECKLOG_QUERYLIST, params)
      .then(res => {
        setTimeout(() => {
          loading.close();
        }, 500);
        if (res.code === '0000') {
          this.config.visible = false;
          this.callback(true);
        } else {
          this.$message.error(res.result);
        }
      })
      .catch(() => {
        loading.close();
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
