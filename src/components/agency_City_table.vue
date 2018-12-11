<template>
  <el-table :data="tableData" stripe style="width: 100%"  height="440">
            <el-table-column type="index"  width="50">
            </el-table-column>
            <el-table-column prop="co_name" label="代理级别" width="120" align="center">
            </el-table-column>
            <el-table-column prop="co_id" label="代理编号" width="150" align="center">
            </el-table-column>
            <el-table-column prop="co_option" label="代理区域" width="150" align="center">
            </el-table-column>
            <el-table-column prop="co_status" label="代理状态" width="150" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.co_status==='normal'">正常</span>
                    <span v-else>异常</span>
                </template>
            </el-table-column>
            <el-table-column prop="co_type" label="代理类型" width="150" align="center">
            </el-table-column>
            <el-table-column prop="co_sort" label="代理方式" align="center" width="150">
            </el-table-column>
            <!-- 空标签 -->
            <el-table-column   align="center" >
            </el-table-column>
            <!-- <el-table-column  label="下单时间">
                  <template slot-scope="scope">
                     {{scope.row.co_save_time | fmtDate('YYYY-MM-DD')}}
                </template>
            </el-table-column>
            <el-table-column  label="完成时间">
                 <template slot-scope="scope">
                     {{scope.row.co_add_time | fmtDate('YYYY-MM-DD')}}
                </template>
            </el-table-column> -->
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
