<template>
  <div>
    <div class="header">
        <div>注册</div>
        <div class="btn-back">
            <img src="../assets/左.png" alt="" @click="toLogin">
        </div>
    </div>
    <div class="logo">
      <img src="../assets/logo.png" alt="">
    </div>
    <el-form ref="form" :model="formData" :rules="formRules" inline label-width="80px">
      <div class="sex">
            <div :class="{'active':isActive === 1}"   @click="chooseSex(1)">
                <img src="../assets/男.png" alt="">
                <p class="sexText">男</p>
            </div>
            <div :class="{'active':isActive === 2}" @click="chooseSex(2)">
                <img src="../assets/女.png" alt="">
                <p>女</p>
            </div>
        </div>
        <el-row></el-row>
        <div class="file-box">
        <!-- <el-form-item prop="userPictureUrl"> -->
          <i-file v-model="formData.userPictureUrl"></i-file>
        <!-- </el-form-item> -->
        </div>
      <el-form-item prop="userAcct">
        <img src="../assets/用户名.png" alt="">
        <el-input v-model="formData.userAcct" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="userPassword">
        <img src="../assets/修改密码.png" alt="">
        <el-input type="password" v-model="formData.userPassword" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item prop="confirmUserPassword">
        <img src="../assets/确认密码.png" alt="">
        <el-input type="password" v-model="formData.confirmUserPassword" placeholder="确认密码"></el-input>
      </el-form-item>
      <el-form-item prop="tel">
        <img src="../assets/手机.png" alt="">
        <el-input v-model.number="formData.tel" placeholder="手机号码"></el-input>
      </el-form-item>
      <el-form-item prop="userName">
        <img src="../assets/姓名.png" alt="">
        <el-input v-model="formData.userName" placeholder="姓名"></el-input>
      </el-form-item>
      <!-- <el-form-item prop="sex">
        <el-radio-group v-model="formData.sex">
          <el-radio label="0">男</el-radio>
          <el-radio label="1">女</el-radio>
        </el-radio-group>
      </el-form-item> -->
      <el-form-item prop="idcard">
        <img src="../assets/身份证.png" alt="">
        <el-input v-model="formData.idcard" placeholder="身份证号"></el-input>
      </el-form-item>
      <el-form-item prop="mail">
        <img src="../assets/邮箱.png" alt="">
        <el-input v-model="formData.mail" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="inviteCode">
        <img src="../assets/邀请码.png" alt="">
        <el-input v-model="formData.inviteCode" placeholder="邀请码"></el-input>
      </el-form-item>
      <div class="btn-box">
        <el-button class="register-btn" type="primary" @click="submit">注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册</el-button>
      </div>
      <!-- <div>
        <el-button type="text" @click="toLogin">返回登录</el-button>
      </div> -->
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import IFile from '@/components/common/i-file.vue'
const qs = require('qs')

export default {
  name: 'register',
  components: {
    IFile
  },
  data () {
    var validateTel = (rule, value, callback) => {
      let reg = /^[1][3-9][0-9]{9}$/
      if (value === '' || value === undefined || value == null) {
        callback()
      } else {
        if ((!reg.test(value)) && value !== '') {
          callback(new Error('请输入正确的电话号码'))
        } else {
          callback()
        }
      }
    }
    var validateidcard = (rule, value, callback) => {
      let reg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
      console.log(reg.test(value))
      if (!reg.test(value)) {
        callback(new Error('请输入正确的身份证号'))
      } else {
        callback()
      }
    }
    var validateMail = (rule, value, callback) => {
      // eslint-disable-next-line no-useless-escape
      let reg = /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/
      if (value === '' || value === undefined || value == null) {
        callback()
      } else {
        if (!reg.test(value)) {
          callback(new Error('请输入正确的邮箱'))
        } else {
          callback()
        }
      }
    }
    return {
      isActive: 1,
      formData: {},
      formRules: {
        userAcct: [
          {required: true, message: '请输入用户账号', trigger: 'change'}
        ],
        userPassword: [
          {required: true, message: '请输入用户密码', trigger: 'change'}
        ],
        confirmUserPassword: [
          {required: true, message: '请确认密码', trigger: 'change'}
        ],
        tel: [
          {required: true, message: '请输入手机号', trigger: 'change'},
          { validator: validateTel, trigger: 'change' }
        ],
        userName: [
          {required: true, message: '请输入用户名称', trigger: 'change'}
        ],
        // sex: [
        //   {required: true, message: '请选择性别', trigger: 'change'}
        // ],
        idcard: [
          {required: true, message: '请输入身份证', trigger: 'change'},
          { validator: validateidcard, trigger: 'change' }
        ],
        mail: [
          {required: true, message: '请输入用户邮箱', trigger: 'change'},
          { validator: validateMail, trigger: 'change' }
        ]
        // userPictureUrl: [
        //   {required: true, message: '请选择头像', trigger: 'change'}
        // ]
      }
    }
  },
  mounted () {
    this.formData.sex = this.isActive
  },
  methods: {
    toLogin () {
      this.$router.push({path: '/login'})
    },
    chooseSex (sex) {
      // console.log(e.target)
      this.isActive = sex
      this.formData.sex = sex
      // console.log('sex:', this.formData.sex)
    },
    submit () {
      console.log('sex:', this.formData.sex)
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.formData.userPassword !== this.formData.confirmUserPassword) {
            this.$message.info('两次输入的密码不一致')

            return
          }
          // this.formData.userPictureUrl = '123'
          axios({
            method: 'post',
            url: 'http://299213w34l.wicp.vip:14644/app/user/saveCustomer',
            data: qs.stringify(this.formData),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;'
            }
          }).then(data => {
            if (data.data.code === 0) {
              this.$message({
                type: 'success',
                message: data.data.msg
              })

              // this.getHeader(data.data.data.access_token)

              // sessionStorage.setItem('userInfo', JSON.stringify(data.data.data))

              setTimeout(() => {
                this.$router.push({path: '/login'})
              })
            } else {
              this.$message({
                type: 'error',
                message: data.data.msg
              })
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  background: white;
  width: 100%;
  height: 50px;
  text-align: center;
  font-size: 25px;
  line-height: 50px;
  color: rgb(219, 179, 128);
  font-weight: bold;
  top: 0;
  .btn-back {
    position: absolute;
    top: 0px;
    left: 20px;
  }
}

.logo {
  width: 80%;
  margin: 30px auto 0;
  img {
    width: 100%;
  }
}

.el-form {
  .file-box {
    display: flex;
    justify-content: center;
    margin: 10px 0;
  }
  /deep/ .el-form-item {
    display: flex;
    border-bottom: 1px solid #ddd;
    text-align: center;
    margin: 0 auto;
    margin-bottom: 20px;
    width: 80%;
    // height: 30px;
    .el-form-item__content {
      display: flex;
      img {
        transform: translate(0,50%);
        width: 20px;
        height: 20px;
      }
    }
    .el-form-item__error {
      padding: 10px 30px;
    }
  }
  .sex {
    margin: 0 auto;
    width: 230px;
    height: 55px;
    margin: 10px auto 0;
    div {
      width: 115px;
      height: 40px;
      float: left;
      color: #cccccc;
      text-align: center;
      background: #cccccc;
      margin-bottom: 40px;
      img {
          display: block;
          margin: 0 auto;
          padding-top: 5px;
      }
    }
    .active {
      width: 115px;
      height: 40px;
      float: left;
      color: #DBB380;
      text-align: center;
      background: #DBB380;
    }
  }
}
.btn-box {
  margin: 20px auto;
  width: 70%;
  .register-btn {
    background: rgb(219, 179, 128);
    font-size: 20px;
    border-radius: 20px;
    border: 0;
    height: 40px;
    width: 100%;
  }
}
</style>
