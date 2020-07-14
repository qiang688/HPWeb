export default {
  name: 'sysReportEdit',
  components: {
  },
  data () {
    return {
      dialogFormVisible: false,
      form: {
        report_id: null,
        report_no: '',
        report_name: '',
        view_template: '',
        report_css: '',
        report_title: '',
        valid_flag: 1
      },
      emptyForm: {
        report_id: null,
        report_no: '',
        report_name: '',
        view_template: '',
        report_css: '',
        report_title: '',
        valid_flag: 1
      },
      rules: {
        report_no: [
          { required: true, message: '请输入报表编码', trigger: 'blur' }
        ],
        report_name: [
          { required: true, message: '请输入报表名称', trigger: 'blur' }
        ],
        view_template: [
          { required: true, message: '请输入报表模板', trigger: 'blur' }
        ],
        report_css: [
          { required: true, message: '请输入报表样式', trigger: 'blur' }
        ],
        report_title: [
          { required: true, message: '请输入报表标题', trigger: 'blur' }
        ]
      },
      disabledFlag: {
        disabled_report_no: false,
        disabled_report_name: false,
        disabled_view_template: false,
        disabled_report_css: false,
        disabled_report_title: false,
        disabled_valid_flag: false
      },
      readonlyFlag: {
        readonly_report_no: false,
        readonly_report_name: false,
        readonly_view_template: false,
        readonly_report_css: false,
        readonly_report_title: false,
        readonly_valid_flag: false
      },
      formValid: false,
      constyle: 'height: 0px;',
      title: '',
      fromDataLoading: false,
      userInfo: this.$store.state.userInfo
    }
  },
  props: {
    openNewTabpage: {
      type: Function
    },
    closePanel: {
      type: Function
    },
    openParm: {
      type: Object
    },
    panelCode: {
      type: String
    }
  },
  methods: {
    init (parm) {
      var me = this
      me.dialogFormVisible = true
      if (parm != null && parm.record != null && parm.record.report_id != null) {
        me.recordEdit(parm.record)
      } else {
        me.recordAdd()
      }
    },
    resize (val) {
    },
    setValueByDict (result) {
    },
    butSubmitClick () {
      var me = this
      me.recordSubmit()
    },
    butDelClick () {
      let me = this
      me.$confirm('确认删除？')
        .then(_ => {
          me.recordDel()
        })
        .catch(_ => {})
    },
    formInit () {
    },
    recordAdd (parm) {
      var me = this
      me.form = me.emptyForm
      me.formInit()
    },
    recordEdit (parm) {
      var me = this
      me.form = {}
      me.fromDataLoading = true
      me.axiosPost(
        '/healthsys/SysReport/getRecord',
        parm
      ).then(function (response) {
        if (response.data.statusCode === 8200) {
          var rpdata = response.data.data
          me.form = rpdata
          me.fromDataLoading = false
        }
        if (response.data.statusCode === 8501) {
          me.$message({
            message: response.data.statusMess,
            type: 'error'
          })
        }
      }).catch(function (error) {
        me.fromDataLoading = false
        me.$message({
          message: error,
          type: 'error'
        })
      })
    },
    recordDel (parm, fun) {
      let me = this
      me.dialogFormVisible = true
      me.axiosPost(
        '/healthsys/SysReport/deleteRecord',
        me.form
      ).then(function (response) {
        me.dialogFormVisible = false
        me.$message({
          message: '数据删除成功！！！',
          type: 'success'
        })
        me.closePanel(me.panelCode)
      }).catch(function (error) {
        console.log(error)
      })
      me.dialogFormVisible = false
    },
    recordSubmit () {
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
      me.fromDataLoading = true
      me.axiosPost(
        '/healthsys/SysReport/saveRecord',
        me.form
      ).then(function (response) {
        me.fromDataLoading = false
        if (response.data.statusCode === 8500) {
          me.$message({
            message: response.data.data.text,
            type: 'error'
          })
        }
        if (response.data.statusCode === 8200) {
          if (me.form.report_id == null || me.form.report_id === '') {
            me.form.report_id = response.data.data.text
          }
          me.fromDataLoading = false
          me.$message({
            message: '数据保存成功！！！',
            type: 'success'
          })
        }
      }).catch(function (error) {
        me.fromDataLoading = false
        me.$message({
          message: '数据保存失败！' + error,
          type: 'error'
        })
      })
    }
  },
  mounted () {
    this.$on('open', function (parm) {
      var me = this
      me.init(parm)
    })
  }
}
