<template>
  <div>
    <el-table
      :data="tableData" style="width: 100%" size="mini" :cell-style="{height: '36px', padding: '0px'}">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column prop="test" label="单选">
        <template slot-scope="scope">
          <el-radio-group v-model="scope.row.test">
            <el-radio  :label="1">是</el-radio>
            <el-radio  :label="2">否</el-radio>
          </el-radio-group>
        </template>
      </el-table-column>
    </el-table>
    <el-input v-model="filePath"/>
    <el-button type="primary" @click="butClick">GenerateStart</el-button>
    <el-button type="primary" @click="butClickFunctionStart">GenerateFunctionStart</el-button>
    <el-button type="primary" @click="butAddressClick">地址</el-button>
    <AddressDictManage ref="addressDictManage"></AddressDictManage>
  </div>
</template>
<script>
import AddressDictManage from '../sysdict/address_dict/AddressDictManage.vue'
export default {
  name: 'test1',
  components: {
    AddressDictManage
  },
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        test: 1
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        test: 2
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        test: 1
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        test: 2
      }],
      filePath: ''
    }
  },
  methods: {
    submit () {
    },
    butClick () {
      var me = this
      me.html = ''
      me.axiosPost(
        '/healthsys/SysGenerate/bphmsGen',
        {filepath: me.filePath}
      ).then(function (response) {
        console.log(response.data)
      }).catch(function (error) {
        console.log(error)
      })
    },
    butClickFunctionStart () {
      var me = this
      me.html = ''
      me.axiosPost(
        '/healthsys/SysGenerate/bphmsGenFunction',
        {filepath: me.filePath}
      ).then(function (response) {
        console.log(response.data)
      }).catch(function (error) {
        console.log(error)
      })
    },
    butAddressClick () {
      this.$refs.addressDictManage.$emit('open')
    }
  }
}
</script>

<style scoped>

</style>
