<template>
  <div class="container">
    <ul class="book-list">
      <li class="book-list-item" v-for="(item, index) in list" :key="index">

        <!-- 选择按钮 -->
        <div class="select-btn-box">
          <div>
            <input type="checkbox" @change="inputChange(item)">
            <div class="action" :style="{display: item.checked ? 'block' : 'none'}"></div>
          </div>
        </div>
        <!-- 书本信息 -->
        <div class="book-count-info">
          <img :src="item.pictureUrl" alt="" @click="toDetailPage(item)">
          <div>
            <div @click="toDetailPage(item)">{{item.goodName}}</div>
            <div @click="toDetailPage(item)">重量：0.32kg 系列：一生自在系列</div>
            <div>
              <span @click="toDetailPage(item)">￥{{item.sellPrice}}</span>
              <div class="change-count-box">
                <div @click="countDelete(item)">-</div>
                <div>{{item.goodNumber}}</div>
                <div @click="countAdd(item)">+</div>
              </div>
            </div>
          </div>
        </div>
      </li>
      <div v-show="!listLength" class="listNone">
        购物车空空如也~
      </div>
    </ul>

    <div class="close-count">
      <div>
        <div>
          <input type="checkbox" @change="allInputChange">
          <div class="action" :style="{display: allChecked ? 'block' : 'none'}"></div>
        </div>
        <span>全选</span>
      </div>

      <div>
        <div>
          <b>合计:</b>
          <span>{{totalPrice.toFixed(2)}}</span>
        </div>

        <button @click="shopCarToOrder">结算</button>
        <button @click="deleteShopCar">删除</button>
      </div>
    </div>
  </div>
</template>

<script>
import req from '@/api/shop-car.js'

export default {
  name: 'shop-car',
  data () {
    return {
      allChecked: false,
      totalPrice: 0,
      list: [],
      listLength: 0
    }
  },
  mounted () {
    this.getShopCarList()
  },
  methods: {
    getShopCarList () {
      req('getShopData', {}).then(data => {
        console.log('getShopData:', data.data)
        this.listLength = data.data.length
        this.list = data.data.map(item => {
          return Object.assign({}, item, {checked: false})
        })

        this.allChecked = false
        this.totalPrice = this.getTotal()
      })
    },
    shopCarToOrder () {
      let payCommList = this.list.filter(item => {
        return item.checked === true
      })

      if (!payCommList.length) {
        this.$message.info('请先选择需要购买的商品')

        return
      }
      console.log('payCommList', payCommList)
      let goodCodeList = this.list.filter(item => {
        return item.checked === true
      }).map(item => {
        return item.goodCode
      }).toString()
      console.log('goodCodeList', goodCodeList)

      let sellPriceList = this.list.filter(item => {
        return item.checked === true
      }).map(item => {
        return item.sellPrice
      }).toString()

      let totalNumberList = this.list.filter(item => {
        return item.checked === true
      }).map(item => {
        return item.goodNumber
      }).toString()

      let cartCodeList = this.list.filter(item => {
        return item.checked === true
      }).map(item => {
        return item.cartCode
      }).toString()
      if (sessionStorage.getItem('StoreCode') !== 'undefined') {
        req('addOrder', {
          goodCodeList: goodCodeList,
          sellPriceList: sellPriceList,
          totalNumberList: totalNumberList,
          cartCodeList: cartCodeList
          // storeId: JSON.parse(sessionStorage.getItem('roleInfo')).storeId
        }).then(data => {
          if (data.code === 0) {
            this.$message.success(data.msg)
            setTimeout(() => {
              this.$router.push({path: '/order-list'})
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      } else {
        console.log('toAddStoreCode')
        this.$confirm('请前往绑定店铺邀请码').then(() => {
          this.$router.push({path: '/change-store-code'})
        })
      }
    },
    deleteShopCar () {
      let payCommList = this.list.filter(item => {
        return item.checked === true
      })

      if (!payCommList.length) {
        this.$message.info('请先选择需要删除的商品')

        return
      }

      let cartCodeList = this.list.filter(item => {
        return item.checked === true
      }).map(item => {
        return item.cartCode
      }).toString()

      req('deleteShopCar', {cartCodeList: cartCodeList}).then(data => {
        if (data.code === 0) {
          this.$message.success(data.msg)

          this.getShopCarList()
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    editShopCar (cartCode, goodNumber) {
      req('editShopCar', {cartCode: cartCode, goodNumber: goodNumber}).then(data => {
        if (data.code === 0) {
          console.log('editShopCar')
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 全选按钮
    allInputChange () {
      this.allChecked = !this.allChecked

      this.list.forEach(item => {
        item.checked = this.allChecked
      })

      this.totalPrice = this.getTotal()
    },
    // 单选按钮
    inputChange (item) {
      item.checked = !item.checked

      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].checked === false) {
          this.allChecked = false

          break
        } else {
          this.allChecked = true
        }
      }

      this.totalPrice = this.getTotal()
    },
    countDelete (data) {
      if (data.goodNumber > 1) {
        data.goodNumber = parseFloat(data.goodNumber) - 1
        this.editShopCar(data.cartCode, data.goodNumber)
      }

      this.totalPrice = this.getTotal()
    },
    countAdd (data) {
      data.goodNumber = parseFloat(data.goodNumber) + 1
      this.totalPrice = this.getTotal()
      console.log('addData:', data)
      // 修改商品状态信息
      this.editShopCar(data.cartCode, data.goodNumber)
    },
    getTotal () {
      let total = 0

      this.list.forEach(item => {
        if (item.checked) {
          total = total + parseFloat(item.goodNumber * item.sellPrice)
        }
      })

      return parseFloat(total.toFixed(2))
    },
    toDetailPage (data) {
      console.log('ToDetailPage:', data)
      sessionStorage.setItem('currentComm', JSON.stringify(data))

      this.$router.push({path: '/comm-detail'})
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    padding-bottom: 110px;
  }
  .book-list {
    width: 95%;
    overflow: auto;
    margin: 10px auto 0;
    // transform: translate(-50%, 0);
    .listNone {
      background: #fff;
      padding: 10px;
      border-radius: 10px;
      text-align: center;
    }
    li {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      height: 150px;
      background: #fff;
      border-radius: 10px;
      padding: 10px 10px;
      box-sizing: border-box;
      margin-bottom: 10px;

      .select-btn-box {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 100%;

        >div {
          position: relative;
          width: 20px;
          height: 20px;
          border: 2px solid #ddd;
          border-radius: 50%;

          input {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            padding: 0;
            margin: 0;
            width: 15px;
            height: 15px;
            z-index: 1;
            opacity: 0;
          }

          .action {
            display: none;
            position: absolute;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background: rgb(219, 179, 128);
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 0;
          }
        }
      }

      .book-count-info {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex: 1;
        height: 100%;

        >img {
          width: 25%;
          height: 80%;
          vertical-align: middle;
          align-self: center;
        }

        >div {
          > div:first-child {
            font-size: 14px;
            width: 100%;
            height: 40px;
            padding-left: 10px;
            box-sizing: border-box;
          }

          > div:nth-child(2) {
            font-size: 14px;
            width: 100%;
            height: 30px;
            padding-left: 10px;
            box-sizing: border-box;
            color: #ddd;
          }

          > div:nth-child(3) {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            width: 100%;
            height: 30px;
            padding-left: 10px;
            box-sizing: border-box;

            .change-count-box {
              display: flex;
              height: 20px;

              div:first-child {
                width: 30px;
                height: 20px;
                text-align: center;
                line-height: 20px;
                border: 1px solid #ddd;
              }

              div:nth-child(2) {
                width: 50px;
                height: 20px;
                text-align: center;
                line-height: 20px;
                border: 1px solid #ddd;
                border-left: none;
                border-right: none;
              }

              div:nth-child(3) {
                width: 30px;
                height: 20px;
                text-align: center;
                line-height: 20px;
                border: 1px solid #ddd;
              }
            }
          }
        }
      }
    }
  }

.close-count {
  position: fixed;
  bottom: 60px;
  width: 100%;
  height: 50px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;

  div:first-child {
    display: flex;
    height: 50px;
    align-items: center;

    div {
      position: relative;
      width: 20px;
      height: 20px;
      border: 2px solid #ddd;
      border-radius: 50%;
      margin-right: 10px;

      input {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        padding: 0;
        margin: 0;
        width: 15px;
        height: 15px;
        z-index: 1;
        opacity: 0;
      }

      .action {
        display: none;
        position: absolute;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: rgb(219, 179, 128);
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 0;
      }
    }
  }

  div:nth-child(2) {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 50px;
    flex: 1;

    >div:first-child {
      height: 50px;
      line-height: 50px;
      font-size: 16px;
      flex: 1;
      margin-left: 10px;

      span {
        font-size: 18px;
        color: red;
        margin-left: 10px;
      }
    }

    button {
      width: 20%;
      height: 40px;
      background: rgb(219, 179, 128);
      color: #fff;
      outline: none;
      line-height: 40px;
      text-align: center;
      border: none;
      border-radius: 10px;
      margin-left: 20px;
    }

    button:nth-child(3) {
      background: red;
    }
  }
}

</style>
