<template>
  <el-dialog title="地址" :visible.sync="dialogFormVisible" width="80%" >
    <el-container class="list-container">
      <el-header class="list-header">
        <div style="padding: 0px">
          <div style="float: left">
            <el-breadcrumb separator="/">
              <template v-for="ads in addressItems" >
                <el-breadcrumb-item :key="ads.address_id" @click="rowClick(ads)">
                  <span @click="rowdblClick(ads)" style="cursor:pointer;">{{ads.address_name}}</span>
                </el-breadcrumb-item>
              </template>
            </el-breadcrumb>
          </div>
          <div style="float: right">
            <el-button @click="butAddClick" size="mini" type="primary" plain icon="el-icon-circle-plus-outline">新增</el-button>
            <el-button @click="butEditClick" size="mini" type="primary" plain icon="el-icon-edit">修改</el-button>
            <el-button @click="butDelClick" size="mini" type="primary" plain icon="el-icon-delete">删除</el-button>
          </div>
        </div>
      </el-header>
      <el-main class="list-main">
        <template v-for="row in tableData" >
          <div :key="row.address_id"
               class="address-row"
               :class="addressRowSelected(row)"
               @dblclick="rowdblClick(row)"
               @click="rowClick(row)">{{ row.address_name }}</div>
        </template>
      </el-main>
      <el-footer class="list-footer">
        <div>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="pageSizes"
            :page-size="25"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalRows">
          </el-pagination>
        </div>
      </el-footer>
    </el-container>
    <div slot="footer" class="dialog-footer" >
      <el-button size="mini"  @click="dialogFormVisible = false">取 消</el-button>
      <el-button size="mini" type="primary" @click="butSubmitClick">确 定</el-button>
    </div>
    <AddressDictEdit ref="addressDictEdit"></AddressDictEdit>
  </el-dialog>
</template>
<script src="./AddressDictManage.js"></script>
<style scoped src="../../../assets/css/base-form.css"></style>
