<template>
<el-card class="box-card">
        <h2>市代类型列表及代理费</h2>
     <my-table :tableData='tableData'></my-table>
</el-card>
</template>

<script>
import MyTable from "../components/agency_City_table";
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
      page_limit: 2
    };
  },
  created() {
    this.handleTabClick(this.activeName);
  },
  methods: {
    async handleTabClick(state) {
      if (state === "全部信息") {
        const res = await this.$http.post(
          "/index.php/Admin/EmConf/getAgencyCityPriceList",
        );

        console.log(res);
        const status = res.status;
        if (status === 200) {
          const result = res.data.result
          this.tableData =result;
        }
        return;
      }
     
    },
    
  }
};
</script>

<style>
h2{
  text-align: center
}
</style>
