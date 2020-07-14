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
          label="ORG_ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="spell_code"
          label="SPELL_CODE"
          width="180">
        </el-table-column>
        <el-table-column
          prop="dict_name"
          label="DICT_NAME"
          width="180">
        </el-table-column>
        <el-table-column
          prop="wbzx_code"
          label="WBZX_CODE"
          width="180">
        </el-table-column>
        <el-table-column
          prop="code"
          label="CODE"
          width="180">
        </el-table-column>
        <el-table-column
          prop="sort_no"
          label="SORT_NO"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="NAME"
          width="180">
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="CREATE_TIME"
          width="180">
        </el-table-column>
        <el-table-column
          prop="valid_flag"
          label="VALID_FLAG"
          width="180">
        </el-table-column>
        <el-table-column
          prop="create_operator"
          label="CREATE_OPERATOR"
          width="180">
        </el-table-column>
        <el-table-column
          prop="config_data"
          label="CONFIG_DATA"
          width="180">
        </el-table-column>
        <el-table-column
          prop="modify_time"
          label="MODIFY_TIME"
          width="180">
        </el-table-column>
        <el-table-column
          prop="user_code"
          label="USER_CODE"
          width="180">
        </el-table-column>
        <el-table-column
          prop="modify_operator"
          label="MODIFY_OPERATOR"
          width="180">
        </el-table-column>
        <el-table-column
          prop="custom_code"
          label="CUSTOM_CODE"
          width="180">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="REMARK"
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
    <BaseDictEdit ref="baseDictEdit"></BaseDictEdit>
    <BaseDictSearch ref="baseDictSearch"></BaseDictSearch>
  </el-container>
</template>

<script>
import { mapState } from 'vuex'
import BaseDictEdit from './BaseDictEdit.vue'
import BaseDictSearch from './BaseDictSearch.vue'
export default {
  name: 'BaseDict',
  components: {
    BaseDictEdit,
    BaseDictSearch
  },
  data () {
    return {
      title: '基础字典',
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
      this.$refs.baseDictEdit.$emit('showEdit', row)
    },
    dataRowAdd () {
      this.$refs.baseDictEdit.$emit('showAdd')
    },
    dataDel (row, fun) {
      this.$refs.baseDictEdit.$emit('dataDel', row, fun)
    },
    dataLoad () {
      var me = this
      me.conditions.offset = me.currentPage
      me.conditions.pageSize = me.pageSize
      me.dataloading = true
      me.axiosPost(
        '/healthsys/BaseDict/getRecords',
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
      this.$refs.baseDictSearch.$emit('show', function (conditions) {
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
