<template>
  <div class="list scroll"
       :style="{ height: height + 'px' }">
    <comloading v-if="watchflag"></comloading>
    <!-- 展示数据 -->
    <div v-if="!watchflag">
      <div class="item"
           v-for="(item, index) in data"
           :key="index"
           @click="godetail(item.filmId)">
        <div class="left">
          <img v-lazy="item.poster" />
        </div>
        <div class="middle">
          <div>{{ item.name }}</div>
          <div v-if="type == 1">
            <span>观众评分 </span>
            <span class="grade">{{ item.grade }}</span>
          </div>
          <div>主演：{{ item.actors | parseActors }}</div>
          <div>{{ item.nation }} | {{ item.runtime }}分钟</div>
        </div>
        <div class="right">
          <span v-if="type == 1">购票</span>
          <span v-else>预购</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// loading导入
import comloading from "@/components/loading.vue";
import BScroll from "better-scroll";
// 导入请求方法
import { nowPlayingListData, comingSoonListData } from "@/api/api";

export default {
  data () {
    return {
      loading: true,
      watchflag: true,
      height: 0,
      // bs：保存better-scroll的实例结果
      bs: null,
      pageNum: 1,
      flag: true, // 控制是否可以继续加载更多
      data: [], // 拼数据的
    };
  },
  props: ["list1", "type"],
  components: {
    comloading,
  },
  created () {
    //不好的用法
    // 当进入页面后需要将父传子的数据list转交给data
    //this.data = this.list1;
    // 判断数据是否获取到，获取到之后去除loading组件
    // if (this.data.length > 0) {
    //     this.loading = false;
    // } else {
    //     this.loading = true;
    // }
  },
  filters: {
    // 处理演员的数据，将主演的数据从数组形式转化成字符串形式以便输出
    parseActors: function (value) {
      let actors = "";
      if (value) {
        value.forEach((element) => {
          actors += element.name + " ";
        });
      } else {
        actors = "暂无主演";
      }
      return actors;
    },
  },
  watch: {
    list1: function (newval) {
      console.log("进来watch了");
      this.watchflag = false;
      this.data = this.list1;
      //   console.log(newVal);
    },
    //  immediate: true,
  },
  methods: {
    godetail (filmId) {
      console.log('我进来了godetail里面了  filmId')
      console.log(filmId)
      this.$router.push({ name: 'detail', params: { filmId } })
    },
    // 获取数据的方法
    async getData () {
      console.log('getData进来了')
      if (this.flag) {
        this.pageNum++
        console.log(this.pageNum)
        //获取数据
        if (this.type == 1) {
          //这是正在上映的电影数据请求
          console.log('进来this.type =1里面了')
          console.log(this.pageNum)
          var ret = await nowPlayingListData(this.pageNum)
          console.log('ret这是上映的电影新数据请求', ret)
        }
        if (ret.data.data.films.length < 10) {
          this.flag = false
        }
        this.data = this.data.concat(ret.data.data.films)
      }


    },
  },
  mounted () {
    // 获取可见高度
    this.height = document.documentElement.clientHeight - 100;
  },
  updated () {
    //new 得到better scroll的全部能力 
    this.bs = new BScroll(".scroll", {
      pullUpLoad: true,
      // 激活下滑的事件监听
      pullDownRefresh: true,
      // 它会禁止一些浏览器的事件 
      click: true,
    });
    this.bs.on("pullingUp", () => {
      // 获取数据
      this.getData();
      this.bs.finishPullUp();
    });
    this.bs.on("pullingDown", () => {
      // 获取数据
      this.getData();
      //这一步停止当前这一步 下拉刷新  刷新一次够了  要不服务器受不了
      this.bs.finishPullDown();
    });
  },
};
</script>

<style lang="scss" scoped>
.list {
  margin-bottom: 50px;

  .item {
    margin-top: 15px;
    padding-bottom: 15px;
    display: flex;
    color: #797d82;
    font-size: 13px;
    border-bottom: 1px solid #ededed;

    .left {
      width: 77px;
      height: 100px;
      margin-left: 20px;
      img {
        width: 66px;
        height: 100%;
      }
    }

    .middle {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 55%;

      div:nth-of-type(1) {
        color: #191a1b;
        font-size: 16px;
      }

      div:nth-of-type(3) {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .grade {
        color: #ffb232;
        font-size: 14px;
      }
    }

    .right {
      width: 15%;
      display: flex;
      align-items: center;
      margin-right: 20px;

      span {
        border: 1px solid #ff5f16;
        background: white;
        color: #ff5f16;
        border-radius: 2px;
        height: 25px;
        line-height: 25px;
        font-size: 13px;
        width: 50px;
        text-align: center;
      }
    }
  }
}

.scroll {
  overflow: hidden;
}
</style>
