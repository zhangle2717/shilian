<template>
<el-card class="box-card">
  <!-- 搜过框 -->
   <el-row class="searchArea">
      <el-col :span="24">
           <el-input v-model="searchValue" class="searchInput" clearable placeholder="请输入内容" @clear="clearSearch">
            <el-button @click="handleSearch" slot="append" icon="el-icon-search"></el-button>
           </el-input>
      </el-col>
    </el-row>

   <el-tabs v-model="activeName" @tab-click="handleTabClick(activeName)"  >
    <el-tab-pane label="全部代理信息" name="全部信息">
        <my-table :tableData='tableData' @childMethod="handleTabClick(activeName)"></my-table>
    </el-tab-pane>
    <el-tab-pane label="市代理" name="市代理">
          <my-table :tableData='tableData' @childMethod="handleTabClick(activeName)"></my-table>
    </el-tab-pane>
    <el-tab-pane label="社区服务中心" name="社区服务中心">
          <my-table :tableData='tableData' @childMethod="handleTabClick(activeName)"></my-table>
    </el-tab-pane>
    <el-tab-pane label="未代理" name="未代理">
          <my-table :tableData='tableData' @childMethod="handleTabClick(activeName)"></my-table>
    </el-tab-pane>
  </el-tabs>
  <!-- 分页 -->
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page_num"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="page_limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
</el-card>
</template>

<script>
import MyTable from "../components/all_Agency_table";
export default {
  components: {
    MyTable
  },
  data() {
    return {
      activeName: "全部信息",
      tableData: [],
      total: null,
      page_num: 1,
      page_limit: 2,
      searchValue:'',
    };
  },
  created() {
    this.handleTabClick(this.activeName);
  },
  
  methods: {
    //情况输入框
    clearSearch(){
      this.handleTabClick(this.activeName);
    },
    //详细查询
    handleSearch(){
      this.handleTabClick(this.searchValue);
    },
    //获取代理订单数据
    async handleTabClick(state) {
      console.log(state);
      
      if (state === "全部信息") {
        const res = await this.$http.post(
          "/index.php/Admin/EmUser/getList",
          {
            page_num: this.page_num || 1,
            page_limit: this.page_limit || 2
          }
        );
        const status = res.status;
        if (status === 200) {
          const { result } = res.data;
          this.total = result.total - 0;
          this.tableData = result.data;
        }
        return;
      }
      if (state === "未代理") {
        const res = await this.$http.post(
          "/index.php/Admin/EmUser/getList",
          {
            page_num: this.page_num || 1,
            page_limit: this.page_limit || 2,
            type:'none'
          }
        );
        const status = res.status;
        if (status === 200) {
          const { result } = res.data;
          this.total = result.total - 0;
          this.tableData = result.data;
        }
        return;
      }
      if(state==="市代理" || state==="社区服务中心"){
          const res = await this.$http.post(
          "/index.php/Admin/EmUser/getList",
          {
            page_num: this.page_num || 1,
            page_limit: this.page_limit || 2,
            type:state
          }
        );

        const status = res.status;
        if (status === 200) {
          const { result } = res.data;
          this.total = result.total - 0;
          this.tableData = result.data;
        }
        return
      }
      if(this.searchValue!==''){
        console.log(this.searchValue);
        
          const res = await this.$http.post(
          "/index.php/Admin/EmUser/getList",
          {
            search:this.searchValue
          }
        );
      console.log(res);
      
        const status = res.status;
        if (status === 200) {
          const { result } = res.data;
          this.total = result.total - 0;
          this.tableData = result.data;
        }
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.page_limit = val;
      this.handleTabClick(this.activeName);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page_num = val;
      this.handleTabClick(this.activeName, null, this.page_num);
    }
  }
};
</script>

<style>
.box-card {
  height: 100%;
}
.searchArea {
  margin-top: 10px;
  margin-bottom: 10px;
}
.searchArea .searchInput {
  width: 350px;
}
</style>
