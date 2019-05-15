<template>
  <section v-loading="loading" element-loading-text="Loading">
      <el-card class="box-card" shadow="hover" style="margin-top:30px;">
        <div slot="header" class="clearfix">
            <span>理赔信息</span>
            <el-button style="float: right; padding: 3px 0" type="text"><router-link to="/claimManage/claimOrder">返回</router-link></el-button>
        </div>
        <el-row class="row-bg" justify="space-between">
          <el-col :span="4"><div class="">商户标识：<span>{{user.source}}</span></div></el-col>
          <el-col :span="4"><div class="">商户名称：<span>{{user.companyName}}</span></div></el-col>
          <!-- <el-col :span="4"><div class="" ><el-button type="primary" plain @click="addProduct">新增产品ID</el-button></div></el-col> -->
        </el-row>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" style='width:60%' class="demo-ruleForm">
            <el-form-item label="渠道订单号" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="豆沙包订单号" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="理赔产品：" :label-width="formLabelWidth" prop="name">
                <el-select v-model="ruleForm.name" placeholder="请选择">
                    <el-option
                    v-for="item in bankList"
                    :key="item.accountCode"
                    :label="item.accountDesc"
                    :value="item.accountCode">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="理赔金额" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="name">
                <el-input v-model="ruleForm.name" type="textarea" :rows="2"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
      </el-card>
  </section>
</template>

<script>
    
    import { findCompanyBySource, combinationsByProductId, getInsuranceInformation, addOrder, getBalance, accountInfo, goPay } from '@/api/orderManage'
    import moment from 'moment'
    import { mapGetters } from 'vuex'

    export default {
        data() {
            return {
                ruleForm: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    region: [
                        { required: true, message: '请选择活动区域', trigger: 'change' }
                    ],
                    date1: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    date2: [
                        { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                    ],
                    type: [
                        { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                    ],
                    resource: [
                        { required: true, message: '请选择活动资源', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请填写活动形式', trigger: 'blur' }
                    ]
                },
                bankList:[]
            }
        },
        computed: {
            ...mapGetters([
                'user'
            ])
        },
        created() {
          this.fetchData();
        },
        methods: {
            fetchData(){
            
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }      
</script>

<style>

.text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .row-bg {
    margin: 30px 0;
  }

  .box-card {
    /* width: 480px; */
  }
  .downHeight{
      margin-top: 11px;
  }
</style>