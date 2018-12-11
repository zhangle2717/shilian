<template>
<el-card class="box-card">
    <el-table :data="tableData" stripe style="width: 100%" height="440">
        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column prop="Shop.sh_name" label="商家" width="100" align="center">
        </el-table-column>
        <el-table-column prop="User.us_nickname" label="消费者" width="100" align="center">
        </el-table-column>
        <el-table-column label="代理区域" width="180" align="center">
            <template slot-scope="scope">
                <span>{{scope.row.ar_province}}</span>
                <span>{{scope.row.ar_city}}</span>
                <span>{{scope.row.ar_area}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="ar_orderid" label="订单编号" width="180" align="center">
        </el-table-column>
        <el-table-column prop="ar_pay_type" label="支付类型" align="center">
        </el-table-column>
        <el-table-column prop="ar_price" label="金额" align="center">
        </el-table-column>
        <el-table-column prop="ar_status" label="当前状态" align="center">
        </el-table-column>
        <el-table-column label="创建时间" align="center">
            <template slot-scope="scope">
                {{scope.row.ar_add_time | fmtDate('YYYY-MM-DD')}}
            </template>
        </el-table-column>
        <el-table-column label="审核时间" align="center">
            <template slot-scope="scope">
                {{scope.row.ar_pass_time | fmtDate('YYYY-MM-DD')}}
            </template>
        </el-table-column>
        <el-table-column label="操作" width="100" align="center">
            <template slot-scope="scope">
                <el-button @click="getCurrentUserStatus(scope.row)" plain size="mini" type="primary" icon="el-icon-edit" circle></el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 编辑状态 -->
    <el-dialog title="状态信息" :visible.sync="dialogFormVisible">
        <el-form :model="formData">
            <el-form-item label="ID" :label-width="formLabelWidth">
                <el-input v-model="formData.ar_id" autocomplete="off" disabled></el-input>
            </el-form-item>
        
            <el-form-item label="消费者" :label-width="formLabelWidth" >
                <el-input v-model="formData.User.us_nickname" autocomplete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="订单编号" :label-width="formLabelWidth">
                <el-input v-model="formData.ar_orderid" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="金额" :label-width="formLabelWidth">
                <el-input v-model="formData.ar_price" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="当前状态" :label-width="formLabelWidth">
                <el-select v-model="formData.ar_status" placeholder="请选择活动区域">
                    <el-option label="待审核" value="待审核"></el-option>
                    <el-option label="待付款" value="待付款"></el-option>
                    <el-option label="已完成" value="已完成"></el-option>
                    <el-option label="已驳回" value="已驳回"></el-option>
                    <el-option label="已超时" value="已超时"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateCurrentUserStatus()">确 定</el-button>
        </div>
    </el-dialog>
</el-card>
</template>

<script>
export default {
    props: ["tableData"],
    data() {
        return {
            dialogFormVisible: false,
            formData:{
                User:{},
                ar_orderid:null,
                ar_price:null,
                ar_status:null,
                ar_id:null,
            },
            formLabelWidth: '120px'

        };
    },
    methods: {
        getCurrentUserStatus(data){
             this.formData=data
             this.dialogFormVisible = true
             console.log(this.formData);
         },
        async updateCurrentUserStatus(){
            const res = await this.$http.post('/index.php/Admin/EmAgencyRecord/editOfStatus',{
                id:this.formData.ar_id,
                status:this.formData.ar_status
            })
            console.log(res);
            const {status} = res
            if(status===200){
                this.$message({
                 message: '修改成功',
                 type: 'success'
        }); 
            }
             this.dialogFormVisible = false
         }
    }
};
</script>

<style>
</style>
