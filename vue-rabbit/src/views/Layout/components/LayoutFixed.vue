<script setup>
import { useScroll } from '@vueuse/core'
import { useCategoryStore } from '@/stores/category'
const { y } = useScroll(window)

// 使用 pinia 中的數據

const categoryStore = useCategoryStore()
</script>

<template>
  <!-- 核心逻辑：根据滚动距离判断当前show类名是否显示，大于78显示，小于78，不显示-->
  <!-- <div class="app-header-sticky" :class="{ show: y > 78 }"> -->
  <div class="app-header-sticky" :class="{ show: y > 78 }">
    <div class="container">
      <RouterLink class="logo" to="/" />
      <!-- 导航区域 -->
      <ul class="app-header-nav">
        <li class="home">
          <RouterLink to="/">首頁</RouterLink>
        </li>
        <li class="home" v-for="item in categoryStore.categoryList" :key="item.id">
          <RouterLink active-class="active" :to="`/category/${item.id}`">{{
            item.name
          }}</RouterLink>
        </li>
      </ul>

      <div class="right">
        <RouterLink to="/">品牌</RouterLink>
        <RouterLink to="/">專題</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  // 此处为关键样式!!!
  // 状态一：往上平移自身高度 + 完全透明
  transform: translateY(-100%);
  opacity: 0;

  // 状态二：移除平移 + 完全不透明
  &.show {
    transition: all 0.3s linear;
    transform: none;
    opacity: 1;
  }

  .container {
    display: flex;
    align-items: center;
  }

  .logo {
    width: 200px;
    height: 80px;
    background: url('@/assets/images/logo.png') no-repeat right 2px;
    background-size: 160px auto;
  }

  .right {
    width: 220px;
    display: flex;
    text-align: center;
    padding-left: 40px;
    border-left: 2px solid $xtxColor;

    a {
      width: 38px;
      margin-right: 40px;
      font-size: 16px;
      line-height: 1;

      &:hover {
        color: $xtxColor;
      }
    }
  }
}

.app-header-nav {
  width: 820px;
  display: flex;
  padding-left: 40px;
  position: relative;
  z-index: 998;

  li {
    margin-right: 40px;
    width: 38px;
    text-align: center;

    a {
      font-size: 16px; // 字体大小
      line-height: 32px; // 行高
      height: 32px; // 高度
      display: inline-block; // 内联块元素

      &:hover {
        // 鼠标移入
        color: $xtxColor; // 字体颜色
        border-bottom: 1px solid $xtxColor; // 底部边框
      }
    }

    .active {
      // 当前激活状态
      color: $xtxColor;
      border-bottom: 1px solid $xtxColor;
    }
  }
}
</style>
