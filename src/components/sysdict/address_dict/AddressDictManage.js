import AddressDictEdit from './AddressDictEdit.vue'
export default {
  name: 'addressDictManage',
  components: {
    AddressDictEdit
  },
  data () {
    return {
      dialogFormVisible: false,
      form: {
        address_id: null,
        org_id: null,
        zone_code: '',
        address_code: '',
        address_name: '',
        address_full_name: '',
        address_area: '',
        address_floor: '',
        address_number: '',
        address_parent: null,
        valid_flag: null,
        user_code: '',
        custom_code: '',
        spell_code: '',
        wbzx_code: '',
        sort_no: null,
        create_time: '',
        create_operator: null,
        modify_time: '',
        modify_operator: null,
        remark: '',
        sel_org_id: null
      },
      emptyForm: {
        address_id: null,
        org_id: null,
        zone_code: '',
        address_code: '',
        address_name: '',
        address_full_name: '',
        address_area: '',
        address_floor: '',
        address_number: '',
        address_parent: null,
        valid_flag: null,
        user_code: '',
        custom_code: '',
        spell_code: '',
        wbzx_code: '',
        sort_no: null,
        create_time: '',
        create_operator: null,
        modify_time: '',
        modify_operator: null,
        remark: '',
        sel_org_id: null
      },
      rules: {
        org_id: [
          { required: true, message: '请输入机构', trigger: 'blur' }
        ]
      },
      disabledFlag: {
        disabled_org_id: false,
        disabled_zone_code: false,
        disabled_address_code: false,
        disabled_address_name: false,
        disabled_address_full_name: false,
        disabled_address_area: false,
        disabled_address_floor: false,
        disabled_address_number: false,
        disabled_address_parent: false,
        disabled_valid_flag: false,
        disabled_user_code: false,
        disabled_custom_code: false,
        disabled_spell_code: false,
        disabled_wbzx_code: false,
        disabled_sort_no: false,
        disabled_create_time: false,
        disabled_create_operator: false,
        disabled_modify_time: false,
        disabled_modify_operator: false,
        disabled_remark: false,
        disabled_sel_org_id: false
      },
      readonlyFlag: {
        readonly_org_id: false,
        readonly_zone_code: false,
        readonly_address_code: false,
        readonly_address_name: false,
        readonly_address_full_name: false,
        readonly_address_area: false,
        readonly_address_floor: false,
        readonly_address_number: false,
        readonly_address_parent: false,
        readonly_valid_flag: false,
        readonly_user_code: false,
        readonly_custom_code: false,
        readonly_spell_code: false,
        readonly_wbzx_code: false,
        readonly_sort_no: false,
        readonly_create_time: false,
        readonly_create_operator: false,
        readonly_modify_time: false,
        readonly_modify_operator: false,
        readonly_remark: false,
        readonly_sel_org_id: false
      },
      formValid: false,
      fromDataLoading: false,
      userInfo: this.$store.state.userInfo,
      title: '地址',
      isshow: true,
      tableData: [],
      tbHeight: null,
      totalRows: 0,
      currentPage: 1,
      pageSizes: [25, 50, 100, 150],
      pageSize: 25,
      currentRow: null,
      conditions: {
        offset: 1,
        pageSize: 25
      },
      constyle: 'height: 100px;',
      dataloading: false,
      address_parent: 0,
      addressItems: [],
      addressCurrentRow: null
    }
  },
  props: {
    openNewTabpage: Function,
    closePanel: Function,
    openParm: Object,
    panelCode: String,
    formSaveCallback: Function,
    closeCallback: Function
  },
  methods: {
    init (parm) {
      var me = this
      me.dialogFormVisible = true
      // if (parm != null && parm.record != null && parm.record.address_id != null) {
      //   me.recordEdit(parm.record)
      // } else {
      //   me.recordAdd()
      // }
    },
    resize (val) {
    },
    setValueByDict (result) {
    },
    butSubmitClick () {
      var me = this
      me.closeCallback(me.addressCurrentRow)
      me.dialogFormVisible = false
      // me.recordSubmit()
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
        '/AddressDict/getRecord',
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
        '/AddressDict/deleteRecord',
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
        '/AddressDict/saveRecord',
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
          if (me.form.address_id == null || me.form.address_id === '') {
            me.form.address_id = response.data.data.text
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
    },
    butAddClick () {
      this.$refs.addressDictEdit.$emit('open', {address_parent: this.address_parent})
    },
    butEditClick () {},
    handleSizeChange (val) {
      var me = this
      me.pageSize = val
      me.handleCurrentChange(1)
    },
    handleCurrentChange (val) {
      this.currentPage = val
    },
    dataLoad (parm) {
      var me = this
      me.conditions.offset = me.currentPage
      me.conditions.pageSize = me.pageSize
      me.conditions.address_parent = parm.address_id
      me.dataloading = true
      me.axiosPost(
        '/AddressDict/getAddressByParent',
        me.conditions
      ).then(function (response) {
        var rpdata = response.data.rows
        me.tableData = rpdata
        me.totalRows = response.data.total
        me.dataloading = false
        if (parm.address_id > me.address_parent) {
          var addressItem = parm
          me.addressItems.push(addressItem)
        } else if (parm.address_id < me.address_parent) {
          for (let i = me.addressItems.length - 1; i >= 0; i--) {
            if (me.addressItems[i].address_id > parm.address_id) {
              me.addressItems.pop()
            }
          }
        }
        me.address_parent = parm.address_id
      }).catch(function (error) {
        console.log(error)
        me.dataloading = false
      })
    },
    rowClick (parm) {
      var me = this
      me.addressCurrentRow = parm
    },
    rowdblClick (parm) {
      var me = this
      me.dataLoad(parm)
    },
    addressRowSelected (parm) {
      var me = this
      if (me.addressCurrentRow != null && me.addressCurrentRow.address_id != null && me.addressCurrentRow.address_id === parm.address_id) {
        return 'address-row-selected'
      }
      return ''
    }
  },
  mounted () {
    this.$on('open', function (parm) {
      var me = this
      me.init(parm)
      if (me.address_parent === 0) {
        me.dataLoad({address_id: 0})
      }
    })
  }
}
