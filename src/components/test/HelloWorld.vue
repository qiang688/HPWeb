<template >
  <div v-if="isshow">
    <el-card class="box-card" :body-style="{ padding: '0px' }">
      <div style="padding: 5px 10px 12px 10px">
        <span>{{ title }}</span>
        <div style="float: right">
          <el-button @click="butSearchClick" size="mini" type="primary" plain icon="el-icon-search">查询</el-button>
          <el-button @click="butAddClick" size="mini" type="primary" plain icon="el-icon-circle-plus-outline">新增</el-button>
          <el-button @click="butEditClick" size="mini" type="primary" plain icon="el-icon-edit">修改</el-button>
          <el-button @click="butDelClick" size="mini" type="primary" plain icon="el-icon-delete">删除</el-button>
        </div>
      </div>
      <el-table
        ref="dataTable"
        :data="tableData"
        border
        style='width: 100%'
        size="mini"
        :height="tbHeight"
        :cell-style="{height: '26px', padding: '0px'}"
        @row-dblclick="rowDblClick"
        highlight-current-row
        @current-change="currentRowChange"
      >
        <el-table-column
          prop="id"
          label="#"
          width="60">
        </el-table-column>
        <el-table-column
          prop="owner_name"
          label="用户"
          width="180">
        </el-table-column>
        <el-table-column
          prop="table_name"
          label="表名">
        </el-table-column>
        <el-table-column
          prop="flag"
          label="状态">
        </el-table-column>
      </el-table>
      <div class="block">
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
    </el-card>
    <DiTableEdit ref="diTableEdit"></DiTableEdit>
    <DiTableSearch ref="diTableSearch"></DiTableSearch>
    <!--<div>-->
      <!--<p>{{ count }}</p>-->
      <!--<p>{{ height }}</p>-->
      <!--<p>-->
        <!--<el-button @click="increment">+</el-button>-->
        <!--<el-button @click="decrement">-</el-button>-->
      <!--</p>-->
    <!--</div>-->
    <!--<el-button type="primary" v-on:click="butCloseClick">关闭</el-button>-->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DiTableEdit from '../DiTableEdit.vue'
import DiTableSearch from '../DiTableSearch.vue'
export default {
  name: 'HelloWorld',
  components: {
    DiTableEdit,
    DiTableSearch
  },
  data () {
    return {
      title: '表配置管理',
      wsAddr: this.$store.state.WebServerAddress,
      isshow: true,
      screenHeight: document.documentElement.clientHeight,
      tableData: [],
      tbHeight: document.documentElement.clientHeight - 210,
      totalRows: 0,
      currentPage: 1,
      pageSizes: [25, 50, 100, 150],
      pageSize: 25,
      currentRow: null,
      conditions: {
        offset: 1,
        pageSize: 25
      }
    }
  },
  methods: {
    init: function () {
      alert('a')
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
      // this.$destroy()
    },
    getHeigth () {
      console.log('getHeigth')
    },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      var me = this
      me.pageSize = val
      me.handleCurrentChange(1)
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
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
      me.dataRowEdit(this.currentRow)
    },
    butAddClick () {
      let me = this
      me.dataRowAdd()
    },
    butDelClick () {
      let me = this
      this.$confirm('确认删除？')
        .then(_ => {
          // done()
          me.dataDel(this.currentRow, function () {
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
      this.$refs.diTableEdit.$emit('showEdit', row)
    },
    dataRowAdd () {
      this.$refs.diTableEdit.$emit('showAdd')
    },
    dataDel (row, fun) {
      this.$refs.diTableEdit.$emit('dataDel', row, fun)
    },
    dataLoad () {
      var me = this
      me.conditions.offset = me.currentPage
      me.conditions.pageSize = me.pageSize
      me.axiosPost(
        '/dataintegrationTableInfo',
        me.conditions
      ).then(function (response) {
        var rpdata = response.data.rows
        me.tableData = rpdata
        me.totalRows = response.data.total
      }).catch(function (error) {
        console.log(error)
      })
    },
    dataSearch () {
      let me = this
      this.$refs.diTableSearch.$emit('show', function (conditions) {
        me.conditions = conditions
        me.dataLoad()
      })
    }
  },
  computed: {
    ...mapState([
      'count',
      'height'
    ])
  },
  mounted () {
    console.log('helloworld.vue created')
    var me = this
    me.dataLoad()
    const that = this
    window.onresize = () => {
      return (() => {
        console.log('onresize:' + document.documentElement.clientHeight)
        window.screenHeight = document.documentElement.clientHeight
        that.screenHeight = window.screenHeight
      })()
    }
  },
  destroyed () {
    console.log('destroyed')
  },
  watch: {
    screenHeight (val) {
      console.log('screenHeight' + val)
      this.screenHeight = val
      this.tbHeight = this.screenHeight - 210
      console.log('tbHeight' + this.tbHeight)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*.clearfix:before,*/
  /*.clearfix:after {*/
    /*display: table;*/
    /*content: "";*/
  /*}*/
  /*.clearfix:after {*/
    /*clear: both*/
  /*}*/
</style>
