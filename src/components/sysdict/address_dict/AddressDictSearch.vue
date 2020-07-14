<template>
  <el-dialog title="查询条件" :visible.sync="dialogFormVisible">
    <el-form :model="form" size="mini" :label-width="formLabelWidth">
            <el-form-item label="机构">
        <el-input v-model="form.org_id"></el-input>
      </el-form-item>
      <el-form-item label="行政区划">
        <el-input v-model="form.zone_code"></el-input>
      </el-form-item>
      <el-form-item label="地址编码">
        <el-input v-model="form.address_code"></el-input>
      </el-form-item>
      <el-form-item label="地址名称">
        <el-input v-model="form.address_name"></el-input>
      </el-form-item>
      <el-form-item label="地址全称">
        <el-input v-model="form.address_full_name"></el-input>
      </el-form-item>
      <el-form-item label="ADDRESS_AREA">
        <el-input v-model="form.address_area"></el-input>
      </el-form-item>
      <el-form-item label="ADDRESS_FLOOR">
        <el-input v-model="form.address_floor"></el-input>
      </el-form-item>
      <el-form-item label="ADDRESS_NUMBER">
        <el-input v-model="form.address_number"></el-input>
      </el-form-item>
      <el-form-item label="上级地址">
        <el-input v-model="form.address_parent"></el-input>
      </el-form-item>
      <el-form-item label="有效标志">
        <el-input v-model="form.valid_flag"></el-input>
      </el-form-item>
      <el-form-item label="USER_CODE">
        <el-input v-model="form.user_code"></el-input>
      </el-form-item>
      <el-form-item label="CUSTOM_CODE">
        <el-input v-model="form.custom_code"></el-input>
      </el-form-item>
      <el-form-item label="SPELL_CODE">
        <el-input v-model="form.spell_code"></el-input>
      </el-form-item>
      <el-form-item label="WBZX_CODE">
        <el-input v-model="form.wbzx_code"></el-input>
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
      <el-form-item label="SEL_ORG_ID">
        <el-input v-model="form.sel_org_id"></el-input>
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
        zone_code: '',
        address_code: '',
        address_name: '',
        address_full_name: '',
        address_area: '',
        address_floor: '',
        address_number: '',
        address_parent: '',
        valid_flag: '',
        user_code: '',
        custom_code: '',
        spell_code: '',
        wbzx_code: '',
        sort_no: '',
        create_time: '',
        create_operator: '',
        modify_time: '',
        modify_operator: '',
        remark: '',
        sel_org_id: ''
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
        '/AddressDict/deleteRecord',
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
