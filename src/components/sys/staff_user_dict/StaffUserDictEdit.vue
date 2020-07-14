<template>
  <el-dialog title="用户" :visible.sync="dialogFormVisible" width="100%"  :close-on-click-modal="false" :close-on-press-escape="false">
    <el-form :model="form" :rules="rules" ref="elForm" size="mini" label-width="100px">
      <el-row><el-col><el-form-item label="机构ID" prop="org_id"><el-input v-model="form.org_id"/></el-form-item></el-col></el-row>
      <el-row><el-col><el-form-item label="登录用户名" prop="login_user"><el-input v-model="form.login_user"/></el-form-item></el-col></el-row>
      <el-row><el-col><el-form-item label="登录用户密码" prop="login_password"><el-input v-model="form.login_password"/></el-form-item></el-col></el-row>
      <el-row><el-col><el-form-item label="登录角色限制" prop="login_limit_role"><el-input v-model="form.login_limit_role"/></el-form-item></el-col></el-row>
      <el-row><el-col><el-form-item label="员工代码" prop="staff_code"><el-input v-model="form.staff_code"/></el-form-item></el-col></el-row>
      <el-row><el-col><el-form-item label="超级用户标志" prop="super_user_flag"><el-input v-model="form.super_user_flag"/></el-form-item></el-col></el-row>
      <el-row><el-col><el-form-item label="有效标志" prop="valid_flag"><el-input v-model="form.valid_flag"/></el-form-item></el-col></el-row>
      <el-row><el-col><el-form-item label="排序号" prop="sort_no"><el-input v-model="form.sort_no"/></el-form-item></el-col></el-row>
      <el-row><el-col><el-form-item label="创建时间" prop="create_time"><div class="block"/><el-date-picker class="cq-inputdatetime" v-model="form.create_time" type="datetime" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss"/></el-form-item></el-col></el-row>
      <el-row><el-col><el-form-item label="创建人" prop="create_operator"><el-input v-model="form.create_operator"/></el-form-item></el-col></el-row>
      <el-row><el-col><el-form-item label="修改时间" prop="modify_time"><div class="block"/><el-date-picker class="cq-inputdatetime" v-model="form.modify_time" type="datetime" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss"/></el-form-item></el-col></el-row>
      <el-row><el-col><el-form-item label="修改人" prop="modify_operator"><el-input v-model="form.modify_operator"/></el-form-item></el-col></el-row>
      <el-row><el-col><el-form-item label="备注" prop="remark"><el-input v-model="form.remark"/></el-form-item></el-col></el-row>
      <el-row><el-col><el-form-item label="SPELL_CODE" prop="spell_code"><el-input v-model="form.spell_code"/></el-form-item></el-col></el-row>
      <el-row><el-col><el-form-item label="WBZX_CODE" prop="wbzx_code"><el-input v-model="form.wbzx_code"/></el-form-item></el-col></el-row>
      <el-row><el-col><el-form-item label="统一登录" prop="openid"><el-input v-model="form.openid"/></el-form-item></el-col></el-row>
      <el-row><el-col><el-form-item label="BIRTH_ACCOUNT_TYPE" prop="birth_account_type"><el-input v-model="form.birth_account_type"/></el-form-item></el-col></el-row>
      <el-row><el-col><el-form-item label="BIRTH_ACCOUNT_UPDATE" prop="birth_account_update"><el-input v-model="form.birth_account_update"/></el-form-item></el-col></el-row>
      <el-row><el-col><el-form-item label="BIRTH_LAST_UPLOAD_TIME" prop="birth_last_upload_time"><div class="block"/><el-date-picker class="cq-inputdatetime" v-model="form.birth_last_upload_time" type="datetime" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss"/></el-form-item></el-col></el-row>
      <el-row><el-col><el-form-item label="ID_NO" prop="id_no"><el-input v-model="form.id_no"/></el-form-item></el-col></el-row>
      <el-row><el-col><el-form-item label="LOGIN_FAIL_COUNT" prop="login_fail_count"><el-input v-model="form.login_fail_count"/></el-form-item></el-col></el-row>
    </el-form>
    <div slot="footer" class="dialog-footer" >
      <el-button size="mini"  @click="dialogFormVisible = false">取 消</el-button>
      <el-button size="mini" type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script src="./StaffUserDictEdit.js"></script>
<style scoped src="../../../assets/css/base-form.css"></style>
