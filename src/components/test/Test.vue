<template>
  <div>
    aaa
  </div>
</template>

<script>

export default {
  name: 'Test',
  components: {
  },
  data () {
    return {

    }
  },
  methods: {
    showEdit (parm) {
      var me = this
      me.form = {}
      me.axiosPost(
        '/PublicHealthArchive/getRecordById',
        parm
      ).then(function (response) {
        debugger
        me.$message({
          message: response,
          type: 'error'
        })
      }).catch(function (error) {
        debugger
        me.$message({
          message: error,
          type: 'error'
        })
      })
    }
  },
  mounted () {
    this.showEdit()
  }
}
</script>

<style lang='css'>
</style>
