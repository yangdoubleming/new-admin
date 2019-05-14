<template>
  <section>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
          <el-button type="text" icon="el-icon-money">账户信息</el-button>
      </div>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="8"><div class="">您的账户余额为：{{subAccountBalance}}元</div></el-col>
      </el-row>
    </el-card>
    <el-card class="box-card" shadow="hover" style="margin-top:30px;">
      <div slot="header" class="clearfix">
          <el-button type="text" icon="el-icon-money">充值</el-button>
      </div>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="5">
            <el-form :inline="true" >
                <el-form-item label="充值金额" >
                    <el-input v-model="subAccountInfo.chargeAmount" ></el-input>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="2">
            <el-tag style="cursor:pointer;" type="danger" @click="changeMoney('500')">500元</el-tag>
        </el-col>
        <el-col :span="2">
            <el-tag style="cursor:pointer;" type="danger" @click="changeMoney('1000')">1000元</el-tag>
        </el-col>
        <el-col :span="2">
            <el-tag style="cursor:pointer;" type="danger" @click="changeMoney('1500')">1500元</el-tag>
        </el-col>
        <el-col :span="2">
            <el-tag style="cursor:pointer;" type="danger" @click="changeMoney('2000')">2000元</el-tag>
        </el-col>
        <el-col :span="2">
            <el-tag style="cursor:pointer;" type="danger" @click="changeMoney('2500')">2500元</el-tag>
        </el-col>
        <el-col :span="2">
            <el-tag style="cursor:pointer;" type="danger" @click="changeMoney('3000')">3000元</el-tag>
        </el-col>
        <el-col :span="7">
            <el-button type="danger" @click="recharge">充值</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card" shadow="hover" style="margin-top:30px;">
      <div slot="header" class="clearfix">
          <el-button type="text" icon="el-icon-money">绑定提现银行卡</el-button>
      </div>
      <el-row type="flex" class="row-bg" justify="space-between" >
        <el-col :span="8">
            <el-button type="primary" style="margin-right:20px" v-show="isAdd" @click="addBankPopShow">新增</el-button>
            <el-button type="primary" style="margin-right:20px" v-show="!isAdd">编辑</el-button>
            <el-button type="danger" v-show="!isAdd">解绑</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card" shadow="hover" style="margin-top:30px;">
      <div slot="header" class="clearfix">
          <el-button type="text" icon="el-icon-money">理赔款提现</el-button>
      </div>
      <el-row type="flex" class="row-bg" justify="space-between" >
        <el-col :span="6"><div class="">您的可提现金额为：{{details.ticketNo}}元</div></el-col>
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
    <!-- 支付二维码弹窗 -->
    <el-dialog
      title="打开手机微信端，扫码完成支付"
      :visible.sync="dialogVisible"
      width="30%"
      center
      :show-close=false
      :before-close="handleClose">
      <div id="qrcode"  ref="qrcode" class="qrcode"></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSure">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 设置支付密码弹窗 -->
    <el-dialog title="设置支付密码" :visible.sync="resetPasswordPop" :close-on-click-modal=false :show-close=false>
      <el-form :model="setPasswordForm"  label-width="80px" ref="form">
        <el-row :gutter="20">
          <el-col :span="20">
            <el-form-item label="新密码" :label-width="formLabelWidth">
              <el-input v-model="setPasswordForm.newPaymentPassword"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="确认密码" :label-width="formLabelWidth">
              <el-input v-model="setPasswordForm.agaPassword"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-row>
              <el-col :span="14">
                <el-form-item label="图形验证码" :label-width="formLabelWidth">
                  <el-input v-model="setPasswordForm.photoCode"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <img :src="verifyCodeImg" />
              </el-col>
              <el-col :span="4">
                <el-button type="text" @click="changVerifyCodeImg">换一张</el-button>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="20">
            <el-row :gutter="20">
              <el-col :span="16">
                <el-form-item label="输入验证码" :label-width="formLabelWidth">
                  <el-input v-model="setPasswordForm.veriCode"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-button type="primary" @click="getCode" :disabled="iconDis">{{paracont}}</el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click="resetPasswordPopCancel">取 消</el-button>
          <el-button type="primary" @click="toSetPassword">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 绑定银行卡弹窗 -->
    <el-dialog title="绑定银行卡" :visible.sync="addBankPop" :close-on-click-modal=false :show-close=false>
      <el-form :model="setPasswordForm"  label-width="80px" ref="form">
        <el-row :gutter="20">
          <el-col :span="20">
            <el-form-item label="持卡人：" :label-width="formLabelWidth">
              <el-input v-model="account.withdrawAccountUserName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="银行卡预留手机号：" :label-width="formLabelWidth">
              <el-input v-model="account.depositBankReserveMobileNum"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="卡号：" :label-width="formLabelWidth">
              <el-input v-model="account.withdrawAccountNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="开户银行：" :label-width="formLabelWidth">
              <el-select v-model="account.depositBankNo" placeholder="请选择">
                <el-option
                  v-for="item in bankList"
                  :key="item.accountCode"
                  :label="item.accountDesc"
                  :value="item.accountCode">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="开户银行所在地：" :label-width="formLabelWidth">
              <el-input v-model="setPasswordForm.agaPassword"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click="addBankPopCancel">取 消</el-button>
          <el-button type="primary" @click="addBankPopSure">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
    
  import { accountSsoService, getCity, accountPayment, accountCallBack, accountResetPayPwd, getVerfyCode, getProvince, getBank  } from '@/api/accountCenter'
  import { accountInfo } from '@/api/orderManage'
  import QRCode from 'qrcodejs2'
  import { setTimeout } from 'timers';
  import { BASE_URL } from '../../utils/config'
  import { mapGetters } from 'vuex'

  export default {
      data() {
          return {
            details:{},
            rechargeForm:{

            },
            rechargeFormRules:{

            },
            ticket:'',
            subAccountBalance:'',
            subAccountInfo: {
              t: "",
              chargeCurrency: 156,
              chargeAmount: "500",
              paymentCategoryCode: "wxpay",
              outOrderID: ''
            },
            withdraw: {
              paymentPassword: '',
              withdrawCurrency: 156,
              withdrawAmount: '',
              token: ''
            },
            dialogVisible: false,
            isAdd: true,
            resetPasswordPop: false,
            addBankPop:false,
            setPasswordForm: {
              newPaymentPassword:'',
              agaPassword:'',
              photoCode:'',
              veriCode:'',
              mobileNumber:''
            },
            formLabelWidth: '150px',
            verifyCodeImg:'',
            paracont:'获取验证码',
            iconDis:false,
            account:{
            },
            bankList:[]
          }
      },
      watch: {
        
      },
      computed: {
        ...mapGetters([
            'user'
        ])
      },
      created() {
        this.fetchData();
        console.log(11111,this)
      },
      methods: {
          fetchData(){
            accountSsoService().then(result => {
              this.ticket = result.data.ticket;
              //余额
              accountInfo({t: this.ticket, withdrawCurrency: '156'}).then(res => {
                this.subAccountBalance = res.data.info.subAccountInfos[0].subAccountRechargeBalance;//余额
                this.subAccountClaimBalance = res.data.info.subAccountInfos[0].subAccountClaimBalance;
                this.subAccountFrozenWithdrawAmount = res.data.info.subAccountInfos[0].subAccountFrozenWithdrawAmount;//冻结余额
                this.canTakeAccount = this.subAccountClaimBalance;//可提现金额
                this.passwordStatus = res.data.PayPwdStatus.passwordStatus;//是否设置支付密码 0-未设置 1-已设置
                if (res.data.account == null) {
                    //新增绑卡字段
                    this.account = {
                        withdrawAccountNo: '',//银行卡号
                        withdrawAccountUserName: '',//持卡人
                        withdrawAccountName: '',//别名
                        paymentPassword: '',//支付密码
                        depositBankNo: '',//提现账户开户银行代码
                        depositBankCityNo: '',//提现账户开户银行城市代码
                        depositBankBranchName: '',//提现账户开户银行支行名称
                        depositBankReserveMobileNum: '',//提现账户预留银行手机号
                        depositBankProvinceNo: '',//省code
                        token: ''//token
                    };
                    this.popText = '绑定银行卡';
                    this.isAdd = true;
                } else {
                    this.popText = '修改银行卡';
                    this.isAdd = false;
                    this.account = res.data.account;
                    this.account.withdrawAccountNoShow = '**** **** **** **** ' + this.account.withdrawAccountNo.substr(-4);
                    this.account.depositBankBranchNameShow = this.account.depositBankBranchName;
                    this.getCity();
                    this.getBankBranch();
                }
              }).catch(err=>{
                this.$message({message:err.msg, type: 'error'});
              })
            }).catch(err=>{
                this.$message({message:err.msg, type: 'error'});
            })
        },

        //金额
        changeMoney(val){
          this.subAccountInfo.chargeAmount = val;
        },
        //获取城市
        getCity () {
            if (this.account.depositBankProvinceNo != '') {
                getCity(this.account.depositBankProvinceNo).then(result =>{
                  this.cityList = result.data;
                })
            }
        },
        //获取开启银行
        getBankBranch () {
            if (this.account.depositBankNo == '') {
                this.$message.error('请选择开户银行')
            }
            if (this.account.depositBankNo != '' && this.account.depositBankCityNo != '') {
                getBankBranch(this.account.depositBankCityNo).then(result =>{
                  this.BankBranchNameList = result.data;
                })
            }
        },
        //充值
        recharge(){
          if (this.checkMoney()) {
            this.subAccountInfo.t = this.ticket;
            accountPayment(this.subAccountInfo).then(res => {
              // 生成二维码
              this.subAccountInfo.outOrderID = res.data.billNo;
              this.creatQrCode(res.data.paymentResponse);
              // 扫描二维码
              var n = 0;
              const _this = this;
              this.timeCyc = setInterval(function () {
                  accountCallBack({outOrderID: _this.subAccountInfo.outOrderID,source: _this.merchantCode}).then(result => {
                    _this.handleClose()
                    _this.$message.success("支付成功");
                    accountInfo({t: _this.ticket}).then(res => {
                      _this.subAccountBalance = res.data.info.subAccountInfos[0].subAccountRechargeBalance;//余额
                    }).catch(err => {
                      _this.$message({message:err.msg, type: 'error'});
                    })
                  }).catch(error => {
                    n += 1;
                    if (n == 60) {
                        _this.handleClose()
                        _this.$message({message:"支付失败，网络延迟等原因，请重新支付,如重复提交支付，我们会如数退还",duration:'5000',type: 'error'});
                    }
                  })
              }, 5000);
            }).catch(err => {
              this.$message({message:err.msg, type: 'error'});
            })
          }
        },
        // 验证充值金额
        checkMoney () {
            this.valueReg = /^(?:[\+\-]?\d+(?:\.\d+)?)?$/g;
            if (this.subAccountInfo.chargeAmount == "") {
                this.$message.error("充值金额不能为空！");
                return false;
            } else if (this.valueReg.test(this.subAccountInfo.chargeAmount)) {
                if (this.subAccountInfo.chargeAmount <= 0) {
                    this.$message.error("充值金额需大于0！");
                    return false;
                } else if (this.subAccountInfo.chargeAmount > 3000) {
                    this.$message('请转入大额充值页面进行充值！');
                    return false;
                }
            } else {
                this.$message.error("请输入正确的金额！");
                return false;
            }
            return true;
        },
        // 生成二维码
        creatQrCode(imgUrl) {
          this.dialogVisible = true;
          setTimeout(()=>{
              var qrcode = new QRCode('qrcode', {
                  text: imgUrl,
                  width: 120,
                  height: 120,
                  colorDark: '#000000',
                  colorLight: '#ffffff'
              })
            },100)
        },
        handleClose() {
          this.dialogVisible = false;
          clearInterval(this.timeCyc);
          this.$refs.qrcode.innerHTML=""
        },
        handleSure(){
          this.dialogVisible = false;
          clearInterval(this.timeCyc);
          this.$refs.qrcode.innerHTML=""
        },
        //绑定银行卡弹出层
        addBankPopShow () {
          if (this.passwordStatus == 0) {
              this.resetPasswordPop = true
              this.changVerifyCodeImg()
          } else {
              this.addBankPop = true;
              //获取银行总行
              getBank().then(result => {
                this.bankList = result.data
              })
              //获取省份信息
              getProvince().then(result => {
                this.provinceList = result.data
              })
          }
        },
        //获取图片验证码
        changVerifyCodeImg () {
            this.verifyCodeImg = BASE_URL + '/code/photoCode?' + new Date().getTime();
        },
        resetPasswordPopCancel(){
          this.resetPasswordPop = false;
          this.resetPayPwd = {
                mobileNumber: '',
                veriCode: '',
                newPaymentPassword: '',
                agaPassword: '',
                token: '',
                photoCode:''
            };
        },
        //获取验证码
        getCode () {
          var second = null, timePromise = undefined;
          if (second === null) {
              second = 60;
              if (this.setPasswordForm.photoCode == '') {
                  this.$message({message:'图形验证码不能为空',type:'error'})
                  second = null;
                  return false;
              } else {
                  getVerfyCode(this.user.username, this.setPasswordForm.photoCode).then(result => {
                    this.iconDis = true;
                    const _this = this;
                    timePromise = setInterval(function () {
                        if (second <= 0) {
                            clearInterval(timePromise);
                            timePromise = undefined;
                            second = null;
                            _this.paracont = "重发验证码";
                            _this.paraevent = true;
                            _this.iconDis = false;
                        } else {
                            _this.paracont = second + "s";
                            second--;
                        }
                    }, 1000);
                  }).catch(err => {
                    this.$message({message:err.msg,type:'error'})
                    this.changVerifyCodeImg();
                    second = null;
                  })
              }
          } else {
              return false;
          }
        },
        //确认设置支付密码
        toSetPassword () {
            if (!this.setPasswordForm.newPaymentPassword) {
                this.$message({message:'新密码不能为空',type:'error'})
                return false
            }
            if (!this.setPasswordForm.agaPassword) {
                this.$message({message:'确认密码不能为空',type:'error'})
                return false
            }
            if (this.sumChartCode(this.setPasswordForm.newPaymentPassword) < 8 || this.sumChartCode(this.setPasswordForm.newPaymentPassword) > 20) {
                this.$message({message:'密码不能少于8位或多于20位',type:'error'})
                return false
            }
            if (this.setPasswordForm.newPaymentPassword != this.setPasswordForm.agaPassword) {
                this.$message({message:'新密码与确认密码不一致',type:'error'})
                return false
            }
            if (!this.setPasswordForm.veriCode) {
                this.$message({message:'请输入验证码',type:'error'})
                return false
            }
            this.setPasswordForm.token = this.ticket;
            this.setPasswordForm.mobileNumber = this.user.username;
            accountResetPayPwd(this.setPasswordForm).then(result => {
              this.resetPasswordPop = false;
              this.resetPayPwd = {
                  mobileNumber: '',
                  veriCode: '',
                  newPaymentPassword: '',
                  agaPassword: '',
                  token: '',
                  photoCode:''
              };
              this.passwordStatus = 1;
              this.$message({message:result.msg,type:'success'})
            }).catch(err => {
              this.$message({message:err.msg,type:'error'})
            })
        },
        //计算字符长度
        sumChartCode(str) {
          if (str) {
              return str.replace(/[\u0391-\uFFE5]/g, "aa").length;  //先把中文替换成两个字节的英文，在计算长度
          }else {
              return 0
          }
        },
        addBankPopCancel(){
          this.addBankPop = false;
        },
        addBankPopSure(){
          this.addBankPop = false;
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
  .qrcode{
    width: 120px;
    height: 120px;
    margin: auto auto;
  }
</style>