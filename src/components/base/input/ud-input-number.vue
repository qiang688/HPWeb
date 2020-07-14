<template>
  <el-input @change="change($event)"
            :value="value"
            :min="min"
            :max="max"
            :disabled="this.disabled"
            :readonly="this.readonly"
            :clearable="this.clearable"
  >
    <span slot="suffix">{{suffix}}</span>
  </el-input>
</template>
<script>
export default {
  name: 'ud-input-number',
  data () {
    return {
      keyDownDel: false
    }
  },
  props: {
    dataUrl: String,
    setValue: Function,
    value: {
      default: null
    },
    suffix: String,
    min: Number,
    max: Number,
    columnName: String,
    disabled: Boolean,
    readonly: Boolean,
    clearable: Boolean,
    minus: Boolean
  },
  methods: {
    numberInputLimit (e) {
      let me = this
      let key = e.key
      // 不允许输入'e'和'.'
      if (key === 'e' || key === 'ArrowUp' || key === 'ArrowDown') {
        e.returnValue = false
        return false
      }
      let isMinus = false
      if (me.minus === true) {
        isMinus = true
      }
      if (!isMinus) {
        if (key === '-') {
          e.returnValue = false
          return false
        }
      }
      return true
    },
    change: function (val) {
      this.$emit('input', val)
    }
  },
  mounted () {
  }
}
</script>
<style scoped>

</style>
