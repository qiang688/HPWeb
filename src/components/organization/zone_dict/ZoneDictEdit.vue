<template>
  <el-container :style="constyle" class="list-container" v-loading="fromDataLoading">
    <el-header class="list-header">
      <div style="padding: 0px">
        <span>{{form.zoneName}}</span>
        <div style="float: right">
          <el-button size="mini" type="primary" @click="butSubmitClick" plain icon="el-icon-edit" >保存</el-button>
        </div>
      </div>
    </el-header>
    <el-main class="list-main">
      <el-form :model="form" :rules="rules" ref="elForm" size="mini" label-width="100px" class="elform">
        <el-row><el-col><el-form-item label="机构ID" prop="orgId"><el-input v-model="form.orgId"/></el-form-item></el-col></el-row>
        <el-row><el-col><el-form-item label="行政区代码" prop="zoneCode"><el-input v-model="form.zoneCode"/></el-form-item></el-col></el-row>
        <el-row><el-col><el-form-item label="行政区名称" prop="zoneName"><el-input v-model="form.zoneName"/></el-form-item></el-col></el-row>
        <el-row><el-col><el-form-item label="行政区级别" prop="zoneLevel"><el-input v-model="form.zoneLevel"/></el-form-item></el-col></el-row>
        <el-row><el-col><el-form-item label="有效标志" prop="validFlag"><el-input v-model="form.validFlag"/></el-form-item></el-col></el-row>
        <el-row><el-col><el-form-item label="用户编码" prop="userCode"><el-input v-model="form.userCode"/></el-form-item></el-col></el-row>
        <el-row><el-col><el-form-item label="自定义编码" prop="customCode"><el-input v-model="form.customCode"/></el-form-item></el-col></el-row>
        <el-row><el-col><el-form-item label="拼音首码" prop="spellCode"><el-input v-model="form.spellCode"/></el-form-item></el-col></el-row>
        <el-row><el-col><el-form-item label="五笔首码" prop="wbzxCode"><el-input v-model="form.wbzxCode"/></el-form-item></el-col></el-row>
        <el-row><el-col><el-form-item label="排序号" prop="sortNo"><el-input v-model="form.sortNo"/></el-form-item></el-col></el-row>
        <el-row><el-col><el-form-item label="备注" prop="remark"><el-input v-model="form.remark"/></el-form-item></el-col></el-row>
        <el-row><el-col><el-form-item label="家庭健康档案当前编号" prop="healthArchiveNo"><el-input v-model="form.healthArchiveNo"/></el-form-item></el-col></el-row>
        <el-row><el-col><el-form-item label="严精国家编码" prop="zoneCountyCode"><el-input v-model="form.zoneCountyCode"/></el-form-item></el-col></el-row>
      </el-form>
    </el-main>
  </el-container>
</template>
<script src="./ZoneDictEdit.js"></script>
<style scoped src="../../../assets/css/base-form.css"></style>
