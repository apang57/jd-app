<template>
  <div>
    <el-container>
      <el-header height="50px" v-show="!meta.headerHide">
        <div class="user-info">
          <img class="back-btn" src="../assets/left.png" @click="back" v-show="meta.goBackShow"/>
          <span
            v-for="(item, index) in titleList"
            :key="index"
            @click="toPage(item)"
            :class="{active: item.active }">
            {{item.titleName}}
          </span>
        </div>
      </el-header>

      <el-container>
        <el-main :class="{'main-class1' : meta.headerHide, 'main-class2' : !meta.headerHide}">
          <router-view></router-view>
        </el-main>
      </el-container>

      <el-footer v-show="meta.footerShow">
        <!-- 店长 -->
        <div @click="$router.push({path: '/order-list-store'})" v-show="userType === 2">
          <!-- <img v-show="currentPath !== '/comm-home'" src="../assets/u1075.png" alt=""> -->
          <img src="../assets/u1075.png" alt="">
          <div :style="{color: currentPath === '/order-list-store' ? '#C39862' : '#333333'}">订单</div>
        </div>
        <div @click="$router.push({path: '/driver-info'})" v-show="userType === 2">
          <!-- <img v-show="currentPath !== '/comm-home'" src="../assets/u1075.png" alt=""> -->
          <img src="../assets/u1080.png" alt="">
          <div :style="{color: currentPath === '/driver-info' ? '#C39862' : '#333333'}">司机</div>
        </div>

        <!-- 司机 -->
        <div @click="$router.push({path: '/driver-shop-info'})" v-show="userType === 3">
          <!-- <img v-show="currentPath !== '/comm-home'" src="../assets/u1075.png" alt=""> -->
          <img src="../assets/home3.png" alt="">
          <div :style="{color: currentPath === '/driver-shop-info' ? '#C39862' : '#333333'}">门店</div>
        </div>
        <!-- 店长 -->
        <div @click="$router.push({path: '/mine'})" v-show="userType === 2 || userType === 3">
          <img v-show="currentPath !== '/mine'" src="../assets/mine3.png" alt="">
          <img v-show="currentPath === '/mine'" src="../assets/mine3.png" alt="">
          <div :style="{color: currentPath === '/mine' ? '#C39862' : '#333333'}">我的</div>
        </div>
        <!-- 普通用户 -->
        <div @click="$router.push({path: '/comm-home'})" v-show="userType === 4">
          <img v-show="currentPath !== '/comm-home'" src="../assets/home2.png" alt="">
          <img v-show="currentPath === '/comm-home'" src="../assets/home.png" alt="">
          <div :style="{color: currentPath === '/comm-home' ? '#C39862' : '#333333'}">首页</div>
        </div>
        <div @click="$router.push({path: '/comm-classify'})" v-show="userType === 4">
          <img v-show="currentPath !== '/comm-classify'" src="../assets/classify2.png" alt="">
          <img v-show="currentPath === '/comm-classify'" src="../assets/classify.png" alt="">
          <div :style="{color: currentPath === '/comm-classify' ? '#C39862' : '#333333'}">分类</div>
        </div>
        <div @click="$router.push({path: '/shop-car'})" v-show="userType === 4">
          <img v-show="currentPath !== '/shop-car'" src="../assets/shop_car2.png" alt="">
          <img v-show="currentPath === '/shop-car'" src="../assets/shop_car.png" alt="">
          <div :style="{color: currentPath === '/shop-car' ? '#C39862' : '#333333'}">购物车</div>
        </div>
        <div @click="$router.push({path: '/mine'})" v-show="userType === 4">
          <img v-show="currentPath !== '/mine'" src="../assets/mine2.png" alt="">
          <img v-show="currentPath === '/mine'" src="../assets/mine.png" alt="">
          <div :style="{color: currentPath === '/mine' ? '#C39862' : '#333333'}">我的</div>
        </div>

      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      mainStyle: {

      }
    }
  },
  computed: {
    titleList () {
      return this.$route.meta.title
    },
    goBackBtn () {
      return this.$route.meta.goBack
    },
    meta () {
      return this.$route.meta
    },
    currentPath () {
      return this.$route.path
    },
    userType () {
      return JSON.parse(sessionStorage.getItem('roleInfo'))
    }
  },
  methods: {
    back () {
      this.$router.push({path: this.goBackBtn})
    },
    toPage (data) {
      if (data.toPath !== this.$route.path) {
        this.$router.push({path: data.toPath})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main-class1 {
  position: absolute;
  top: 0;
  bottom: 50px;
}

.main-class2 {
  position: absolute;
  top: 50px;
  bottom: 0;
}

.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgb(255,255,255);

  .router-link-active {
    font-size: 25px;
    color: #409EFF;
    text-decoration: none;
  }

  .user-info {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    font-size: 20px;
    width: 100%;

    .back-btn {
      position: absolute;
      top: 50%;
      left: 10px;
      transform: translate(0, -50%);
    }

    span {
      margin: 0 10px;
      color: rgb(219, 179, 128);
      font-weight: bold;
    }

    .active {
      font-size: 23px;
      color: #C39862;
    }
  }
}

.el-main {
  padding: 0;
  width: 100%;
}

.el-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0;
  display: flex;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  border-top: 1px solid #ddd;

  >div {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #333333;

    img {
      width: 30px;
      height: 30px;
    }

    div {
      position: relative;
      top: 3px;
    }
  }
}
</style>
