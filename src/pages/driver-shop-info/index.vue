<template>
  <div>
    <div v-show="listLength === 0" class="listNone">
      暂无负责的门店
    </div>
    <div class="box" v-for="(item, index) in list" :key="index">
      <div class="shop-info">
        <img src="../../assets/u919.png" alt="">
        <span>{{item.storeCode}}</span>
      </div>
      <div>
        门店：{{item.storeName}}
      </div>
      <div>
        地址：{{item.address}}
      </div>

      <div>
        店长：{{item.userName}}
      </div>
      <div>
        手机：{{item.tel}}
      </div>
    </div>
  </div>
</template>

<script>
import req from '@/api/driver-shop-info.js'

export default {
  data () {
    return {
      list: [],
      listLength: 0
    }
  },
  mounted () {
    this.getDriverInfo()
  },
  methods: {
    getDriverInfo () {
      req('getDriverInfo', {}).then(data => {
        this.list = data.data
        this.listLength = data.data.length
        console.log(data)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.listNone {
  width: 90%;
  background: #fff;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
  margin: 10px auto 0;
}
.box {
  padding: 10px;
  border-bottom: 1px solid #ddd;

  .shop-info {
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 0;

    img {
      margin-right: 6px;
    }
  }

  >div {
    height: 30px;
    line-height: 30px;
    padding-left: 30px;
  }
}
</style>
