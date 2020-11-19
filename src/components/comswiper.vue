<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <!-- 插槽（坑） -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/swiper-bundle.min.css";
export default {
  //正式因为this.$nextTick 页面才能异步渲染 百分百保证不会白屏
  mounted () {
    this.$nextTick(() => {
      new Swiper(".swiper-container", {
        slidesPerView: 4,
      });
    });
  },
};
</script>