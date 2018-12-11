<template>
<el-card class="box-card">
  <!-- 搜过框 -->
   <el-row class="searchArea">
      <el-col :span="24">
           <el-input v-model="searchValue" class="searchInput" clearable placeholder="请输入店铺名称" @clear="clearSearch">
            <el-button @click="handleSearch" slot="append" icon="el-icon-search"></el-button>
           </el-input>
      </el-col>
    </el-row>

   <el-tabs v-model="activeName" @tab-click="handleTabClick(activeName)"  >
    <el-tab-pane label="全部商铺信息" name="全部信息">
        <my-table :tableData='tableData' @childMethod="handleTabClick(activeName)"></my-table>
    </el-tab-pane>
    <el-tab-pane label="普通店铺" name="普通店铺">
          <my-table :tableData='tableData' @childMethod="handleTabClick(activeName)"></my-table>
    </el-tab-pane>
    <el-tab-pane label="直营店" name="直营店">
          <my-table :tableData='tableData' @childMethod="handleTabClick(activeName)"></my-table>
    </el-tab-pane>
    <el-tab-pane label="平台自营" name="平台自营">
          <my-table :tableData='tableData' @childMethod="handleTabClick(activeName)"></my-table>
    </el-tab-pane>
    <el-tab-pane label="网商" name="网商">
          <my-table :tableData='tableData' @childMethod="handleTabClick(activeName)"></my-table>
    </el-tab-pane>
    <el-tab-pane label="地商" name="地商">
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
import MyTable from "../components/all_Merchant_table";
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
    //清除情况输入框
    clearSearch(){
      this.handleTabClick(this.activeName);
    },
    //详细查询
    handleSearch(){
      this.handleTabClick(this.searchValue);
    },
    //获取代理订单数据
    async handleTabClick(state) {
    //获取全部信息
      if (state === "全部信息") {
        const res = await this.$http.post(
          "/index.php/Admin/EmShop/getList",
          {
            page_num: this.page_num || 1,
            page_limit: this.page_limit || 2
          }
        );
        console.log(res);
        
        const status = res.status;
        if (status === 200) {
          const { result } = res.data;
          this.total = result.total - 0;
          this.tableData = result.data;
        }
        return;
      }
      //获取普通店
      if (state === "普通店铺" || state === "直营店"||state === "平台自营") {
        const res = await this.$http.post(
          "/index.php/Admin/EmShop/getList",
          {
            page_num: this.page_num || 1,
            page_limit: this.page_limit || 2,
            type:state,
          }
        );
        console.log(res);
        
        const status = res.status;
        if (status === 200) {
          const { result } = res.data;
          this.total = result.total - 0;
          this.tableData = result.data;
        }
        return;
      }
      //获取网点
      if (state === "网商") {
        const res = await this.$http.post(
          "/index.php/Admin/EmShop/getList",
          {
            page_num: this.page_num || 1,
            page_limit: this.page_limit || 2,
            clid:3,
          }
        );
        console.log(res);
        
        const status = res.status;
        if (status === 200) {
          const { result } = res.data;
          this.total = result.total - 0;
          this.tableData = result.data;
        }
        return;
      }
      if (state === "地商") {
        const res = await this.$http.post(
          "/index.php/Admin/EmShop/getList",
          {
            page_num: this.page_num || 1,
            page_limit: this.page_limit || 2,
            clid:4,
          }
        );
        console.log(res);
        
        const status = res.status;
        if (status === 200) {
          const { result } = res.data;
          this.total = result.total - 0;
          this.tableData = result.data;
        }
        return;
      }
    //模糊查询
    console.log(this.searchValue);
    
        const res = await this.$http.post(
          "/index.php/Admin/EmShop/getList",
          {
            page_num: this.page_num || 1,
            page_limit: this.page_limit || 2,
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
      
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.page_limit = val;
      this.handleTabClick(this.activeName);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page_num = val;
      this.handleTabClick(this.activeName);
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
