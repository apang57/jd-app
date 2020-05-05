<template>
  <div class="container">
    <div v-show="driverListLength === 0" class="listNone">
      暂无司机信息
    </div>
    <div class='box' v-for="(item, index) in driverList" :key="index" v-show="driverListLength !== 0">
      <div>
        <img src="../../assets/u1210.png" alt="">
        {{item.driverName}}
      </div>
      <div>
        <img src="../../assets/u1151.png" alt="">
        {{item.tel}}
      </div>
    </div>
  </div>
</template>

<script>
import req from '@/api/driver-info.js'

export default {
  name: 'driver-info',
  data () {
    return {
      driverList: [],
      driverListLength: 0
    }
  },
  mounted () {
    this.getlistDriver()
  },
  methods: {
    getlistDriver () {
      req('getlistDriver', {}).then(data => {
        console.log(data)
        this.driverList = data.data
        this.driverListLength = data.data.length
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 95%;
  // padding-left: 15px;
  margin: 10px auto 0   e;
  .listNone {
    width: 100%;
    background: white;
    margin:10px auto 0;
    padding: 10px;
    border-radius: 10px;
    box-sizing: border-box;
  }
  .box {
    border-bottom: 1px solid #ddd;

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
}
</style>
