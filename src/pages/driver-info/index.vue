<template>
  <div class="container">
    <div class='box' v-for="(item, index) in driverList" :key="index">
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
      driverList: []
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
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  padding-left: 15px;

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
