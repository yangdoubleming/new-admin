<template>
  <section v-loading="loading" element-loading-text="Loading">
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
          <span>基本信息</span>
          <el-button style="float: right; padding: 3px 0" type="text"><router-link to="/orderManage/customerInsure">返回</router-link></el-button>
      </div>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="8"><div class="grid-content bg-purple">订单号：<span>{{details.ticketNo}}</span></div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">产品购买份数：<span>{{details.productNum}}</span></div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">商品价值明细：<span>{{details.goodsValueDetail}}</span></div></el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="8"><div class="grid-content bg-purple">包主姓名：<span>{{details.name}}</span></div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">物流单号：<span>{{details.expressNo}}</span></div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">商品价值：<span>{{details.goodsValue}}</span></div></el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="8"><div class="grid-content bg-purple">产品名称：<span>{{details.productName}}</span></div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">物流发货日期：<span>{{dateFormat(details.expressTime)}}</span></div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">商品种类：<span>{{details.goodsKind}}</span></div></el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="8"><div class="grid-content bg-purple">定价系数：<span>{{details.adjustPrice}}</span></div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">购物网站订单号：<span>{{details.purchasOrderNo}}</span></div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">商品列表：<span>{{details.goodsCategory}}</span></div></el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="8"><div class="grid-content bg-purple">包主手机号：<span>{{details.phoneNo}}</span></div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">购买日期：<span>{{dateFormat(details.shoppingTime)}}</span></div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">生效日期：<span>{{dateFormat(details.effectiveDate)}}</span></div></el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="8"><div class="grid-content bg-purple">产品id：<span>{{details.productId}}</span></div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">起运地：<span>{{details.loadingPort}}</span></div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">截止日期：<span>{{dateFormat(details.endTime)}}</span></div></el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="8"><div class="grid-content bg-purple">订单时间：<span>{{dateFormat(details.orderTime)}}</span></div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">目的口岸：<span>{{details.destinationPort}}</span></div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">上传日期：<span>{{dateFormat(details.createAt)}}</span></div></el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="8"><div class="grid-content bg-purple">支付金额：<span>{{details.productAmount}}</span></div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">运输方式：<span>{{details.expressChannel}}</span></div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">电子保单号：<span>{{details.policyNo}}</span></div></el-col>
      </el-row>
    </el-card>
    <el-card class="box-card" shadow="hover" style="margin-top:30px;">
      <div slot="header" class="clearfix">
          <span>包裹保障责任</span>
      </div>
      <el-row type="flex" class="row-bg" justify="space-between" v-if="details.productType==3" >
        <el-col :span="8" v-for="item in details.periodList" :key="item.path"><div class="grid-content bg-purple">{{item.productName}}：<span>剩余 {{item.productPeriod}} 天</span></div></el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-between" v-else>
        <el-col :span="8" ><div class="grid-content bg-purple">{{details.productName}}：<span>剩余 {{details.productPeriod}} 天</span></div></el-col>
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
</style>