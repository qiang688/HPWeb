export default {
  name: 'orgDictEdit',
  components: {
  },
  data () {
    return {
      dialogFormVisible: false,
      form: {
        orgId: null,
        orgName: '',
        orgClass: '',
        orgType: null,
        orgScale: null,
        orgLevel: null,
        orgAlias: '',
        orgAbbr: '',
        englishName: '',
        upperOrg: null,
        zoneCode: '',
        postAddress: '',
        postCode: '',
        internetSite: '',
        startIpAddress: '',
        endIpAddress: '',
        orgAuthorizationKey: '',
        currentResiCaseNo: '',
        projectStartTime: '',
        dispStartTime: '',
        resiStartTime: '',
        projectEndTime: '',
        validFlag: null,
        userCode: '',
        customCode: '',
        spellCode: '',
        wbzxCode: '',
        sortNo: null,
        createTime: '',
        createOperator: null,
        modifyTime: '',
        modifyOperator: null,
        remark: '',
        zoneCustomCode: '',
        belongOrg: null,
        organizationCode: '',
        zoneCustomLevel: null,
        projectStatus: null,
        allowJoinChat: null,
        isDeliveryOrg: null,
        orgMemo: '',
        isHygieneOrg: null,
        sessionId: '',
        insurLogId: '',
        insurLogPass: '',
        sessionCreateTime: '',
        orgCountyCode: '',
        orgLx: null,
        upperJfs: null,
        upperJszx: null,
        zoneLevel: null,
        zoneLevelJs: null
      },
      emptyForm: {
        orgId: null,
        orgName: '',
        orgClass: '',
        orgType: null,
        orgScale: null,
        orgLevel: null,
        orgAlias: '',
        orgAbbr: '',
        englishName: '',
        upperOrg: null,
        zoneCode: '',
        postAddress: '',
        postCode: '',
        internetSite: '',
        startIpAddress: '',
        endIpAddress: '',
        orgAuthorizationKey: '',
        currentResiCaseNo: '',
        projectStartTime: '',
        dispStartTime: '',
        resiStartTime: '',
        projectEndTime: '',
        validFlag: null,
        userCode: '',
        customCode: '',
        spellCode: '',
        wbzxCode: '',
        sortNo: null,
        createTime: '',
        createOperator: null,
        modifyTime: '',
        modifyOperator: null,
        remark: '',
        zoneCustomCode: '',
        belongOrg: null,
        organizationCode: '',
        zoneCustomLevel: null,
        projectStatus: null,
        allowJoinChat: null,
        isDeliveryOrg: null,
        orgMemo: '',
        isHygieneOrg: null,
        sessionId: '',
        insurLogId: '',
        insurLogPass: '',
        sessionCreateTime: '',
        orgCountyCode: '',
        orgLx: null,
        upperJfs: null,
        upperJszx: null,
        zoneLevel: null,
        zoneLevelJs: null
      },
      rules: {
        orgName: [
          { required: true, message: '请输入机构名称', trigger: 'blur' }
        ],
        orgClass: [
          { required: true, message: '请输入机构类别', trigger: 'blur' }
        ]
      },
      disabledFlag: {
      },
      readonlyFlag: {
      },
      formValid: false,
      constyle: 'height: 0px;',
      title: '',
      fromDataLoading: false,
      userInfo: this.$store.state.userInfo
    }
  },
  props: {
    openNewTabpage: Function,
    closePanel: Function,
    openParm: Object,
    panelCode: String,
    formSaveCallback: Function
  },
  methods: {
    init (parm) {
      var me = this
      if (parm != null && parm.record != null && parm.record.orgId != null) {
        me.recordEdit(parm.record)
      } else {
        me.recordAdd(parm.record)
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
        '/OrgDict/getRecord',
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
        '/OrgDict/deleteRecord',
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
        '/OrgDict/saveRecord',
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
          if (me.form.orgId == null || me.form.orgId === '') {
            me.form.orgId = response.data.data.text
          }
          me.formSaveCallback('OrgDict', me.form)
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
    var me = this
    me.init(me.openParm)
  }
}
