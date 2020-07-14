<template>
  <el-dialog title="查询条件" :visible.sync="dialogFormVisible">
    <el-form :model="form" size="mini" :label-width="formLabelWidth">
            <el-form-item label="报表ID">
        <el-input v-model="form.report_id"></el-input>
      </el-form-item>
      <el-form-item label="报表数据源名称">
        <el-input v-model="form.data_source_name"></el-input>
      </el-form-item>
      <el-form-item label="报表数据源文件">
        <el-input v-model="form.data_source_file"></el-input>
      </el-form-item>
      <el-form-item label="有效标志">
        <el-input v-model="form.valid_flag"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" >
      <el-button size="mini"  @click="dialogFormVisible = false">取 消</el-button>
      <el-button size="mini" type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'di-table-search',
  data () {
    return {
      dialogFormVisible: false,
      form: {
        report_id: '',
        data_source_name: '',
        data_source_file: '',
        valid_flag: ''
      },
      formLabelWidth: '80px'
    }
  },
  methods: {
    show () {
      var me = this
      me.dialogFormVisible = true
      me.form = {}
    },
    showAdd () {
      var me = this
      me.dialogFormVisible = true
      me.form = {}
    },
    showEdit (parm) {
      var me = this
      me.dialogFormVisible = true
      me.form = parm
    },
    dataDel (parm, fun) {
      let me = this
      me.axiosPost(
        '/SysReportDatasource/deleteRecord',
        parm
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
    submit () {
      let me = this
      me.submitBackFun(me.form)
      me.dialogFormVisible = false
    }
  },
  mounted () {
    this.$on('showEdit', function (parm) {
      let me = this
      me.showEdit(parm)
    })
    this.$on('showAdd', function (parm) {
      let me = this
      me.showAdd()
    })
    this.$on('dataDel', function (parm, fun) {
      let me = this
      me.dataDel(parm, fun)
    })
    this.$on('show', function (submitBackFun) {
      let me = this
      me.submitBackFun = submitBackFun
      me.show()
    })
  }
}
</script>

<style scoped>
</style>
