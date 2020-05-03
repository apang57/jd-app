<template>
  <div class="container">
    <ul class="book-classify">
      <div class="book-classify-box">
        <li :class="{active: item.typeCode === currentClassify.typeCode}" v-for="(item, index) in oneClassifyList" :key="index" @click="getTwoClassify(item)">
          <b></b>
          <span>{{item.typeName}}</span>
        </li>
      </div>
    </ul>

    <ul class="book-classify-conteiner">
      <li class="book-classify-item" v-for="(item, index) in commList" :key="index">
        <div class="book-classify-item-title">{{item.typeName}}</div>
        <ul class="book-list">
          <li v-for="(childItem, childIndex) in item.goodList" :key="childIndex" @click="getCommDetail(childItem)">
            <img :src="childItem.pictureUrl" alt="">
            <div>{{childItem.goodName}}</div>
            <div>
              ￥{{childItem.sellPrice}}
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import req from '@/api/comm-classify.js'

export default {
  name: 'comm-classify',
  data () {
    return {
      oneClassifyList: [],
      currentClassify: {},
      commList: [
      ]
    }
  },
  mounted () {
    this.getlevelOneList()
  },
  methods: {
    getlevelOneList () {
      req('getlevelOneList', {}).then(data => {
        this.oneClassifyList = data.data
        console.log('currentClassify', this.oneClassifyList[0])
        this.currentClassify = this.oneClassifyList[0]

        this.getTwoClassify(this.currentClassify)
      })
    },
    getTwoClassify (item) {
      this.currentClassify = item

      req('getTwoClassify', {typeCode: item.typeCode}).then(data => {
        this.commList = data.data
      })
    },
    getCommDetail (item) {
      sessionStorage.setItem('currentComm', JSON.stringify(item))

      this.$router.push({path: '/comm-detail'})
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  top: 0;
  bottom: 60px;
  width: 100%;
  background: rgb(246,246,246);

  .book-classify {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 20%;
    background: #fff;
    .book-classify-box {
      background: rgb(246,246,246);
      li {
        position: relative;
        width: 100%;
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 16px;
        background: #fff;
        >span {
          display: inline-block;
          width: 100%;
          height: 100%;
        }

      }
      li.active {
        color: rgb(219, 179, 128);
        background: rgb(246,246,246);
        // border-top-right-radius: 10px;
        b {
          position: absolute;
          left: 0;
          top: 50%;
          width: 3px;
          height: 20px;
          background: rgb(197, 156, 104);
          margin-top: -10px;
        }
      }
    }
  }

  .book-classify-conteiner {
    position: absolute;
    top: 0;
    left: 20%;
    bottom: 0;
    overflow: auto;
    width: 80%;

    .book-classify-item {
      width: 90%;
      margin: 0 auto;
      margin-bottom: 10px;
      .book-classify-item-title {
        width: 100%;
        height: 40px;
        padding-left: 10px;
        box-sizing: border-box;
        line-height: 40px;
        font-size: 14px;
      }

      .book-list {
        width: 100%;
        background: #fff;
        display: flex;
        flex-wrap: wrap;
        padding: 10px 0;
        box-sizing: border-box;
        border-radius: 10px;
        li {
          // display: flex;
          // flex-direction: column;
          // justify-content: flex-start;
          // align-items: center;
          padding: 0 5%;
          width: 40%;
          margin-bottom: 10px;

          img {
            width: 100%;
            height: 80px;
          }

          div:nth-child(2) {
            font-size: 14px;
          }

          div:nth-child(3) {
            color: red;
            font-size: 12px;

            span {
              color: #ddd;
              font-weight: normal;
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}
</style>
