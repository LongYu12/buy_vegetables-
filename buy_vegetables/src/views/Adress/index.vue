<template>
  <div>
    <!-- 地图 -->
    <BaiduMap v-if="showMap" map="我要定位" @position="getposition" />
    <!-- 新增、修改 -->
    <div class="flex newAdress_cell" v-show="showAddInput">
      <input
        type="text"
        class="newAdress"
        ref="newAdressRef"
        id="RR"
        placeholder="请输入地址"
        v-model="newAdress"
      />
      <el-icon
        class="position"
        @click="
          showMap = true;
          showAddInput = false;
        "
        ><location-filled
      /></el-icon>
      <button class="add" @click="addNewAdress">确定</button>
    </div>
    <!-- 已有地址列表 -->
    <div class="list">
      <div class="list_item">
        <div class="top flex">
          <div class="adress_">
            二仙桥二仙桥二仙桥二仙桥二仙桥二仙桥二仙桥二仙桥二仙桥二仙桥二仙桥二仙桥二仙桥二仙桥
          </div>
          <el-icon class="edit"><edit-pen /></el-icon>
        </div>
        <div class="bottom flex j-b">
          <div class="time">2020-10-20</div>
          <button class="delete_btn">删除</button>
        </div>
      </div>
    </div>
    <button class="add_before_btn flex a-c j-c" @click="openNewAdressInpput">
      <el-icon class="plus"><plus /></el-icon>添加
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, provide, reactive } from "@vue/reactivity";
import BaiduMap from "../../components/BaiduMap.vue";
import { getCurrentInstance, onMounted } from "vue";
const { proxy } = getCurrentInstance() as any;
const showMap = ref(false); // 是否显示定位地图
const newAdress = ref("ss"); // 新增的地址
const showAddInput = ref(false); // 是否显示输入新地址框
const newAdressRef = ref("");
const getposition = (data) => {
  console.log("获取地址", data.address);
  newAdress.value = data.address;
  showMap.value = false;
  showAddInput.value = true;
};
// 添加新地址
const addNewAdress = () => {
  showAddInput.value = false;
};
const openNewAdressInpput = () => {
  newAdress.value = "";
  setTimeout(() => {
    newAdressRef.value.focus();
  }, 500);
  showAddInput.value = true;
  console.log(proxy);
};

const getMM = () => {
let i = 'tijiao '
}

const newm = '你好'
</script>

<style scoped lang="less">
.newAdress_cell {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 10px;
  position: fixed;
  top: 0;
  z-index: 11;
  .newAdress {
    height: 40px;
    width: 80%;
    padding-left: 10px;
    border-radius: 5px;
    padding-right: 40px;
    outline: none;
    border: 1px solid #40a070;
  }
  .position {
    position: absolute;
    left: 80%;
    margin-left: -35px;
    font-size: 24px;
    top: 15px;
    color: #40a070;
  }
  .add {
    width: 18%;
    height: 40px;
    margin-left: 10px;
    background-color: #40a070;
    border: none;
    border-radius: 5px;
    color: #fff;
  }
}

.list {
  padding: 10px;
  height: calc(100vh - 90px);
  .list_item {
    width: 100%;
    position: relative;
    background-color: #fff;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 0 10px @bg;
    .top {
      border-bottom: 1px solid #ddd;
      padding-bottom: 20px;
      .adress_ {
        width: 100%;
        height: 40px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-clamp: 2;
        text-overflow: ellipsis;
      }
      .edit {
        width: 40px;
        font-size: 20px;
      }
    }
    .bottom {
      height: 25px;
      .time {
        font-size: 12px;
        padding-top: 8px;
      }
      .delete_btn {
        width: 30px;
        font-size: 12px;
        border: none;
        color: red;
        background-color: transparent;
        margin-right: 5px;
        margin-top: 8px;
      }
    }
  }
}
.add_before_btn {
  width: 100%;
  height: 50px;
  border: none;
  background-color: #40a070;
  color: #fff;
  font-size: 18px;
  .plus {
    font-size: 20px;
  }
}
</style>
