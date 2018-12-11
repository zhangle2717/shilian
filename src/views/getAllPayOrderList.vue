<template>
<el-card class="box-card">
   <el-tabs v-model="activeName" @tab-click="handleTabClick(activeName)">
    <el-tab-pane label="全部信息" name="全部信息">
        <my-table :tableData='tableData'></my-table>
    </el-tab-pane>
    <el-tab-pane label="已付款" name="已付款">
         <my-table :tableData='tableData'></my-table>
    </el-tab-pane>
    <el-tab-pane label="未付款" name="未付款">
          <my-table :tableData='tableData'></my-table>
    </el-tab-pane>
  </el-tabs>
  <!-- 分页 -->
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page_num"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="page_limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
</el-card>
</template>

<script>
import MyTable from '../components/allpay_Table'
export default {
    components:{
      MyTable
    },
  data() {
    return {
      activeName: "全部信息",
      tableData:[],
      total:null,
      page_num:1,
      page_limit:2,
    };

  },
  created() {
      this.handleTabClick(this.activeName)
  },
  methods: {
    async handleTabClick(index,num,limit) {
        if(index==="全部信息"){
            const res = await this.$http.post("/index.php/Admin/EmQrcodeOrderRecord/getList",{
                page_num:this.page_num || 1,
                page_limit:this.page_limit || 1,
            },"json");
            console.log(res);
            const status =res.status
            if(status===200){
                const {result}=res.data
                this.total=result.total-0
                this.tableData=result.data
            }
        }else if(index==="已付款"){
            const res = await this.$http.post("/index.php/Admin/EmQrcodeOrderRecord/getList",{
                page_num:this.page_num || 1,
                page_limit:this.page_limit || 1,
                status:"已完成"
            });
            const status =res.status
            if(status===200){
                const {result}=res.data
                this.total=result.total-0
                this.tableData=result.data
            }
        }else if(index==="未付款"){
            const res = await this.$http.post("/index.php/Admin/EmQrcodeOrderRecord/getList",{
                page_num:this.page_num || 1,
                page_limit:this.page_limit || 1,
                status:'待付款'
            });
            const status =res.status
            if(status===200){
                const {result}=res.data
                this.total=result.total-0
                this.tableData=result.data
            }
        }
     
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.page_limit = val
      this.handleTabClick(this.activeName,this.page_limit,null)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.page_num = val
      this.handleTabClick(this.activeName,null,this.page_num)
    },
  },

};
</script>

<style>
</style>
