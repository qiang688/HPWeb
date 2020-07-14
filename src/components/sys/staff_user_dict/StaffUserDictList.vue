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
          prop="org_id"
          label="机构ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="login_user"
          label="登录用户名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="login_password"
          label="登录用户密码"
          width="180">
        </el-table-column>
        <el-table-column
          prop="login_limit_role"
          label="登录角色限制"
          width="180">
        </el-table-column>
        <el-table-column
          prop="staff_code"
          label="员工代码"
          width="180">
        </el-table-column>
        <el-table-column
          prop="super_user_flag"
          label="超级用户标志"
          width="180">
        </el-table-column>
        <el-table-column
          prop="valid_flag"
          label="有效标志"
          width="180">
        </el-table-column>
        <el-table-column
          prop="sort_no"
          label="排序号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="create_operator"
          label="创建人"
          width="180">
        </el-table-column>
        <el-table-column
          prop="modify_time"
          label="修改时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="modify_operator"
          label="修改人"
          width="180">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          width="180">
        </el-table-column>
        <el-table-column
          prop="spell_code"
          label="SPELL_CODE"
          width="180">
        </el-table-column>
        <el-table-column
          prop="wbzx_code"
          label="WBZX_CODE"
          width="180">
        </el-table-column>
        <el-table-column
          prop="openid"
          label="统一登录"
          width="180">
        </el-table-column>
        <el-table-column
          prop="birth_account_type"
          label="BIRTH_ACCOUNT_TYPE"
          width="180">
        </el-table-column>
        <el-table-column
          prop="birth_account_update"
          label="BIRTH_ACCOUNT_UPDATE"
          width="180">
        </el-table-column>
        <el-table-column
          prop="birth_last_upload_time"
          label="BIRTH_LAST_UPLOAD_TIME"
          width="180">
        </el-table-column>
        <el-table-column
          prop="id_no"
          label="ID_NO"
          width="180">
        </el-table-column>
        <el-table-column
          prop="login_fail_count"
          label="LOGIN_FAIL_COUNT"
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
    <StaffUserDictEdit ref="staffUserDictEdit"></StaffUserDictEdit>
    <StaffUserDictSearch ref="staffUserDictSearch"></StaffUserDictSearch>
  </el-container>
</template>

<script>
import { mapState } from 'vuex'
import StaffUserDictEdit from './StaffUserDictEdit.vue'
import StaffUserDictSearch from './StaffUserDictSearch.vue'
export default {
  name: 'StaffUserDict',
  components: {
    StaffUserDictEdit,
    StaffUserDictSearch
  },
  data () {
    return {
      title: '用户',
      isshow: true,
      screenHeight: document.documentElement.clientHeight,
      tableData: [],
      tbHeight: document.documentElement.clientHeight - 170,
      totalRows: 0,
      currentPage: 1,
      pageSizes: [25, 50, 100, 150],
      pageSize: 25,
      currentRow: null,
      conditions: {
        offset: 1,
        pageSize: 25
      },
      constyle: 'height: 0px;',
      dataloading: false
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
      this.$refs.staffUserDictEdit.openWin('edit', row)
    },
    dataRowAdd () {
      this.$refs.staffUserDictEdit.openWin('add')
    },
    dataDel (row, fun) {
      this.$refs.staffUserDictEdit.dataDel(row, fun)
    },
    dataLoad () {
      var me = this
      me.conditions.offset = me.currentPage
      me.conditions.pageSize = me.pageSize
      me.dataloading = true
      me.axiosPost(
        '/healthsys/StaffUserDict/getRecords',
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
      this.$refs.staffUserDictSearch.$emit('show', function (conditions) {
        me.conditions = conditions
        me.dataLoad()
      })
    },
    resize (val) {
      var me = this
      var containerHeight = this.containerResize(me, val)
      me.tbHeight = containerHeight - 76
    }
  },
  computed: {
    ...mapState([
      'count',
      'height'
    ])
  },
  mounted () {
    var me = this
    me.resize(document.documentElement.clientHeight)
    me.dataLoad()
    window.addEventListener('resize', () => {
      return (() => {
        me.screenHeight = document.documentElement.clientHeight
      })()
    }, false)
  },
  destroyed () {
  },
  watch: {
    screenHeight (val) {
      var me = this
      me.resize(val)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
