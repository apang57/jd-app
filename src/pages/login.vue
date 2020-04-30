<template>
  <div>
    <div class="logo">
      <img src="../assets/logo.png" alt="">
    </div>

    <el-form :model="formData" ref="form" :rules="formRules" inline label-width="65px">
      <el-form-item prop="username">
        <img src="../assets/用户名.png"/>
        <el-input v-model="formData.username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <img src="../assets/修改密码.png" alt="">
        <el-input type="password" v-model="formData.password" placeholder="密码"></el-input>
      </el-form-item>
    </el-form>
    <div class="btn-box">
      <el-button @click="login" class="login-btn" type="primary">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
      <el-button class="register-btn" type="text" @click="$router.push({path: '/register'})">我要注册</el-button>
    </div>
  </div>
</template>

<script>
import req from '@/api/global.js'
import axios from 'axios'
const qs = require('qs')

export default {
  name: 'login',
  data () {
    return {
      formData: {
        username: '',
        password: ''
      },
      formRules: {
        username: [
          {required: true, message: '请输入账号', trigger: 'change'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.form.validate(valid => {
        if (valid) {
          axios({
            method: 'post',
            url: 'http://299213w34l.wicp.vip:14644/uaa/auth/form',
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

              sessionStorage.setItem('userInfo', JSON.stringify(data.data.data))

              this.getRole()
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
    },
    getRole () {
      req('getRole', {...this.formData}).then(data => {
        console.log('root:', data)
        sessionStorage.setItem('roleInfo', JSON.stringify(data.data))
        if (data.data === 4) {
          this.$router.push({path: '/home'})
        } else if (data.data === 2) {
          this.$router.push({path: '/order-list'})
        } else {
          this.$router.push({path: '/driver-shop-info'})
        }
        console.log('data', data)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  width: 80%;
  margin: 100px auto;
  img {
    width: 100%;
  }
}

/deep/ .el-form {
   .el-form-item {
    display: flex;
    border-bottom: 1px solid #ddd;
    text-align: center;
    margin: 0 auto;
    margin-bottom: 30px;
    width: 80%;
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
}

.btn-box {
  margin: 50px auto 0;
  width: 70%;
  .login-btn {
    background: rgb(219, 179, 128);
    font-size: 20px;
    border-radius: 20px;
    border: 0;
    height: 40px;
    width: 100%;
  }
  .register-btn {
    color: rgb(147, 147, 147);
    width: 100%;
    font-size: 14px;
    margin-top: 10px;
    padding: 0;
    text-align: right;
  }
}

</style>
