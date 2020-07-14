<template>
  <div>
    <el-input
      type='textarea'
      autosize
      placeholder='请输入内容'
      v-model='sendtext'>
    </el-input>
    <el-button @click="butSendClick" size="mini" type="primary" plain icon="el-icon-search">发送</el-button>
    <div style='margin: 20px 0;'></div>
    <el-input
      type='textarea'
      :autosize='{ minRows: 12, maxRows: 4}'
      placeholder='请输入内容'
      v-model='msgtext'>
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'web-socket-test',
  data () {
    return {
      title: '消息通讯',
      isshow: true,
      screenHeight: document.documentElement.clientHeight,
      tableData: [],
      tbHeight: document.documentElement.clientHeight - 210,
      totalRows: 0,
      currentPage: 1,
      pageSizes: [25, 50, 100, 150],
      pageSize: 25,
      currentRow: null,
      conditions: {
        offset: 1,
        pageSize: 25
      },
      sendtext: '',
      msgtext: '',
      websocket: null
    }
  },
  methods: {
    wsInit: function () {
      var me = this
      // 首先判断是否 支持 WebSocket
      if ('WebSocket' in window) {
        me.websocket = new WebSocket('ws://localhost:8999/ims/websocket1')
      } else {
        console.log('not WebSocket in window')
      }
      // 打开时
      me.websocket.onopen = function (evnt) {
        console.log('  websocket.onopen  ')
      }
      me.websocket.onerror = function (evnt) {
        console.log('  websocket.onerror  ')
      }
      me.websocket.onclose = function (evnt) {
        console.log('  websocket.onclose  ')
      }
      // 处理消息时
      me.websocket.onmessage = function (evnt) {
        console.log('  websocket.onmessage   :' + evnt.data)
        if (me.msgtext === '' || me.msgtext === null) {
          me.msgtext = me.msgtext + evnt.data
        } else {
          me.msgtext = me.msgtext + '\n' + evnt.data
        }
      }
    },
    butSendClick: function () {
      var me = this
      // var msg = {
      //   msgContent: me.sendtext,
      //   postsId: 2
      // }
      me.websocket.send(me.sendtext)
      me.sendtext = ''
    }
  },
  mounted () {
    var me = this
    me.wsInit()
  }
}
</script>

<style scoped>

</style>
