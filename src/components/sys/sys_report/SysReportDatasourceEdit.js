export default {
  name: 'sysReportDatasourceEdit',
  components: {
  },
  data () {
    return {
      dialogFormVisible: false,
      form: {
        id: null,
        report_id: null,
        data_source_name: '',
        data_source_file: '',
        valid_flag: 1
      },
      emptyForm: {
        id: null,
        report_id: null,
        data_source_name: '',
        data_source_file: '',
        valid_flag: 1
      },
      rules: {
        report_id: [
          { required: true, message: '请输入报表id', trigger: 'blur' }
        ],
        data_source_name: [
          { required: true, message: '请输入报表数据源名称', trigger: 'blur' }
        ],
        data_source_file: [
          { required: true, message: '请输入报表数据源文件', trigger: 'blur' }
        ]
      },
      disabledFlag: {
        disabled_report_id: false,
        disabled_data_source_name: false,
        disabled_data_source_file: false,
        disabled_valid_flag: false
      },
      readonlyFlag: {
        readonly_report_id: false,
        readonly_data_source_name: false,
        readonly_data_source_file: false,
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
      if (parm != null && parm.record != null && parm.record.id != null) {
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
      me.form.report_id = parm.report_id
      me.formInit()
    },
    recordEdit (parm) {
      var me = this
      me.form = {}
      me.fromDataLoading = true
      me.axiosPost(
        '/healthsys/SysReportDatasource/getRecord',
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
        '/healthsys/SysReportDatasource/deleteRecord',
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
        '/healthsys/SysReportDatasource/saveRecord',
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
          if (me.form.id == null || me.form.id === '') {
            me.form.id = response.data.data.text
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
