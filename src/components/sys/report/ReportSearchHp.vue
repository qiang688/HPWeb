<template>
  <el-dialog title="统计条件" :visible.sync="dialogFormVisible">
    <el-form :model="form" size="mini" :label-width="formLabelWidth">
      <el-row>
        <el-col :xs="24" :sm="12" :md="12" :lg="12">
          <el-form-item label="区局" prop="county_name">
            <cq-input-select-county v-model="form.county_name" dataurl="/OrganizationDict/getDict?dict_name=county" columnName="county_name" :setValue="setValueByDict" :disabled="disabledFlag.disabled_county_name" :readonly="readonlyFlag.readonly_county_name"/>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12">
          <el-form-item label="辖区机构" prop="org_id_name">
            <cq-input-select-org :getUpperOrg="getUpperOrgOrgIdName" v-model="form.org_id_name" dataurl="/OrganizationDict/getDict?dict_name=org" columnName="org_id_name" :setValue="setValueByDict" :disabled="disabledFlag.disabled_org_id_name" :readonly="readonlyFlag.readonly_org_id_name"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="12" :md="8" :lg="8">
          <el-form-item label="日期">
            <div class="block">
              <el-date-picker
                v-model="form.end_date"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
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
        search_date: '',
        end_date: null,
        county_id: -1,
        county_name: '',
        org_id: -1,
        org_id_name: ''
      },
      disabledFlag: {
        disabled_county_id: false,
        disabled_county_name: false,
        disabled_org_id: false,
        disabled_org_id_name: false
      },
      readonlyFlag: {
        readonly_county_id: false,
        readonly_county_name: false,
        readonly_org_id: false,
        readonly_org_id_name: false
      },
      formLabelWidth: '80px'
    }
  },
  methods: {
    getUpperOrgOrgIdName () {
      var me = this
      return me.form.county_id
    },
    show () {
      var me = this
      me.dialogFormVisible = true
      // me.form = {}
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
      this.axios({
        method: 'post',
        url: 'http://localhost:8080/ims/delTabInfoForm',
        headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json;charset=UTF-8'},
        data: parm
      }).then(function (response) {
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
      console.log(this.form.search_date[0])
      var conditions = {}
      conditions = me.form
      me.submitBackFun(conditions)
      me.dialogFormVisible = false
    },
    setValueByDict (result) {
      if (result.columnName === 'county_name') {
        this.form.county_name = result.label
        this.form.county_id = result.value
      }
      if (result.columnName === 'org_id_name') {
        this.form.org_id_name = result.label
        this.form.org_id = result.value
      }
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
  },
  watch: {
    'form.county_id': function (val) {
      var me = this
      me.form.org_id = null
      me.form.org_id_name = ''
    }
  }
}
</script>

<style scoped>

</style>
