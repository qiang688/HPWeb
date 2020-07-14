<template>
  <el-dialog title="查询条件" :visible.sync="dialogFormVisible">
    <el-form :model="form" size="mini" :label-width="formLabelWidth">
            <el-form-item label="ORG_ID">
        <el-input v-model="form.org_id"></el-input>
      </el-form-item>
      <el-form-item label="SPELL_CODE">
        <el-input v-model="form.spell_code"></el-input>
      </el-form-item>
      <el-form-item label="DICT_NAME">
        <el-input v-model="form.dict_name"></el-input>
      </el-form-item>
      <el-form-item label="WBZX_CODE">
        <el-input v-model="form.wbzx_code"></el-input>
      </el-form-item>
      <el-form-item label="CODE">
        <el-input v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item label="SORT_NO">
        <el-input v-model="form.sort_no"></el-input>
      </el-form-item>
      <el-form-item label="NAME">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="CREATE_TIME">
        <el-input v-model="form.create_time"></el-input>
      </el-form-item>
      <el-form-item label="VALID_FLAG">
        <el-input v-model="form.valid_flag"></el-input>
      </el-form-item>
      <el-form-item label="CREATE_OPERATOR">
        <el-input v-model="form.create_operator"></el-input>
      </el-form-item>
      <el-form-item label="CONFIG_DATA">
        <el-input v-model="form.config_data"></el-input>
      </el-form-item>
      <el-form-item label="MODIFY_TIME">
        <el-input v-model="form.modify_time"></el-input>
      </el-form-item>
      <el-form-item label="USER_CODE">
        <el-input v-model="form.user_code"></el-input>
      </el-form-item>
      <el-form-item label="MODIFY_OPERATOR">
        <el-input v-model="form.modify_operator"></el-input>
      </el-form-item>
      <el-form-item label="CUSTOM_CODE">
        <el-input v-model="form.custom_code"></el-input>
      </el-form-item>
      <el-form-item label="REMARK">
        <el-input v-model="form.remark"></el-input>
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
        '/BaseDict/deleteRecord',
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
