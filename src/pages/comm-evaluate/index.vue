<template>
  <div class="container">
    <div class="evaluate-title">
      <span :class="{active: evaluateBtnType === 'all'}" @click="getEvaluate('', 'all')">全部评价</span>
      <span :class="{active: evaluateBtnType === 'perfect'}" @click="getEvaluate('5', 'perfect')">好评</span>
      <span :class="{active: evaluateBtnType === 'good'}" @click="getEvaluate('2,3,4', 'good')">中评</span>
      <span :class="{active: evaluateBtnType === 'differ'}" @click="getEvaluate('0,1', 'differ')">差评</span>
    </div>

    <ul class="evaluate-list">
      <li v-for="(item, index) in list" :key="index">
        <!-- <div class="head-pic">
          <img src="../../assets/head_pic.png" alt="">
        </div> -->

        <div class="content">
          <div class="title">
            <div class="user-info">
              <div class="name">{{item.assessUser}}</div>
              <div class="date">{{item.assessTime}}</div>
            </div>
            <el-rate
              class="star"
              v-model="item.assessRank"
              disabled
              >
            </el-rate>
          </div>
          <div class="msg" v-show="item.assessContent">{{item.assessContent}}</div>
          <div class="msg" v-show="!item.assessContent">该用户未填文字评价~</div>
        </div>
      </li>
      <div class="content" v-show="listLength === 0">
        <div class="noneContent">
          暂无评价
        </div>
      </div>
    </ul>
  </div>
</template>

<script>
import req from '@/api/comm-evaluate.js'

export default {
  name: 'comm-evaluate',
  data () {
    return {
      list: [],
      // all perfect good differ
      evaluateBtnType: 'all',
      listLength: 0
    }
  },
  mounted () {
    this.getEvaluate('', 'all')
  },
  methods: {
    getEvaluate (score = '', type) {
      this.evaluateBtnType = type

      let commData = JSON.parse(sessionStorage.getItem('currentComm'))
      let data = {
        goodCode: commData.goodCode,
        assessRankList: score
      }

      if (!score) {
        delete data.assessRankList
      }

      req('getEvaluate', {
        ...data
      }).then(data => {
        this.list = data.data
        this.listLength = this.list.length
        console.log('listLength', this.listLength)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: rgb(246,246,246);
  padding-bottom: 10px;

  .evaluate-title {
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding: 0 10px;
    box-sizing: border-box;
    z-index: 10;
    position: fixed;
    background: rgb(246,246,246);
    width: 100%;
    height: 50px;
    top: 49px;
    span {
      padding: 0 10px;
    }

    .active {
      color: #C39862;
      font-size: 20px;
    }
  }

  .evaluate-list {
    width: 95%;
    background: #fff;
    margin: 0 auto;
    border-radius: 10px;
    margin-top: 50px;
    .noneContent {
      padding: 10px;
      text-align: center;
    }

    li {
      display: flex;

      // .head-pic {
      //   width: 50px;
      //   height: 50px;
      //   padding: 10px;

      //   img {
      //     width: 100%;
      //     height: 100%;
      //   }
      // }

      .content {
        flex: 1;
        padding: 10px;
        .title {
          display: flex;
          justify-content: space-between;
          // align-items: center;
          width: 100%;
          height: 50px;

          .user-info {
            flex: 2;
            .date {
              color: rgb(147, 147, 147);
              font-size: 14px;
            }
          }
          .el-rate {
            flex: 0.8;
            width: 100%;
            height: 20px;
            // position: absolute;
            // padding: 10px 0 10px 0;
            /deep/ .el-rate__item {
              font-size: 20px;
              // vertical-align: middle;
              .el-rate__icon {
                font-size: 15px;
              }
            }
          }
        }
        .msg {
          width: 100%;
          white-space:normal;
          word-break:break-all;
          word-wrap:break-word;
        }
      }
    }
  }
}
</style>
