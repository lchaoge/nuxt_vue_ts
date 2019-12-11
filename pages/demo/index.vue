<template>
  <el-main class="page-demo">
    <section class="wmui-breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>模块名称</el-breadcrumb-item>
        <el-breadcrumb-item>列表名称</el-breadcrumb-item>
      </el-breadcrumb>
    </section>

    <section class="wmui-condition">
      <el-card shadow="never" :body-style="{ padding: '10px' }">
        <el-form label-position="right" label-width="120px">
          <wm-title :config="titleConfig"></wm-title>
          <el-row>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item>
                <label slot="label" class="control-label">测试门店：</label>
                <el-cascader
                  v-model="tableObj.orgNo"
                  :options="pageData.orgTreeInfoList"
                  placeholder="请选择门店"
                  :show-all-levels="false"
                  collapse-tags
                  :props="{ multiple: false, emitPath: false }"
                  clearable
                  filterable
                ></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item>
                <label slot="label" class="control-label">购方编号：</label>
                <el-input
                  v-model="tableObj.csId"
                  placeholder="请输入购方编号"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item>
                <label slot="label" class="control-label">购方编号：</label>
                <el-input
                  v-model="tableObj.csId"
                  placeholder="请输入购方编号"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item>
                <label slot="label" class="control-label">可用性：</label>
                <el-select
                  v-model="tableObj.reason"
                  clearable
                  filterable
                  placeholder="请选择可用性"
                >
                  <el-option
                    v-for="item in pageData.reasonList"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :lg="12" :md="12" :sm="24" :xs="24">
              <el-form-item>
                <label slot="label" class="control-label">创建时间：</label>
                <el-date-picker
                  v-model="pageData.dateArr"
                  value-format="yyyy-MM-dd"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pageData.pickerOptions"
                  @change="dateArrChange"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider class="mt0"></el-divider>
          <el-row>
            <el-col :lg="24" class="tr">
              <el-button
                type="primary"
                icon="el-icon-search"
                :loading="tableLoading"
                @click.stop="queryEvt"
                >查询</el-button
              >
              <el-button
                type="info"
                icon="el-icon-refresh"
                plain
                @click.stop="refreshEvt"
                >重置</el-button
              >
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </section>

    <section class="wmui-table-box">
      <el-row class="wmui-button-box">
        <el-col :lg="12" :md="12" :sm="24" :xs="24">
          <el-button
            size="medium"
            type="primary"
            plain
            icon="el-icon-plus"
            @click="addEvt"
            >新增</el-button
          >
          <el-button
            size="medium"
            type="success"
            plain
            icon="el-icon-edit"
            @click="editEvt"
            >编辑</el-button
          >
          <el-button
            size="medium"
            type="danger"
            plain
            icon="el-icon-delete"
            @click="deleteEvt"
            >删除</el-button
          >
          <el-button
            size="medium"
            type="warning"
            plain
            icon="el-icon-upload2"
            @click="uploadEvt"
            >上传</el-button
          >
          <el-button
            size="medium"
            type="warning"
            plain
            icon="el-icon-download"
            :loading="exportLoading"
            @click="downloadEvt"
            >导出</el-button
          >
        </el-col>
      </el-row>
      <el-alert
        v-if="selectedRow.length > 0"
        :title="`已选择 ${selectedRow.length} 项`"
        type="success"
        show-icon
        :closable="false"
        effect="dark"
      />
      <el-table
        v-loading="tableLoading"
        :data="tableObj.list"
        size="mini"
        stripe
        border
        @selection-change="selectedRowChange"
      >
        <el-table-column type="selection" width="35"></el-table-column>
        <el-table-column prop="auditor" label="购方编号"></el-table-column>
        <el-table-column prop="auditorName" label="购方名称"></el-table-column>
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
        <el-table-column min-width="110" label="操作">
          <template slot-scope="scope">
            <el-link type="primary" :href="`/demo/${scope.row.id}`"
              >查看</el-link
            >
            <el-divider direction="vertical"></el-divider>
            <el-link type="primary">编辑</el-link>
          </template>
        </el-table-column>
      </el-table>
      <el-row class="wmui-pagination-box">
        <el-col :span="24">
          <el-pagination
            :current-page="pagination.currentPage"
            :page-sizes="pagination.pageArray"
            :page-size="pagination.pageSize"
            :layout="pagination.layout"
            :total="pagination.rowCount"
            @size-change="sizeChangeEvt"
            @current-change="currentChangeEvt"
          />
        </el-col>
      </el-row>
    </section>
    <dialog-widget
      v-if="dialogObj.visible"
      :config="dialogObj"
      @callback="saveEvt"
    ></dialog-widget>
    <upload-widget
      v-if="pageData.uploadVisible"
      :visible="pageData.uploadVisible"
      @callback="uploadcloseEvt"
    ></upload-widget>
  </el-main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import WmTitle from '~/components/wm-title';
import DialogWidget from '~/components/dialog/buyerList/dialogWidget';
import UploadWidget from '~/components/dialog/buyerList/uploadWidget';
import { getPageData, getList, pricechgadminExport } from '~/api/demo';
import Pagination from '~/models/pagination';

@Component({
  name: 'pageDemo',
  components: {
    WmTitle,
    DialogWidget,
    UploadWidget
  }
})
export default class DemoPage extends Vue {
  tableLoading: boolean = false;
  exportLoading: boolean = false;
  titleConfig: any = { title: '搜索条件', showLine: false };
  selectedRow: Array<any> = [];
  pagination: Pagination = {
    currentPage: 1,
    pageSize: 10,
    pageCount: 1,
    rowCount: 1,
    layout: 'total, sizes, prev, pager, next, jumper',
    pageArray: [10, 20, 30, 40, 50]
  };
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
  dialogObj: any = {
    visible: false,
    mode: undefined,
    title: undefined,
    data: undefined
  };

  mounted() {
    this.initFunc();
  }
  created() {}

  // 初始化页面数据
  initFunc() {
    const params = {};
    const loading = this.$loading({
      lock: true,
      spinner: 'wm-icon-loading',
      background: 'rgba(0, 0, 0, 0.3)'
    });
    getPageData(params)
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
    if (startFlag) {
      this.pagination.currentPage = 1;
    }
    const params = {
      orgNo: this.tableObj.orgNo,
      csId: this.tableObj.csId,
      reason: this.tableObj.reason,
      startDate: this.tableObj.startDate,
      endDate: this.tableObj.endDate,
      pageNum: this.pagination.currentPage,
      pageSize: this.pagination.pageSize
    };
    getList(params)
      .then((res: any) => {
        setTimeout(() => {
          this.tableLoading = false;
        }, 500);
        if (res.code === '0000') {
          this.pagination.pageCount = res.data.totalPage;
          this.pagination.rowCount = res.data.totalCount;
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
  // 重置
  refreshEvt() {
    if (this.pageData.userInfo.orgNo) {
      this.tableObj.orgNo = this.pageData.userInfo.orgNo;
    } else {
      this.tableObj.orgNo = undefined;
    }
    this.tableObj.csId = undefined; // 批次号
    this.tableObj.reason = undefined;
    this.tableObj.startDate = undefined; // 开始日期
    this.tableObj.endDate = undefined; // 结束日期
    this.pageData.dateArr = [];
  }
  // 每页条数改变
  sizeChangeEvt(value) {
    this.pagination.pageSize = value; // 单页行数
    this.queryEvt();
  }
  // 当前页改变
  currentChangeEvt(value) {
    this.pagination.currentPage = value; // 当前页
    this.queryEvt(false);
  }
  dateArrChange(value) {
    if (value) {
      this.tableObj.startDate = value[0]; // 查询起始日期
      this.tableObj.endDate = value[1]; // 查询结束日期
    } else {
      this.tableObj.startDate = undefined;
      this.tableObj.endDate = undefined;
      this.pageData.dateArr = [];
    }
  }
  selectedRowChange(selection) {
    this.selectedRow = selection;
  }
  addEvt() {
    this.dialogObj = {
      visible: true,
      mode: 'add',
      title: '新增购方信息'
    };
  }
  editEvt() {
    this.dialogObj = {
      visible: true,
      mode: 'edit',
      title: '编辑购方信息',
      data: {
        sku: 1,
        grossMarginRatio: 2
      }
    };
  }
  saveEvt(type) {
    if (type) {
      this.queryEvt();
    }
  }
  deleteEvt() {
    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
  }
  uploadEvt() {
    this.pageData.uploadVisible = true;
  }
  uploadcloseEvt() {
    this.pageData.uploadVisible = false;
  }
  downloadEvt() {
    const params = {
      orgNo: this.tableObj.orgNo, //  门店号
      equipmentCode: this.tableObj.equipmentCode, //  货架号
      positionId: this.tableObj.positionId, //  位置key
      areaType: this.tableObj.areaType, //  货架类型key
      deptCodes: this.tableObj.deptCodes, //  营运课列表
      merchCodes: this.tableObj.merchCodes, //  商品码列表
      startInvQty: this.tableObj.startInvQty, //  仓位库存起始
      endInvQty: this.tableObj.endInvQty //  仓位库存结束
    };
    this.$confirm('确认导出吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.exportLoading = true;
      window.open(
        pricechgadminExport() +
          '?orgNo=' +
          params.orgNo +
          '&equipmentCode=' +
          params.equipmentCode +
          '&positionId=' +
          params.positionId +
          '&areaType=' +
          params.areaType +
          '&deptCodes=' +
          params.deptCodes +
          '&merchCodes=' +
          params.merchCodes +
          '&startInvQty=' +
          params.startInvQty +
          '&endInvQty=' +
          params.endInvQty
      );
      setTimeout(() => {
        this.$message({
          type: 'success',
          message: '导出成功!',
          onClose: () => {
            this.exportLoading = false;
          }
        });
      }, 500);
    });
  }
}
</script>
