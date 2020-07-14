<template >
  <el-container v-if="isshow" :style="constyle" class="list-container">
    <el-header class="list-header">
      <div style="padding: 0px">
        <span>{{ title }}</span>
        <div style="float: right">
          <el-button @click="butSearchClick" size="mini" type="primary" plain icon="el-icon-search">查询</el-button>
          <el-button @click="butAddClick" size="mini" type="primary" plain icon="el-icon-circle-plus-outline">新增</el-button>
          <el-button @click="butEditClick" size="mini" type="primary" plain icon="el-icon-edit">修改</el-button>
          <el-button @click="butDelClick" size="mini" type="primary" plain icon="el-icon-delete">删除</el-button>
        </div>
      </div>
    </el-header>
    <el-main class="list-main">
      <el-table
        ref="dataTable"
        :data="tableData"
        border
        style='width: 100%'
        size="mini"
        :height=tbHeight
        :cell-style="{height: '26px', padding: '0px'}"
        @row-dblclick="rowDblClick"
        highlight-current-row
        @current-change="currentRowChange"
        v-loading="dataloading"
      >
        <el-table-column
          prop="orgId"
          label="ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="orgName"
          label="机构名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="orgClass"
          label="机构类别"
          width="180">
        </el-table-column>
        <el-table-column
          prop="orgType"
          label="机构类型"
          width="180">
        </el-table-column>
        <el-table-column
          prop="orgScale"
          label="机构规模"
          width="180">
        </el-table-column>
        <el-table-column
          prop="orgLevel"
          label="机构等级"
          width="180">
        </el-table-column>
        <el-table-column
          prop="orgAlias"
          label="机构简称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="orgAbbr"
          label="机构缩写"
          width="180">
        </el-table-column>
        <el-table-column
          prop="englishName"
          label="机构英文名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="upperOrg"
          label="上级机构"
          width="180">
        </el-table-column>
        <el-table-column
          prop="zoneCode"
          label="机构行政区划"
          width="180">
        </el-table-column>
        <el-table-column
          prop="postAddress"
          label="通信地址"
          width="180">
        </el-table-column>
        <el-table-column
          prop="postCode"
          label="邮政编码"
          width="180">
        </el-table-column>
        <el-table-column
          prop="internetSite"
          label="网站地址"
          width="180">
        </el-table-column>
        <el-table-column
          prop="startIpAddress"
          label="机构IP起始号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="endIpAddress"
          label="机构IP终止号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="orgAuthorizationKey"
          label="机构授权码"
          width="180">
        </el-table-column>
        <el-table-column
          prop="currentResiCaseNo"
          label="当前住院号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="projectStartTime"
          label="系统进场时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="dispStartTime"
          label="门诊启用时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="resiStartTime"
          label="住院启用时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="projectEndTime"
          label="系统验收时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="validFlag"
          label="有效标志"
          width="180">
        </el-table-column>
        <el-table-column
          prop="userCode"
          label="用户编码"
          width="180">
        </el-table-column>
        <el-table-column
          prop="customCode"
          label="自定义编码"
          width="180">
        </el-table-column>
        <el-table-column
          prop="spellCode"
          label="拼音首码"
          width="180">
        </el-table-column>
        <el-table-column
          prop="wbzxCode"
          label="五笔首码"
          width="180">
        </el-table-column>
        <el-table-column
          prop="sortNo"
          label="排序号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="createOperator"
          label="创建人"
          width="180">
        </el-table-column>
        <el-table-column
          prop="modifyTime"
          label="修改时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="modifyOperator"
          label="修改人"
          width="180">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          width="180">
        </el-table-column>
        <el-table-column
          prop="zoneCustomCode"
          label="负责行政区"
          width="180">
        </el-table-column>
        <el-table-column
          prop="belongOrg"
          label="上级行政机构"
          width="180">
        </el-table-column>
        <el-table-column
          prop="organizationCode"
          label="组织机构编码"
          width="180">
        </el-table-column>
        <el-table-column
          prop="zoneCustomLevel"
          label="ZONE_CUSTOM_LEVEL"
          width="180">
        </el-table-column>
        <el-table-column
          prop="projectStatus"
          label="PROJECT_STATUS"
          width="180">
        </el-table-column>
        <el-table-column
          prop="allowJoinChat"
          label="ALLOW_JOIN_CHAT"
          width="180">
        </el-table-column>
        <el-table-column
          prop="isDeliveryOrg"
          label="IS_DELIVERY_ORG"
          width="180">
        </el-table-column>
        <el-table-column
          prop="orgMemo"
          label="ORG_MEMO"
          width="180">
        </el-table-column>
        <el-table-column
          prop="isHygieneOrg"
          label="IS_HYGIENE_ORG"
          width="180">
        </el-table-column>
        <el-table-column
          prop="sessionId"
          label="SESSION_ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="insurLogId"
          label="INSUR_LOG_ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="insurLogPass"
          label="INSUR_LOG_PASS"
          width="180">
        </el-table-column>
        <el-table-column
          prop="sessionCreateTime"
          label="SESSION_CREATE_TIME"
          width="180">
        </el-table-column>
        <el-table-column
          prop="orgCountyCode"
          label="严精国家机构编码"
          width="180">
        </el-table-column>
        <el-table-column
          prop="orgLx"
          label="基层机构类型"
          width="180">
        </el-table-column>
        <el-table-column
          prop="upperJfs"
          label="上级结防所"
          width="180">
        </el-table-column>
        <el-table-column
          prop="upperJszx"
          label="上级精神中心"
          width="180">
        </el-table-column>
        <el-table-column
          prop="zoneLevel"
          label="行政级别社区"
          width="180">
        </el-table-column>
        <el-table-column
          prop="zoneLevelJs"
          label="行政级别精神"
          width="180">
        </el-table-column>
        <el-table-column
          prop="orgId"
          label="orgId"
          width="180">
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer class="list-footer">
      <div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSizes"
          :page-size="25"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalRows">
        </el-pagination>
      </div>
    </el-footer>
    <OrgDictSearch ref="orgDictSearch"></OrgDictSearch>
  </el-container>
</template>

<script>
import OrgDictEdit from './OrgDictEdit.vue'
import OrgDictSearch from './OrgDictSearch.vue'
export default {
  name: 'OrgDict',
  components: {
    OrgDictEdit,
    OrgDictSearch
  },
  data () {
    return {
      title: '机构',
      isshow: true,
      tableData: [],
      tbHeight: null,
      totalRows: 0,
      currentPage: 1,
      pageSizes: [25, 50, 100, 150],
      pageSize: 25,
      currentRow: null,
      conditions: {
        pageNum: 1,
        pageSize: 25
      },
      constyle: 'height: 0px;',
      dataloading: false
    }
  },
  props: {
    openNewTabpage: {
      type: Function
    },
    openParm: {
      type: Object
    },
    tabHeight: {
      type: Number
    }
  },
  methods: {
    init: function () {
    },
    increment () {
      this.$store.commit('increment')
    },
    decrement () {
      this.$store.commit('decrement')
    },
    butCloseClick () {
      console.log('butCloseClick')
      this.isshow = false
    },
    getHeigth () {
      console.log('getHeigth')
    },
    handleSizeChange (val) {
      var me = this
      me.pageSize = val
      me.handleCurrentChange(1)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.dataLoad()
    },
    rowDblClick (row, e) {
      let me = this
      me.dataRowEdit(row)
    },
    currentRowChange (currentRow, oldCurrentRow) {
      this.currentRow = currentRow
    },
    // 按钮事件
    butEditClick () {
      let me = this
      if (me.currentRow == null) {
        me.$message.error('请选择要修改的记录！！！')
        return
      }
      me.dataRowEdit(me.currentRow)
    },
    butAddClick () {
      let me = this
      me.dataRowAdd()
    },
    butDelClick () {
      let me = this
      if (me.currentRow == null) {
        me.$message.error('请选择要删除的记录！！！')
        return
      }
      me.$confirm('确认删除？')
        .then(_ => {
          me.dataDel(me.currentRow, function () {
            me.dataLoad()
          })
        })
        .catch(_ => {})
    },
    butSearchClick () {
      let me = this
      me.dataSearch()
    },
    // 操作方法
    dataRowEdit (row) {
      var comp = OrgDictEdit
      this.openNewTabpage('', 'add', {
        component: comp,
        text: this.currentRow.orgName,
        index: 'OrgDictEdit_' + this.currentRow.orgId.toString(),
        openParm: {
          record: row,
          winType: 'OrgDictEdit',
          winIndex: 'OrgDictEdit_' + this.currentRow.orgId.toString()
        }
      })
    },
    dataRowAdd () {
      var comp = OrgDictEdit
      this.openNewTabpage('', 'add', {
        component: comp,
        text: '新建',
        index: 'tab_' + (this.$store.state.mainTabIndex++).toString(),
        openParm: {
          record: null,
          winType: 'OrgDictEdit',
          winIndex: ''
        }
      })
    },
    dataDel (row, fun) {
      let me = this
      me.axiosPost(
        '/OrgDict/deleteRecord',
        row
      ).then(function (response) {
        me.dialogFormVisible = false
        me.$message({
          message: '数据删除成功！！！',
          type: 'success'
        })
        fun()
      }).catch(function (error) {
        console.log(error)
      })
    },
    dataLoad () {
      var me = this
      me.conditions.pageNum = me.currentPage
      me.conditions.pageSize = me.pageSize
      me.dataloading = true
      me.axiosPost(
        '/OrgDict/getRecords',
        me.conditions
      ).then(function (response) {
        var rpdata = response.data.rows
        me.tableData = rpdata
        me.totalRows = response.data.total
        me.dataloading = false
      }).catch(function (error) {
        console.log(error)
        me.dataloading = false
      })
    },
    dataSearch () {
      let me = this
      this.$refs.orgDictSearch.$emit('show', function (conditions) {
        me.conditions = conditions
        me.dataLoad()
      })
    },
    resize (val) {
      var me = this
      me.tbHeight = val - 80
    }
  },
  computed: {
  },
  mounted () {
    var me = this
    me.dataLoad()
    me.resize(me.tabHeight)
  },
  destroyed () {
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
