<template>
  <el-dialog title="报表" :visible.sync="dialogFormVisible" width="80%">
      <el-form :model="form" :rules="rules" ref="elForm" size="mini" label-width="100px">
        <el-row><el-col><el-form-item label="报表ID" prop="report_id"><el-input v-model="form.report_id" :disabled="disabledFlag.disabled_report_id" :readonly="readonlyFlag.readonly_report_id"/></el-form-item></el-col></el-row>
        <el-row><el-col><el-form-item label="报表数据源名称" prop="data_source_name"><el-input v-model="form.data_source_name" :disabled="disabledFlag.disabled_data_source_name" :readonly="readonlyFlag.readonly_data_source_name"/></el-form-item></el-col></el-row>
        <el-row><el-col><el-form-item label="报表数据源文件" prop="data_source_file"><el-input v-model="form.data_source_file" :disabled="disabledFlag.disabled_data_source_file" :readonly="readonlyFlag.readonly_data_source_file"/></el-form-item></el-col></el-row>
        <el-row><el-col><el-form-item label-width="0"><el-checkbox class="cq-el-check" v-model="form.valid_flag" :true-label="1" :false-label="0" :checked="true" :disabled="disabledFlag.disabled_valid_flag">有效</el-checkbox></el-form-item></el-col></el-row>
      </el-form>
    <div slot="footer" class="dialog-footer" >
      <el-button size="mini"  @click="dialogFormVisible = false">取 消</el-button>
      <el-button size="mini" type="primary" @click="butSubmitClick">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script src="./SysReportDatasourceEdit.js"></script>
<style scoped src="../../../assets/css/base-form.css"></style>
