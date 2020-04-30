<template>
  <div class="container">
    <div class="book-banner">
      <img :src="commDetailData.pictureUrl" alt="">
    </div>

    <div class="book-detail">
      <div class="book-price">￥{{commDetailData.sellPrice}}</div>
      <!-- <div class="book-name">{{commDetailData.goodName}}</div> -->
      <div class="book-Describe">{{commDetailData.goodIntroduce}}</div>
      <div class="comm-evaluate"></div>
      <div class="comm-evaluate">
        商品评分:
        <el-rate v-model="commDetailData.goodRank" disabled></el-rate>
        <span>{{commDetailData.goodRank}}分</span>
      </div>
      <div class="count-box">
        <span>数量</span>

        <div class="handler-box">
          <div @click="countDelete">-</div>
          <div>{{bookCount}}</div>
          <div @click="countAdd">+</div>
        </div>
      </div>
      <div class="address">
        <span>送至</span>
        <span class="iconfont iconhtmal5icon14"></span>
        <span>{{address}}</span>
      </div>
    </div>

    <div class="footer">
      <div @click="toShopCar">
        <img src="../../assets/shop_car2.png" alt="">
        <span>购物车</span>
      </div>

      <div @click="saveShopCart">加入购物车</div>
      <div @click="payNow">立即购买</div>
    </div>
  </div>
</template>

<script>
import req from '@/api/comm-detail.js'

export default {
  name: 'comm-detail',
  data () {
    return {
      commDetailData: {
        goodName: '',
        goodIntroduce: '',
        sellPrice: '',
        pictureUrl: '',
        goodCode: '',
        goodRank: 0
      },
      bookCount: 1,
      address: '新华书店（新街口店）'
    }
  },
  computed: {
  },
  mounted () {
    this.selectGood()
  },
  methods: {
    countDelete () {
      if (this.bookCount > 1) {
        this.bookCount--
      }
    },
    countAdd () {
      this.bookCount++
    },
    selectGood () {
      req('selectGood', {goodCode: JSON.parse(sessionStorage.getItem('currentComm')).goodCode}).then(data => {
        this.commDetailData = data.data
      })
    },
    toShopCar () {
      this.$router.push({path: '/shop-car'})
    },
    payNow () {
      if (JSON.parse(sessionStorage.getItem('StoreCode'))) {
        this.$confirm('确定立即购买该商品吗?').then(() => {
          req('payNow', {
            goodCodeList: this.commDetailData.goodCode,
            totalNumberList: this.bookCount,
            sellPriceList: this.commDetailData.sellPrice,
            cartCodeList: '0'
          }).then(data => {
            if (data.code === 0) {
              this.$message.success(data.msg)
              this.$router.push({path: '/order-list'})
            } else {
              this.$message.error(data.msg)
            }
          })
        })
      } else {
        console.log('toAddStoreCode')
        this.$confirm('请前往绑定店铺邀请码').then(() => {
          this.$router.push({path: '/change-store-code'})
        })
      }
    },
    saveShopCart () {
      req('saveShopCart', {goodCode: this.commDetailData.goodCode, goodNumber: this.bookCount, sellPrice: this.commDetailData.sellPrice}).then(data => {
        if (data.code === 0) {
          this.$message.success(data.msg)

          // this.$router.push({path: '/shop-car'})
        } else {
          this.$message.error(data.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: rgb(246,246,246);
}

.book-banner {
  width: 95%;
  height: 300px;
  padding: 10px;
  margin: 10px auto;
  background: #fff;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-radius: 10px;
  img {
    display: block;
    width: 80%;
    height: 100%;
    margin: 0 auto;
  }
}

.book-detail {
  padding: 10px;
  box-sizing: border-box;
  background: #fff;
  margin-top: 10px;
  border-radius: 10px;
  width: 95%;
  margin: 10px auto 0;

  .book-price {
    font-size: 22px;
    color: red;
  }

  .comm-evaluate {
    margin-top: 10px;
    display: flex;
    .el-rate {
      margin-left: 10px;
      .el-rate__icon {
        font-size: 23px;
      }
    }
    span {
      color: red;
      font-size: 16px;
    }
  }

  .book-Describe {
    font-size: 14px;
    color: #333;
    font-weight: bold;
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
  }

  .count-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 40px;
    margin-top: 10px;
    .handler-box {
      display: flex;
      height: 30px;
      line-height: 30px;
      align-items: center;
      border: 1px solid #ddd;
      border-radius: 5px;

      div:first-child {
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
      }

      div:nth-child(2) {
        width: 40px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        border-left: 1px solid #ddd;
        border-right: 1px solid #ddd;
      }

      div:nth-child(3) {
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
      }
    }
  }

  .address {
    margin-top: 10px;

    .iconhtmal5icon14 {
      color: #ddd;
    }
  }
}

.footer {
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  background: #fff;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
  align-items: center;

   div:first-child {
    width: 50px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 12px;

    img {
      width: 25px;
      height: 25px;
    }
  }

  div:nth-child(2) {
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border: 1px solid rgb(219, 179, 128);
    background: #fff;
    border-radius: 10px;
    margin-left: 10px;
  }

  div:nth-child(3) {
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: rgb(219, 179, 128);
    border: 1px solid rgb(219, 179, 128);
    color: #fff;
    border-radius: 10px;
    margin-left: 10px;
    margin-right: 10px;
  }
}
</style>
