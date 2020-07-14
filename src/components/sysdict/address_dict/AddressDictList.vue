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
          label="机构"
          width="180">
        </el-table-column>
        <el-table-column
          prop="zone_code"
          label="行政区划"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address_code"
          label="地址编码"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address_name"
          label="地址名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address_full_name"
          label="地址全称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address_area"
          label="ADDRESS_AREA"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address_floor"
          label="ADDRESS_FLOOR"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address_number"
          label="ADDRESS_NUMBER"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address_parent"
          label="上级地址"
          width="180">
        </el-table-column>
        <el-table-column
          prop="valid_flag"
          label="有效标志"
          width="180">
        </el-table-column>
        <el-table-column
          prop="user_code"
          label="USER_CODE"
          width="180">
        </el-table-column>
        <el-table-column
          prop="custom_code"
          label="CUSTOM_CODE"
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
          prop="sel_org_id"
          label="SEL_ORG_ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address_id"
          label="address_id"
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
    <AddressDictSearch ref="addressDictSearch"></AddressDictSearch>
    <AddressDictEdit ref="addressDictEdit"></AddressDictEdit>
  </el-container>
</template>

<script>
import AddressDictEdit from './AddressDictEdit.vue'
import AddressDictSearch from './AddressDictSearch.vue'
export default {
  name: 'AddressDict',
  components: {
    AddressDictEdit,
    AddressDictSearch
  },
  data () {
    return {
      title: '地址',
      isshow: true,
      tableData: [],
      tbHeight: null,
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
      var parm = {
        record: row
      }
      this.$refs.addressDictEdit.$emit('open', parm)
    },
    dataRowAdd () {
      this.$refs.addressDictEdit.$emit('open')
    },
    dataDel (row, fun) {
      let me = this
      me.axiosPost(
        '/AddressDict/deleteRecord',
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
      me.conditions.offset = me.currentPage
      me.conditions.pageSize = me.pageSize
      me.dataloading = true
      me.axiosPost(
        '/AddressDict/getRecords',
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
      this.$refs.addressDictSearch.$emit('show', function (conditions) {
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
