<template>
  <div>
    <el-input placeholder="请输入内容"
              class="input-with-select"
              @change="change($event)"
              :value="value"
              :disabled="this.disabled"
              clearable
              :readonly="this.readonly">
      <el-button slot="append" icon="el-icon-search" @click="butSearchClick" :disabled="this.disabled"></el-button>
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'cq-input-select-custom',
  data () {
    return {
      url: this.dataurl
    }
  },
  props: {
    dataurl: String,
    setValue: Function,
    value: String,
    columnName: String,
    disabled: Boolean,
    readonly: Boolean,
    selectFun: Function
  },
  components: {
  },
  methods: {
    butSearchClick () {
      let me = this
      me.selectFun()
    },
    change: function (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style scoped>
</style>
