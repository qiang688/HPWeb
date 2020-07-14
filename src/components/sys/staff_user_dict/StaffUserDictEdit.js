export default {
  name: 'di-table-edit',
  data () {
    return {
      dialogFormVisible: false,
      form: {
        id: '',
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
      rules: {
      },
      formValid: false
    }
  },
  methods: {
    openWin (openType, openParm) {
      var me = this
      if (openType === 'add') {
        me.showAdd()
      } else if (openType === 'edit') {
        me.showEdit(openParm)
      }
    },
    showAdd () {
      var me = this
      me.dialogFormVisible = true
      me.form = {}
    },
    showEdit (parm) {
      var me = this
      me.form = {}
      me.dialogFormVisible = true
      me.axiosPost(
        '/healthsys/StaffUserDict/getRecord',
        parm
      ).then(function (response) {
        var rpdata = response.data
        me.form = rpdata
      }).catch(function (error) {
        console.log(error)
      })
    },
    dataDel (parm, fun) {
      let me = this
      me.axiosPost(
        '/healthsys/StaffUserDict/deleteRecord',
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
      me.$refs['elForm'].validate((valid) => {
        if (valid) {
          me.fomrValid = true
        } else {
          me.fomrValid = false
        }
      })
      if (me.fomrValid === false) {
        me.$message({
          message: '请填写必填项！！！',
          type: 'error'
        })
        return
      }
      me.axiosPost(
        '/healthsys/StaffUserDict/saveRecord',
        me.form
      ).then(function (response) {
        me.dialogFormVisible = false
        me.$message({
          message: '数据保存成功！！！',
          type: 'success'
        })
      }).catch(function (error) {
        me.$message({
          message: '数据保存失败！' + error,
          type: 'error'
        })
      })
    }
  },
  mounted () {
  }
}

