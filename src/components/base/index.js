import udselect from './select/ud-select.vue'
import udinputselect from './input/ud-input-select.vue'
import cqinputselectcustom from './input/ud-input-select-custom.vue'
import cqinputselectcounty from './input/ud-input-select-county.vue'
import cqinputselectorg from './input/ud-input-select-org.vue'
import udinputnumber from './input/ud-input-number.vue'
import onlyNumber from './onlyNumber'
// 这里是重点
const cqelement = {
  install: function (Vue) {
    Vue.component('ud-select', udselect)
    Vue.component('ud-input-select', udinputselect)
    Vue.component('ud-input-select-custom', cqinputselectcustom)
    Vue.component('ud-input-select-county', cqinputselectcounty)
    Vue.component('ud-input-select-org', cqinputselectorg)
    Vue.directive('onlyNumber', onlyNumber)
    Vue.component('ud-input-number', udinputnumber)
  }
}
// 导出组件
export default cqelement
