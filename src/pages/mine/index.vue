<template>
  <div>
    <div class="user">
        <div class="img-con">
            <img v-show="!userInfo.userPictureUrl" src="../../assets/user_default.png">
            <img v-show="userInfo.userPictureUrl" :src="userInfo.userPictureUrl" >
        </div>
        <div class="text-con">{{userInfo.userAcct}}</div>
    </div>

    <!-- 店长 -->
    <div class="shop-info" v-show="userType === 2">
      <div>
        <img src="../../assets/u919.png" alt="">
        门店：{{userInfo.storeName}}
      </div>
      <div>
        <img src="../../assets/u1265.png" alt="">
        邀请码：{{userInfo.inviteCode}}
      </div>
      <div>
        <img src="../../assets/u295.png" alt="">
        {{userInfo.address}}
      </div>
    </div>

    <!-- 司机 -->
    <div class="driver-info" v-show="userType === 3">
      <div>
        <img src="../../assets/u1210.png" alt="">
        {{userInfo.userName}}
      </div>
      <div>
        <img src="../../assets/u1151.png" alt="">
        {{userInfo.tel}}
      </div>
    </div>

    <div class="content">
        <div class="con-item" @click="toPage('/order-list')" v-show="userType === 4">
            <div>
                <img src="../../assets/order.png" alt="">
            </div>
            <div><span>我的订单</span></div>
            <div>
                <img src="../../assets/right.png" alt="">
            </div>
        </div>
        <div
          class="con-item"
          @click="toPage('/change-password')"
          v-show="userType === 4 || userType === 2 || userType === 3">
            <div>
                <img src="../../assets/editPassword.png" alt="">
            </div>
            <div><span>修改密码</span></div>
            <div>
                <img src="../../assets/right.png" alt="">
            </div>
        </div>
        <div
          class="con-item"
          @click="toPage('/change-store-code')"
          v-show="userType === 4">
            <div>
                <img src="../../assets/inviteCode.png" alt="">
            </div>
            <div><span>修改店铺邀请码</span></div>
            <div>
                <img src="../../assets/right.png" alt="">
            </div>
        </div>
        <div
          class="con-item"
          @click="toLogin"
          v-show="userType === 4 || userType === 2 || userType === 3">
            <div>
                <img src="../../assets/logOut.png" alt="">
            </div>
            <div><span>退出登录</span></div>
            <div>
                <img src="../../assets/right.png" alt="">
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import req from '@/api/mine.js'

export default {
  name: 'mine',
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {
    userType () {
      return JSON.parse(sessionStorage.getItem('roleInfo'))
    }
    // userInfo () {
    //   return JSON.parse(sessionStorage.getItem('userInfo'))
    // }
  },
  mounted () {
    console.log('role', JSON.parse(sessionStorage.getItem('roleInfo')))
    if (JSON.parse(sessionStorage.getItem('roleInfo')) === 2) {
      this.getStoreInfo()
      console.log('getStoreInfo:')
    } else if (JSON.parse(sessionStorage.getItem('roleInfo')) === 3) {
      this.getDriverInfo()
      console.log('getDriverInfo')
    } else {
      this.getUserInfo()
      console.log('getUserInfo')
    }
  },
  methods: {
    getUserInfo () {
      req('getUserInfo', {
      }).then(data => {
        console.log(data)
        this.userInfo = data.data
        console.log('userInfo:', this.userInfo)
      })
    },
    getStoreInfo () {
      req('getStoreInfo', {
      }).then(data => {
        console.log(data)
        this.userInfo = data.data
        console.log('userInfo:', this.userInfo)
      })
    },
    getDriverInfo () {
      req('getDriverInfo', {
      }).then(data => {
        console.log(data)
        this.userInfo = data.data
        console.log('userInfo:', this.userInfo)
      })
    },
    toPage (path) {
      this.$router.push({path: path})
    },
    toLogin () {
      // sessionStorage.clear('userInfo')
      // sessionStorage.clear('roleInfo')
      // sessionStorage.clear('currentComm')
      // sessionStorage.clear('StoreCode')
      sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
  .user {
      width: 90%;
      display: flex;
      margin: 15px auto;
      .img-con {
          flex: 1;
          display: flex;
          align-items: center;
          img {
              width: 80px;
              height: 80px;
              position: relative;
              // left: 38%;
              border-radius: 50%;
          }
      }
      .text-con {
          flex: 3;
          line-height: 105px;
          font-size: 30px;
      }
  }

  .shop-info {
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;

    >div {
      display: flex;
      width: 100%;
      align-items: center;
      padding: 10px 0;
      // height: 40px;

      img {
        // width: 24px;
        // height: 24px;
        margin-right: 10px;
      }
    }

    >div:nth-child(2) {
      padding-left: 5px;
    }
  }

  .driver-info {
    width: 100%;
    border-bottom: 1px solid #ddd;
    padding-left: 15px;
    box-sizing: border-box;

    >div {
      width: 100%;
      height: 50px;
      line-height: 50px;
      display: flex;
      align-items: center;

      img {
        margin-right: 10px;
      }
    }
  }

  .content {
      width: 95%;
      // height: 206px;
      padding: 0 16px;
      margin: 0 auto;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      background-color: white;
      border-radius: 10px;
      .con-item {
          width: 100%;
          flex: 1;
          padding: 5px 0;
          display: flex;
          div:nth-child(1) {
              display: flex;
              align-items: center;
              justify-content: center;
              img {
                  width: 14px;
                  height: 16px;
              }
          }
          div:nth-child(2) {
              flex: 1;
              line-height: 42.5px;
              font-size: 17px;
              span {
                  position: relative;
                  left: 10px;
              }
          }
          div:nth-child(3) {
              width: 10px;
              display: flex;
              align-items: center;
              img {
                  width: 100%;
                  height: 14px;
              }
          }
      }
  }
  .img-spc {
      width: 15px;
      height: 15px;
  }
</style>
