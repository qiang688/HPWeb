<template>
  <el-container :style="constyle" class="list-container" v-loading="fromDataLoading">
    <el-header class="list-header">
      <div style="padding: 0px">
        <span>{{form.staffName}}</span>
        <div style="float: right">
          <el-button size="mini" type="primary" @click="butSubmitClick" plain icon="el-icon-edit" >保存</el-button>
        </div>
      </div>
    </el-header>
    <el-main class="list-main">
      <el-form :model="form" :rules="rules" ref="elForm" size="mini" label-width="100px" class="elform">
        <el-row><el-col><el-form-item label="机构ID" prop="orgId"><el-input v-model="form.orgId"/></el-form-item></el-col></el-row>
        <el-row><el-col :xs="24" :sm="12" :md="12" :lg="12"><el-form-item label="员工代码" prop="staffCode"><el-input v-model="form.staffCode"/></el-form-item></el-col><el-col :xs="24" :sm="12" :md="12" :lg="12"><el-form-item label="员工姓名" prop="staffName"><el-input v-model="form.staffName"/></el-form-item></el-col></el-row>
        <el-row><el-col :xs="24" :sm="12" :md="12" :lg="12"><el-form-item label="工作牌号" prop="workCode"><el-input v-model="form.workCode"/></el-form-item></el-col><el-col :xs="24" :sm="12" :md="12" :lg="12"><el-form-item label="工作类型" prop="workType"><el-input v-model="form.workType"/></el-form-item></el-col></el-row>
        <el-row><el-col :xs="24" :sm="12" :md="12" :lg="12"><el-form-item label="工作职称" prop="workTitle"><el-input v-model="form.workTitle"/></el-form-item></el-col><el-col :xs="24" :sm="12" :md="12" :lg="12"><el-form-item label="职称评定时间" prop="workTitleTime"><div class="block"/><el-date-picker class="cq-inputdatetime" v-model="form.workTitleTime" type="datetime" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss"/></el-form-item></el-col></el-row>
        <el-row><el-col :xs="24" :sm="12" :md="12" :lg="12"><el-form-item label="所属医组" prop="adminGroup"><el-input v-model="form.adminGroup"/></el-form-item></el-col><el-col :xs="24" :sm="12" :md="12" :lg="12"><el-form-item label="所属行政科室" prop="adminDept"><el-input v-model="form.adminDept"/></el-form-item></el-col></el-row>
        <el-row><el-col :xs="24" :sm="12" :md="12" :lg="12"><el-form-item label="性别" prop="staffSex"><el-input v-model="form.staffSex"/></el-form-item></el-col><el-col :xs="24" :sm="12" :md="12" :lg="12"><el-form-item label="出生日期" prop="staffBirthday"><div class="block"/><el-date-picker class="cq-inputdatetime" v-model="form.staffBirthday" type="datetime" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss"/></el-form-item></el-col></el-row>
        <el-row><el-col :xs="24" :sm="12" :md="12" :lg="12"><el-form-item label="门诊预交金操作员序号" prop="dispPrepayOperatorSeqNo"><el-input v-model="form.dispPrepayOperatorSeqNo"/></el-form-item></el-col><el-col :xs="24" :sm="12" :md="12" :lg="12"><el-form-item label="住院预交金操作员序号" prop="resiPrepayOperatorSeqNo"><el-input v-model="form.resiPrepayOperatorSeqNo"/></el-form-item></el-col></el-row>
        <el-row><el-col :xs="24" :sm="12" :md="12" :lg="12"><el-form-item label="有效标志" prop="validFlag"><el-input v-model="form.validFlag"/></el-form-item></el-col><el-col :xs="24" :sm="12" :md="12" :lg="12"><el-form-item label="排序号" prop="sortNo"><el-input v-model="form.sortNo"/></el-form-item></el-col></el-row>
        <el-row><el-col :xs="24" :sm="12" :md="12" :lg="12"><el-form-item label="用户编码" prop="userCode"><el-input v-model="form.userCode"/></el-form-item></el-col><el-col :xs="24" :sm="12" :md="12" :lg="12"><el-form-item label="自定义编码" prop="customCode"><el-input v-model="form.customCode"/></el-form-item></el-col></el-row>
        <el-row><el-col :xs="24" :sm="12" :md="12" :lg="12"><el-form-item label="拼音首码" prop="spellCode"><el-input v-model="form.spellCode"/></el-form-item></el-col><el-col :xs="24" :sm="12" :md="12" :lg="12"><el-form-item label="五笔首码" prop="wbzxCode"><el-input v-model="form.wbzxCode"/></el-form-item></el-col></el-row>
        <el-row><el-col :xs="24" :sm="12" :md="12" :lg="12"><el-form-item label="创建时间" prop="createTime"><div class="block"/><el-date-picker class="cq-inputdatetime" v-model="form.createTime" type="datetime" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss"/></el-form-item></el-col><el-col :xs="24" :sm="12" :md="12" :lg="12"><el-form-item label="创建人" prop="createOperator"><el-input v-model="form.createOperator"/></el-form-item></el-col></el-row>
        <el-row><el-col :xs="24" :sm="12" :md="12" :lg="12"><el-form-item label="修改时间" prop="modifyTime"><div class="block"/><el-date-picker class="cq-inputdatetime" v-model="form.modifyTime" type="datetime" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss"/></el-form-item></el-col><el-col :xs="24" :sm="12" :md="12" :lg="12"><el-form-item label="修改人" prop="modifyOperator"><el-input v-model="form.modifyOperator"/></el-form-item></el-col></el-row>
        <el-row><el-col :xs="24" :sm="12" :md="12" :lg="12"><el-form-item label="身份证号" prop="identityCardNo"><el-input v-model="form.identityCardNo"/></el-form-item></el-col><el-col :xs="24" :sm="12" :md="12" :lg="12"><el-form-item label="从业资格证编号" prop="staffCertificateNo"><el-input v-model="form.staffCertificateNo"/></el-form-item></el-col></el-row>
        <el-row><el-col :xs="24" :sm="12" :md="12" :lg="12"><el-form-item label="所属团队" prop="adminTeam"><el-input v-model="form.adminTeam"/></el-form-item></el-col><el-col :xs="24" :sm="12" :md="12" :lg="12"><el-form-item label="联系电话" prop="staffPhone"><el-input v-model="form.staffPhone"/></el-form-item></el-col></el-row>
        <el-row><el-col :xs="24" :sm="12" :md="12" :lg="12"><el-form-item label="CA标志" prop="useCaFlag"><el-input v-model="form.useCaFlag"/></el-form-item></el-col><el-col :xs="24" :sm="12" :md="12" :lg="12"><el-form-item label="CA" prop="phuseCaFlag"><el-input v-model="form.phuseCaFlag"/></el-form-item></el-col></el-row>
        <el-row><el-col :xs="24" :sm="12" :md="12" :lg="12"><el-form-item label="医师代码" prop="physicStaffCode"><el-input v-model="form.physicStaffCode"/></el-form-item></el-col><el-col :xs="24" :sm="12" :md="12" :lg="12"><el-form-item label="备注" prop="remark"><el-input v-model="form.remark"/></el-form-item></el-col></el-row>
      </el-form>
    </el-main>
  </el-container>
</template>
<script src="./StaffDictEdit.js"></script>
<style scoped src="../../../assets/css/base-form.css"></style>
