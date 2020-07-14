<template>
  <el-dialog title="请选择" :visible.sync="dialogTableVisible" append-to-body>
    <el-table :data="gridData" size="mini" @row-click="rowClick">
      <el-table-column property="label" label="姓名" width="200"></el-table-column>
      <el-table-column property="value" label="编码"></el-table-column>
    </el-table>
  </el-dialog>
</template>
<script>
export default {
  name: 'cq-input-select-box',
  data () {
    return {
      gridData: [],
      dialogTableVisible: false
    }
  },
  props: {
    setValue: Function,
    columnName: String
  },
  methods: {
    show (parm) {
      var me = this
      me.dataLoad(parm)
      me.dialogTableVisible = true
    },
    dataLoad (parm) {
      var me = this
      var parmString = parm.split('?', 2)
      var parmUrl = parmString[0]
      var condition = {condition: parmString[1]}
      me.axiosPost(
        parmUrl,
        condition
      ).then(function (response) {
        var rpdata = response.data.rows
        me.gridData = rpdata
        me.dataloading = false
      }).catch(function (error) {
        console.log(error)
        me.dataloading = false
      })
    },
    rowClick (row) {
      var me = this
      var result = {
        columnName: me.columnName,
        value: row.value,
        label: row.label
      }
      me.setValue(result)
      me.dialogTableVisible = false
    }
  },
  mounted () {
    this.$on('show', function (parm, submitBackFun) {
      let me = this
      // me.submitBackFun = submitBackFun
      me.show(parm)
    })
  }
}
</script>

<style scoped>
</style>
