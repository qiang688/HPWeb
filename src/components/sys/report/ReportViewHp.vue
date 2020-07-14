<template>
  <el-container class="list-container" v-loading="fromDataLoading">
    <el-header class="list-header">
      <div style="padding: 0px">
        <span>{{ title }}</span>
        <div style="float: right">
          <el-button @click="butSearchClick" size="mini" type="primary" plain icon="el-icon-search">统计</el-button>
        </div>
      </div>
    </el-header>
    <el-main class="list-main">
      <div v-html="html" style="float: left; padding-left: 10px"></div>
    </el-main>
    <ReportSearch ref="reportSearch"></ReportSearch>
  </el-container>
</template>

<script>
import ReportSearch from './ReportSearchHp.vue'
export default {
  name: 'html-temp',
  components: {
    ReportSearch
  },
  data () {
    return {
      title: '',
      html: '',
      conditions: {
        startdate: '',
        enddate: ''
      },
      fromDataLoading: false
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
        'report/SysReportView/getReportView',
        me.conditions
      ).then(function (response) {
        me.html = response.data
        me.totalRows = response.data.total
      }).catch(function (error) {
        console.log(error)
      })
    },
    getReport () {
      var me = this
      me.axiosPost(
        'report/SysReport/getReportByReportNo',
        me.conditions
      ).then(function (response) {
        me.title = response.data.data.report_title
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
      this.$refs.reportSearch.$emit('show', function (conditions) {
        me.conditions = conditions
        me.loadData()
      })
    }
  },
  mounted () {
    var me = this
    me.conditions.report_no = me.openParm.reportNo
    me.getReport()
  }
}
</script>

<style scoped>

</style>
