<template>
  <div class="container">
    <div class="comm" v-for="(item, index) in evaluateList" :key="index">
      <div class="pic-info">
        <img :src="item.pictureUrl" alt="">

        <!-- <div class="star">
          <el-rate v-model="item.evaluateScore"></el-rate>
        </div> -->
        <el-rate
          v-model="item.value"
          show-score
          text-color="#ff9900">
          分
        </el-rate>
      </div>

      <div class="eva-box">
        <div class="title">分享你的使用体验吧</div>

        <el-input v-model="item.evaluateContent" placeholder="请输入您的评价内容" type="textarea" :rows="5"></el-input>
      </div>
    </div>

    <el-button class="submit-btn" type="primary" @click="addEvaluate">提交</el-button>
  </div>
</template>

<script>
import req from '@/api/order-evaluate.js'

export default {
  name: 'order-evaluate',
  data () {
    return {
      evaluateList: [],
      orderCode: '',
      goodCodeList: '',
      assessRankList: '',
      assessContentList: '',
      value: 3.7
    }
  },
  mounted () {
    console.log(this.$route.query)
    console.log('orderCode：', this.$route.query.orderCode)
    this.getEvaluate()
  },
  methods: {
    getEvaluate () {
      req('getEvaluate', {orderCode: this.$route.query.orderCode}).then(data => {
        console.log('getEvaluateData:', data)
        this.evaluateList = data.data
        console.log('getEvaluate', this.evaluateList)
      })
    },
    addEvaluate () {
      this.goodCodeList = this.evaluateList.map(item => {
        return item.goodCode
      }).toString()
      this.assessContentList = this.evaluateList.map(item => {
        return item.evaluateContent
      }).toString()
      this.assessRankList = this.evaluateList.map(item => {
        return item.value
      }).toString()
      // , assessContentList: item.evaluateContent, assessRankList: item.value}
      console.log('this.goodCodeList:', this.goodCodeList)
      console.log('this.assessContentList:', this.assessContentList)
      console.log('this.assessRankList:', this.assessRankList)
      req('addEvaluate', {
        orderCode: this.$route.query.orderCode,
        goodCodeList: this.goodCodeList,
        assessContentList: this.assessContentList,
        assessRankList: this.assessRankList
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
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  // background: #fff;
  padding-top: 10px;
  .comm {
    width: 95%;
    margin: 0 auto 10px;
    // height: 200px;
    // display: flex;
    // justify-content: space-between;
    // align-items: center;
    padding: 10px;
    box-sizing: border-box;
    background: #fff;
    border-radius: 10px;

    .pic-info {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 auto;
      img {
        border-radius: 10px;
        width: 100px;
        height: 100px;
      }
        .el-rate {
          width: 100%;
          padding: 10px 0 10px 20px;
          /deep/ .el-rate__item {
            font-size: 20px;
            vertical-align: middle;
            .el-rate__icon {
              font-size: 30px;
            }
          }
          /deep/ .el-rate__text {
            margin-left: 10px;
            font-size: 20px;
          }
        }
      }
    }

    .eva-box {
      width: 100%;
      padding: 0;
      .title {
        // padding-left: 10px;
        line-height: 40px;
        color: rgb(147, 147, 147);
      }
      /deep/ .el-textarea {
        .el-textarea__inner {
          border: 0;
          padding: 5px;
          border: 1px solid rgb(147, 147, 147);
        }
        border-radius: 10px;
        border-color: rgb(147, 147, 147);
      }
    }
  .submit-btn {
    display: block;
    width: 95%;
    margin: 10px auto 20px;
    height: 45px;
    line-height: 40px;
    border-radius: 10px;
    background: rgb(219, 179, 128);
    border-color: rgb(219, 179, 128);
    font-size: 20px;
    font-weight: bold;
  }
}
</style>
