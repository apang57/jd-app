<template>
  <div class="container">
    <div class="banner-pic-list">
      <el-carousel height="200px" indicator-position="none">
        <el-carousel-item v-for="(item, index) in slideshowList" :key="index">
          <img :src="item.slideshowRoute" alt="" @click="toDetailPage(item)">
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="module-title">热门商品</div>

    <ul class="comm-list">
      <li
        v-for="(item, index) in commList"
        :key="index"
        @click="toDetailPage(item)">
        <img :src="item.pictureUrl" alt="">
        <div class="book-info">{{item.goodName}}</div>
        <div>￥{{item.sellPrice}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import req from '@/api/comm-home.js'

export default {
  name: 'comm-home',
  data () {
    return {
      slideshowList: [],
      commList: []
    }
  },
  mounted () {
    this.getSliderPicList()
    this.getHotComm()
    this.selecteCustomer()
  },
  methods: {
    getSliderPicList () {
      req('listSlideshow', {}).then(data => {
        this.slideshowList = data.data
        console.log('slideshowList:', this.slideshowList)
      })
    },
    getHotComm () {
      req('listHotGood', {}).then(data => {
        this.commList = data.data
        console.log('commList:', this.commList)
      })
    },
    toDetailPage (data) {
      console.log('ToDetailPage:', data)
      sessionStorage.setItem('currentComm', JSON.stringify(data))

      this.$router.push({path: '/comm-detail'})
    },
    selecteCustomer () {
      req('selecteCustomer', {}).then(data => {
        console.log('StoreCode:', data.data.inviteCode)
        sessionStorage.setItem('StoreCode', JSON.stringify(data.data.inviteCode))
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.container {
  // background: rgb(246,246,246);
  width: 95%;
  margin: 10px auto;
  margin-bottom: 60px;
}

.el-carousel {
  border-radius: 10px;
  .el-carousel__container {
    .el-carousel__item {
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.module-title {
  width: 100%;
  height: 40px;
  line-height: 40px;
  color: rgb(219, 179, 128);
  margin-top: 10px;
}

.comm-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  // margin-top: 10px;

  li {
    position: relative;
    width: 48%;
    background: #fff;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 10px;
    margin-bottom: 10px;
    img {
      width: 100%;
      height: 170px;
    }

    div:nth-child(2) {
      font-size: 12px;
    }

    div:nth-child(3) {
      font-size: 12px;
      margin-top: 10px;
      color: red;
    }
  }
}
</style>
