<template>
  <el-dialog title="查询条件" :visible.sync="dialogFormVisible">
    <el-form :model="form" size="mini" :label-width="formLabelWidth">
            <el-form-item label="ID">
        <el-input v-model="form.zoneId"></el-input>
      </el-form-item>
      <el-form-item label="机构ID">
        <el-input v-model="form.orgId"></el-input>
      </el-form-item>
      <el-form-item label="行政区代码">
        <el-input v-model="form.zoneCode"></el-input>
      </el-form-item>
      <el-form-item label="行政区名称">
        <el-input v-model="form.zoneName"></el-input>
      </el-form-item>
      <el-form-item label="行政区级别">
        <el-input v-model="form.zoneLevel"></el-input>
      </el-form-item>
      <el-form-item label="有效标志">
        <el-input v-model="form.validFlag"></el-input>
      </el-form-item>
      <el-form-item label="用户编码">
        <el-input v-model="form.userCode"></el-input>
      </el-form-item>
      <el-form-item label="自定义编码">
        <el-input v-model="form.customCode"></el-input>
      </el-form-item>
      <el-form-item label="拼音首码">
        <el-input v-model="form.spellCode"></el-input>
      </el-form-item>
      <el-form-item label="五笔首码">
        <el-input v-model="form.wbzxCode"></el-input>
      </el-form-item>
      <el-form-item label="排序号">
        <el-input v-model="form.sortNo"></el-input>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-input v-model="form.createTime"></el-input>
      </el-form-item>
      <el-form-item label="创建人">
        <el-input v-model="form.createOperator"></el-input>
      </el-form-item>
      <el-form-item label="修改时间">
        <el-input v-model="form.modifyTime"></el-input>
      </el-form-item>
      <el-form-item label="修改人">
        <el-input v-model="form.modifyOperator"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
      <el-form-item label="家庭健康档案当前编号">
        <el-input v-model="form.healthArchiveNo"></el-input>
      </el-form-item>
      <el-form-item label="严精国家编码">
        <el-input v-model="form.zoneCountyCode"></el-input>
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
        zoneId: '',
        orgId: '',
        zoneCode: '',
        zoneName: '',
        zoneLevel: '',
        validFlag: '',
        userCode: '',
        customCode: '',
        spellCode: '',
        wbzxCode: '',
        sortNo: '',
        createTime: '',
        createOperator: '',
        modifyTime: '',
        modifyOperator: '',
        remark: '',
        healthArchiveNo: '',
        zoneCountyCode: ''
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
        '/ZoneDict/deleteRecord',
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
