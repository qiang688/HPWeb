<template>
  <el-dialog title="查询条件" :visible.sync="dialogFormVisible">
    <el-form :model="form" size="mini" :label-width="formLabelWidth">
            <el-form-item label="机构ID">
        <el-input v-model="form.org_id"></el-input>
      </el-form-item>
      <el-form-item label="登录用户名">
        <el-input v-model="form.login_user"></el-input>
      </el-form-item>
      <el-form-item label="登录用户密码">
        <el-input v-model="form.login_password"></el-input>
      </el-form-item>
      <el-form-item label="登录角色限制">
        <el-input v-model="form.login_limit_role"></el-input>
      </el-form-item>
      <el-form-item label="员工代码">
        <el-input v-model="form.staff_code"></el-input>
      </el-form-item>
      <el-form-item label="超级用户标志">
        <el-input v-model="form.super_user_flag"></el-input>
      </el-form-item>
      <el-form-item label="有效标志">
        <el-input v-model="form.valid_flag"></el-input>
      </el-form-item>
      <el-form-item label="排序号">
        <el-input v-model="form.sort_no"></el-input>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-input v-model="form.create_time"></el-input>
      </el-form-item>
      <el-form-item label="创建人">
        <el-input v-model="form.create_operator"></el-input>
      </el-form-item>
      <el-form-item label="修改时间">
        <el-input v-model="form.modify_time"></el-input>
      </el-form-item>
      <el-form-item label="修改人">
        <el-input v-model="form.modify_operator"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
      <el-form-item label="SPELL_CODE">
        <el-input v-model="form.spell_code"></el-input>
      </el-form-item>
      <el-form-item label="WBZX_CODE">
        <el-input v-model="form.wbzx_code"></el-input>
      </el-form-item>
      <el-form-item label="统一登录">
        <el-input v-model="form.openid"></el-input>
      </el-form-item>
      <el-form-item label="BIRTH_ACCOUNT_TYPE">
        <el-input v-model="form.birth_account_type"></el-input>
      </el-form-item>
      <el-form-item label="BIRTH_ACCOUNT_UPDATE">
        <el-input v-model="form.birth_account_update"></el-input>
      </el-form-item>
      <el-form-item label="BIRTH_LAST_UPLOAD_TIME">
        <el-input v-model="form.birth_last_upload_time"></el-input>
      </el-form-item>
      <el-form-item label="ID_NO">
        <el-input v-model="form.id_no"></el-input>
      </el-form-item>
      <el-form-item label="LOGIN_FAIL_COUNT">
        <el-input v-model="form.login_fail_count"></el-input>
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
        org_id: '',
        login_user: '',
        login_password: '',
        login_limit_role: '',
        staff_code: '',
        super_user_flag: '',
        valid_flag: '',
        sort_no: '',
        create_time: '',
        create_operator: '',
        modify_time: '',
        modify_operator: '',
        remark: '',
        spell_code: '',
        wbzx_code: '',
        openid: '',
        birth_account_type: '',
        birth_account_update: '',
        birth_last_upload_time: '',
        id_no: '',
        login_fail_count: ''
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
        '/StaffUserDict/deleteRecord',
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
