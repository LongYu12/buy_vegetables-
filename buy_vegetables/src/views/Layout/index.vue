<template>
  <el-container>
    <el-header>
      <div class="top">
        <div class="goBack" v-if="mata.isSub" @click="back">
          <el-icon><arrow-left-bold /></el-icon>
        </div>
        <p class="title">{{ mata.title }}</p>
      </div>
    </el-header>
    <el-main :class="[mata.isSub ? 'el-main-sub' : '']">
      <!-- <router-view></router-view> -->
      <router-view v-slot="{ Component }">
        <transition :name="mata.isSub ? 'lefttr' : 'righttr'">
          <component :is="Component" />
        </transition>
      </router-view>
    </el-main>
    <el-footer v-if="!mata.isSub">
      <router-link to="/mian/Home">
        <el-icon><home-filled style="width: 24px; height: 24px" /></el-icon>
        <p>首页</p>
      </router-link>
      <router-link to="/mian/Classfy">
        <el-icon><grid style="width: 24px; height: 24px" /></el-icon>
        <p>分类</p>
      </router-link>
      <router-link to="/mian/Basket">
        <el-icon><briefcase style="width: 24px; height: 24px" /></el-icon>
        <p>小菜篮</p>
      </router-link>
      <router-link to="/mian/My">
        <el-icon><avatar style="width: 24px; height: 24px" /></el-icon>
        <p>我的</p>
      </router-link>
    </el-footer>
  </el-container>
</template>

<script setup lang="ts">
import { reactive, ref } from "@vue/reactivity";
import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";
const Route = useRoute();
const Router = useRouter();

const back = () => {
  Router.go(-1);
};

const mata = reactive(Route.meta);
watch(Route, (to, from) => {
  mata.title = to.meta.title;
  mata.isSub = to.meta.isSub;
});
</script>

<style scoped lang="less">
.top {
  width: 100%;
  height: 40px;
  position: relative;
  // background-color: rebeccapurple;
  .goBack {
    position: absolute;
    left: 10px;
    top: 10px;
    color: #666;
    font-size: 20px;
  }
  .title {
    width: 100%;
    height: 100%;
    color: #000;
    letter-spacing: 2px;
    text-align: center;
    line-height: 40px;
  }
}
.righttr-enter-active {
  animation: right-in-enter 1s;
}
.lefttr-enter-active {
  animation: left-in-enter 0.5s;
}
.righttr-leave-active,
.lefttr-leave-active {
  display: none;
}
@keyframes right-in-enter {
  0% {
    transform: translateX(50%);
    opacity: 0;
    position: relative;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
    position: relative;
  }
}
@keyframes left-in-enter {
  from {
    transform: translateX(-50%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
.el-header {
  padding: 0;
  margin: 0;
  box-shadow: 0 -2px 10px rgba(204, 204, 204, 0.932);
  background: rgba(0, 141, 94, 0.1);
  overflow: hidden;
  height: 40px;
}
.el-main {
  height: calc(100vh - 100px);
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0;
  transition: all 0.5s;
  background: @bg;
}
.el-main-sub {
  height: calc(100vh - 40px);
}
.el-footer {
  height: 60px;
  overflow: hidden;
  width: 100%;
  border-top: 1px solid #ccc;
  box-shadow: 0 -2px 10px rgba(204, 204, 204, 0.932);
  display: flex;
  padding: 0;
  background-color: @bg;
  z-index: 11111;
}

a {
  flex: 1;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #ccc;
  text-decoration: none;
  color: @color;
  p {
    width: 100%;
    height: 30px;
    text-align: center;
    padding: 0;
    font-size: 16px;
  }
  .el-icon {
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding: 0;
    text-align: center;
    font-size: 20px;
  }
}
.router-link-active:nth-last-child(1) {
  border: none;
}
.router-link-exact-active {
  color: rgb(0, 141, 94);
}
</style>
