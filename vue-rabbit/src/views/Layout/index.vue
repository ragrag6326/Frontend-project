<script>
import LayoutNav from '@/views/Layout/components/LayoutNav.vue'
import LayoutHeader from '@/views/Layout/components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutFixed from '@/views/Layout/components/LayoutFixed.vue'

export default {
  components: {
    LayoutFixed,
    LayoutNav,
    LayoutHeader,
    LayoutFooter,
  },
}
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
