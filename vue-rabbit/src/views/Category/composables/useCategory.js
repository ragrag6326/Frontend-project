// 獲取 banner
import { onMounted, ref } from 'vue'
import { getCategoryAPI } from '@/apis/category'
import { useRoute } from 'vue-router'
import { onBeforeRouteUpdate } from 'vue-router'

export function useCategory() {
  const route = useRoute()
  // 獲取數據
  const categoryData = ref([])
  const getCategory = async (id = route.params.id) => {
    const res = await getCategoryAPI(id)
    categoryData.value = res.result
  }

  onMounted(() => getCategory())

  // 目標:路由參數變化的時候 把分類數據接口重新發送
  onBeforeRouteUpdate((to) => {
    console.log('路由更新了')
    // 存在問題 : 使用最新路由參數請求最新的分類數據
    getCategory(to.params.id)
  })

  return {
    categoryData,
  }
}
