<template>
  <div>
    <el-input placeholder="请输入内容"
              class="input-with-select"
              @change="change($event)"
              @clear="clear($event)"
              :value="value"
              :disabled="this.disabled"
              clearable
              :readonly="this.readonly"
    >
      <el-button slot="append" icon="el-icon-search" @click="butSearchClick" :disabled="this.disabled"></el-button>
    </el-input>
    <CqInputSelectBox ref="cqInputSelectBox" :setValue="this.setValue" :columnName="this.columnName"></CqInputSelectBox>
  </div>
</template>
<script>
import CqInputSelectBox from './ud-input-select-box.vue'
export default {
  name: 'cq-input-select-county',
  data () {
    return {
      url: this.dataUrl
    }
  },
  props: {
    dataUrl: String,
    setValue: Function,
    value: String,
    columnName: String,
    disabled: Boolean,
    readonly: Boolean
  },
  components: {
    CqInputSelectBox
  },
  methods: {
    butSearchClick () {
      let me = this
      me.$refs.cqInputSelectBox.$emit('show', me.url, function (conditions) {
      })
    },
    change: function (val) {
      this.$emit('input', val)
    },
    clear: function () {
      let me = this
      var result = {
        columnName: me.columnName,
        value: '',
        label: ''
      }
      me.setValue(result)
    }
  }
}
</script>

<style scoped>
</style>
