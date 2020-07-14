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
          prop="id"
          label="ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="orgId"
          label="机构ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="staffCode"
          label="员工代码"
          width="180">
        </el-table-column>
        <el-table-column
          prop="staffName"
          label="员工姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="workCode"
          label="工作牌号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="workType"
          label="工作类型"
          width="180">
        </el-table-column>
        <el-table-column
          prop="workTitle"
          label="工作职称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="adminDept"
          label="所属行政科室"
          width="180">
        </el-table-column>
        <el-table-column
          prop="adminGroup"
          label="所属医组"
          width="180">
        </el-table-column>
        <el-table-column
          prop="staffBirthday"
          label="出生日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="staffSex"
          label="性别"
          width="180">
        </el-table-column>
        <el-table-column
          prop="dispPrepayOperatorSeqNo"
          label="门诊预交金操作员序号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="resiPrepayOperatorSeqNo"
          label="住院预交金操作员序号"
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
          prop="identityCardNo"
          label="身份证号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="staffCertificateNo"
          label="从业资格证编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="workTitleTime"
          label="职称评定时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="adminTeam"
          label="所属团队"
          width="180">
        </el-table-column>
        <el-table-column
          prop="staffPhone"
          label="联系电话"
          width="180">
        </el-table-column>
        <el-table-column
          prop="physicStaffCode"
          label="医师代码"
          width="180">
        </el-table-column>
        <el-table-column
          prop="useCaFlag"
          label="CA标志"
          width="180">
        </el-table-column>
        <el-table-column
          prop="phuseCaFlag"
          label="CA"
          width="180">
        </el-table-column>
        <el-table-column
          prop="id"
          label="id"
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
    <StaffDictSearch ref="staffDictSearch"></StaffDictSearch>
  </el-container>
</template>

<script>
import StaffDictEdit from './StaffDictEdit.vue'
import StaffDictSearch from './StaffDictSearch.vue'
export default {
  name: 'StaffDict',
  components: {
    StaffDictEdit,
    StaffDictSearch
  },
  data () {
    return {
      title: '职员',
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
      var comp = StaffDictEdit
      this.openNewTabpage('', 'add', {
        component: comp,
        text: this.currentRow.staffName,
        index: 'StaffDictEdit_' + this.currentRow.id.toString(),
        openParm: {
          record: row,
          winType: 'StaffDictEdit',
          winIndex: 'StaffDictEdit_' + this.currentRow.id.toString()
        }
      })
    },
    dataRowAdd () {
      var comp = StaffDictEdit
      this.openNewTabpage('', 'add', {
        component: comp,
        text: '新建',
        index: 'tab_' + (this.$store.state.mainTabIndex++).toString(),
        openParm: {
          record: null,
          winType: 'StaffDictEdit',
          winIndex: ''
        }
      })
    },
    dataDel (row, fun) {
      let me = this
      me.axiosPost(
        '/StaffDict/deleteRecord',
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
        '/StaffDict/getRecords',
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
      this.$refs.staffDictSearch.$emit('show', function (conditions) {
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
