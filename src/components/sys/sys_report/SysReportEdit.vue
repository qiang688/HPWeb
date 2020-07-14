<template>
  <el-dialog title="报表" :visible.sync="dialogFormVisible" width="80%">
      <el-form :model="form" :rules="rules" ref="elForm" size="mini" label-width="100px">
        <el-row><el-col><el-form-item label="报表编码" prop="report_no"><el-input v-model="form.report_no" :disabled="disabledFlag.disabled_report_no" :readonly="readonlyFlag.readonly_report_no"/></el-form-item></el-col></el-row>
        <el-row><el-col><el-form-item label="报表名称" prop="report_name"><el-input v-model="form.report_name" :disabled="disabledFlag.disabled_report_name" :readonly="readonlyFlag.readonly_report_name"/></el-form-item></el-col></el-row>
        <el-row><el-col><el-form-item label="报表标题" prop="report_title"><el-input v-model="form.report_title" :disabled="disabledFlag.disabled_report_title" :readonly="readonlyFlag.readonly_report_title"/></el-form-item></el-col></el-row>
        <el-row><el-col><el-form-item label="报表模板" prop="view_template"><el-input v-model="form.view_template" :disabled="disabledFlag.disabled_view_template" :readonly="readonlyFlag.readonly_view_template"/></el-form-item></el-col></el-row>
        <el-row><el-col><el-form-item label-width="0"><el-checkbox class="cq-el-check" v-model="form.valid_flag" :true-label="1" :false-label="0" :checked="true" :disabled="disabledFlag.disabled_valid_flag">有效</el-checkbox></el-form-item></el-col></el-row>
      </el-form>
    <div slot="footer" class="dialog-footer" >
      <el-button size="mini"  @click="dialogFormVisible = false">取 消</el-button>
      <el-button size="mini" type="primary" @click="butSubmitClick">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script src="./SysReportEdit.js"></script>
<style scoped src="../../../assets/css/base-form.css"></style>
