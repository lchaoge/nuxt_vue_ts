<template>
  <el-main>
    <!-- 面包屑 -->
    <div class="wmui-breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'homeLink' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>批量开票</el-breadcrumb-item>
        <el-breadcrumb-item>购方列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 面包屑 end -->

    <!-- 搜索条件 -->
    <div class="wmui-condition">
      <el-card :body-style="{ padding: '10px' }" shadow="never">
        <el-form label-position="right" label-width="120px">
          <el-row>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item>
                <label slot="label" class="control-label">测试门店：</label>
                <el-cascader
                  v-model="tableObj.orgNos"
                  :options="pageData.orgTreeInfoList"
                  :show-all-levels="false"
                  :props="{ multiple: true, emitPath: false }"
                  placeholder="请选择门店"
                  collapse-tags
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
                  @change="resetPage"
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
                  @change="resetPage"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item>
                <label slot="label" class="control-label">可用性：</label>
                <el-select
                  v-model="tableObj.keyongxing"
                  clearable
                  filterable
                  placeholder="请选择可用性"
                  @change="resetPage"
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
                  :picker-options="pickerOptions"
                  value-format="yyyy-MM-dd"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @change="dateArrChange"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :lg="24" class="tc">
              <el-button
                :loading="pageData.tableLoading"
                type="primary"
                icon="el-icon-search"
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
    </div>
    <!-- 搜索条件 end -->

    <!-- 列表 -->
    <div class="wmui-table-box">
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
            @click="downloadEvt"
            >导出</el-button
          >
        </el-col>
      </el-row>
      <el-table
        v-loading="pageData.tableLoading"
        :data="tableObj.list"
        stripe
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="auditorName" label="购方编号"></el-table-column>
        <el-table-column prop="orgNo" label="购方名称"></el-table-column>
        <el-table-column
          :min-width="150"
          prop="orgName"
          label="购方纳税人识别号"
        ></el-table-column>
        <el-table-column
          prop="merchTotalCount"
          label="地址电话"
        ></el-table-column>
        <el-table-column
          :min-width="150"
          prop="merchSyncCount"
          label="开户行及账号"
        ></el-table-column>
        <el-table-column
          prop="merchSyncRate"
          label="电子邮箱"
        ></el-table-column>
        <el-table-column prop="merchSyncDt" label="手机号"></el-table-column>
        <el-table-column prop="execFlagDesc" label="可用性"></el-table-column>
        <el-table-column prop="remark" label="创建时间"></el-table-column>
        <el-table-column prop="remark" label="创建人"></el-table-column>
      </el-table>
      <el-row class="wmui-pagination-box">
        <el-col :span="24">
          <el-pagination
            :current-page="tableObj.pageNum"
            :page-sizes="tableObj.pageArray"
            :page-size="tableObj.pageSize"
            :total="tableObj.totalCount"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="sizeChangeEvt"
            @current-change="currentChangeEvt"
          >
          </el-pagination>
        </el-col>
      </el-row>
    </div>
    <!-- 列表 end -->

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
import { Component, Vue } from 'vue-property-decorator'
import DialogWidget from '~/components/dialog/buyerList/dialogWidget.vue'
import UploadWidget from '~/components/dialog/buyerList/uploadWidget.vue'
import { getPageData, getList, pricechgadminExport } from '~/api/demo.ts'
@Component({
  components: {
    DialogWidget,
    UploadWidget
  },
  created() {}
  // props: {}
})
export default class Home extends Vue {
  pickerOptions: any = {
    shortcuts: [
      {
        text: '最近一周',
        onClick(picker) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
          picker.$emit('pick', [start, end])
        }
      },
      {
        text: '最近一个月',
        onClick(picker) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          picker.$emit('pick', [start, end])
        }
      },
      {
        text: '最近三个月',
        onClick(picker) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
          picker.$emit('pick', [start, end])
        }
      }
    ]
  }
  pageData: any = {
    tableLoading: false,
    reasonList: [],
    dateArr: [],
    userInfo: {
      orgNo: null, // 门店号
      regionNo: undefined, // 区域号
      userName: undefined, // 用户名称
      userType: 0 // 用户类型 0-总部 1-门店
    },
    orgTreeInfoList: [], // 组织机构
    uploadVisible: false
  }
  tableObj: any = {
    orgNos: null, // 门店号
    startDate: undefined, // 开始日期
    endDate: undefined, // 结束日期
    csId: undefined, // 批次号
    keyongxing: undefined,

    pageNum: 1,
    pageSize: 10,
    totalPage: 1, // 多少页
    totalCount: 1, // 总数
    pageArray: [10, 20, 30, 40, 50],
    list: []
  }
  dialogObj: any = {
    visible: false,
    mode: undefined,
    title: undefined,
    data: undefined
  }

  mounted() {
    this.$nextTick(() => {})
  }
  created() {
    this.initFunc()
  }
  // 初始化页面数据
  initFunc() {
    const params = {}
    getPageData(params).then((res: any) => {
      if (res.code === '0000') {
        this.pageData.orgTreeInfoList = res.data.orgTreeInfoList
        this.pageData.reasonList = res.data.reasonList
        this.pageData.userInfo = res.data.userInfo

        if (res.data.userInfo.orgNo) {
          this.tableObj.orgNos = []
          this.tableObj.orgNos.push(res.data.userInfo.orgNo)
        }
        this.queryEvt()
      } else {
        this.$message({
          type: 'error',
          message: res.msg,
          duration: 5000
        })
      }
    })
  }
  // 查询列表
  queryEvt() {
    const params = {
      orgNos: this.tableObj.orgNos,
      csId: this.tableObj.csId,
      startDate: this.tableObj.startDate,
      endDate: this.tableObj.endDate,
      pageNum: this.tableObj.pageNum,
      pageSize: this.tableObj.pageSize
    }
    this.pageData.tableLoading = true
    getList(params).then((res: any) => {
      setTimeout(() => {
        this.pageData.tableLoading = false
      }, 500)
      if (res.code === '0000') {
        this.tableObj.totalPage = res.data.totalPage
        this.tableObj.totalCount = res.data.totalCount
        this.tableObj.list = res.data.list
      } else {
        this.$message.error(res.result)
      }
    })
  }
  // 重置
  refreshEvt() {
    if (this.pageData.userInfo.orgNo) {
      this.tableObj.orgNos = []
      this.tableObj.orgNos.push(this.pageData.userInfo.orgNo)
    } else {
      this.tableObj.orgNos = null
    }
    this.tableObj.startDate = undefined // 开始日期
    this.tableObj.endDate = undefined // 结束日期
    this.tableObj.csId = undefined // 批次号
    this.pageData.dateArr = []
    this.resetPage()
  }
  resetPage() {
    this.tableObj.pageNum = 1
    this.tableObj.pageSize = 10
    this.tableObj.totalPage = 1 // 多少页
    this.tableObj.totalCount = 1 // 总数
  }
  // 每页条数改变
  sizeChangeEvt(val) {
    this.tableObj.pageSize = val // 单页行数
    this.queryEvt()
  }
  // 当前页改变
  currentChangeEvt(val) {
    this.tableObj.pageNum = val // 当前页
    this.queryEvt()
  }
  dateArrChange(value) {
    this.resetPage()
    if (value) {
      this.tableObj.startDate = value[0] // 查询起始日期
      this.tableObj.endDate = value[1] // 查询结束日期
    } else {
      this.tableObj.startDate = undefined
      this.tableObj.endDate = undefined
      this.pageData.dateArr = []
    }
  }
  handleSelectionChange() {}
  addEvt() {
    this.dialogObj = {
      visible: true,
      mode: 'add',
      title: '新增购方信息'
    }
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
    }
  }
  saveEvt(type) {
    if (type) {
      this.queryEvt()
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
        })
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
  }
  uploadEvt() {
    this.pageData.uploadVisible = true
  }
  uploadcloseEvt() {
    this.pageData.uploadVisible = false
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
    }
    this.$confirm('确认导出吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.pageData.exportLoading = true
      window.open(
        pricechgadminExport +
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
      )
      setTimeout(() => {
        this.$message({
          type: 'success',
          message: '导出成功!',
          onClose: () => {
            this.pageData.exportLoading = false
          }
        })
      }, 500)
    })
  }
}
</script>

<style lang="less"></style>
