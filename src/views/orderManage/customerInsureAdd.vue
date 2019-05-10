<template>
  <section v-loading="loading" element-loading-text="Loading">
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
          <span>产品信息</span>
          <el-button style="float: right; padding: 3px 0" type="text"><router-link to="/orderManage/customerInsure">返回</router-link></el-button>
      </div>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="8"><div class="">商户标识：<span>{{user.source}}</span></div></el-col>
        <el-col :span="8"><div class="">商户名称：<span>{{user.companyName}}</span></div></el-col>
        <el-col :span="8"><div class=""></div></el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="5">
            <div class="">
                产品ID：
                <el-select v-model="value" placeholder="请选择" @change="changeOptions">
                    <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.productName"
                    :value="item.id">
                    </el-option>
                </el-select>
            </div>
        </el-col>
        <template>
            <el-col :span="3" v-if="currentOptions.isGroup">
                <div class="">份数：1
                </div>
            </el-col>
            <el-col :span="3" v-else>
                <div class="">份数：
                    <el-input v-model="input" placeholder="" style="width:70px"></el-input>
                </div>
            </el-col>
        </template>
        <el-col :span="3"><div class="downHeight">产品价格：<span>{{currentOptions.productPrice}}</span></div></el-col>
        <el-col :span="3"><div class="downHeight">保额：<span>{{currentOptions.productCompensationAmount}}</span></div></el-col>
        <el-col :span="3"><div class="downHeight">产品有效期：<span>{{currentOptions.productPeriod}}</span></div></el-col>
        <el-col :span="6" v-show="currentOptions.compositeProductList&&currentOptions.compositeProductList.length > 0"><div class="downHeight">包含产品：<label v-for="(item, index) in currentOptions.compositeProductList" :key="item.id"><span >{{`${index+1}:${item.productName}  `}}</span></label></div></el-col>
      </el-row>
    </el-card>
    <el-card class="box-card" shadow="hover" style="margin-top:30px;">
      <div slot="header" class="clearfix">
          <span>包裹保障责任</span>
      </div>
      <el-row type="flex" class="row-bg" justify="space-between" v-if="details.productType==3" >
        <el-col :span="8" v-for="item in details.periodList" :key="item.path"><div class="">{{item.productName}}：<span>剩余 {{item.productPeriod}} 天</span></div></el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-between" v-else>
        <el-col :span="8" ><div class="">{{details.productName}}：<span>剩余 {{details.productPeriod}} 天</span></div></el-col>
      </el-row>
    </el-card>
  </section>
</template>

<script>
    
    import { findCompanyBySource, combinationsByProductId } from '@/api/orderManage'
    import moment from 'moment'
    import { mapGetters } from 'vuex'

    export default {
        data() {
            return {
                loading: true,
                details:{},
                options: [],
                currentOptions:{},
                value: '',
                input:''
            }
        },
        computed: {
            ...mapGetters([
                'user'
            ])
        },
        mounted() {
          this.fetchData();
        },
        methods: {
            fetchData(){
              findCompanyBySource(this.user.source).then(response => {
                  this.options = response.data.product
                  this.loading = false;
              }).catch(err=>{
                  this.loading = false;
                  this.$message.error(err);
              })
          },
          changeOptions(val){
            this.currentOptions = this.options.find(item=>item.id == val)
            combinationsByProductId({productId: val}).then(response => {
                this.currentOptions.compositeProductList = response.data;
                if(this.currentOptions.productType == 0 || this.currentOptions.productType ==4){
                    this.currentOptions.isGroup = true;
                    this.currentOptions.productNum = 1;
                }else{
                    this.currentOptions.isGroup = false;
                }
                this.loading = false;
            }).catch(err=>{
                this.loading = false;
                this.$message.error(err);
            })
            
            console.log(22222,this.currentOptions)

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