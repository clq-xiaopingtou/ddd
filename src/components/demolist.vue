
<template>

  <div class="bottom">

    <!-- <loading v-if='flag'></loading> -->
    <loading v-if="!isflag"></loading>

    <div class="item"
         v-else
         v-for="(item, index) in list2"
         @click="goDetail(item.filmId)"
         :key="index">

      <div class="left">
        <img v-lazy="item.poster"
             alt="">
      </div>

      <div class="middle">
        <div>{{item.name}}</div>
        <div>主演：{{item. director }}</div>
        <div>
          <span>类型：</span>
          <span>{{item.category}}</span>
        </div>

        <!-- <span id="sseee">简介：{{item.synopsis}}</span> -->
        <div>{{item.nation}} | {{item.runtime}}分钟</div>
      </div>

      <div class="right">
        <span>预约</span>
      </div>
    </div>
  </div>
</template>



<script>
// 引入loading
import loading from '@/components/loading.vue'
export default {
  //组件名字
  name: "filmlist",
  //接收父组件给的东西 type是接收什么东西  default 默认值
  props: {
    list2: {
      type: Array,
      default () {
        return [];
      }
    },
    color: {
      type: String,
      default: '#000'
    }
  },
  //组件注册
  components: {
    // 注册组件
    loading
  },
  // vue数据集中管理
  data () {
    return {
      value: "1",
      falg: true,
      // list2: []
    };
  },
  //方法 函数写这里
  methods: {},
  //计算属性
  computed: {
    isflag () {
      console.log('我来到了filmlist里的computed');
      console.log(this.list2);
      return this.list2[0];
    }
  },
  //侦听器
  watch: {},
  //过滤器
  filters: {
    toUpcase (value) {
      return value ? value.toUpperCase() : ''
    },
  },
  //以下是生命周期 
  //组件创建之前  new操作符桥梁函数return 之前
  beforeCreate () {

  },
  //组件创建之后
  created () {

  },
  //页面渲染之前
  beforeMount () {

  },
  //页面渲染之后
  mounted () {
    console.log("我来到了filmlist mounted 里面");
    console.log("this.list", this.list2);
    // 当数组里有数据时，loading动画取消
    if (this.list2.length > 0) {
      this.flag = false;
    }
  },
  //页面销毁之前
  beforeDestroy () {

  },
  //页面销毁之后
  destroyed () {

  },
  //页面视图数据更新之前
  beforeUpdate () {

  },
  //页面视图数据更新之后
  updated () {

  },
  //组件路由守卫enter
  beforeRouteEnter (to, from, next) {
    next(vm => { });
    // 注意，在路由进入之前，组件实例还未渲染，所以无法获取this实例，只能通过vm来访问组件实例
  },
  //组件路由守卫update更新
  beforeRouteUpdate (to, from, next) {
    // 同一页面，刷新不同数据时调用，
    next();
  },
  //组件路由守卫离开
  beforeRouteLeave (to, from, next) {
    // 离开当前路由页面时调用
    next();
  }
};
</script>





<style scoped lang="scss">
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
.bottom {
  // margin-top: 65px;
  margin-bottom: 50px;
}
</style>


