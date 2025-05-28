<script setup>
import LayoutNav from '@/views/Layout/components/LayoutNav.vue'
import LayoutHeader from '@/views/Layout/components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutFixed from '@/views/Layout/components/LayoutFixed.vue'

import { useCategoryStore } from '@/stores/category'
import { onMounted } from 'vue'

const cateStore = useCategoryStore()

onMounted(() => {
  cateStore.getCategory()
})
</script>

<template>
  <div>
    <LayoutFixed />
    <LayoutNav />
    <LayoutHeader />
    <RouterView />
    <LayoutFooter />
  </div>
</template>

<style scoped lang="scss"></style>
