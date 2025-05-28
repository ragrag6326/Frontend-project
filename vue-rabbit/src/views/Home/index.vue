<script setup>
import HomeCategory from '@/views/Home/components/HomeCategory.vue'
import HomeBanner from '@/views/Home/components/HomeBanner.vue'
import HomeNew from '@/views/Home/components/HomeNew.vue'
import HomeHot from '@/views/Home/components/HomeHot.vue'
import HomeProduct from '@/views/Home/components/HomeProduct.vue'
// import HomePanel from "@/views/Home/componets/HomePanel.vue";
</script>

<template>
  <div class="container">
    <HomeCategory />
    <HomeBanner />
  </div>
  <HomeNew />
  <HomeHot />
  <homeProduct />

  <!--  测试面板组件-->
  <!--  <HomePanel title="新鲜好物" sub-title="新鲜好物 好多商品">-->
  <!--    <div>好多商品</div>-->
  <!--  </HomePanel>-->
  <!--  <HomePanel title="人气推荐" sub-title="新鲜好物 好多商品">-->
  <!--    <div>好多商品</div>-->
  <!--  </HomePanel>-->
</template>

<style scoped lang="scss"></style>
