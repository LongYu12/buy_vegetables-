<template>
  <div class="classfy cell flex" v-if="list">
    <div class="left">
      <div
        :class="['classfy_item flex', index == active ? 'active' : '']"
        v-for="(item, index) in list"
        :key="item['tagId']"
        @click="
          active = index;
          children = item['children'];
        "
      >
        <p>{{ item["name"] }}</p>
        <img :src="getImg(item['icon'])" alt="" v-onerror />
      </div>
    </div>
    <div class="right flex flex-col a-c">
      <div
        class="child_item"
        v-for="item in children"
        :key="item['tagId']"
        @click="searchByTag(item['tagId'])"
      >
        <img src="" alt="" v-onerror />
        <p>{{ item["name"] }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs } from "@vue/reactivity";
import { getCurrentInstance } from "vue";
import { getImg } from "../../utils/gerImg";
import { useRoute } from "vue-router";
const { $http } = (getCurrentInstance() as any).proxy;
const Route = useRoute();

let id: string = "";
if ("id" in Route.query) {
  id = Route.query.id == null ? "" : Route.query.id;
}

const data = reactive({
  list: [],
});

const list = reactive([]);

const active = ref(0);

const children = reactive([]);

const getClassfy = () => {
  $http.getClassfy({}).then((res: any) => {
    if (res.code == 200) {
      list.push(...res.data);
      if (id.length) {
        list.forEach((item, index) => {
          if (item.tagId == id) {
            active.value = index;
          }
        });
      }
      children.push(...res.data[active.value].children);
    }
  });
};
getClassfy();

const searchByTag = (id) => {
  console.log(id);
};
</script>

<style scoped lang="less">
.left {
  width: 70px;
  height: 100%;
  background-color: @bg;
  box-shadow: 0 0 10px #ccc;
  .classfy_item {
    width: 80px;
    height: 60px;
    padding: 5px;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    z-index: 11;
    position: relative;
    overflow: hidden;
    transition: width 0.1s;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      margin: 5px 5px 5px 10px;
    }
    p {
      width: 48px;
      height: 50px;
      font-size: 18px;
      line-height: 50px;
      text-align: center;
      color: #eee;
      display: none;
    }
  }
  .active {
    background-color: #40a070;
    width: 110px;
    p {
      display: block;
    }
  }
}

.right {
  background-color: @bg;
  width: calc(100vw - 70px);
  height: 100%;
  .child_item {
    width: 60%;
    height: 30%;
    padding: 20px;
    border-bottom: 1px solid #40a070;
    img {
      width: 100%;
      height: 90%;
    }
    p {
      width: 100%;
      text-align: center;
    }
  }
}
</style>
