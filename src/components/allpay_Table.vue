<template>
  <el-table :data="tableData" stripe style="width: 100%"  height="440">
            <el-table-column type="index"  width="50">
            </el-table-column>
            <el-table-column prop="Shop.sh_name" label="商家" width="100">
            </el-table-column>
            <el-table-column prop="qor_orderid" label="订单编号" width="180">
            </el-table-column>
            <el-table-column prop="qor_price" label="订单价格" width="100">
            </el-table-column>
            <el-table-column prop="qor_invoice" label="是否开发表" width="180">
              
            </el-table-column>
            <el-table-column prop="qor_pay_type" label="支付类型">
            </el-table-column>
            <el-table-column  label="下单时间">
                  <template slot-scope="scope">
                     {{scope.row.qor_add_time | fmtDate('YYYY-MM-DD')}}
                </template>
            </el-table-column>
            <el-table-column  label="完成时间">
                 <template slot-scope="scope">
                     {{scope.row.qor_finish_time | fmtDate('YYYY-MM-DD')}}
                </template>
            </el-table-column>
        </el-table>
</template>

<script>
export default {
      props: ['tableData'],
    data() {
        return {
            // tableData: []
          
        }
        },
    }
</script>

<style>

</style>
