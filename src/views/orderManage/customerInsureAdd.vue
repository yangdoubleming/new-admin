<template>
  <section v-loading="loading" element-loading-text="Loading">
    <el-form :inline="true" :model="orderApi" :rules="checkRules" ref="orderApi" class="demo-form-inline">
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
            <span>产品信息</span>
            <el-button style="float: right; padding: 3px 0" type="text"><router-link to="/orderManage/customerInsure">返回</router-link></el-button>
        </div>
        <el-row class="row-bg" justify="space-between">
          <el-col :span="4"><div class="" style="margin-top:10px">商户标识：<span>{{user.source}}</span></div></el-col>
          <el-col :span="4"><div class="" style="margin-top:10px">商户名称：<span>{{user.companyName}}</span></div></el-col>
          <!-- <el-col :span="4"><div class="" ><el-button type="primary" plain @click="addProduct">新增产品ID</el-button></div></el-col> -->
        </el-row>
        <el-row :gutter="20" :key="index" v-for="(current, index) in orderApi.orderProductList" style="margin-bottom:20px;">
          <el-col :span="3">
              <div class="">
                  产品ID：
                  <el-select v-model="current.productId" placeholder="请选择" @change="getProductId(current)" style="width:70px">
                      <el-option
                      v-for="element in productIdList"
                      :key="element.id"
                      :label="element.productName"
                      :value="element.id">
                      </el-option>
                  </el-select>
              </div>
          </el-col>
          <el-col :span="3" v-if="current.isGroup">
              <div class="">份数：1
              </div>
          </el-col>
          <el-col :span="3" v-else>
              <div class="">份数：
                  <el-input v-model="current.productNum" placeholder="" style="width:70px"></el-input>
              </div>
          </el-col>
          <el-col :span="3"><div class="">产品价格：<span>{{current.productPrice}}</span></div></el-col>
          <el-col :span="3"><div class="">保额：<span>{{current.productCompensationAmount}}</span></div></el-col>
          <el-col :span="3"><div class="">产品有效期：<span>{{current.productPeriod}}</span></div></el-col>
          <el-col :span="6" v-show="current.compositeProductList&&current.compositeProductList.length > 0">
            <div class="">包含产品：
              <label v-for="(ele, index) in current.compositeProductList" :key="ele.id">
                <span >{{`${index+1}:${ele.productName}  `}}</span>
              </label>
            </div>
          </el-col>
          <el-col :span="3" v-if="orderApi.orderProductList&&orderApi.orderProductList.length > 1"><div>删除</div></el-col>
        </el-row>
      </el-card>
      <el-card class="box-card" shadow="hover" style="margin-top:30px;">
        <div slot="header" class="clearfix">
            <span>用户信息</span>
        </div>
        <el-row>
          <el-col :span="6" v-if="checkOptions('姓名')">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="orderApi.name" placeholder="例：张三/XX公司"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="checkOptions('手机号')">
            <el-form-item label="手机号" prop="phoneNo">
              <el-input v-model="orderApi.phoneNo" placeholder="例：13812345678"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="checkOptions('身份证号码')">
            <el-form-item label="身份证号码" prop="idCard">
              <el-input v-model="orderApi.idCard" placeholder="例：98765919940922XXXX"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="checkOptions('性别')">
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="orderApi.sex">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="checkOptions('收件人信息')">
            <el-form-item label="收件人信息" prop="receiverInfo">
              <el-input v-model="orderApi.receiverInfo" placeholder="例：张三  13812345678"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="checkOptions('寄件人信息')">
            <el-form-item label="寄件人信息" prop="sendInfo">
              <el-input v-model="orderApi.sendInfo" placeholder="例：张三  13812345678"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="checkOptions('卖家账号或登录名')">
            <el-form-item label="卖家账号或登录名" prop="sellerAccount">
              <el-input v-model="orderApi.sellerAccount" placeholder="例：zhangsan"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="checkOptions('买家账号或登录名')">
            <el-form-item label="买家账号或登录名" prop="buyerAccount">
              <el-input v-model="orderApi.buyerAccount" placeholder="例：zhangsan2017"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card class="box-card" shadow="hover" style="margin-top:30px;">
        <div slot="header" class="clearfix">
            <span>物流信息</span>
        </div>
        <el-row>
          <el-col :span="5" v-if="checkOptions('起运地')">
            <el-form-item label="起运地" prop="loadingPort">
              <el-input v-model="orderApi.loadingPort" placeholder="例：上海"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="checkOptions('目的口岸')">
            <el-form-item label="目的口岸" prop="destinationPort">
              <el-input v-model="orderApi.destinationPort" placeholder="例：LAX,USA"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="checkOptions('物流单号')">
            <el-form-item label="物流单号" prop="expressNo">
              <el-input v-model="orderApi.expressNo" placeholder="例：216901577730"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" v-if="checkOptions('物流发货日期')">
            <el-form-item label="物流发货日期" prop="expressTime">
              <el-date-picker type="date" placeholder="选择日期" v-model="orderApi.expressTime" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="checkOptions('收货地址')">
            <el-form-item label="收货地址" prop="receiverAddress">
              <el-input v-model="orderApi.receiverAddress" placeholder="例：上海市浦东新区龙阳路XXX号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="checkOptions('运输方式')">
            <el-form-item label="运输方式" prop="expressChannel">
              <el-input v-model="orderApi.expressChannel" placeholder="例：空运"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="checkOptions('物流公司名称')">
            <el-form-item label="物流公司名称" prop="expressCompanyName">
              <el-input v-model="orderApi.expressCompanyName" placeholder="例：EMS"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="checkOptions('收件人地址')">
            <el-form-item label="收件人地址" prop="receiverAddr">
              <el-input v-model="orderApi.receiverAddr" placeholder="例：上海市浦东新区龙阳路XXX号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="checkOptions('寄件人地址')">
            <el-form-item label="寄件人地址" prop="senderAddress">
              <el-input v-model="orderApi.senderAddress" placeholder="例：成都市锦江区都市小区XX号楼802"></el-input>
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
              <el-input v-model="orderApi.shoppingSite" placeholder="例：淘宝"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="checkOptions('购买日期')">
            <el-form-item label="购买日期" prop="shoppingTime">
              <el-date-picker type="date" placeholder="选择日期" v-model="orderApi.shoppingTime" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="checkOptions('商品价值')">
            <el-form-item label="商品价值" prop="goodsValue">
              <el-input v-model="orderApi.goodsValue" placeholder="例：288"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="checkOptions('商品列表')">
            <el-form-item label="商品列表" prop="goodsCategory">
              <el-input v-model="orderApi.goodsCategory" placeholder="例：衣服2件；裤子1件"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="checkOptions('商品价值明细')">
            <el-form-item label="商品价值明细" prop="goodsValueDetail">
              <el-input v-model="orderApi.goodsValueDetail" placeholder="例：衣服2件200元；裤子1件89元"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="checkOptions('商品种类')">
            <el-form-item label="商品种类" prop="goodsKind">
              <el-input v-model="orderApi.goodsKind" placeholder="例：一类产品"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="checkOptions('保费')">
            <el-form-item label="保费" prop="premium">
              <el-input v-model="orderApi.premium" placeholder="例：288"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="checkOptions('购物网站订单号/海淘商品订单号')">
            <el-form-item label="购物网站订单号" prop="purchasOrderNo">
              <el-input v-model="orderApi.purchasOrderNo" placeholder="例：191421745254952600"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="checkOptions('货物数量')">
            <el-form-item label="货物数量" prop="goodsAmount">
              <el-input v-model="orderApi.goodsAmount" placeholder="例：3"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-row :gutter="20" style="margin-top:30px;">
        <el-col :span="12" :offset="10">
          <el-form-item>
            <el-button type="primary" @click="submit('orderApi')">提交</el-button>
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
              productIdList:[],
              rules:[],
              //投保提交数据
              orderApi:{
                source: '',//商户标识
                productName: '',//产品名称
                productId: '',//产品id
                companyName: '',//商户名称
                phoneNo: '',//手机号
                idCard: '',//身份证号码
                expressNo: '',//物流单号
                expressTime: '',//物流发货日期
                receiverAddress: '',//收货地址
                purchasOrderNo: '',//购物网站订单号/海淘商品订单号
                shoppingSite: '',//购物网站
                goodsCategory: '',//商品列表
                premium: '',//保费
                name: '',//姓名
                shoppingTime: '',//购买日期
                loadingPort: '',//起运地
                destinationPort: '',//目的口岸
                expressChannel: '',//运输方式
                goodsValueDetail: '',//商品价值明细
                goodsValue: '',//商品价值
                goodsKind: '',//商品种类
                goodsAmount: '',//货物数量
                expressCompanyName: '',//物流公司名称
                receiverInfo: '',//收件人信息
                sendInfo: '',//寄件人信息
                receiverAddr: '',//收件人地址
                senderAddress: '',//寄件人地址
                sellerAccount: '',//卖家账号或登录名
                buyerAccount: '',//买家账号或登录名
                sex: '男',//性别
                type: 0,//前台投保
                orderProductList: [
                    {
                        productId: '',
                        productNum: 1,
                        productPrice: '',
                        productCompensationAmount: '',
                        productPeriod: '',
                        compositeProductList: []
                    }
                ]
              },
              checkRules: {
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
              },
              payInfo:{}
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
              findCompanyBySource(this.user.source).then(result => {
                  this.orderApi.companyName = result.data.company.companyName;
                  this.productIdList = result.data.product;
                  for (var i = 0; i < this.productIdList.length; i++) {
                      var currentName = this.productIdList[i].id + '-' + this.productIdList[i].productName;
                      this.productIdList[i].showName = currentName;
                  }
                  this.loading = false;
              }).catch(err=>{
                  this.loading = false;
                  this.$message({message:err.msg||"操作失败",type:'error'});
              })
          },
          //监听产品id选择
          getProductId (obj) {
            let tempList = [];
            for (var i = 0; i < this.productIdList.length; i++) {
                if (obj.productId == this.productIdList[i].id) {
                    obj.productPeriod = this.productIdList[i].productPeriod;
                    obj.productPrice = this.productIdList[i].productPrice;
                    obj.productCompensationAmount = this.productIdList[i].productCompensationAmount;
                    obj.productType = this.productIdList[i].productType;
                    if(obj.productType == 0 || obj.productType ==4){
                        obj.isGroup = true;
                        obj.productNum = 1;
                    }else{
                        obj.isGroup = false;
                    }
                    if (this.productIdList[i].productType == 3 || this.productIdList[i].productType == 4) {
                      combinationsByProductId({productId: obj.productId}).then(result =>{
                        obj.compositeProductList = result.data;
                      }).catch(err =>{
                        this.$message({message:err.msg||"操作失败",type:'error'});
                      })
                    } else {
                        obj.compositeProductList = [];
                    }
                }
            }
            tempList = [];
            if (this.orderApi.orderProductList.length == 1) {
                tempList.push(obj.productId);
            } else {
                for (var i = 0; i < this.orderApi.orderProductList.length; i++) {
                    tempList.push(this.orderApi.orderProductList[i].productId)
                }
                this.distinct(tempList);
            }
            this.ids = tempList.toString();
            getInsuranceInformation({ids: this.ids}).then(result =>{
              this.rules = result.data
            }).catch(err =>{
              this.$message({message:err.msg||"操作失败",type:'error'});
            })
          },
          //提交
          submit (formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.orderApi.source = this.user.source;
                addOrder(this.orderApi).then(result =>{
                  getBalance({username: result.data.payPhoneno}).then(res =>{
                    this.ticket = res.data.ticket;
                    accountInfo({t: this.ticket}).then(response =>{
                      this.payInfo.balance = response.data.info.subAccountInfos[0].subAccountRechargeBalance;//余额
                      if(result.data.sb){
                          this.$message.warning(result.data.result[0].sb);
                      }else {
                          this.confirmToPay()
                      }
                    }).catch(err =>{
                      this.$message({message:err.msg||"操作失败",type:'error'});
                    })
                  }).catch(err =>{
                    this.$message({message:err.msg||"操作失败",type:'error'});
                  })
                  if(result.data.order){
                      this.payInfo.discountAmount = result.data.order.discountAmount / 100;
                      this.payInfo.ticketNo = result.data.order.ticketNo;
                      this.payInfo.source = result.data.order.source;
                      this.payInfo.title = result.data.productNameList;
                  }
                }).catch(err =>{
                  this.$message({message:err.msg||"操作失败",type:'error'});
                })
              } else {
                return false;
              }
            });
          },
          checkOptions(val){
            return this.rules.indexOf(val)!=-1
          },
          // 确认支付
          confirmToPay() {
            console.log(this.payInfo)
            this.$confirm(`${this.payInfo.title}<div style="font-size:16px">投保金额：<span style="color:red;">${this.payInfo.discountAmount}</span></div><div style="font-size:16px">余额：<span style="color:red;">${this.payInfo.balance}</span></div>`, '确认信息', {
              distinguishCancelAndClose: true,
              dangerouslyUseHTMLString: true,
              center: true,
              cancelButtonText: '取消',
              confirmButtonText: '确认支付'
            }).then(() => {
              goPay(this.payInfo).then(result=>{
                this.$message.success(result.msg);
              }).catch(err =>{
                if (err.msg == '可支付余额不足') {
                  this.$confirm('您的余额不足，请充值', '提示', {
                    confirmButtonText: '去充值',
                    cancelButtonText: '取消',
                    type: 'info',
                    center: true
                  }).then(() => {
                    this.$router.push({path:'/accountCenter/recharge'})
                  }).catch(() => {
                         
                  });
                } else {
                  this.$message.error(err.msg||"操作失败");
                }
              })
            }).catch(action => {
              
            });
          },
          //增加产品id
          addProduct () {
              if (this.orderApi.orderProductList && this.orderApi.orderProductList.length == 10) {
                  this.$message.warning('最多只能10条数据')
                  return false
              } else {
                this.orderApi.orderProductList.push({
                  productId: '',
                  productNum: 1,
                  productPrice: '',
                  productCompensationAmount: '',
                  productPeriod: ''
                });
                console.log(1111,this.orderApi.orderProductList)
              }
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