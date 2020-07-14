<template>
  <el-container :style="constyle" class="list-container" v-loading="fromDataLoading">
    <el-header class="list-header">
      <div style="padding: 0px">
        <span>辅助检查{{form.wbc1}}</span>
        <div style="float: right">
          <el-button size="mini" type="primary" @click="butSubmitClick" plain icon="el-icon-edit">保存</el-button>
        </div>
      </div>
    </el-header>
    <!--<el-main class="list-main">-->
      <el-form :model="form" :rules="rules" ref="elForm" size="mini" label-width="100px" class="elform">
        <el-row>
          <el-col :span="24">
            <div class="el-form-item__label_group">血常规∗</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="12" :md="6" :lg="6">
            <el-form-item label="血红蛋白" prop="hemoglobin">
              <el-input v-model="form.hemoglobin" :controls="false" label="aaa"><span slot="suffix">g/L</span></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6" :lg="6">
            <el-form-item label="血小板" prop="platelet">
              <el-input v-model="form.platelet"><span slot="suffix">×109/L</span></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6" :lg="6">
            <el-form-item label="白细胞" prop="leukocyte">
              <el-input v-model="form.leukocyte"><span slot="suffix">×109/L</span></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6" :lg="6">
            <el-form-item label-width="160px" label="WBC分类：嗜中性粒" prop="wbc1">
              <ud-input-number v-model="form.wbc1" @input="change" suffix="%"></ud-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="12" :md="6" :lg="6">
            <el-form-item label="淋巴" prop="wbc2">
              <el-input v-model="form.wbc2"><span slot="suffix">%</span></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6" :lg="6">
            <el-form-item label="中间细胞群" prop="wbc3">
              <el-input v-model="form.wbc3" @change="change" v-only-number="{max:100,min:0,precision:2}"><span slot="suffix">%</span></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6" :lg="6">
            <el-form-item label="红细胞" prop="bloodRoutineRedCell">
              <el-input v-model="form.bloodRoutineRedCell" :class="{ 'yj': this.isItemYj(form.bloodRoutineRedCellYj) }">
                <span slot="suffix">mmol/L</span>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    <!--</el-main>-->
  </el-container>
</template>

<script>
export default {
  name: 'form-test',
  components: {},
  data () {
    return {
      dialogFormVisible: false,
      form: {
        medicalNo: null,
        orgId: null,
        archiveId: null,
        hemoglobin: null,
        leukocyte: null,
        platelet: null,
        bloodRoutineOthers: '',
        proteinuria: '',
        urineSugar: '',
        ket: '',
        urinaryOccultBlood: '',
        urineRoutineOthers: '',
        fastingPlasmaGlucoseL: '',
        fastingPlasmaGlucoseDl: '',
        electrocardiogram: null,
        electrocardiogramExcep: '',
        microalbuminuria: '',
        stoolOccultBlood: null,
        glycolatedHemoglobin: '',
        hbsag: null,
        liverFunctionSalt: '',
        liverFunctionSgot: '',
        liverFunctionAlbumin: '',
        liverFunctionTotalBilirubin: '',
        liverFunctionCb: '',
        renalFunctionCreatinine: '',
        renalFunctionBun: '',
        renalFunctionBloodPotassium: '',
        renalFunctionNatremia: '',
        bloodFatTc: '',
        bloodFatTriglyceride: '',
        bloodFatLdlc: '',
        bloodFatHdlc: '',
        cxr: null,
        cxrException: '',
        typeBUltrasonic: null,
        typeBUltrasonicExcep: '',
        cervicalPapSmears: null,
        cervicalPapSmearsExcep: '',
        assistantInvesOth: '',
        randomGlucose: '',
        randomGlucoseTime: '',
        firstGlucose: '',
        firstRandomGlucose: '',
        firstRandomGluTime: '',
        urineRoutine: null,
        lungs: null,
        lungsContent: '',
        heart: null,
        heartContent: '',
        abdomen: null,
        abdomenContent: '',
        liverFunAlbAll: '',
        wbc1: '',
        wbc2: '',
        wbc3: '',
        glucoseRefuse: null,
        electrocardiogramRefuse: null,
        bloodRoutineRefuse: null,
        urineRoutineRefuse: null,
        bloodFatRefuse: null,
        renalFunctionRefuse: null,
        liverFunctionRefuse: null,
        glycolatedHemoglobinRefuse: null,
        cxrRefuse: null,
        typeBUltrasonicRefuse: null,
        fastingGlucoseNexttime: '',
        glucoseOutside: null,
        electrocardiogramOutside: null,
        bloodRoutineOutside: null,
        urineRoutineOutside: null,
        bloodFatOutside: null,
        renalFunctionOutside: null,
        liverFunctionOutside: null,
        glycolatedHemoglobinOutside: null,
        cxrOutside: null,
        typeBUltrasonicOutside: null,
        microalbuminuriaRefuse: null,
        microalbuminuriaOutside: null,
        stoolOccultBloodRefuse: null,
        stoolOccultBloodOutside: null,
        cervicalPapSmearsRefuse: null,
        cervicalPapSmearsOutside: null,
        glucoseNoallow: null,
        electrocardiogramNoallow: null,
        bloodRoutineNoallow: null,
        urineRoutineNoallow: null,
        bloodFatNoallow: null,
        renalFunctionNoallow: null,
        liverFunctionNoallow: null,
        glycolatedHemoglobinNoallow: null,
        cxrNoallow: null,
        typeBUltrasonicNoallow: null,
        microalbuminuriaNoallow: null,
        stoolOccultBloodNoallow: null,
        cervicalPapSmearsNoallow: null,
        hbsagNoallow: null,
        hbsagRefuse: null,
        hbsagOutside: null,
        bloodUricAcid: null,
        bloodUricAcidRefuse: null,
        bloodUricAcidOutside: null,
        bloodUricAcidNoallow: null,
        bloodRheologyHighRate: null,
        bloodRheologyHighRateUn: '',
        bloodRheologyMiddleRate: null,
        bloodRheologyMiddleRateUn: '',
        bloodRheologyRefuse: null,
        bloodRheologyOutside: null,
        bloodRheologyNoallow: null,
        bloodRheologyLowRate: null,
        bloodRheologyLowRateUn: '',
        bloodRheologyViscosity: null,
        bloodRheologyViscosityUn: '',
        bloodRheologySedi: null,
        bloodRheologySediUn: '',
        bloodRheologyHematocrit: null,
        bloodRheologyHematocritUn: '',
        bloodRheologyHRelative: null,
        bloodRheologyHRelativeUn: '',
        bloodRheologyLRelative: null,
        bloodRheologyLRelativeUn: '',
        bloodRheologyEquationk: null,
        bloodRheologyEquationkUn: '',
        bloodRheologyAggregation: null,
        bloodRheologyAggregationUn: '',
        bloodRheologyLReduced: null,
        bloodRheologyLReducedUn: '',
        bloodRheologyHReduced: null,
        bloodRheologyHReducedUn: '',
        bloodRheologyRCell: null,
        bloodRheologyRCellUn: '',
        bloodRheologyRCellTk: null,
        bloodRheologyRCellTkUn: '',
        urineRoutineWhiteCell: '',
        urineRoutineBilirubin: '',
        urineRoutineUrobilinogen: '',
        urineRoutinePhValue: '',
        urineRoutineProportionof: '',
        urineRoutineNitrite: '',
        renalFailureUricAcid: null,
        bloodRoutineRedCell: null,
        electrocardiogramHeart: null,
        stoolOccultBlood1: '',
        hbsag1: '',
        bloodRoutineRedCellYj: '',
        hemoglobinYj: '',
        plateletYj: '',
        leukocyteYj: '',
        wbc1Yj: '',
        wbc2Yj: '',
        wbc3Yj: '',
        urineRoutinePhValueYj: '',
        fastingPlasmaGlucoseLYj: '',
        randomGlucoseYj: '',
        firstGlucoseYj: '',
        firstRandomGlucoseYj: '',
        electrocardiogramHeartYj: '',
        microalbuminuriaYj: '',
        glycolatedHemoglobinYj: '',
        liverFunctionSaltYj: '',
        liverFunctionSgotYj: '',
        liverFunctionAlbuminYj: '',
        liverFunctionCbYj: '',
        liverFunAlbAllYj: '',
        renalFunctionCreatinineYj: '',
        renalFunctionBunYj: '',
        renalFunctionNatremiaYj: '',
        renalFailureUricAcidYj: '',
        bloodFatTcYj: '',
        bloodFatTriglycerideYj: '',
        bloodFatLdlcYj: '',
        bloodFatHdlcYj: '',
        bloodUricAcidYj: '',
        bloodRheologyHighRateYj: '',
        bloodRheologyMiddleRateYj: '',
        bloodRheologyLowRateYj: '',
        bloodRheologyViscosityYj: '',
        bloodRheologySediYj: '',
        bloodRheologyHematocritYj: '',
        bloodRheologyHRelativeYj: '',
        bloodRheologyLRelativeYj: '',
        bloodRheologyEquationkYj: '',
        bloodRheologyAggregationYj: '',
        bloodRheologyLReducedYj: '',
        bloodRheologyHReducedYj: '',
        bloodRheologyRCellYj: '',
        bloodRheologyRCellTkYj: '',
        totalBilirubinYj: '',
        bloodPotassiumYj: '',
        bloodRoutineOutsideOthers: '',
        glucoseRoutineOutsideOthers: '',
        urineRoutineOutsideOthers: '',
        electOutsideOthers: '',
        micOutsideOthers: '',
        stoolOutsideOthers: '',
        glycolatedOutsideOthers: '',
        hbsagOutsideOthers: '',
        liverOutsideOthers: '',
        renalOutsideOthers: '',
        bloodFatOutsideOthers: '',
        cxrOutsideOthers: '',
        typeBOutsideOthers: '',
        cervicalOutsideOthers: '',
        xnsOutsideOthers: '',
        xlbOutsideOthers: '',
        proteinuriaYj: '',
        urineSugarYj: '',
        ketYj: '',
        urinaryOccultBloodYj: '',
        medicalIgr: null,
        bloodRheologyHx: '',
        fibrinogen: null,
        fibrinogenUn: '',
        typeBUltrasonicNo: null,
        typeBUltrasonicQt: null,
        typeBUltrasonicExcepQt: '',
        glucoseRegulation: null
      },
      emptyForm: {
        medicalNo: null,
        orgId: null,
        archiveId: null,
        hemoglobin: null,
        leukocyte: null,
        platelet: null,
        bloodRoutineOthers: '',
        proteinuria: '',
        urineSugar: '',
        ket: '',
        urinaryOccultBlood: '',
        urineRoutineOthers: '',
        fastingPlasmaGlucoseL: '',
        fastingPlasmaGlucoseDl: '',
        electrocardiogram: null,
        electrocardiogramExcep: '',
        microalbuminuria: '',
        stoolOccultBlood: null,
        glycolatedHemoglobin: '',
        hbsag: null,
        liverFunctionSalt: '',
        liverFunctionSgot: '',
        liverFunctionAlbumin: '',
        liverFunctionTotalBilirubin: '',
        liverFunctionCb: '',
        renalFunctionCreatinine: '',
        renalFunctionBun: '',
        renalFunctionBloodPotassium: '',
        renalFunctionNatremia: '',
        bloodFatTc: '',
        bloodFatTriglyceride: '',
        bloodFatLdlc: '',
        bloodFatHdlc: '',
        cxr: null,
        cxrException: '',
        typeBUltrasonic: null,
        typeBUltrasonicExcep: '',
        cervicalPapSmears: null,
        cervicalPapSmearsExcep: '',
        assistantInvesOth: '',
        randomGlucose: '',
        randomGlucoseTime: '',
        firstGlucose: '',
        firstRandomGlucose: '',
        firstRandomGluTime: '',
        urineRoutine: null,
        lungs: null,
        lungsContent: '',
        heart: null,
        heartContent: '',
        abdomen: null,
        abdomenContent: '',
        liverFunAlbAll: '',
        wbc1: '',
        wbc2: '',
        wbc3: '',
        glucoseRefuse: null,
        electrocardiogramRefuse: null,
        bloodRoutineRefuse: null,
        urineRoutineRefuse: null,
        bloodFatRefuse: null,
        renalFunctionRefuse: null,
        liverFunctionRefuse: null,
        glycolatedHemoglobinRefuse: null,
        cxrRefuse: null,
        typeBUltrasonicRefuse: null,
        fastingGlucoseNexttime: '',
        glucoseOutside: null,
        electrocardiogramOutside: null,
        bloodRoutineOutside: null,
        urineRoutineOutside: null,
        bloodFatOutside: null,
        renalFunctionOutside: null,
        liverFunctionOutside: null,
        glycolatedHemoglobinOutside: null,
        cxrOutside: null,
        typeBUltrasonicOutside: null,
        microalbuminuriaRefuse: null,
        microalbuminuriaOutside: null,
        stoolOccultBloodRefuse: null,
        stoolOccultBloodOutside: null,
        cervicalPapSmearsRefuse: null,
        cervicalPapSmearsOutside: null,
        glucoseNoallow: null,
        electrocardiogramNoallow: null,
        bloodRoutineNoallow: null,
        urineRoutineNoallow: null,
        bloodFatNoallow: null,
        renalFunctionNoallow: null,
        liverFunctionNoallow: null,
        glycolatedHemoglobinNoallow: null,
        cxrNoallow: null,
        typeBUltrasonicNoallow: null,
        microalbuminuriaNoallow: null,
        stoolOccultBloodNoallow: null,
        cervicalPapSmearsNoallow: null,
        hbsagNoallow: null,
        hbsagRefuse: null,
        hbsagOutside: null,
        bloodUricAcid: null,
        bloodUricAcidRefuse: null,
        bloodUricAcidOutside: null,
        bloodUricAcidNoallow: null,
        bloodRheologyHighRate: null,
        bloodRheologyHighRateUn: '',
        bloodRheologyMiddleRate: null,
        bloodRheologyMiddleRateUn: '',
        bloodRheologyRefuse: null,
        bloodRheologyOutside: null,
        bloodRheologyNoallow: null,
        bloodRheologyLowRate: null,
        bloodRheologyLowRateUn: '',
        bloodRheologyViscosity: null,
        bloodRheologyViscosityUn: '',
        bloodRheologySedi: null,
        bloodRheologySediUn: '',
        bloodRheologyHematocrit: null,
        bloodRheologyHematocritUn: '',
        bloodRheologyHRelative: null,
        bloodRheologyHRelativeUn: '',
        bloodRheologyLRelative: null,
        bloodRheologyLRelativeUn: '',
        bloodRheologyEquationk: null,
        bloodRheologyEquationkUn: '',
        bloodRheologyAggregation: null,
        bloodRheologyAggregationUn: '',
        bloodRheologyLReduced: null,
        bloodRheologyLReducedUn: '',
        bloodRheologyHReduced: null,
        bloodRheologyHReducedUn: '',
        bloodRheologyRCell: null,
        bloodRheologyRCellUn: '',
        bloodRheologyRCellTk: null,
        bloodRheologyRCellTkUn: '',
        urineRoutineWhiteCell: '',
        urineRoutineBilirubin: '',
        urineRoutineUrobilinogen: '',
        urineRoutinePhValue: '',
        urineRoutineProportionof: '',
        urineRoutineNitrite: '',
        renalFailureUricAcid: null,
        bloodRoutineRedCell: null,
        electrocardiogramHeart: null,
        stoolOccultBlood1: '',
        hbsag1: '',
        bloodRoutineRedCellYj: '',
        hemoglobinYj: '',
        plateletYj: '',
        leukocyteYj: '',
        wbc1Yj: '',
        wbc2Yj: '',
        wbc3Yj: '',
        urineRoutinePhValueYj: '',
        fastingPlasmaGlucoseLYj: '',
        randomGlucoseYj: '',
        firstGlucoseYj: '',
        firstRandomGlucoseYj: '',
        electrocardiogramHeartYj: '',
        microalbuminuriaYj: '',
        glycolatedHemoglobinYj: '',
        liverFunctionSaltYj: '',
        liverFunctionSgotYj: '',
        liverFunctionAlbuminYj: '',
        liverFunctionCbYj: '',
        liverFunAlbAllYj: '',
        renalFunctionCreatinineYj: '',
        renalFunctionBunYj: '',
        renalFunctionNatremiaYj: '',
        renalFailureUricAcidYj: '',
        bloodFatTcYj: '',
        bloodFatTriglycerideYj: '',
        bloodFatLdlcYj: '',
        bloodFatHdlcYj: '',
        bloodUricAcidYj: '',
        bloodRheologyHighRateYj: '',
        bloodRheologyMiddleRateYj: '',
        bloodRheologyLowRateYj: '',
        bloodRheologyViscosityYj: '',
        bloodRheologySediYj: '',
        bloodRheologyHematocritYj: '',
        bloodRheologyHRelativeYj: '',
        bloodRheologyLRelativeYj: '',
        bloodRheologyEquationkYj: '',
        bloodRheologyAggregationYj: '',
        bloodRheologyLReducedYj: '',
        bloodRheologyHReducedYj: '',
        bloodRheologyRCellYj: '',
        bloodRheologyRCellTkYj: '',
        totalBilirubinYj: '',
        bloodPotassiumYj: '',
        bloodRoutineOutsideOthers: '',
        glucoseRoutineOutsideOthers: '',
        urineRoutineOutsideOthers: '',
        electOutsideOthers: '',
        micOutsideOthers: '',
        stoolOutsideOthers: '',
        glycolatedOutsideOthers: '',
        hbsagOutsideOthers: '',
        liverOutsideOthers: '',
        renalOutsideOthers: '',
        bloodFatOutsideOthers: '',
        cxrOutsideOthers: '',
        typeBOutsideOthers: '',
        cervicalOutsideOthers: '',
        xnsOutsideOthers: '',
        xlbOutsideOthers: '',
        proteinuriaYj: '',
        urineSugarYj: '',
        ketYj: '',
        urinaryOccultBloodYj: '',
        medicalIgr: null,
        bloodRheologyHx: '',
        fibrinogen: null,
        fibrinogenUn: '',
        typeBUltrasonicNo: null,
        typeBUltrasonicQt: null,
        typeBUltrasonicExcepQt: '',
        glucoseRegulation: null
      },
      rules: {
        wbc1: [
        ],
        hemoglobin: [
          { validator: this.validatorHemoglobin, trigger: 'blur', decimal: 3, min: 3, max: 111 },
          { validator: this.validatorHemoglobin, trigger: 'blur' }
        ],
        bloodRoutineRedCell: [
        ]
      },
      disabledFlag: {},
      readonlyFlag: {},
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
      if (parm != null && parm.record != null && parm.record.medicalNo != null) {
        me.recordEdit(parm.record)
      } else {
        me.recordAdd(parm.record)
      }
    },
    resize (val) {
    },
    setValueByDict (result) {
      if (result.columnName === 'bloodRoutineOthers') {
        this.form.bloodRoutineOthers = result.label
        this.$forceUpdate()
      }
      if (result.columnName === 'urineRoutineOthers') {
        this.form.urineRoutineOthers = result.label
        this.$forceUpdate()
      }
      if (result.columnName === 'typeBUltrasonicExcep') {
        this.form.typeBUltrasonicExcep = result.label
        this.$forceUpdate()
      }
      if (result.columnName === 'cervicalPapSmearsExcep') {
        this.form.cervicalPapSmearsExcep = result.label
        this.$forceUpdate()
      }
      if (result.columnName === 'assistantInvesOth') {
        this.form.assistantInvesOth = result.label
        this.$forceUpdate()
      }
      if (result.columnName === 'typeBUltrasonicExcepQt') {
        this.form.typeBUltrasonicExcepQt = result.label
        this.$forceUpdate()
      }
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
        .catch(_ => {
        })
    },
    formInit () {
    },
    recordAdd (parm) {
      var me = this
      me.form = me.emptyForm
      me.form.archiveId = parm.archiveId
      me.formInit()
    },
    recordEdit (parm) {
      var me = this
      me.form = {}
      me.fromDataLoading = true
      me.axiosPost(
        '/PersonalMedicalTest/getForm',
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
        '/PersonalMedicalTest/deleteRecord',
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
      if (me.form.bloodRoutineRedCellYj === '' || me.form.bloodRoutineRedCellYj == null) {
        me.form.bloodRoutineRedCellYj = 'H'
      } else {
        me.form.bloodRoutineRedCellYj = ''
      }
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
        return false
      }
      // me.fromDataLoading = true
      // me.axiosPost(
      //   '/PersonalMedicalTest/saveRecord',
      //   me.form
      // ).then(function (response) {
      //   me.fromDataLoading = false
      //   if (response.data.statusCode === 8500) {
      //     me.$message({
      //       message: response.data.data.text,
      //       type: 'error'
      //     })
      //   }
      //   if (response.data.statusCode === 8200) {
      //     if (me.form.medicalNo == null || me.form.medicalNo === '') {
      //       me.form.medicalNo = response.data.data.text
      //     }
      //     me.formSaveCallback('PersonalMedicalTest', me.form)
      //     me.fromDataLoading = false
      //     me.$message({
      //       message: '数据保存成功！！！',
      //       type: 'success'
      //     })
      //   }
      // }).catch(function (error) {
      //   me.fromDataLoading = false
      //   me.$message({
      //     message: '数据保存失败！' + error,
      //     type: 'error'
      //   })
      // })
    },
    change () {
      var me = this
      me.$message({
        message: '数据保存成功！！！',
        type: 'success'
      })
    },
    validatorHemoglobin (rule, value, callback) {
      var result = this.Util.validationNumber(value, rule)
      if (result.status === 'error') {
        callback(new Error(result.message))
      }
      callback(new Error('aaa'))
    },
    isItemYj (value) {
      if (value != null && value !== '') {
        return true
      } else {
        return false
      }
    }
  },
  mounted () {
    // var me = this
    // me.init(me.openParm)
  }
}
</script>

<style scoped src="../../assets/css/base-form.css"></style>
<style src="../../assets/css/base.css"></style>
<style>
.yj .el-input__inner{
  color: #ff1125;
}
</style>
