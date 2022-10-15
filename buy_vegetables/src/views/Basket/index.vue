<template>
  <div class="cell">
    <div class="content_cell">
      <div class="list">
        <div class="list_item flex" v-for="item of 10" :key="item" @click="selectVe">
          <el-icon class="close" @click.stop="dialogVisible = true"
            ><close-bold
          /></el-icon>
          <img src="../../assets/img/select.png" class="selected" alt="" />
          <img src="../../assets/img/0.png" class="cover" alt="" />
          <div class="info">
            <div class="name">gua</div>
            <div class="num flex j-b a-c">
              <p class="money">￥100元</p>
              <div class="op_cell flex">
                <div class="add" @click.stop="changeNum(-1)">-</div>
                <div class="numTxt">1</div>
                <div class="add" @click.stop="changeNum(1)">+</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="settlement flex j-b a-c">
        <div class="settlement_item totle">总数：10</div>
        <div class="settlement_item totle">总金额：100</div>
        <div class="settlement_item btn">结算</div>
      </div>
    </div>
    <!-- 无数据 -->
    <div class="noData flex a-c j-c flex-wrap" v-if="false">
      <img src="../../assets/img/boBasket.png" alt="" />
      <p>~小菜蓝空空如也~</p>
    </div>

    <el-dialog v-model="dialogVisible" title="提示" width="80%">
      <p style="text-align: center; font-size: 24px">确定删除该菜品？</p>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity";

const dialogVisible = ref(false);

const changeNum = (num: number) => {
  console.log(num);
};
const selectVe = () => {};
</script>

<style scoped lang="less">
.cell {
  width: 100%;
  height: inherit;
  padding: 10px;
}
.noData {
  width: 100%;
  height: inherit;
  background: @bg;
  img {
    width: 80%;
    height: 80vw;
  }
  p {
    color: #999;
  }
}

.list {
  padding-bottom: 100px;
}
.list_item {
  padding: 10px;
  margin-bottom: 10px;
  background: @bg;
  border-radius: 5px;
  position: relative;
  .close {
    position: absolute;
    right: 10px;
    top: 10px;
    color: #555;
  }
  .cover {
    width: 100px;
    height: 75px;
  }
  .info {
    width: calc(100vw - 150px);
    height: 75px;
    padding: 5px 10px;
    .name {
      width: 100%;
      height: 40px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      color: #40a070;
      font-size: 15px;
      font-weight: bold;
    }
    .num {
      height: 30px;
      width: calc(100vw - 140px);
      font-size: 14px;
    }
    .money {
      color: #d61515;
    }
    .op_cell {
      width: 100px;
      height: 20px;
      font-size: 18px;
      position: relative;
      margin-right: -10px;
      color: #40a070;
      .add {
        height: 20px;
        line-height: 18px;
        width: 30px;
        border: 1px solid #40a070;
        border-radius: 5px;
        text-align: center;
        font-size: 25px;
      }
      .numTxt {
        min-width: 20px;
        text-align: center;
      }
    }
  }
}

.selected {
  position: absolute;
  width: 30px;
  height: 30px;
  left: -5px;
  top: -5px;
  padding: 2px;
  border-radius: 50%;
  background: #fff;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}

.settlement {
  position: fixed;
  width: 100%;
  height: 50px;
  background-color: rgba(64, 160, 112, 0.8);
  bottom: 60px;
  left: 0;
  .settlement_item {
    flex: 1;
    height: 100%;
    line-height: 50px;
    text-align: center;
    color: #fff;
    border-right: 1px solid #eee;
  }
  .btn {
    border: none;
    letter-spacing: 5px;
    background-color: #40a070;
  }
}
</style>
