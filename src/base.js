exports.install = function (Vue, options) {
  Vue.prototype.axiosPost = function (url, data) {
    // for (var i = 0; i < this.$store.state.healthsyscontrollers.length; i++) {
    //   if (url.indexOf(this.$store.state.healthsyscontrollers[i]) === 1) {
    //     url = '/healthsys' + url
    //     break
    //   }
    // }
    // for (var j = 0; j < this.$store.state.healtharchiveControllers.length; j++) {
    //   if (url.indexOf(this.$store.state.healtharchiveControllers[j]) === 1) {
    //     url = '/healtharchive' + url
    //     break
    //   }
    // }
    // url = '/healthsys' + url
    // url = url
    return this.axios({
      method: 'post',
      url: url,
      headers: {
        // 'Access-Control-Allow-Origin': '*'
      },
      withCredentials: true,
      data: data})
  }
  Vue.prototype.containerResize = function (container, val) {
    container.screenHeight = val
    container.constyle = 'height: ' + (val - 94) + 'px;'
    return val - 94
  }
  Vue.prototype.SysDict = function () {
  }
  // Vue.prototype.SysDict.getOrgDictValue = function (dictName, valueVar, callback) {
  //   // var me = this
  //   var parm = {
  //     dictName: dictName,
  //     id: valueVar
  //   }
  //   Vue.prototype.axiosPost(
  //     '/OrganizationDict/getDictValue',
  //     parm
  //   ).then(function (response) {
  //     if (response.data.statusCode === 8200) {
  //       var rpdata = response.data.data[0]
  //       callback(rpdata.label)
  //     }
  //   }).catch(function (error) {
  //     this.$message({
  //       message: error,
  //       type: 'error'
  //     })
  //   })
  // }
  Vue.prototype.Util = function () {
  }
  Vue.prototype.Util.validationNumber = function (value, rule) {
    var result = {
      status: 'success',
      message: ''
    }
    let min = rule.min
    let max = rule.max
    let decimal = rule.decimal
    if (value === null || value === '') {
      return result
    }
    var numReg = ''
    if (decimal != null) {
      if (decimal === 0) {
        numReg = '^-?([1-9]\\d*|0)$'
        var numRe = new RegExp(numReg)
        if (!numRe.test(value)) {
          result.status = 'error'
          result.message = '请输入整数数字'
          return result
        }
      } else {
        numReg = '^-?(([1-9]{1}\\d*)|(0{1}))(\\.\\d{0,' + decimal + '})?$'
        var numRe2 = new RegExp(numReg)
        if (!numRe2.test(value)) {
          result.status = 'error'
          result.message = '请输入数字且保留' + decimal + '位小数'
          return result
        }
      }
    }
    if (min != null) {
      if (value < min) {
        result.status = 'error'
        result.message = '数值大于等于' + min
        return result
      }
    }
    if (max != null) {
      if (value > max) {
        result.status = 'error'
        result.message = '数值小于等于' + max
        return result
      }
    }
    return result
  }
  Vue.prototype.Util.formObjectReset = function (form, formDefault) {
    for (var key in form) {
      if (formDefault !== undefined) {
        if (formDefault.hasOwnProperty('default_' + key)) {
          form[key] = formDefault['default_' + key]
        } else {
          form[key] = null
        }
      } else {
        form[key] = null
      }
    }
  }
  Vue.prototype.Util.getUserInfo = function () {
    var user = JSON.parse(sessionStorage.getItem('UserInfo'))
    return user
  }
}
