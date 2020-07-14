<template>
  <el-container id="container-content">
    <el-header>
      <div style="text-align: left; float: left">
        <!--<i class="el-icon-menu" style="font-size: 22px; margin-right: 10px" @click="rootMenuClick"></i>-->
        <el-button icon="el-icon-menu" @click="rootMenuClick" type="primary"
        style="padding: 3px; font-size: 22px; background-color: #3c8dbc; border: none"
        ></el-button>
        <span style="font-size: 22px; text-align: left">信息平台{{this.$store.state.userInfo.staff_name}}</span>
      </div>
    </el-header>
    <el-container>
      <el-col v-show="menuShow" :sm="4" style="overflow: hidden; width: 210px; min-width: 210px;">
        <el-aside id="aside" width="230px" :style="asideStyle">
          <el-menu class="el-menu-vertical-demo"
                   @open="handleOpen"
                   @close="handleClose"
                   :collapse="isCollapse"
                   background-color="#222d32"
                   text-color="#fff"
                   active-text-color="#ffd04b"
                   @select="selectMenu"
          >
            <template v-for="item in menuData">
              <el-submenu :key="'sbm'+item.index" :index="item.index">
                <template slot="title">
                  <i :key="'mi'+item.index" class="el-icon-menu"></i>
                  <span :key="'mt'+item.index" slot="title">{{item.text}}</span>
                </template>
                <template v-for="c in item.childMenu">
                  <div v-if="c.child" :key="'mt2'+c.index">
                    <el-submenu :key="'sbm1'+c.index" :index="c.index">
                      <template slot="title">{{c.text}}</template>
                      <template v-for="cc in c.childMenu">
                        <el-menu-item :key="'sbm2'+cc.index" :index="cc.index">{{cc.text}}</el-menu-item>
                      </template>
                    </el-submenu>
                  </div>
                  <div v-else :key="'mt2'+c.index">
                    <el-menu-item :key="c.index" :index="c.index">{{c.text}}</el-menu-item>
                  </div>
                </template>
              </el-submenu>
            </template>
          </el-menu>
        </el-aside>
      </el-col>
      <el-container>
        <el-main>
          <!--<component :key='item.index' :is="item.component" :text="item.text" v-for="item in items"></component>-->
          <el-tabs v-model="editableTabsValue" closable @edit="handleTabsEdit" ref="tabPanes">
            <el-tab-pane
              :key="item.name"
              v-for="(item) in editableTabs"
              :label="item.title"
              :name="item.name"
              :style="'height:'+tbHeight+'px;' + 'overflow-y: auto'"
            >
              <div :is="item.content"
                   :openParm="item.openParm"
                   :openNewTabpage="handleTabsEdit"
                   :tabHeight="tbHeight"
                   :style="'height:'+(tbHeight-4) +'px;'"></div>
            </el-tab-pane>
          </el-tabs>
        </el-main>
        <!--<el-footer style="height: 30px">Footer</el-footer>-->
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import HelloWorld from './test/HelloWorld.vue'
import Test1 from './test/Test1.vue'
import DiTableSet from './DiTableSet.vue'
import SysUserList from './SysUserList.vue'
import Echarts from './test/Echarts.vue'
import HtmlTemp from './test/HtmlTemp.vue'
import ReportView from './sys/report/ReportView.vue'
import ReportViewHp from './sys/report/ReportViewHp.vue'
import AppointListDetailList from './appoint/AppointListDetailList.vue'
import AppointListManagerList from './appoint/AppointListManagerList.vue'
import CashIncomeList from './hebei/CashIncomeList.vue'
import WebSocketTest from './websocket/WebSocketTest.vue'
import OrgDictList from './organization/org_dict/OrgDictList.vue'
import TeamDictList from './organization/team_dict/TeamDictList.vue'
import StaffDictList from './organization/staff_dict/StaffDictList.vue'
import ZoneDictList from './organization/zone_dict/ZoneDictList.vue'
import BaseDictList from './sysdict/base_dict/BaseDictList.vue'
import StaffUserDictList from './sys/staff_user_dict/StaffUserDictList.vue'
import SysReportList from './sys/sys_report/SysReportList.vue'
import SysReportDatasourceList from './sys/sys_report/SysReportDatasourceList.vue'

export default {
  name: 'AppMain',
  // store,
  components: {
    HelloWorld,
    Test1,
    DiTableSet,
    SysUserList,
    Echarts,
    HtmlTemp,
    ReportView,
    ReportViewHp,
    AppointListDetailList,
    AppointListManagerList,
    CashIncomeList,
    WebSocketTest,
    OrgDictList,
    TeamDictList,
    StaffDictList,
    SysReportList,
    SysReportDatasourceList,
    ZoneDictList,
    BaseDictList,
    StaffUserDictList
  },
  data () {
    return {
      helloShow: false,
      items: [],
      isCollapse: false,
      editableTabsValue: '',
      editableTabs: this.$store.state.mainTabs,
      tabIndex: 0,
      menuData: null,
      userData: {
        login_user: null,
        staff_code: null
      },
      userInfo: this.$store.state.userInfo,
      screenHeight: document.documentElement.clientHeight,
      tbHeight: document.documentElement.clientHeight,
      asideStyle: 'height: 0px; overflow-y:scroll; overflow-x:hidden;',
      menuShow: true
    }
  },
  methods: {
    loadMenu: function () {
      var me = this
      me.axiosPost(
        '/SysMenu/getAppMenus',
        me.$data.userData
      ).then(function (response) {
        var rpdata = response.data
        me.menuData = rpdata
      }).catch(function (response) {
        if (response instanceof Error) {
          console.log('Error', response.message)
        } else {
          console.log(response.data)
          console.log(response.status)
          console.log(response.headers)
          console.log(response.config)
        }
      })

      // this.components.add()
    },
    selectMenu: function (event, parent) {
      var me = this
      // console.log('clickToMenu-------------')
      // console.log(event)
      let menuIndex = event
      for (let i = 0; i < me.editableTabs.length; i++) {
        if (menuIndex === me.editableTabs[i].name) {
          me.editableTabsValue = menuIndex
          return
        }
      }
      let currMenu
      for (let i = 0; i < parent.length; i++) {
        if (i === 0) {
          let num1 = me.menuData.length
          for (let j = 0; j < num1; j++) {
            if (me.menuData[j].index === parent[i]) {
              currMenu = me.menuData[j]
              break
            }
          }
        } else {
          if (currMenu.childMenu.length) {
            let num2 = currMenu.childMenu.length
            for (let m = 0; m < num2; m++) {
              if (currMenu.childMenu[m].index === parent[i]) {
                currMenu = currMenu.childMenu[m]
                break
              }
            }
          }
        }
      }
      me.handleTabsEdit('', 'add', {
        component: currMenu.component,
        text: currMenu.text,
        index: currMenu.index,
        openParm: {
          record: null,
          reportNo: currMenu.reportNo,
          winType: 'menu',
          winIndex: currMenu.index
        }
      })
    },
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleTabsEdit (targetName, action, item) {
      var me = this
      if (action === 'reg') {
        for (let i = 0; i < me.$store.state.mainTabs.length; i++) {
          if (me.$store.state.mainTabs[i].name === item.name) {
            if (me.$store.state.mainTabs[i].openParm.winIndex === '') {
              me.$store.state.mainTabs[i].openParm.winIndex = item.index
              me.$store.state.mainTabs[i].title = item.title
              return
            }
          }
        }
      }
      if (action === 'add') {
        let menuIndex = item.index
        let winIndex = item.openParm.winIndex
        for (let i = 0; i < me.editableTabs.length; i++) {
          if (menuIndex === me.editableTabs[i].name || winIndex === me.editableTabs[i].openParm.winIndex) {
            me.editableTabsValue = me.editableTabs[i].name
            return
          }
        }
        me.editableTabs.push({
          title: item.text,
          name: item.index,
          content: item.component,
          openParm: item.openParm
        })
        this.editableTabsValue = item.index
      }
      if (action === 'remove') {
        let tabs = this.editableTabs
        let activeName = this.editableTabsValue
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1]
              if (nextTab) {
                activeName = nextTab.name
              }
            }
          })
        }
        this.editableTabsValue = activeName
        this.editableTabs = tabs.filter(tab => tab.name !== targetName)
      }
    },
    resize (val) {
      var me = this
      me.tbHeight = val - 94
      me.asideStyle = 'height: ' + (val - 50) + 'px; overflow-y:scroll; overflow-x:hidden;'
      for (let i = 0; i < this.$refs.tabPanes.$children[0].$children[0].tabs.length; i++) {
        var temp = this.$refs.tabPanes.$children[0].$children[0].tabs[i].$children[0]
        temp.resize(me.tbHeight)
      }
    },
    rootMenuClick () {
      var me = this
      if (me.menuShow) {
        me.menuShow = false
      } else {
        me.menuShow = true
      }
    }
  },
  created () {
    // console.log('created')
    this.loadMenu()
    this.editableTabs = []
  },
  mounted () {
    var me = this
    me.resize(document.documentElement.clientHeight)
    window.addEventListener('resize', () => {
      return (() => {
        me.screenHeight = document.documentElement.clientHeight
      })()
    }, false)
  },
  watch: {
    screenHeight (val) {
      var me = this
      me.resize(val)
    }
  }
}
</script>

<style scoped>
  .el-header {
    background-color: #3c8dbc;
    color: #ffffff;
    text-align: center;
    line-height: 50px;
    max-height: 50px;
  }
  #aside {
    background-color: #222d32;
    border-right: solid 1px #e6e6e6;
  }
  .el-menu {
    border-right: none;
  }
  .el-menu-item{
    height: 42px;
    line-height: 42px;
  }
  .el-aside {
    background-color: #D3DCE6;
    width: auto;
    /*color: #333;*/
    /*text-align: center;*/
    height: 100%;
    /*line-height: 200px;*/
  }
  .el-main {
    /*background-color: #bbf3b1;*/
    color: #333;
    padding: 0px 4px;
  }
  .el-container .el-main .el-tabs .el-tabs__header {
    margin: 0 0 5px;
  }
  body > .el-container {
    /*margin-bottom: 40px;*/
  }
  #row-main {
    height: 100%;
    width: 100%;
    background: #eeeeee;
  }
  #container-content {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0px;
    bottom: 0px;
    padding: 0;
  }
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    /*line-height: 260px;*/
  }
  .el-container:nth-child(7) .el-aside {
    /*line-height: 320px;*/
  }
</style>
