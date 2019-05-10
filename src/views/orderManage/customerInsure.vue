<template>
    <section>
        <!--查询栏-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-form-inline">
                <el-form-item label="豆沙包订单号" prop="ticketNo">
                    <el-input v-model="ruleForm.ticketNo" placeholder="豆沙包订单号"></el-input>
                </el-form-item>
                <el-form-item label="物流订单号" prop="expressNo">
                    <el-input v-model="ruleForm.expressNo" placeholder="物流订单号"></el-input>
                </el-form-item>
                <el-form-item label="申请时间" prop="time">
                    <el-date-picker
                        v-model="ruleForm.time"
                        type="daterange"
                        range-separator="至"
                        value-format="yyyy-MM-dd"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="联系方式" prop="telephone">
                    <el-input v-model="ruleForm.telephone" placeholder="联系方式"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-select v-model="ruleForm.status" placeholder="状态">
                        <el-option label="请选择" value=""></el-option>
                        <el-option label="生效中" value="1"></el-option>
                        <el-option label="已作废" value="2"></el-option>
                        <el-option label="未支付" value="3"></el-option>
                        <el-option label="已生效" value="8"></el-option>
                        <el-option label="投保失败" value="7"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                    <el-button @click="resetForm('ruleForm')">新增投保</el-button>
                    <el-button @click="resetForm('ruleForm')">导出excel</el-button>
                    <el-button @click="resetForm('ruleForm')">亚马逊授权投保</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm')">查询</el-button>
                </el-form-item>
            </el-form>
		</el-col>

        <!-- 表格 -->
        <el-table :data="tableData" v-loading="listLoading" element-loading-text="Loading" style="width: 100%">
            <el-table-column type="index" label="序号" width="50"> </el-table-column>
            <el-table-column prop="ticketNo" label="豆沙包订单号" width="280"> </el-table-column>
            <el-table-column prop="productId" label="产品id" width="90"></el-table-column>
            <el-table-column prop="productName" label="产品名称" width="180"> </el-table-column>
            <el-table-column prop="prodAmount" label="支付金额（元）" width="160"> </el-table-column>
            <el-table-column prop="expressNo" label="物流订单号" width="250"></el-table-column>
            <el-table-column prop="name" label="包主姓名" width="100"> </el-table-column>
            <el-table-column prop="phoneNo" label="包主手机号" width="180"> </el-table-column>
            <el-table-column prop="orderTime" label="订单时间" width="180" :formatter="dateFormat"></el-table-column>
            <el-table-column prop="status" label="状态" width="70" :formatter="statusText"> </el-table-column>
            <el-table-column prop="name" label="操作" fixed="right" width="180">
                <template slot-scope="scope">
                    <el-button
                        v-if="scope.claim == 0 && scope.status == 8"
                        @click.native.prevent="customerInsureDetails(scope.$index, tableData)"
                        type="text"
                        size="small">
                        发起理赔
                    </el-button>
                    <el-button
                        v-if="scope.status == 3"
                        @click.native.prevent="customerInsureDetails(scope.$index, tableData)"
                        type="text"
                        size="small">
                        去支付
                    </el-button>
                    <el-button
                        @click.native.prevent="customerInsureDetails(scope.$index, tableData)"
                        type="text"
                        size="small">
                        详情
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 工具条 -->
        <div class="pageDown">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="ruleForm.pageNum"
                :page-sizes="[10, 1, 30, 50]"
                :page-size="ruleForm.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </section>
</template>

<script>
    
    import store from '../../store'
    import moment from 'moment'
    import { getList } from '@/api/orderManage'
    import { formatterColumn } from "@/utils";

    export default {
        data() {
            return {
                tableData: [],
                total:0,
                ruleForm: {
                    applyEndTime: "",
                    applyStartTime: "",
                    expressNo: "",
                    pageNum: 1,
                    pageSize: 10,
                    source: store.getters.user.source,
                    status: "",
                    telephone: "",
                    ticketNo: ""
                },
                rules: {
                    ticketNo: [
                        { }
                    ],
                    expressNo: [
                        {  }
                    ],
                    telephone: [
                        { }
                    ]
                }
            }
        },
        computed: {
            
        },
        created() {
            this.fetchData()
        },
        methods: {
            fetchData() {
                this.listLoading = true
                getList(this.ruleForm).then(response => {
                    this.tableData = response.data.list
                    this.total = response.data.total
                    this.listLoading = false
                })
            },
            handleSizeChange(val) {
                this.ruleForm.pageSize = val
                this.ruleForm.pageNum = 1
                this.fetchData()
            },
            handleCurrentChange(val) {
                this.ruleForm.pageNum = val
                this.fetchData()
            },
            submitForm(formName) {
                const _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(_this.ruleForm.time&&_this.ruleForm.time.length>0){
                            _this.ruleForm.applyStartTime = _this.ruleForm.time[0];
                            _this.ruleForm.applyEndTime = _this.ruleForm.time[1];
                        }else{
                            _this.ruleForm.applyStartTime = '';
                            _this.ruleForm.applyEndTime = '';
                        }
                        _this.ruleForm.pageNum = 1
                        _this.fetchData()

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
             //时间格式化
            dateFormat(row, column) {
                var date = row[column.property];
                  if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD HH:mm:ss")
            },
            statusText(row, column){
                return formatterColumn(row.status)
            },
            customerInsureDetails(){
                this.$router.push({name:'/orderManage/customerInsureDetails',params: {id:'1'}})
            }
        }
    }      
</script>

<style>
    .pageDown{
        float: right;
        margin-top: 15px;
    }
</style>