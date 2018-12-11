<template>
<el-card class="box-card">
    <el-table :data="tableData" stripe style="width: 100%" height="380">
        <el-table-column type="index" width="50">
        </el-table-column>
        <!-- <el-table-column  label="logo" width="100">
            <template slot-scope="scope">
                <img  :src="'http://192.168.1.50'+scope.row.sh_logo" alt="" width="50">
            </template>
        </el-table-column> -->
        <!-- <el-table-column prop="sh_brand" label="品牌" width="100">
        </el-table-column> -->
        <el-table-column prop="User.us_nickname" label="名称" width="70" align="center">
        </el-table-column>
        <el-table-column prop="sh_user_sex" label="性别" width="50"  align="center">
        </el-table-column>
        <el-table-column prop="sh_name" label="店铺名称" width="100">
        </el-table-column>
        <el-table-column prop="sh_go_clid" label="商品编号" width="80"  align="center">
        </el-table-column>
        <el-table-column prop="sh_details" label="公司名称" width="100">
        </el-table-column>
        <el-table-column label="公司地址" width="180" align="center">
            <template slot-scope="scope">
                <span>{{scope.row.sh_province}}</span>
                <span>{{scope.row.sh_city}}</span>
                <span>{{scope.row.sh_county}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="sh_tel" label="联系方式" width="120">
        </el-table-column>
        <el-table-column prop="sh_add_time" label="入驻时间" width="100">
            <template slot-scope="scope">
                    <span>{{scope.row.sh_add_time | fmtDate('YYYY-MM-DD')}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="sh_sales_volume" label="销量" width="80">
        </el-table-column>
        <el-table-column prop="sh_turnover" label="营业额" width="100">
        </el-table-column>
        <el-table-column prop="sh_account" label="店铺账户" width="100">
        </el-table-column>
        <el-table-column prop="sh_bonus" label="分润总额" width="100">
        </el-table-column>
        <el-table-column prop="sh_credit" label="信用" width="100">
        </el-table-column>
        <el-table-column prop="sh_type" label="店铺类型" width="100">
        </el-table-column>
        <el-table-column prop="sh_status" label="状态" width="100">
        </el-table-column>
        <el-table-column prop="sh_debt" label="原借款" width="100">
        </el-table-column>
        <el-table-column label="操作" width="100" align="center">
            <template slot-scope="scope">
                <el-button el-button @click="getCurrentAgencyStatus(scope.row);dialogFormVisible = true" type="success" plain>更改借款</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 编辑状态 -->
    <el-dialog title="更改借款" :visible.sync="dialogFormVisible">
        <el-form :model="formData">
            <el-form-item label="ID" :label-width="formLabelWidth">
                <el-input v-model="formData.sh_id" autocomplete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="原借款" :label-width="formLabelWidth">
                <el-input v-model="formData.sh_debt" autocomplete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="剩余借款" :label-width="formLabelWidth">
                <el-input v-model="set_sh_debt" autocomplete="off" ></el-input>
            </el-form-item>
           
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateMoney()">确 定</el-button>
        </div>
    </el-dialog>
    <!-- 添加代理生成代理订单 -->
</el-card>
</template>

<script>
import moment from 'moment'
import cityData from '../plugins/city_data2017_element'
export default {
    props: ["tableData"],
    data() {
        return {
            dialogFormVisible: false,
            dialogFormVisible1: false,
            formData: {
              
            },
            formLabelWidth: '120px',
            set_sh_debt:null,
        };
    },
    methods: {
        getCurrentAgencyStatus(data) {
            this.formData = null;
            this.formData = JSON.parse(JSON.stringify(data))
            console.log(this.formData);
        },
        //编辑修改代理
        async updateMoney() {
            const res = await this.$http.post('/index.php/Admin/EmShop/editOfDebt', {
                id: this.formData.sh_id,
                debt:this.set_sh_debt,
            })
            console.log(res);
            const {
                status
            } = res
            if (status === 200) {
                this.submit()
                this.$message({
                    message: '修改成功',
                    type: 'success'
                });
            }else{
                 this.$message.error({
                    message: '修改失败',
                });
            }
            this.dialogFormVisible = false,
            this.set_sh_debt=null
        },

        handleChange(val) {
            console.log(val)
        },
        //调用父组件的方法
        submit: function () {
            // 子组件中触发父组件方法childMethod并传值
            this.$emit('childMethod')
        }
    },
    computed: {
        time: {
            get() {
                return this.expire_time = this.expire_time * 1000
            },
            set(val) {
                return this.expire_time = val / 1000

            }
        },
        endTime: {
            get() {
                return new Date()
            },
            set(val) {
                return this.expire_time = val / 1000

            }
        }
    },

};
</script>

<style>
.p10 {
    padding-top: 5px;
}

.add-input {
    width: 220px;
}
</style>
