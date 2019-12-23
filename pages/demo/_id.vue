<template>
  <el-main class="page-demo-detail">
    <!-- 面包屑 -->
    <section class="wmui-breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>模块名称</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/demo' }"
          >列表名称</el-breadcrumb-item
        >
        <el-breadcrumb-item>基础详情</el-breadcrumb-item>
      </el-breadcrumb>
    </section>
    <!-- 面包屑 end -->

    <!-- 详细信息 -->
    <section class="wmui-details">
      <section class="wmui-condition">
        <wm-title
          :config="{ title: '基础详情', showLine: false }"
          class="mb10"
        ></wm-title>
        <el-row class="detail-group">
          <el-col :lg="6" :md="8" :sm="12" :xs="24"
            ><p class="detail-para">
              取货单号：10000000
            </p></el-col
          >
          <el-col :lg="6" :md="8" :sm="12" :xs="24"
            ><p class="detail-para">
              状态：已取货
            </p></el-col
          >
          <el-col :lg="6" :md="8" :sm="12" :xs="24"
            ><p class="detail-para">
              销售单号：432562265699789
            </p></el-col
          >
          <el-col :lg="6" :md="8" :sm="12" :xs="24"
            ><p class="detail-para">
              子订单：4565468654694889988
            </p></el-col
          >
        </el-row>
      </section>
      <section class="wmui-condition mt0">
        <wm-title
          :config="{ title: '退款申请', showLine: false }"
          class="mb10"
        ></wm-title>
        <el-row class="detail-group">
          <el-col :lg="6" :md="8" :sm="12" :xs="24"
            ><p class="detail-para">
              取货单号：10000000
            </p></el-col
          >
          <el-col :lg="6" :md="8" :sm="12" :xs="24"
            ><p class="detail-para">
              状态：已取货
            </p></el-col
          >
          <el-col :lg="6" :md="8" :sm="12" :xs="24"
            ><p class="detail-para">
              销售单号：432562265699789
            </p></el-col
          >
          <el-col :lg="6" :md="8" :sm="12" :xs="24"
            ><p class="detail-para">
              子订单：4565468654694889988
            </p></el-col
          >
          <el-col :lg="6" :md="8" :sm="12" :xs="24"
            ><p class="detail-para">
              状态：已取货
            </p></el-col
          >
          <el-col :lg="6" :md="8" :sm="12" :xs="24"
            ><p class="detail-para">
              销售单号：432562265699789
            </p></el-col
          >
        </el-row>
      </section>
      <section class="wmui-table-box mt0">
        <wm-title
          :config="{ title: '退货商品', showLine: false }"
          class="mb10"
        ></wm-title>
        <el-table
          v-loading="tableLoading"
          :data="tableObj.list"
          size="mini"
          stripe
          border
        >
          <el-table-column prop="auditor" label="购方编号"></el-table-column>
          <el-table-column
            prop="auditorName"
            label="购方名称"
          ></el-table-column>
          <el-table-column
            prop="billNo"
            :min-width="150"
            label="购方纳税人识别号"
          ></el-table-column>
          <el-table-column
            prop="billStatusDesc"
            label="地址电话"
          ></el-table-column>
          <el-table-column
            prop="creatorName"
            :min-width="120"
            label="开户行及账号"
          ></el-table-column>
          <el-table-column
            prop="effectDateString"
            label="电子邮箱"
          ></el-table-column>
          <el-table-column prop="modifier" label="手机号"></el-table-column>
          <el-table-column prop="modifierName" label="可用性"></el-table-column>
          <el-table-column
            prop="effectDateString"
            label="创建时间"
          ></el-table-column>
          <el-table-column prop="modifierName" label="创建人"></el-table-column>
        </el-table>
      </section>
    </section>
    <!-- 详细信息 end -->
  </el-main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import WmTitle from '~/components/wmTitle/index.vue';
import { getPageData, getList } from '~/api/demo';

@Component({
  components: {
    WmTitle
  }
})
export default class DemoPage extends Vue {
  tableLoading: boolean = false;
  exportLoading: boolean = false;
  selectedRow: Array<any> = [];
  pageData: any = {
    dateArr: [],
    userInfo: {
      orgNo: null, // 门店号
      regionNo: undefined, // 区域号
      userName: undefined, // 用户名称
      userType: 0 // 用户类型 0-总部 1-门店
    },
    orgTreeInfoList: [], // 组织机构
    reasonList: [],
    uploadVisible: false,
    pickerOptions: {
      shortcuts: [
        {
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        },
        {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        },
        {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }
      ]
    }
  };
  tableObj: any = {
    orgNo: undefined, // 门店号
    csId: undefined, // 批次号
    reason: undefined,
    startDate: undefined, // 开始日期
    endDate: undefined, // 结束日期
    list: []
  };
  validate({ params }) {
    // 必须是number类型
    return /^\d+$/.test(params.id);
  }

  mounted() {
    this.initFunc();
  }
  created() {}

  // 初始化页面数据
  initFunc() {
    const loading = this.$loading({
      lock: true,
      spinner: 'wm-icon-loading',
      background: 'rgba(0, 0, 0, 0.3)'
    });
    getPageData()
      .then((res: any) => {
        setTimeout(() => {
          loading.close();
        }, 500);
        if (res.code === '0000') {
          this.pageData.orgTreeInfoList = res.data.orgTreeInfoList;
          this.pageData.reasonList = res.data.reasonList;
          this.pageData.userInfo = res.data.userInfo;

          if (res.data.userInfo.orgNo) {
            this.tableObj.orgNo = res.data.userInfo.orgNo;
          }
          this.queryEvt();
        } else {
          this.$message.error(res.msg);
        }
      })
      .catch(() => {
        loading.close();
        this.$message.error('初始化页面数据失败！');
      });
  }
  // 查询列表
  queryEvt(startFlag = true) {
    this.selectedRow.splice(0, this.selectedRow.length);
    this.tableLoading = true;
    const params = {
      orgNo: this.tableObj.orgNo,
      csId: this.tableObj.csId,
      reason: this.tableObj.reason,
      startDate: this.tableObj.startDate,
      endDate: this.tableObj.endDate
    };
    getList(params)
      .then((res: any) => {
        setTimeout(() => {
          this.tableLoading = false;
        }, 500);
        if (res.code === '0000') {
          this.tableObj.list = res.data.list;
        } else {
          this.$message.error(res.msg);
        }
      })
      .catch(() => {
        this.tableLoading = false;
        this.$message.error('查询列表失败！');
      });
  }
}
</script>
