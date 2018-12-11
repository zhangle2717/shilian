<template>
<el-card class="box-card">
    <el-table :data="tableData" stripe style="width: 100%" height="380">
        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column prop="Shop.sh_name" label="店铺" width="100">
        </el-table-column>
        <el-table-column prop="us_account" label="用户账单" width="100">
        </el-table-column>
        <el-table-column prop="us_achievement" label="完成账单" width="100">
        </el-table-column>
        <el-table-column label="完成时间" width="100">
            <template slot-scope="scope">
                <span v-if="scope.row.us_achievement_time==='0'">未支付</span>
                <span v-else> {{scope.row.us_achievement_time | fmtDate('YYYY-MM-DD')}}</span>
            </template>
        </el-table-column>
        <el-table-column label="代理区域" width="180" align="center">
            <template slot-scope="scope">
                <span>{{scope.row.us_agency_province}}</span>
                <span>{{scope.row.us_agency_city}}</span>
                <span>{{scope.row.us_agency_area}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="us_agency_type" label="代理级别">
            <template slot-scope="scope">
                <span v-if="scope.row.us_agency_type==='none'">未代理</span>
                <span v-else>{{scope.row.us_agency_type}}</span>
            </template>
        </el-table-column>
        <el-table-column label="代理时间" width="120">
            <template slot-scope="scope">
                <div v-if="scope.row.us_agency_time!=='0' && scope.row.us_agency_time!==null">
                    <span>起:{{scope.row.us_agency_time | fmtDate('YYYY-MM-DD')}}</span>
                    <br>
                    <span>止:{{scope.row.us_agency_expire_time | fmtDate('YYYY-MM-DD')}}</span>
                </div>
            </template>
        </el-table-column>
        <el-table-column prop="us_bonus" label="用户分红">
        </el-table-column>
        <el-table-column label="实名状态">
            <template slot-scope="scope">
                <span v-if="scope.row.us_certified_status==='0'">未认证</span>
                <span v-else-if="scope.row.us_certified_status==='1'">审核中</span>
                <span v-else-if="scope.row.us_certified_status==='2'">已认证</span>
                <span v-else-if="scope.row.us_certified_status==='3'">已驳回</span>
            </template>
        </el-table-column>
        <el-table-column prop="us_growth_value" label="成长值">
        </el-table-column>
        <el-table-column label="头像" align="center">
            <template slot-scope="scope">
                <img  :src="'http://192.168.1.50'+scope.row.us_headimg" alt="" width="50">
            </template>
        </el-table-column>
        <el-table-column label="当前状态">
            <template slot-scope="scope">
                <span v-if="scope.row.us_status==='normal'">正常</span>
                <span v-else-if="scope.row.us_status!=='normal'">异常</span>
            </template>
        </el-table-column>
        <el-table-column prop="us_mobile" label="手机号" width="120" align="center">

        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
                <span v-if="scope.row.us_agency_type!=='none'"><el-button @click="getCurrentAgencyStatus(scope.row);dialogFormVisible = true" plain size="mini" type="primary" icon="el-icon-edit" circle></el-button></span>
                <span v-else><el-button el-button @click="getCurrentAgencyStatus(scope.row);dialogFormVisible1 = true" type="success" plain>添加成代理</el-button></span>
            </template>
        </el-table-column>
    </el-table>
    <!-- 编辑状态 -->
    <el-dialog title="更改用户代理信息" :visible.sync="dialogFormVisible">
        <el-form :model="formData">
            <el-form-item label="ID" :label-width="formLabelWidth">
                <el-input v-model="formData.us_id" autocomplete="off" disabled class="add-input"></el-input>
            </el-form-item>
            <el-form-item label="代理区域" :label-width="formLabelWidth">
                <el-cascader expand-trigger="hover" :options="options" v-model="selectedOptions" change-on-select @change="handleChange" style="width: 100x">
                </el-cascader>
            </el-form-item>
            <el-form-item label="代理时间" :label-width="formLabelWidth">
                <el-date-picker v-model="agency_time" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" :disabled="agency_time!==0" value-format="timestamp">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间" :label-width="formLabelWidth">
                <el-date-picker v-model="time" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="timestamp">
                </el-date-picker>
            </el-form-item>

            <el-form-item label="代理类型" :label-width="formLabelWidth">
                <el-select v-model="formData.us_agency_type" placeholder="请选择代理类型">
                    <el-option label="市代理" value="市代理"></el-option>
                    <el-option label="社区服务中心" value="社区服务中心"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="代理级别" :label-width="formLabelWidth">
                <el-select v-model="formData.us_agency_type_name" placeholder="请选择代理级别" :disabled="formData.us_agency_type==='社区服务中心'">
                    <el-option label="一级市代" value="一级市代"></el-option>
                    <el-option label="二级市代" value="二级市代"></el-option>
                    <el-option label="社区服务中心" value="社区服务中心"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateCurrentAgencyStatus()">确 定</el-button>
        </div>
    </el-dialog>
    <!-- 添加代理生成代理订单 -->
    <el-dialog title="添加代理生成代理订单" :visible.sync="dialogFormVisible1">
        <el-form :model="formOrder">
            <el-form-item label="ID" :label-width="formLabelWidth">
                <el-input v-model="formOrder.us_id" autocomplete="off" disabled class="add-input"></el-input>
            </el-form-item>
            <el-form-item label="代理区域" :label-width="formLabelWidth">
                <el-cascader expand-trigger="hover" :options="options" v-model="selectedOptions" change-on-select @change="handleChange" style="width: 100x">
                </el-cascader>
            </el-form-item>
            <el-form-item label="结束时间" :label-width="formLabelWidth">
                <el-date-picker v-model="endTime" type="date" default-value="" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="timestamp">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="代理类型" :label-width="formLabelWidth">
                <el-select v-model="formOrder.us_agency_type" placeholder="请选择代理类型">
                    <el-option label="市代理" value="市代理"></el-option>
                    <el-option label="社区服务中心" value="社区服务中心"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="代理级别" :label-width="formLabelWidth">
                <el-select v-model="formOrder.us_agency_type_name" placeholder="请选择代理级别" :disabled="formOrder.us_agency_type==='社区服务中心'">
                    <el-option label="一级市代" value="一级市代"></el-option>
                    <el-option label="二级市代" value="二级市代"></el-option>
                    <el-option label="社区服务中心" value="社区服务中心"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="支付方式" :label-width="formLabelWidth">
                <el-select v-model="formOrder.mode" placeholder="请选择支付方式">
                    <el-option label="购物币" value="购物币"></el-option>
                    <el-option label="微信" value="微信"></el-option>
                    <el-option label="支付宝" value="支付宝"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="金额" :label-width="formLabelWidth">
                <el-input v-model="formOrder.price" autocomplete="off" class="add-input"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible1 = false">取 消</el-button>
            <el-button type="primary" @click="addAgencyOrder()">确 定</el-button>
        </div>
    </el-dialog>
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
                User: {},
                us_id: null,
                us_agency_province: null,
                us_agency_city: null,
                us_agency_area: null,
                us_agency_time: null,
                us_agency_expire_time: null,
                us_agency_type: null,
                us_agency_type_name: null,

            },
            formOrder: {
                us_id: null,
                us_agency_type: null,
                us_agency_type_name: null,
                price: null,
                mode: null,
                us_agency_province: null,
                us_agency_city: null,
                us_agency_area: null,
            },
            formLabelWidth: '120px',
            agency_time: null,
            expire_time: null,
            options: cityData,
            selectedOptions: [],
        };
    },
    methods: {
        getCurrentAgencyStatus(data) {
            this.selectedOptions = [];
            this.formData = null;
            this.formData = JSON.parse(JSON.stringify(data))
            this.agency_time = this.formData.us_agency_time
            this.expire_time = this.formData.us_agency_expire_time
            this.agency_time = this.agency_time * 1000
            this.selectedOptions.push(this.formData.us_agency_province, this.formData.us_agency_city, this.formData.us_agency_area);
            // this.dialogFormVisible = true
            console.log(this.formData);
            this.formOrder.us_id = this.formData.us_id

        },
        //编辑修改代理
        async updateCurrentAgencyStatus() {
            //直辖市
            if (this.selectedOptions[0] === "北京市") {
                  console.log(this.selectedOptions);
                console.log(this.selectedOptions.length);
                this.formData.us_agency_province = this.selectedOptions[0]
                this.formData.us_agency_city = '北京城区'
                if(this.selectedOptions[1]==='北京城区'){
                     this.formData.us_agency_area=null 
                }else{
                    this.formData.us_agency_area=this.selectedOptions[1]
                }
            } else if (this.selectedOptions[0] === "天津市") {
                this.formData.us_agency_province = this.selectedOptions[0]
                this.formData.us_agency_city = '天津城区'
               if(this.selectedOptions[1]==='天津城区'){
                     this.formData.us_agency_area=null
                }else{
                    this.formData.us_agency_area=this.selectedOptions[1]
                }
            } else if (this.selectedOptions[0] === "上海市") {
                this.formData.us_agency_province = this.selectedOptions[0]
                this.formData.us_agency_city = '上海城区'
                if(this.selectedOptions[1]==='上海城区'){
                     this.formData.us_agency_area=null
                }else{
                    this.formData.us_agency_area=this.selectedOptions[1]
                }
            } else if (this.selectedOptions[0] === "重庆市") {
                this.formData.us_agency_province = this.selectedOptions[0]
                this.formData.us_agency_city = '重庆城区'
               if(this.selectedOptions[1]==='重庆城区'){
                     this.formData.us_agency_area=null
                }else{
                    this.formData.us_agency_area=this.selectedOptions[1]
                }

            } else if (this.formData.us_agency_type === "市代理") {
                this.formData.us_agency_province = this.selectedOptions[0]
                this.formData.us_agency_city = this.selectedOptions[1]
                this.formData.us_agency_area = null
            } else {
                this.formData.us_agency_province = this.selectedOptions[0]
                this.formData.us_agency_city = this.selectedOptions[1]
                this.formData.us_agency_area = this.selectedOptions[2]
            }
            this.expire_time = this.expire_time / 1000 + ''
            const res = await this.$http.post('/index.php/Admin/EmUser/edit', {
                id: this.formData.us_id,
                province: this.formData.us_agency_province,
                city: this.formData.us_agency_city,
                area: this.formData.us_agency_area,
                expire_time: this.expire_time,
                type: this.formData.us_agency_type,
                type_name: this.formData.us_agency_type_name,

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
            this.dialogFormVisible = false
        },

        handleChange(val) {
            console.log(val)
        },
        //添加代理订单
        async addAgencyOrder() {
            if (this.selectedOptions[0] === "北京市") {
              
                
                this.formOrder.us_agency_province = this.selectedOptions[0]
                this.formOrder.us_agency_city = '北京城区'
                if(this.selectedOptions[1]==='北京城区'){
                     this.formOrder.us_agency_area=null
                }else{
                    this.formOrder.us_agency_area=this.selectedOptions[1]
                }

            } else if (this.selectedOptions[0] === "天津市") {
                this.formOrder.us_agency_province = this.selectedOptions[0]
                this.formOrder.us_agency_city = '天津城区'
                if(this.selectedOptions[1]==='天津城区'){
                     this.formOrder.us_agency_area=null
                }else{
                    this.formOrder.us_agency_area=this.selectedOptions[1]
                }
            } else if (this.selectedOptions[0] === "上海市") {
                this.formOrder.us_agency_province = this.selectedOptions[0]
                this.formOrder.us_agency_city = '上海城区'
                if(this.selectedOptions[1]==='上海城区'){
                     this.formOrder.us_agency_area=null
                }else{
                    this.formOrder.us_agency_area=this.selectedOptions[1]
                }
            } else if (this.selectedOptions[0] === "重庆市") {
                this.formOrder.us_agency_province = this.selectedOptions[0]
                this.formOrder.us_agency_city = '重庆城区'
               if(this.selectedOptions[1]==='重庆城区'){
                     this.formOrder.us_agency_area=null
                }else{
                    this.formOrder.us_agency_area=this.selectedOptions[1]
                }

            } else if (this.formOrder.us_agency_type === "市代理") {
                this.formOrder.us_agency_province = this.selectedOptions[0]
                this.formOrder.us_agency_city = this.selectedOptions[1]
                this.formOrder.us_agency_area = null
            } else {
                this.formOrder.us_agency_province = this.selectedOptions[0]
                this.formOrder.us_agency_city = this.selectedOptions[1]
                this.formOrder.us_agency_area = this.selectedOptions[2]
            }
            this.expire_time = this.expire_time / 1000 + ''
            const res = await this.$http.post('/index.php/Admin/EmAgencyRecord/add', {
                uid: this.formOrder.us_id,
                province: this.formOrder.us_agency_province,
                city: this.formOrder.us_agency_city,
                area: this.formOrder.us_agency_area,
                price: this.formOrder.price,
                pay_type: this.formOrder.mode,
                expire_time: this.expire_time,
                type: this.formOrder.us_agency_type,
                type_name: this.formOrder.us_agency_type_name,
            })
            console.log(res);
            const {
                status
            } = res
            if (status === 200) {
                this.submit()
                this.$message({
                    message: '添加成功',
                    type: 'success'
                });
            }else{
                 this.$message.error({
                    message: '添加失败',
                });
            }
            this.dialogFormVisible1 = false

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
