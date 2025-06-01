import { defineStore } from 'pinia'

import { ref, computed } from 'vue'

export const useCartStore = defineStore(
  'cart',
  () => {
    const cartList = ref([])

    // 定義 action
    const addCart = (goods) => {
      const item = cartList.value.find((item) => goods.skuId === item.skuId)
      if (item) {
        // 相同商品就在數量上 +1
        item.count++
      } else {
        // 沒有的話則會添加到數組中
        cartList.value.push(goods)
      }
    }

    const delCart = (skuId) => {
      // 1. 刪除項的下標 - splice
      // const idx = cartList.value.findIndex((item) => item.skuId === skuId)
      // cartList.value.splice(idx, 1)
      // 2. 使用數組過濾方法 - filter
      cartList.value = cartList.value.filter((item) => item.skuId !== skuId)
    }

    // 計算屬性
    // 1. 總數 所有項 count 和
    const allCount = computed(() => cartList.value.reduce((sum, item) => sum + item.count, 0))

    // 2. 總價 count * price
    const allPrice = computed(() =>
      cartList.value.reduce((total, product) => total + product.count * product.price, 0),
    )

    return {
      cartList,
      allCount,
      allPrice,
      addCart,
      delCart,
    }
  },
  {
    persist: true,
  },
)
