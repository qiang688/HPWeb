<template>
  <el-dialog title="基础字典" :visible.sync="dialogFormVisible" width="80%">
    <el-form :model="form" :rules="rules" ref="elForm" size="mini" :label-width="formLabelWidth">
      <el-row><el-col :span="12"><el-form-item label="ORG_ID" prop="org_id"><el-input v-model="form.org_id"/></el-form-item></el-col><el-col :span="12"><el-form-item label="SPELL_CODE" prop="spell_code"><el-input v-model="form.spell_code"/></el-form-item></el-col></el-row>
      <el-row><el-col :span="12"><el-form-item label="DICT_NAME" prop="dict_name"><el-input v-model="form.dict_name"/></el-form-item></el-col><el-col :span="12"><el-form-item label="WBZX_CODE" prop="wbzx_code"><el-input v-model="form.wbzx_code"/></el-form-item></el-col></el-row>
      <el-row><el-col :span="12"><el-form-item label="CODE" prop="code"><el-input v-model="form.code"/></el-form-item></el-col><el-col :span="12"><el-form-item label="SORT_NO" prop="sort_no"><el-input v-model="form.sort_no"/></el-form-item></el-col></el-row>
      <el-row><el-col :span="12"><el-form-item label="NAME" prop="name"><el-input v-model="form.name"/></el-form-item></el-col><el-col :span="12"><el-form-item label="CREATE_TIME" prop="create_time"><div class="block"><el-date-picker v-model="form.create_time" type="datetime" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss"/></div></el-form-item></el-col></el-row>
      <el-row><el-col :span="12"><el-form-item label="VALID_FLAG" prop="valid_flag"><el-input v-model="form.valid_flag"/></el-form-item></el-col><el-col :span="12"><el-form-item label="CREATE_OPERATOR" prop="create_operator"><el-input v-model="form.create_operator"/></el-form-item></el-col></el-row>
      <el-row><el-col :span="12"><el-form-item label="CONFIG_DATA" prop="config_data"><el-input v-model="form.config_data"/></el-form-item></el-col><el-col :span="12"><el-form-item label="MODIFY_TIME" prop="modify_time"><div class="block"><el-date-picker v-model="form.modify_time" type="datetime" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss"/></div></el-form-item></el-col></el-row>
      <el-row><el-col :span="12"><el-form-item label="USER_CODE" prop="user_code"><el-input v-model="form.user_code"/></el-form-item></el-col><el-col :span="12"><el-form-item label="MODIFY_OPERATOR" prop="modify_operator"><el-input v-model="form.modify_operator"/></el-form-item></el-col></el-row>
      <el-row><el-col :span="12"><el-form-item label="CUSTOM_CODE" prop="custom_code"><el-input v-model="form.custom_code"/></el-form-item></el-col><el-col :span="12"><el-form-item label="REMARK" prop="remark"><el-input v-model="form.remark"/></el-form-item></el-col></el-row>
    </el-form>
    <div slot="footer" class="dialog-footer" >
      <el-button size="mini"  @click="dialogFormVisible = false">取 消</el-button>
      <el-button size="mini" type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'di-table-edit',
  data () {
    return {
      dialogFormVisible: false,
      form: {
        id: '',
        org_id: '',
        spell_code: '',
        dict_name: '',
        wbzx_code: '',
        code: '',
        sort_no: '',
        name: '',
        create_time: '',
        valid_flag: '',
        create_operator: '',
        config_data: '',
        modify_time: '',
        user_code: '',
        modify_operator: '',
        custom_code: '',
        remark: ''
      },
      rules: {
        dict_name: [
          { required: true, message: '请输入dict_name', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入code', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入name', trigger: 'blur' }
        ]
      },
      formLabelWidth: '100px',
      formValid: false
    }
  },
  methods: {
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
        '/healthsys/BaseDict/getRecord',
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
        '/healthsys/BaseDict/deleteRecord',
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
        '/healthsys/BaseDict/saveRecord',
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
    this.$on('showEdit', function (parm) {
      var me = this
      me.showEdit(parm)
    })
    this.$on('showAdd', function (parm) {
      var me = this
      me.showAdd()
    })
    this.$on('dataDel', function (parm, fun) {
      var me = this
      me.dataDel(parm, fun)
    })
  }
}
</script>

<style scoped>
</style>
