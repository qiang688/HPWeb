<template>
  <el-dialog title="查询条件" :visible.sync="dialogFormVisible">
    <el-form :model="form" size="mini" :label-width="formLabelWidth">
            <el-form-item label="ID">
        <el-input v-model="form.orgId"></el-input>
      </el-form-item>
      <el-form-item label="机构名称">
        <el-input v-model="form.orgName"></el-input>
      </el-form-item>
      <el-form-item label="机构类别">
        <el-input v-model="form.orgClass"></el-input>
      </el-form-item>
      <el-form-item label="机构类型">
        <el-input v-model="form.orgType"></el-input>
      </el-form-item>
      <el-form-item label="机构规模">
        <el-input v-model="form.orgScale"></el-input>
      </el-form-item>
      <el-form-item label="机构等级">
        <el-input v-model="form.orgLevel"></el-input>
      </el-form-item>
      <el-form-item label="机构简称">
        <el-input v-model="form.orgAlias"></el-input>
      </el-form-item>
      <el-form-item label="机构缩写">
        <el-input v-model="form.orgAbbr"></el-input>
      </el-form-item>
      <el-form-item label="机构英文名">
        <el-input v-model="form.englishName"></el-input>
      </el-form-item>
      <el-form-item label="上级机构">
        <el-input v-model="form.upperOrg"></el-input>
      </el-form-item>
      <el-form-item label="机构行政区划">
        <el-input v-model="form.zoneCode"></el-input>
      </el-form-item>
      <el-form-item label="通信地址">
        <el-input v-model="form.postAddress"></el-input>
      </el-form-item>
      <el-form-item label="邮政编码">
        <el-input v-model="form.postCode"></el-input>
      </el-form-item>
      <el-form-item label="网站地址">
        <el-input v-model="form.internetSite"></el-input>
      </el-form-item>
      <el-form-item label="机构IP起始号">
        <el-input v-model="form.startIpAddress"></el-input>
      </el-form-item>
      <el-form-item label="机构IP终止号">
        <el-input v-model="form.endIpAddress"></el-input>
      </el-form-item>
      <el-form-item label="机构授权码">
        <el-input v-model="form.orgAuthorizationKey"></el-input>
      </el-form-item>
      <el-form-item label="当前住院号">
        <el-input v-model="form.currentResiCaseNo"></el-input>
      </el-form-item>
      <el-form-item label="系统进场时间">
        <el-input v-model="form.projectStartTime"></el-input>
      </el-form-item>
      <el-form-item label="门诊启用时间">
        <el-input v-model="form.dispStartTime"></el-input>
      </el-form-item>
      <el-form-item label="住院启用时间">
        <el-input v-model="form.resiStartTime"></el-input>
      </el-form-item>
      <el-form-item label="系统验收时间">
        <el-input v-model="form.projectEndTime"></el-input>
      </el-form-item>
      <el-form-item label="有效标志">
        <el-input v-model="form.validFlag"></el-input>
      </el-form-item>
      <el-form-item label="用户编码">
        <el-input v-model="form.userCode"></el-input>
      </el-form-item>
      <el-form-item label="自定义编码">
        <el-input v-model="form.customCode"></el-input>
      </el-form-item>
      <el-form-item label="拼音首码">
        <el-input v-model="form.spellCode"></el-input>
      </el-form-item>
      <el-form-item label="五笔首码">
        <el-input v-model="form.wbzxCode"></el-input>
      </el-form-item>
      <el-form-item label="排序号">
        <el-input v-model="form.sortNo"></el-input>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-input v-model="form.createTime"></el-input>
      </el-form-item>
      <el-form-item label="创建人">
        <el-input v-model="form.createOperator"></el-input>
      </el-form-item>
      <el-form-item label="修改时间">
        <el-input v-model="form.modifyTime"></el-input>
      </el-form-item>
      <el-form-item label="修改人">
        <el-input v-model="form.modifyOperator"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
      <el-form-item label="负责行政区">
        <el-input v-model="form.zoneCustomCode"></el-input>
      </el-form-item>
      <el-form-item label="上级行政机构">
        <el-input v-model="form.belongOrg"></el-input>
      </el-form-item>
      <el-form-item label="组织机构编码">
        <el-input v-model="form.organizationCode"></el-input>
      </el-form-item>
      <el-form-item label="ZONE_CUSTOM_LEVEL">
        <el-input v-model="form.zoneCustomLevel"></el-input>
      </el-form-item>
      <el-form-item label="PROJECT_STATUS">
        <el-input v-model="form.projectStatus"></el-input>
      </el-form-item>
      <el-form-item label="ALLOW_JOIN_CHAT">
        <el-input v-model="form.allowJoinChat"></el-input>
      </el-form-item>
      <el-form-item label="IS_DELIVERY_ORG">
        <el-input v-model="form.isDeliveryOrg"></el-input>
      </el-form-item>
      <el-form-item label="ORG_MEMO">
        <el-input v-model="form.orgMemo"></el-input>
      </el-form-item>
      <el-form-item label="IS_HYGIENE_ORG">
        <el-input v-model="form.isHygieneOrg"></el-input>
      </el-form-item>
      <el-form-item label="SESSION_ID">
        <el-input v-model="form.sessionId"></el-input>
      </el-form-item>
      <el-form-item label="INSUR_LOG_ID">
        <el-input v-model="form.insurLogId"></el-input>
      </el-form-item>
      <el-form-item label="INSUR_LOG_PASS">
        <el-input v-model="form.insurLogPass"></el-input>
      </el-form-item>
      <el-form-item label="SESSION_CREATE_TIME">
        <el-input v-model="form.sessionCreateTime"></el-input>
      </el-form-item>
      <el-form-item label="严精国家机构编码">
        <el-input v-model="form.orgCountyCode"></el-input>
      </el-form-item>
      <el-form-item label="基层机构类型">
        <el-input v-model="form.orgLx"></el-input>
      </el-form-item>
      <el-form-item label="上级结防所">
        <el-input v-model="form.upperJfs"></el-input>
      </el-form-item>
      <el-form-item label="上级精神中心">
        <el-input v-model="form.upperJszx"></el-input>
      </el-form-item>
      <el-form-item label="行政级别社区">
        <el-input v-model="form.zoneLevel"></el-input>
      </el-form-item>
      <el-form-item label="行政级别精神">
        <el-input v-model="form.zoneLevelJs"></el-input>
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
        orgId: '',
        orgName: '',
        orgClass: '',
        orgType: '',
        orgScale: '',
        orgLevel: '',
        orgAlias: '',
        orgAbbr: '',
        englishName: '',
        upperOrg: '',
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
        validFlag: '',
        userCode: '',
        customCode: '',
        spellCode: '',
        wbzxCode: '',
        sortNo: '',
        createTime: '',
        createOperator: '',
        modifyTime: '',
        modifyOperator: '',
        remark: '',
        zoneCustomCode: '',
        belongOrg: '',
        organizationCode: '',
        zoneCustomLevel: '',
        projectStatus: '',
        allowJoinChat: '',
        isDeliveryOrg: '',
        orgMemo: '',
        isHygieneOrg: '',
        sessionId: '',
        insurLogId: '',
        insurLogPass: '',
        sessionCreateTime: '',
        orgCountyCode: '',
        orgLx: '',
        upperJfs: '',
        upperJszx: '',
        zoneLevel: '',
        zoneLevelJs: ''
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
        '/OrgDict/deleteRecord',
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
