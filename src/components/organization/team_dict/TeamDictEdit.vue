<template>
  <el-container :style="constyle" class="list-container" v-loading="fromDataLoading">
    <el-header class="list-header">
      <div style="padding: 0px">
        <span>{{form.teamName}}</span>
        <div style="float: right">
          <el-button size="mini" type="primary" @click="butSubmitClick" plain icon="el-icon-edit" >保存</el-button>
        </div>
      </div>
    </el-header>
    <el-main class="list-main">
      <el-form :model="form" :rules="rules" ref="elForm" size="mini" label-width="100px" class="elform">
        <el-row><el-col :xs="24" :sm="12" :md="12" :lg="12"><el-form-item label="机构ID" prop="orgId"><el-input v-model="form.orgId"/></el-form-item></el-col><el-col :xs="24" :sm="12" :md="12" :lg="12"><el-form-item label="团队名称" prop="teamName"><el-input v-model="form.teamName"/></el-form-item></el-col></el-row>
        <el-row><el-col :xs="24" :sm="12" :md="12" :lg="12"><el-form-item label="团队缩写" prop="teamAbbr"><el-input v-model="form.teamAbbr"/></el-form-item></el-col><el-col :xs="24" :sm="12" :md="12" :lg="12"><el-form-item label="有效标志" prop="validFlag"><el-input v-model="form.validFlag"/></el-form-item></el-col></el-row>
        <el-row><el-col :xs="24" :sm="12" :md="12" :lg="12"><el-form-item label="用户编码" prop="userCode"><el-input v-model="form.userCode"/></el-form-item></el-col><el-col :xs="24" :sm="12" :md="12" :lg="12"><el-form-item label="自定义编码" prop="customCode"><el-input v-model="form.customCode"/></el-form-item></el-col></el-row>
        <el-row><el-col :xs="24" :sm="12" :md="12" :lg="12"><el-form-item label="拼音首码" prop="spellCode"><el-input v-model="form.spellCode"/></el-form-item></el-col><el-col :xs="24" :sm="12" :md="12" :lg="12"><el-form-item label="五笔首码" prop="wbzxCode"><el-input v-model="form.wbzxCode"/></el-form-item></el-col></el-row>
        <el-row><el-col :xs="24" :sm="12" :md="12" :lg="12"><el-form-item label="创建时间" prop="createTime"><div class="block"/><el-date-picker class="cq-inputdatetime" v-model="form.createTime" type="datetime" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss"/></el-form-item></el-col><el-col :xs="24" :sm="12" :md="12" :lg="12"><el-form-item label="创建人" prop="createOperator"><el-input v-model="form.createOperator"/></el-form-item></el-col></el-row>
        <el-row><el-col :xs="24" :sm="12" :md="12" :lg="12"><el-form-item label="修改时间" prop="modifyTime"><div class="block"/><el-date-picker class="cq-inputdatetime" v-model="form.modifyTime" type="datetime" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss"/></el-form-item></el-col><el-col :xs="24" :sm="12" :md="12" :lg="12"><el-form-item label="修改人" prop="modifyOperator"><el-input v-model="form.modifyOperator"/></el-form-item></el-col></el-row>
        <el-row><el-col :xs="24" :sm="12" :md="12" :lg="12"><el-form-item label="排序号" prop="sortNo"><el-input v-model="form.sortNo"/></el-form-item></el-col><el-col :xs="24" :sm="12" :md="12" :lg="12"><el-form-item label="MOBI_PHONE" prop="mobiPhone"><el-input v-model="form.mobiPhone"/></el-form-item></el-col></el-row>
        <el-row><el-col><el-form-item label="备注" prop="remark"><el-input v-model="form.remark"/></el-form-item></el-col></el-row>
      </el-form>
    </el-main>
  </el-container>
</template>
<script src="./TeamDictEdit.js"></script>
<style scoped src="../../../assets/css/base-form.css"></style>
