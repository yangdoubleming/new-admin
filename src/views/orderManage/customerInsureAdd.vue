<template>
  <section v-loading="loading" element-loading-text="Loading">
    <el-form :inline="true" :model="formInline" :rules="rules" ref="formInline" class="demo-form-inline">
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
        <el-row type="flex" class="row-bg" justify="space-between" :key="item.id" v-for="item in orderProductList">
          <el-col :span="5">
              <div class="">
                  产品ID：
                  <el-select v-model="value" placeholder="请选择" @change="changeOptions">
                      <el-option
                      v-for="element in options"
                      :key="element.id"
                      :label="element.productName"
                      :value="element.id">
                      </el-option>
                  </el-select>
              </div>
          </el-col>
          <template>
              <el-col :span="3" v-if="item.isGroup">
                  <div class="">份数：1
                  </div>
              </el-col>
              <el-col :span="3" v-else>
                  <div class="">份数：
                      <el-input v-model="item.productNum" placeholder="" style="width:70px"></el-input>
                  </div>
              </el-col>
          </template>
          <el-col :span="3"><div class="downHeight">产品价格：<span>{{item.productPrice}}</span></div></el-col>
          <el-col :span="3"><div class="downHeight">保额：<span>{{item.productCompensationAmount}}</span></div></el-col>
          <el-col :span="3"><div class="downHeight">产品有效期：<span>{{item.productPeriod}}</span></div></el-col>
          <el-col :span="6" v-show="item.compositeProductList&&item.compositeProductList.length > 0"><div class="downHeight">包含产品：<label v-for="(ele, index) in item.compositeProductList" :key="ele.id"><span >{{`${index+1}:${ele.productName}  `}}</span></label></div></el-col>
        </el-row>
      </el-card>
      <el-card class="box-card" shadow="hover" style="margin-top:30px;">
        <div slot="header" class="clearfix">
            <span>用户信息</span>
        </div>
        <el-row>
          <el-col :span="6" v-if="checkOptions('姓名')">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="formInline.name" placeholder="例：张三/XX公司"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="checkOptions('手机号')">
            <el-form-item label="手机号" prop="phoneNo">
              <el-input v-model="formInline.phoneNo" placeholder="例：13812345678"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="checkOptions('身份证号码')">
            <el-form-item label="身份证号码" prop="idCard">
              <el-input v-model="formInline.idCard" placeholder="例：98765919940922XXXX"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="checkOptions('性别')">
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="formInline.sex">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="checkOptions('收件人信息')">
            <el-form-item label="收件人信息" prop="receiverInfo">
              <el-input v-model="formInline.receiverInfo" placeholder="例：张三  13812345678"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="checkOptions('寄件人信息')">
            <el-form-item label="寄件人信息" prop="sendInfo">
              <el-input v-model="formInline.sendInfo" placeholder="例：张三  13812345678"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="checkOptions('卖家账号或登录名')">
            <el-form-item label="卖家账号或登录名" prop="sellerAccount">
              <el-input v-model="formInline.sellerAccount" placeholder="例：zhangsan"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="checkOptions('买家账号或登录名')">
            <el-form-item label="买家账号或登录名" prop="buyerAccount">
              <el-input v-model="formInline.buyerAccount" placeholder="例：zhangsan2017"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card class="box-card" shadow="hover" style="margin-top:30px;">
        <div slot="header" class="clearfix">
            <span>物流信息</span>
        </div>
        <el-row>
          <el-col :span="6" v-if="checkOptions('起运地')">
            <el-form-item label="起运地" prop="loadingPort">
              <el-input v-model="formInline.loadingPort" placeholder="例：上海"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="checkOptions('目的口岸')">
            <el-form-item label="目的口岸" prop="destinationPort">
              <el-input v-model="formInline.destinationPort" placeholder="例：LAX,USA"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="checkOptions('物流单号')">
            <el-form-item label="物流单号" prop="expressNo">
              <el-input v-model="formInline.expressNo" placeholder="例：216901577730"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="checkOptions('物流发货日期')">
            <el-form-item label="物流发货日期" prop="expressTime">
              <el-date-picker type="date" placeholder="选择日期" v-model="formInline.expressTime" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="checkOptions('收货地址')">
            <el-form-item label="收货地址" prop="receiverAddress">
              <el-input v-model="formInline.receiverAddress" placeholder="例：上海市浦东新区龙阳路XXX号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="checkOptions('运输方式')">
            <el-form-item label="运输方式" prop="expressChannel">
              <el-input v-model="formInline.expressChannel" placeholder="例：空运"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="checkOptions('物流公司名称')">
            <el-form-item label="物流公司名称" prop="expressCompanyName">
              <el-input v-model="formInline.expressCompanyName" placeholder="例：EMS"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="checkOptions('收件人地址')">
            <el-form-item label="收件人地址" prop="receiverAddr">
              <el-input v-model="formInline.receiverAddr" placeholder="例：上海市浦东新区龙阳路XXX号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="checkOptions('寄件人地址')">
            <el-form-item label="寄件人地址" prop="senderAddress">
              <el-input v-model="formInline.senderAddress" placeholder="例：成都市锦江区都市小区XX号楼802"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card class="box-card" shadow="hover" style="margin-top:30px;">
        <div slot="header" class="clearfix">
            <span>商品信息</span>
        </div>
        <el-row>
          <el-col :span="6" v-if="checkOptions('购物网站')">
            <el-form-item label="购物网站" prop="shoppingSite">
              <el-input v-model="formInline.shoppingSite" placeholder="例：淘宝"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="checkOptions('购买日期')">
            <el-form-item label="购买日期" prop="shoppingTime">
              <el-date-picker type="date" placeholder="选择日期" v-model="formInline.shoppingTime" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="checkOptions('商品价值')">
            <el-form-item label="商品价值" prop="goodsValue">
              <el-input v-model="formInline.goodsValue" placeholder="例：288"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="checkOptions('商品列表')">
            <el-form-item label="商品列表" prop="goodsCategory">
              <el-input v-model="formInline.goodsCategory" placeholder="例：衣服2件；裤子1件"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="checkOptions('商品价值明细')">
            <el-form-item label="商品价值明细" prop="goodsValueDetail">
              <el-input v-model="formInline.goodsValueDetail" placeholder="例：衣服2件200元；裤子1件89元"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="checkOptions('商品种类')">
            <el-form-item label="商品种类" prop="goodsKind">
              <el-input v-model="formInline.goodsKind" placeholder="例：一类产品"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="checkOptions('保费')">
            <el-form-item label="保费" prop="premium">
              <el-input v-model="formInline.premium" placeholder="例：288"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="checkOptions('购物网站订单号/海淘商品订单号')">
            <el-form-item label="购物网站订单号" prop="purchasOrderNo">
              <el-input v-model="formInline.purchasOrderNo" placeholder="例：191421745254952600"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="checkOptions('货物数量')">
            <el-form-item label="货物数量" prop="goodsAmount">
              <el-input v-model="formInline.goodsAmount" placeholder="例：3"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-row :gutter="20" style="margin-top:30px;">
        <el-col :span="12" :offset="10">
          <el-form-item>
            <el-button type="primary" @click="submitForm('formInline')">提交</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </section>
</template>

<script>
    
    import { findCompanyBySource, combinationsByProductId, getInsuranceInformation, addOrder, getBalance, accountInfo, goPay } from '@/api/orderManage'
    import moment from 'moment'
    import { mapGetters } from 'vuex'

    export default {
        data() {
            return {
                loading: true,
                details:{},
                options:[],
                orderProductList: [{
                  productCompensationAmount:'',
                  productId:'',
                  productNum:'',
                  productPeriod:'',
                  productPrice:'',
                  productType:'',
                }],
                currentOptions:{},
                value: '',
                input:'',
                formInline: {
                  type: 0,
                  source: '',
                  name:'',
                  phoneNo:'',
                  idCard:'',
                  sex:'',
                  receiverInfo:'',
                  sendInfo:'',
                  sellerAccount:'',
                  buyerAccount:'',
                  loadingPort:'',
                  destinationPort:'',
                  expressNo:'',
                  expressTime:'',
                  receiverAddress:'',
                  expressChannel:'',
                  expressCompanyName:'',
                  receiverAddr:'',
                  senderAddress:'',
                  shoppingSite:'',
                  shoppingTime:'',
                  goodsValue:'',
                  goodsCategory:'',
                  goodsValueDetail:'',
                  goodsKind:'',
                  premium:'',
                  purchasOrderNo:'',
                  goodsAmount:'',
              },
              showOptions:[],
              payInfo: {
                ticketNo: '',
                discountAmount: '',
                balance: '',
                source:''
              },
              rules: {
                name: [
                  { required: true, message: '请输入姓名', trigger: 'blur' },
                ],
                phoneNo: [
                  { required: true, message: '请输入手机号', trigger: 'blur' }
                ],
                idCard: [
                  { required: true, message: '请输入身份证号码', trigger: 'blur' }
                ],
                sex: [
                  { required: true, message: '请选择性别', trigger: 'blur' }
                ],
                receiverInfo: [
                  { required: true, message: '请输入收件人信息', trigger: 'blur' }
                ],
                sendInfo: [
                  { required: true, message: '请输入寄件人信息', trigger: 'blur' }
                ],
                sellerAccount: [
                  { required: true, message: '请输入卖家账号或登录名', trigger: 'blur' }
                ],
                buyerAccount:[
                  { required: true, message: '请输入买家账号或登录名', trigger: 'blur' }
                ],
                loadingPort:[
                  { required: true, message: '请输入起运地', trigger: 'blur' }
                ],
                destinationPort:[
                  { required: true, message: '请输入目的口岸', trigger: 'blur' }
                ],
                expressNo:[
                  { required: true, message: '请输入物流单号', trigger: 'blur' }
                ],
                expressTime:[
                  { required: true, message: '请输入物流发货日期', trigger: 'blur' }
                ],
                receiverAddress:[
                  { required: true, message: '请输入收货地址', trigger: 'blur' }
                ],
                expressChannel:[
                  { required: true, message: '请输入运输方式', trigger: 'blur' }
                ],
                expressCompanyName:[
                  { required: true, message: '请输入物流公司名称', trigger: 'blur' }
                ],
                receiverAddr:[
                  { required: true, message: '请输入收件人地址', trigger: 'blur' }
                ],
                senderAddress:[
                  { required: true, message: '请输入寄件人地址', trigger: 'blur' }
                ],
                shoppingSite:[
                  { required: true, message: '请输入购物网站', trigger: 'blur' }
                ],
                shoppingTime:[
                  { required: true, message: '请输入购买日期', trigger: 'blur' }
                ],
                goodsValue:[
                  { required: true, message: '请输入商品价值', trigger: 'blur' }
                ],
                goodsCategory:[
                  { required: true, message: '请输入商品列表', trigger: 'blur' }
                ],
                goodsValueDetail:[
                  { required: true, message: '请输入商品价值明细', trigger: 'blur' }
                ],
                goodsKind:[
                  { required: true, message: '请输入商品种类', trigger: 'blur' }
                ],
                premium:[
                  { required: true, message: '请输入保费', trigger: 'blur' }
                ],
                purchasOrderNo:[
                  { required: true, message: '请输入购物网站订单号', trigger: 'blur' }
                ],
                goodsAmount:[
                  { required: true, message: '请输入货物数量', trigger: 'blur' }
                ],
              }
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
              findCompanyBySource(this.user.source).then(response => {
                  this.options = response.data.product
                  this.loading = false;
              }).catch(err=>{
                  this.loading = false;
                  this.$message.error(err);
              })
          },
          changeOptions(val){
            this.orderProductList[0] = this.options.find(item=>item.id == val)
            this.orderProductList[0].productId = this.options.find(item=>item.id == val).id;
            combinationsByProductId({productId: val}).then(response => {
                this.orderProductList[0].compositeProductList = response.data;
                if(this.orderProductList[0].productType == 0 || this.orderProductList[0].productType ==4){
                    this.orderProductList[0].isGroup = true;
                    this.orderProductList[0].productNum = 1;
                }else{
                    this.orderProductList[0].isGroup = false;
                }
                this.loading = false;
            }).catch(err=>{
                this.loading = false;
                this.$message.error(err);
            })

            getInsuranceInformation({ids: val}).then(response => {
                this.showOptions = response.data
                this.loading = false;
            }).catch(err=>{
                this.loading = false;
                this.$message.error(err);
            })
          },
          checkOptions(val){
            return this.showOptions.indexOf(val)!=-1
          },

          // 提交
          submitForm(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.formInline.orderProductList = this.orderProductList
                this.formInline.source = this.user.source
                addOrder(this.formInline).then(response => {
                    getBalance({username:response.data.payPhoneno}).then(res => {
                      accountInfo({t:res.data.ticket}).then(result => {
                        this.payInfo.balance = result.data.info.subAccountInfos[0].subAccountRechargeBalance;//余额
                        if(response.data.order !=null){
                            this.payInfo.discountAmount = response.data.order.discountAmount / 100;
                            this.payInfo.ticketNo = response.data.order.ticketNo;
                            this.payInfo.title = response.data.productNameList;
                            this.payInfo.source = response.data.order.source;
                        }
                        this.loading = false;
                        this.confirmToPay()
                      })
                    })
                    
                }).catch(err=>{
                    this.loading = false;
                    this.$message.error(err);
                })
              } else {
                console.log('error submit!!');
                return false;
              }
            });
          },
          // 确认支付
          confirmToPay() {
            this.$confirm(`${this.payInfo.title}<div style="font-size:16px">投保金额：<span style="color:red;">${this.payInfo.discountAmount}</span></div><div style="font-size:16px">余额：<span style="color:red;">${this.payInfo.balance}</span></div>`, '确认信息', {
              distinguishCancelAndClose: true,
              dangerouslyUseHTMLString: true,
              center: true,
              cancelButtonText: '取消',
              confirmButtonText: '确认支付'
            })
              .then(() => {
                goPay(this.payInfo).then(result=>{
                  console.log(8888,result)
                  this.$message.success(result.msg);
                }).catch(err =>{
                  this.$message.error(err);
                })
              })
              .catch(action => {
                
              });
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