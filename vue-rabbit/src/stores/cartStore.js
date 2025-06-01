import { defineStore } from 'pinia'

import { ref, computed } from 'vue'

import { useUserStore } from '@/stores/userStore'

import { insertCartAPI, findNewCartListAPI, delCartAPI } from '@/apis/cart'

export const useCartStore = defineStore(
  'cart',
  () => {
    const UserStore = useUserStore()
    const islogin = computed(() => UserStore.userInfo.token)

    const cartList = ref([])

    // 獲取最新購物車列表
    const updateNewList = async () => {
      const res = await findNewCartListAPI()
      cartList.value = res.result
    }

    // 定義 action
    const addCart = async (goods) => {
      const { skuId, count } = goods

      if (islogin.value) {
        console.log('有登入')
        await insertCartAPI({ skuId, count })
        updateNewList()
      } else {
        console.log('未登入')
        const item = cartList.value.find((item) => goods.skuId === item.skuId)
        if (item) {
          // 相同商品就在數量上 +1
          item.count++
        } else {
          // 沒有的話則會添加到數組中
          cartList.value.push(goods)
        }
      }
    }

    const delCart = async (skuId) => {
      // 1. 刪除項的下標 - splice
      // const idx = cartList.value.findIndex((item) => item.skuId === skuId)
      // cartList.value.splice(idx, 1)
      // 2. 使用數組過濾方法 - filter

      if (islogin.value) {
        await delCartAPI([skuId])
        updateNewList()
      } else {
        cartList.value = cartList.value.filter((item) => item.skuId !== skuId)
      }
    }

    // 清除購物車
    const clearCart = () => {
      cartList.value = []
    }

    // 全選功能
    const checkAll = (selected) => {
      // CartList中的每一項 selected 設置為當前全選框狀態
      cartList.value.forEach((item) => (item.selected = selected))
    }

    // 計算屬性
    // 1. 總數 所有項 count 和
    const allCount = computed(() => cartList.value.reduce((sum, item) => sum + item.count, 0))

    // 2. 總價 count * price
    const allPrice = computed(() =>
      cartList.value.reduce((total, product) => total + product.count * product.price, 0),
    )

    // 3. 選擇數量計算
    const selectedCount = computed(() =>
      cartList.value.filter((item) => item.selected).reduce((sum, item) => sum + item.count, 0),
    )

    // 4. 已選擇商品總價
    const selectedPrice = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((total, product) => total + product.count * product.price, 0),
    )

    // 單選功能
    const singleCheck = (skuId, selected) => {
      const item = cartList.value.find((item) => item.skuId === skuId)
      item.selected = selected
    }

    // 是否全選
    const isAll = computed(() => cartList.value.every((item) => item.selected))

    // const isAll = computed(() => {
    //   if (cartList.value.length === 0) return false // 空購物車時不顯示全選
    //   return cartList.value.every((item) => item.selected)
    // })

    return {
      cartList,
      allCount,
      allPrice,
      isAll,
      addCart,
      delCart,
      singleCheck,
      clearCart,
      checkAll,
      updateNewList,
      selectedCount,
      selectedPrice,
    }
  },
  {
    persist: true,
  },
)
