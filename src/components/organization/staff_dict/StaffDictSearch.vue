<template>
  <el-dialog title="查询条件" :visible.sync="dialogFormVisible">
    <el-form :model="form" size="mini" :label-width="formLabelWidth">
            <el-form-item label="ID">
        <el-input v-model="form.id"></el-input>
      </el-form-item>
      <el-form-item label="机构ID">
        <el-input v-model="form.orgId"></el-input>
      </el-form-item>
      <el-form-item label="员工代码">
        <el-input v-model="form.staffCode"></el-input>
      </el-form-item>
      <el-form-item label="员工姓名">
        <el-input v-model="form.staffName"></el-input>
      </el-form-item>
      <el-form-item label="工作牌号">
        <el-input v-model="form.workCode"></el-input>
      </el-form-item>
      <el-form-item label="工作类型">
        <el-input v-model="form.workType"></el-input>
      </el-form-item>
      <el-form-item label="工作职称">
        <el-input v-model="form.workTitle"></el-input>
      </el-form-item>
      <el-form-item label="所属行政科室">
        <el-input v-model="form.adminDept"></el-input>
      </el-form-item>
      <el-form-item label="所属医组">
        <el-input v-model="form.adminGroup"></el-input>
      </el-form-item>
      <el-form-item label="出生日期">
        <el-input v-model="form.staffBirthday"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-input v-model="form.staffSex"></el-input>
      </el-form-item>
      <el-form-item label="门诊预交金操作员序号">
        <el-input v-model="form.dispPrepayOperatorSeqNo"></el-input>
      </el-form-item>
      <el-form-item label="住院预交金操作员序号">
        <el-input v-model="form.resiPrepayOperatorSeqNo"></el-input>
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
      <el-form-item label="身份证号">
        <el-input v-model="form.identityCardNo"></el-input>
      </el-form-item>
      <el-form-item label="从业资格证编号">
        <el-input v-model="form.staffCertificateNo"></el-input>
      </el-form-item>
      <el-form-item label="职称评定时间">
        <el-input v-model="form.workTitleTime"></el-input>
      </el-form-item>
      <el-form-item label="所属团队">
        <el-input v-model="form.adminTeam"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="form.staffPhone"></el-input>
      </el-form-item>
      <el-form-item label="医师代码">
        <el-input v-model="form.physicStaffCode"></el-input>
      </el-form-item>
      <el-form-item label="CA标志">
        <el-input v-model="form.useCaFlag"></el-input>
      </el-form-item>
      <el-form-item label="CA">
        <el-input v-model="form.phuseCaFlag"></el-input>
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
        id: '',
        orgId: '',
        staffCode: '',
        staffName: '',
        workCode: '',
        workType: '',
        workTitle: '',
        adminDept: '',
        adminGroup: '',
        staffBirthday: '',
        staffSex: '',
        dispPrepayOperatorSeqNo: '',
        resiPrepayOperatorSeqNo: '',
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
        identityCardNo: '',
        staffCertificateNo: '',
        workTitleTime: '',
        adminTeam: '',
        staffPhone: '',
        physicStaffCode: '',
        useCaFlag: '',
        phuseCaFlag: ''
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
        '/StaffDict/deleteRecord',
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
