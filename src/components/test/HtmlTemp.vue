<template>
  <div>
    <el-card class="box-card" :body-style="{ padding: '0px' }">
      <div style="padding: 5px 10px 12px 10px">
        <span>{{ title }}</span>
        <div style="float: right">
          <el-button @click="butSearchClick" size="mini" type="primary" plain icon="el-icon-search">统计</el-button>
        </div>
      </div>
      <div v-html="html" style="float: left; padding-left: 10px"></div>
    </el-card>
    <SysReportSearch ref="sysReportSearch"></SysReportSearch>
  </div>
</template>

<script>
import SysReportSearch from '../SysReportSearch.vue'
export default {
  name: 'html-temp',
  components: {
    SysReportSearch
  },
  data () {
    return {
      title: '现金收入汇总统计表',
      html: '',
      conditions: {
        startdate: '',
        enddate: ''
      }
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
    },
    newSaveCallback: {
      type: Function
    }
  },
  methods: {
    loadData () {
      var me = this
      me.conditions.report_no = me.openParm.reportNo
      me.html = ''
      me.axiosPost(
        '/SysReportView/getReportView',
        me.conditions
      ).then(function (response) {
        me.html = response.data
        me.totalRows = response.data.total
      }).catch(function (error) {
        console.log(error)
      })
    },
    butSearchClick () {
      let me = this
      me.dataSearch()
    },
    dataSearch () {
      let me = this
      this.$refs.sysReportSearch.$emit('show', function (conditions) {
        me.conditions = conditions
        me.loadData()
      })
    }
  },
  mounted () {
    var me = this
    me.loadData()
  }
}
</script>

<style scoped>

</style>
