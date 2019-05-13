<template>
  <section v-loading="loading" element-loading-text="Loading">
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
          <el-button type="text" icon="el-icon-money">账户信息</el-button>
      </div>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="8"><div class="">您的账户余额为：{{details.ticketNo}}元</div></el-col>
      </el-row>
    </el-card>
    <el-card class="box-card" shadow="hover" style="margin-top:30px;">
      <div slot="header" class="clearfix">
          <el-button type="text" icon="el-icon-money">充值</el-button>
      </div>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="5">
            <el-form :inline="true" :model="rechargeForm" :rules="rechargeFormRules" ref="rechargeForm">
                <el-form-item label="充值金额" prop="phoneNo">
                    <el-input v-model="rechargeForm.phoneNo" placeholder=""></el-input>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="2">
            <el-tag type="danger">500元</el-tag>
        </el-col>
        <el-col :span="2">
            <el-tag type="danger">1000元</el-tag>
        </el-col>
        <el-col :span="2">
            <el-tag type="danger">1500元</el-tag>
        </el-col>
        <el-col :span="2">
            <el-tag type="danger">2000元</el-tag>
        </el-col>
        <el-col :span="2">
            <el-tag type="danger">2500元</el-tag>
        </el-col>
        <el-col :span="2">
            <el-tag type="danger">3000元</el-tag>
        </el-col>
        <el-col :span="7">
            <el-button type="danger">充值</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card" shadow="hover" style="margin-top:30px;">
      <div slot="header" class="clearfix">
          <el-button type="text" icon="el-icon-money">绑定提现银行卡</el-button>
      </div>
      <el-row type="flex" class="row-bg" justify="space-between" >
        <el-col :span="8">
            <el-button type="primary">新增</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card" shadow="hover" style="margin-top:30px;">
      <div slot="header" class="clearfix">
          <el-button type="text" icon="el-icon-money">理赔款提现</el-button>
      </div>
      <el-row type="flex" class="row-bg" justify="space-between" >
        <el-col :span="6"><div class="">您的账户余额为：{{details.ticketNo}}元</div></el-col>
        <el-col :span="6">
            <el-form :inline="true" :model="rechargeForm" :rules="rechargeFormRules" ref="rechargeForm">
                <el-form-item label="提现金额" prop="phoneNo">
                    <el-input v-model="rechargeForm.phoneNo" placeholder=""></el-input>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="6">
            <el-button type="danger">提现</el-button>
            <el-button type="primary">提现记录</el-button>
        </el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
    </el-card>
  </section>
</template>

<script>
    
    import { getCusInsureDetails } from '@/api/orderManage'
    import moment from 'moment'

    export default {
        data() {
            return {
                loading: true,
                details:{},
                rechargeForm:{

                },
                rechargeFormRules:{

                }
            }
        },
        computed: {
            
        },
        created() {
          this.fetchData();
        },
        methods: {
            fetchData(){
              getCusInsureDetails(this.$route.query).then(response => {
                  if(response.data&&response.data.length>0){
                    this.details = response.data[0]
                    this.details.effectiveDate = this.details.expressTime + this.details.customerOrderDate* 24 * 3600 * 1000;
                    this.details.endTime = this.details.expressTime + (this.details.productDay +this.details.customerOrderDate) * 24 * 3600 * 1000;
                  }
                  this.loading = false;
              }).catch(err=>{
                  this.loading = false;
                  this.$message.error(err);
              })
          },
          dateFormat(date){
              if (!date) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD HH:mm:ss")
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
  .bg-purple{
    color:#909399;
  }
</style>