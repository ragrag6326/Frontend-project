<script>
import LayoutNav from '@/views/Layout/components/LayoutNav.vue'
import LayoutHeader from '@/views/Layout/components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'

export default {
  components: {
    LayoutNav,
    LayoutHeader,
    LayoutFooter,
  },
}
</script>

<template>
  <div>
    <LayoutNav />
    <LayoutHeader />
    <RouterView />
    <LayoutFooter />
  </div>
</template>

<style scoped lang="scss"></style>
