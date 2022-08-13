<template>
  <div class="cell">
    <div class="search_cell flex a-c j-c">
      <input class="search_input" placeholder="请输入关键词" />
      <button class="search_btn">搜索</button>
    </div>
    <div class="list_cell" v-if="true">
      <div class="goods_item flex">
        <img src="../../assets/img/meat.png" v-onerror alt="" class="cover" />
        <div class="info">
          <p class="name">
            你的名字你的名字你的名字你的名字你的名字你的名字你的名字你的名字
          </p>
          <p class="sales">销量</p>
          <p class="price">￥100元</p>
        </div>
      </div>
    </div>
    <div class="noData flex a-c j-c flex-wrap" v-if="false">
      <img src="../../assets/img/boBasket.png" alt="" />
      <p>~小菜没找到可观想要的菜~</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity";
const searchKey = ref("");
</script>

<style scoped lang="less">
.search_cell {
  height: 50px;
  width: 100%;
  padding: 0 0px 0 10px;
  background-color: #e5f3ef;
  box-shadow: 0 1px rgba(38, 158, 124, 0.5);
  .search_input {
    border: none;
    outline: none;
    width: calc(100vw - 40px);
    height: 28px;
    border-radius: 15px;
    padding-left: 10px;
  }
  .search_btn {
    outline: none;
    border: none;
    width: 50px;
    text-align: center;
    background: transparent;
  }
}
.list_cell {
  height: calc(100vh - 90px);
  background: #eee;
  box-sizing: border-box;
  overflow-x: hidden;
  padding: 10px;
}
.goods_item {
  padding: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.904);
  border-radius: 10px;
  box-shadow: 0 0 20px #e5f3ef;
  .cover {
    flex: 1;
    height: 120px;
    border-radius: 10px;
  }
  .info {
    flex: 3;
    padding: 5px 10px;
    .name {
      font-size: 16px;
      height: 45px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .sales {
      font-size: 12px;
      color: #aaa;
      height: 24px;
      margin-top: 20px;
    }
    .price {
      color: rgb(228, 2, 2);
    }
  }
}

.noData {
  width: 100%;
  height: calc(100vh - 90px);
  img {
    width: 80%;
    height: 80vw;
  }
  p {
    color: #999;
  }
}
</style>
