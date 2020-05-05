<template>
  <div class="container">
    <div class="leader">
        <ul>
            <li :class="{active: this.orderType === 'all'}" @click="getOrderList(0, 'all')">全部订单</li>
            <li :class="{active: this.orderType === 'payed'}" @click="getOrderList('2', 'payed')">已付款</li>
            <li :class="{active: this.orderType === 'pickup'}" @click="getOrderList('3,4', 'pickup')">待取货</li>
            <li :class="{active: this.orderType === 'confirm'}" @click="getOrderList('5,7,8', 'confirm')">已完成</li>
        </ul>
    </div>
    <div v-show="!listLength" class="listNone">暂无订单</div>
    <div class="order-item" v-for="item of list" :key="item.id" @click="toPage(item)">
        <div class="item-top">
            <img src="../../assets/order.png" alt="">
            <span>{{item.orderCode}}</span>
            <span>
                {{
                    item.orderState === 1 ? '已取消' :
                    item.orderState === 2 ? '未到货' :
                    item.orderState === 3 ? '已到货' :
                    item.orderState === 4 ? '未取货' :
                    item.orderState === 5 ? '已取货' :
                    item.orderState === 6 ? '确认收货' :
                    item.orderState === 7 ? '待评价' :
                    item.orderState === 8 ? '已评价' :
                    '已完成已评价'
                }}
            </span>
        </div>
        <div class="item-center" v-for="(childItem, index) in item.goodList" :key="index">
            <div class="img-con">
                <img :src="childItem.pictureUrl" alt="">
            </div>
            <div class="text">
                <div class="text-con">
                    {{childItem.goodName}}
                </div>
                <div class="props-con">
                    {{childItem.goodIntroduce}}
                </div>
                <div class="price-con">
                    <span>￥</span>
                    <span>{{childItem.sellPrice}} &nbsp;</span>
                    <span>x{{childItem.totalNumber}}</span>
                </div>
            </div>
        </div>
        <div class="shop-user-info" v-show="userType === 2">
            <img src="../../assets/u1056.png" alt="">
            {{item.buyerName}}
            <img src="../../assets/u1060.png" alt="">
            {{item.buyerTel}}
        </div>
        <div class="item-bottom">
            <span>共{{item.allNumber}}件商品，合计￥</span>
            <span>{{item.allPrice}}</span>
        </div>
        <!-- 客户 -->
        <div class="item-more" v-show="userType === 4">
            <div
              class="btn"
              @click.stop="changeOrderStatus(item, 1)"
              v-show="item.orderState === 2 || item.orderState === 3 || item.orderState === 4">
                <span>取消订单</span>
            </div>
            <div class="btn" @click.stop="evaluate(item)" v-show="item.orderState === 7">
                <span>评价</span>
            </div>
            <div class="btn" @click.stop="changeOrderStatus(item, 7)" v-show="item.orderState === 3 || item.orderState === 4">
                <span>确认收货</span>
            </div>
        </div>
        <!-- 店长 -->
        <div class="item-more" v-show="userType === 2">
            <div
              class="btn"
              @click.stop="changeOrderStatus(item, 1)"
              v-show="item.orderState === 2 || item.orderState === 3 || item.orderState === 4">
                <span>取消订单</span>
            </div>
            <div class="btn" @click.stop="changeOrderStatus(item, 3)" v-show="item.orderState === 2">
                <span>确认到货</span>
            </div>
            <div class="btn" @click.stop="changeOrderStatus(item, 2)" v-show="item.orderState === 3">
                <span>取消到货</span>
            </div>
            <div class="btn" @click.stop="changeOrderStatus(item, 5)" v-show="item.orderState === 3 || item.orderState === 4">
                <span>确认取货</span>
            </div>
            <div class="btn" @click.stop="changeOrderStatus(item, 4)" v-show="item.orderState === 5 || item.orderState === 7">
                <span>取消取货</span>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import req from '@/api/order-list.js'

export default {
  name: 'order-list',
  data () {
    return {
      list: [],
      // all payed pickup confirm
      orderType: 'all',
      listLength: 0
    }
  },
  computed: {
    userType () {
      return JSON.parse(sessionStorage.getItem('roleInfo'))
    }
  },
  mounted () {
    this.getOrderList('0', 'all')
  },
  methods: {
    //   用户获取订单
    getOrderList (orderState = '0', type) {
      let data = {
        orderStateList: orderState
      }

      if (!orderState) {
        delete data.orderState
      }

      this.orderType = type
      console.log('orderType:', this.orderType)
      if (JSON.parse(sessionStorage.getItem('roleInfo')) === 4) {
        req('getOrderList', {
          ...data
        }).then(data => {
          if (data.code === 0) {
            this.listLength = data.data.length
            this.list = data.data.map(item => {
              return Object.assign({}, item)
            })
            console.log('list:', this.list)
          } else {
            this.$message.info(data.msg)
          }
        })
      } else {
        req('getShopOrderList', {
          ...data
        }).then(data => {
          console.log(data)
          if (data.code === 0) {
            this.list = data.data
          } else {
            this.$message.info(data.msg)
          }
        })
      }
    },
    toPage (data) {
      console.log('toPageData:', data)
      this.$router.push({path: '/order-detail', query: data})
    },
    evaluate (data) {
      console.log(data)
      this.$router.push({path: '/order-evaluate', query: data})
    },
    // 修改订单状态
    changeOrderStatus (item, changeStatus) {
      this.$confirm('确定进行该操作吗?').then(() => {
        req('changeOrderStatus', {
          orderCode: item.orderCode,
          version: item.version,
          orderState: changeStatus
        }).then(data => {
          if (data.code === 0) {
            this.$message.success(data.msg)

            this.getOrderList('', 'all')
          } else {
            this.$message.error(data.msg)
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .leader {
      height: 64px;
      width: 100%;
      ul {
          height: 100%;
          padding: 0 0 0 2.5%;
          margin: 0;
          display: flex;
          z-index: 10;
          position: fixed;
          background: rgb(246,246,246);
          width: 100%;
          height: 60px;
          top: 49px;
          li {
              line-height: 64px;
              padding: 0;
              margin: 0;
              list-style: none;
              padding: 0 13px;
              font-size: 15px;
          }
          .active {
              font-size: 17px;
              color: rgb(195,152,98);
          }
      }
  }
  .listNone {
    width: 90%;
    background: #fff;
    padding: 10px;
    border-radius: 10px;
    text-align: center;
    margin: 0 auto;
  }
  .order-item {
      width: 95%;
      margin: 0 auto 10px;
      background-color: white;
      border-radius: 8px;
      padding: 10px 15px;
      box-sizing: border-box;
      .item-top {
          width: 100%;
          display: flex;
          align-items: center;
          position: relative;
          img {
              width: 13px;
              height: 16px;
          }
          span:nth-child(2) {
              font-size: 16px;
              flex: 1;
              line-height: 38px;
              position: relative;
              left: 8px;
          }
          span:nth-child(3) {
              position: absolute;
              right: 0;
              font-size: 13px;
              color: rgb(195,152,98);
          }
      }
      .item-center {
          width: 100%;
          display: flex;
          box-sizing: border-box;
          padding-top: 5px;
          .img-con {
              flex: 1;
              text-align: center;
              img {
                  width: 84px;
              }
          }
          .text {
              flex: 2.2;
              .text-con {
                  font-size: 15px;
                  line-height: 22px;
                  overflow : hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  -webkit-box-orient: vertical;
              }
              .props-con {
                  font-size: 13.5px;
                  line-height: 26px;
                  color: rgb(168,168,168);
              }
              .price-con {
                  text-align: right;
                  line-height: 26px;
                  span:nth-child(1) {
                      font-size: 11px;
                      color: rgb(242,0,0);
                  }
                  span:nth-child(2) {
                      font-size: 16px;
                      color: rgb(242,0,0);
                  }
                  span:nth-child(3) {
                      font-size: 11px;
                      color: rgb(168,168,168);
                  }
              }
          }
      }
      .item-bottom {
          width: 100%;
          line-height: 40px;
          text-align: right;
          padding-top: 5px;
          span:nth-child(1) {
              font-size: 15px;
          }
          span:nth-child(2) {
              font-size: 20px;
          }
      }
      .item-more {
          width: 100%;
          display: flex;
          justify-content: flex-end;

          .btn {
              width: 92px;
              height: 28px;
              border-radius: 20px;
              position: relative;
              border: 1px solid rgb(195,152,98);
              margin-left: 5px;
              margin-top: 10px;
              margin-bottom: 6px;
              span {
                  font-size: 15px;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                //   margin-top: -10.4px;
                //   margin-left: -16px;
                    width: 100%;
                    text-align:center;
                  color: rgb(195,152,98);
              }
          }
      }
  }
</style>
