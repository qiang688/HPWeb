<template>
  <div>
    <el-input placeholder="请输入内容"
              class="input-with-select"
              @change="change($event)"
              :value="value"
              :disabled="this.disabled"
              clearable
              :readonly="this.iptReadonly">
      <el-button slot="append" icon="el-icon-search" @click="butSearchClick" :disabled="this.butDisable"></el-button>
    </el-input>
    <CqInputSelectBox ref="cqInputSelectBox" :setValue="this.setValue" :columnName="this.columnName"></CqInputSelectBox>
  </div>
</template>

<script>
import CqInputSelectBox from './ud-input-select-box.vue'
export default {
  name: 'cq-input-select-org',
  data () {
    return {
      url: this.dataurl,
      userInfo: this.$store.state.userInfo,
      iptReadonly: false,
      butDisable: false
    }
  },
  props: {
    dataurl: String,
    setValue: Function,
    value: String,
    columnName: String,
    disabled: Boolean,
    readonly: Boolean,
    getUpperOrg: Function
  },
  components: {
    CqInputSelectBox
  },
  methods: {
    butSearchClick () {
      let me = this
      var upperOrg = me.getUpperOrg()
      if (upperOrg !== null && upperOrg > 0) {
        me.url = me.url + ',upper_org=' + upperOrg
      }
      me.$refs.cqInputSelectBox.$emit('show', me.url, function (conditions) {
      })
    },
    change: function (val) {
      this.$emit('input', val)
    },
    dataLoad () {
      var me = this
      var parm = null
      if (me.userInfo.zoneLevel === 3) {
        me.butDisable = true
        me.iptReadonly = true
        parm = {orgId: me.userInfo.orgId}
        me.axiosPost(
          '/OrgDict/getRecord',
          parm
        ).then(function (response) {
          if (response.data.statusCode === 8200) {
            var rpdata = response.data.data
            me.form = rpdata
            var result = {
              columnName: me.columnName,
              value: rpdata.orgId,
              label: rpdata.orgName
            }
            me.setValue(result)
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
      }
      if (me.userInfo.zoneLevel === 2 || me.userInfo.zoneLevel === 1) {
        me.butDisable = false
        me.iptReadonly = true
      }
    }
  },
  mounted () {
    var me = this
    me.dataLoad()
  }
}
</script>

<style scoped>
</style>
