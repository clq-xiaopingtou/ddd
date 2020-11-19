<template>

  <div class="detail">

    <div class="img">
      <!-- 电影图片 -->
      <img v-lazy="film.poster"
           alt="">
    </div>
    <div class="film-detail">
      <!-- 电影名字 -->
      <div class="name">
        <div class="name1">{{ film.name }}<span class="rt">{{name2}}</span>
        </div>

        <div class="grade"><i v-if="bgm">{{film.grade }}分</i></div>
      </div>
      <!-- 电影评分 -->

      <!-- 电影类型 -->
      <div>{{ film.category }}</div>
      <!-- 上映时间 -->
      <div>{{ film.premiereAt  | timeparser }}上映</div>
      <!-- 分钟 -->
      <div>{{ film.nation }} | {{ film.runtime }} 分钟</div>
      <div class="a1 text">
        <!-- 电影简介 -->
        {{ film.synopsis }}
      </div>
      <div class="tu"
           @click="dian">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAICAMAAADHqI+lAAAAOVBMVEVHcEy9xcW9wMW9wcW////Bwca9wcW9wMW9wMW+wMW+wcW9wcXMzMy+wMa+wce9wMe9wca9wMW9wMWKU/2FAAAAEnRSTlMAH+jGBDa6/vaatcIPdlNSdckJHB8JAAAASUlEQVQIHQXBhwGDMAADMCVksQr4/2MrObYCQNkOZ2oH6DWna2Q9wG9lXLQ984V3Zm/gntlb2zNvgN/KGFkPAL0mtQNA+b4C/AGl4gJfgEWzrAAAAABJRU5ErkJggg=="
             alt=""
             class="">
      </div>

    </div>
    <!-- 小白板 -->
    <div id="bai"></div>
    <!-- 演员列表 分割，横排 -->
    <div>
      <div>
        <h3 class="yan">演员列表</h3>
      </div>
      <div>
        <comswiper :key="film.actors.length">
          <div v-for="(item,index) in film.actors"
               :key="index"
               class="swiper-slide">
            <img v-lazy="item.avatarAddress"
                 alt="">
            <p>{{item.name}}</p>
            <p>{{item.role}}</p>
          </div>
        </comswiper>
      </div>
    </div>
    <div @click="hui"
         class="qwe">回</div>
  </div>
</template>

<script>
import comswiper from '@/components/comswiper.vue'
import moment from 'moment'
import { moiveDetail } from "@/api/api";
console.log('moiveDetail')
console.log(moiveDetail)
export default {
  //组件名字
  name: "detail",
  //接收父组件给的东西 type是接收什么东西  default 默认值
  props: {
    list: {
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
    comswiper
  },
  // vue数据集中管理
  data () {

    return {
      value: "1",
      // film: {},
      name2: '',
      bgm: true,
      gradee: '',
      film: { actors: [] },
    };

  },
  //方法 函数写这里
  methods: {
    hui () {
      this.$router.push({ path: '/' })
    },
    dian () {
      let textobj = document.getElementsByClassName('a1')[0];
      // console.log(textobj);
      let imgobj = document.getElementsByTagName('img')[1];
      // console.log(imgobj);
      imgobj.className = ''
      if (textobj.className == 'a1 text') {
        textobj.className = 'a1';
        imgobj.className = 'up'
      } else {
        textobj.className = 'a1 text';

      }
    }
  },
  //计算属性
  computed: {},
  //侦听器
  watch: {},
  //过滤器
  filters: {
    toUpcase (value) {
      return value ? value.toUpperCase() : "";
    },
    timeparser (value) {
      return moment(value * 1000).format('YYYY-MM-DD')
    },

  },

  //以下是生命周期 
  //组件创建之前  new操作符桥梁函数return 之前
  beforeCreate () {

  },
  //组件创建之后
  created () {
    // 发布命令
    this.eventBus.$emit("footernav", false);

  },
  //页面渲染之前
  beforeMount () {

  },
  //页面渲染之后
  async mounted () {
    console.log("我进入detail页面的 mounted里面了");
    console.log(this.$route.params.filmId);
    let ref = await moiveDetail(this.$route.params.filmId);
    //http.get(moiveDetailUrl + filmId)
    console.log(ref);
    this.film = ref.data.data.film;
    this.name2 = ref.data.data.film.item.name;

    this.gradee = ref.data.data.film.grade;
    console.log(this.gradee);

    if (this.gradee == undefined) {
      this.bgm = false
    } else {
      this.bgm = true
    }


  },
  //页面销毁之前
  beforeDestroy () {
    // 发布命令
    this.eventBus.$emit("footernav", true);
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
* {
  margin: 0;
  padding: 0;
}
.detail {
  .img {
    width: 100%;
    height: 300px;
    overflow: hidden;
    position: relative;
    img {
      position: absolute;
      width: 100%;
      top: -50%;
    }
  }
}
.film-detail {
  // margin: 18px 18px;
  color: gray;
  div {
    margin-top: 5px;
    margin-left: 18px;
    margin-right: 18px;
  }
}
.name {
  display: flex;
  justify-content: space-between;
  .name1 {
    font-size: 20px;
    font-weight: 550;
    color: black;
    margin-left: 0;
  }
  .grade {
    font-size: 20px;
    color: orange;
  }
}

.rt {
  font-size: 9px;
  color: #fff;
  background-color: #d2d6dc;
  height: 14px;
  line-height: 14px;
  padding: 0 2px;
  border-radius: 2px;
  display: inline-block;
  margin-left: 7px;
}
// 回退按钮
.qwe {
  position: fixed;
  top: 15px;
  left: 15px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: black;
  color: #fff;
  text-align: center;
  line-height: 30px;
}

// 简介弹跳
.tu {
  text-align: center;
}
.text {
  height: 40px !important;
  overflow: hidden;
}
.up {
  transform: rotate(180deg);
}

.detail {
  .swiper-slide {
    margin: 0;
    text-align: center;
    color: black;
    img {
      width: 80px;
      margin-left: 15px;
    }
  }
}
.yan {
  margin-left: 35px;
  margin-top: 5px;
  margin-bottom: 5px;
  color: black;
}
#bai {
  height: 10px;
  background-color: #e7e7e7;
  margin: 0;
}
</style>


