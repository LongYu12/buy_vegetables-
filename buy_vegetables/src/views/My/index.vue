<template>
  <div class="cell">
    <img src="../../assets/img/myBg.png" class="myBg" alt="" />
    <div class="my_cell">
      <div class="user_head_cell flex j-c">
        <img
          class="head_img"
          src="../../assets/img/gua.png"
          alt=""
          v-onerror="'boBasket.png'"
        />
      </div>
      <div class="info_cell flex j-b">
        <div class="info_item flex flex-col a-c j-a">
          <el-icon class="icon"><document /></el-icon>
          <p>所有订单</p>
        </div>
        <div class="info_item flex flex-col a-c j-a">
          <el-badge :value="12" class="flex flex-col a-c j-">
            <el-icon class="icon"><promotion /></el-icon>
            <p>配送中</p>
          </el-badge>
        </div>
        <div class="info_item flex flex-col a-c j-a">
          <el-badge :value="12" class="flex flex-col a-c j-">
            <el-icon class="icon"><home-filled /></el-icon>
            <p>待收</p>
          </el-badge>
        </div>
      </div>
      <div class="other_cell">
        <div class="other flex a-c">
          <div class="left flex a-c">
            <el-icon style="margin-right: 10px"><avatar /></el-icon>
            个人信息
          </div>
          <el-icon class="right"><arrow-right /></el-icon>
        </div>
        <div class="other flex a-c">
          <div class="left flex a-c">
            <el-icon style="margin-right: 10px"><bell-filled /></el-icon>
            反馈
          </div>
          <el-icon class="right"><arrow-right /></el-icon>
        </div>
        <div class="other flex a-c" @click="toAdress()">
          <div class="left flex a-c">
            <el-icon style="margin-right: 10px"><location-filled /></el-icon>
            收获地址
          </div>
          <el-icon class="right"><arrow-right /></el-icon>
        </div>
        <div class="other flex a-c" @click="toLogin()">
          <div class="left flex a-c">
            <el-icon style="margin-right: 10px"><bicycle /></el-icon>
            退出登录
          </div>
          <el-icon class="right"><arrow-right /></el-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { getCurrentInstance, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ElMessage, ElNotification } from "element-plus";

const { proxy } = getCurrentInstance() as any;
const Router = useRouter();
const toLogin = () => {
  console.log("你好");

  localStorage.removeItem("kuaishi_user");
  localStorage.removeItem("kuaishi");

  ElMessage({
    message: "退出成功",
    type: "success",
  });
  setTimeout(() => {
    Router.push({ path: "/" });
  }, 1000);
};
const toAdress = () => {
  Router.push({ path: "/mian/Adress" });
};
</script>

<style scoped lang="less">
.myBg {
  width: 100%;
  height: 200px;
}
.my_cell {
  width: 100%;
  height: calc(100vh - 210px);
  background-color: #fff;
  position: fixed;
  top: 150px;
  box-shadow: 0 0 15px rgba(0, 117, 52, 0.5);
}

.user_head_cell {
  position: relative;
  height: 150px;
  .head_img {
    position: absolute;
    width: 80px;
    background: #fff;
    height: 80px;
    margin-top: -40px;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 0 15px rgba(0, 117, 52, 0.5);
  }
}
.info_cell {
  height: 100%;
  width: 100%;
  position: absolute;
  margin-top: -80px;
  padding: 0 20px;
  color: rgba(0, 117, 52, 0.5);
  .info_item {
    flex: 1;
    height: 60px;
    font-size: 14px;
    .icon {
      font-size: 30px;
    }
  }
}
.other_cell {
  padding: 20px;
  .other {
    width: 100%;
    height: 40px;
    padding: 0 10px;
    color: rgba(0, 117, 52, 0.5);
    border-bottom: 1px solid rgba(0, 117, 52, 0.5);
    .left {
      flex: 1;
    }
    .right {
      flex: 1;
      justify-content: flex-end;
    }
  }
}
</style>
