<script setup>
import { onMounted, ref } from 'vue'
import { getCategoryFilterAPI, getSubCategoryAPI } from '@/apis/category'
import { useRoute } from 'vue-router'
import GoodsItem from '@/views/Home/components/GoodsItem.vue'

const route = useRoute()

const categoryData = ref({})

const getCategoryData = async () => {
  const res = await getCategoryFilterAPI(route.params.id)
  categoryData.value = res.result
}

onMounted(() => {
  getCategoryData()
})

// 獲取基礎列表渲染數據
const goodList = ref([])

const reqData = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime',
})

// 獲取分類商品列表數據
const getGoodList = async () => {
  const res = await getSubCategoryAPI(reqData.value)
  // console.log(res)
  goodList.value = res.result.items
}

onMounted(() => {
  getGoodList()
})

// tab 切換回調
const tabChange = () => {
  console.log(reqData.value.sortField)
  reqData.value.page = 1
  getGoodList()
}

// 加載更多
const disable = ref(false)
const load = async () => {
  console.log('加載更多數據')
  // 獲取下一頁數據
  reqData.value.page++

  const res = await getSubCategoryAPI(reqData.value)
  // ... 是JavaScript中的擴展運算符（spread operator），用於展開數處或對象
  goodList.value = [...goodList.value, ...res.result.items]

  console.log(goodList.value)

  // 加載完畢 停止監聽
  if (res.result.items.length === 0) {
    disable.value = true
  }
}
</script>

<template>
  <div class="container">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${categoryData.parentId}` }"
          >{{ categoryData.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
        <!-- <el-tabs> -->
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disable">
        <!-- <div class="body"> -->
        <!-- 商品列表-->
        <GoodsItem v-for="goods in goodList" :goods="goods" :key="goods.id" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
