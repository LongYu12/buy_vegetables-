<template>
  <div class="cell">
    <!-- 偶所按钮 -->
    <el-icon class="search_btn" @click="toSearch">
      <search />
    </el-icon>
    <!-- 轮播图 -->
    <el-carousel height="56.25vw" :autoplay="true" :interval="3000" arrow="always">
      <el-carousel-item v-for="(val, index) in menus" :key="index">
        <img src="../../assets/img/LoginBg.png" alt="" />
      </el-carousel-item>
    </el-carousel>
    <!-- 分类 -->
    <div class="classfy_cell flex j-a a-c" ref="classfy">
      <div
        class="classfy_item flex flex-col a-c j-c"
        v-for="item in menus"
        :key="item['name']"
        @click="toClassFy(item['tagId'])"
      >
        <img :src="getImg(item['icon'])" alt="" />
        <p class="classfy_name">
          {{ item["name"].substr(0, 1) }}
        </p>
      </div>
    </div>
    <!-- 商品列表 -->
    <div class="commodity" v-if="commodity.length" v-infinite-scroll="load">
      <div
        class="commodity_item flex flex-col"
        v-for="item in commodity"
        :key="item['name'] + 'ss'"
      >
        <img :src="item['cover']" alt="" v-onerror />
        <div class="content">
          <p class="name">
            {{
              item["name"]["length"] > 16
                ? item["name"].slice(0, 15) + "..."
                : item["name"]
            }}
          </p>
          <div class="saleses">销量：{{ "10" }}</div>
          <div class="flex num">
            <div class="money">￥{{ "90.9" }}</div>
            <div class="old_money">原价: {{ item["price"] }}</div>
            <div class="discount">{{ item["discount"] * 10 * 10 }}折</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, toRef } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { getImg } from "../../utils/gerImg";
import { getCurrentInstance, onMounted, nextTick } from "vue";
const { $http } = (getCurrentInstance() as any).proxy;

const Router = useRouter();

const toSearch = () => {
  Router.push({
    path: "/mian/Search",
  });
};

const toClassFy = (id: string) => {
  console.log(id);

  Router.push({
    path: "/mian/Classfy",
    query: {
      id: id,
    },
  });
};

const menus = reactive([]);

const getClassfy = () => {
  $http.getClassfy({}).then((res) => {
    if (res.code == 200) {
      menus.push(...res.data.slice(0, 4));
      menus.push({
        name: "更多",
        icon: "more",
      });
    }
  });
};

let params = {
  page: 1,
  limit: 2,
  count: 0,
};
const commodity = reactive([]);
const getDiscount = async () => {
  await $http.getCommodityByDiscount(params).then((res) => {
    if (res.code == 200) {
      console.log(res);
      commodity.push(...res.data.data);
      params.count = res.data.count;
    } else {
      ElMessage({
        message: res.msg,
        type: "error",
      });
    }
  });
};

// 加载更多
const load = () => {
  if (commodity.length == 0) return;
  if (Math.ceil(params.count / params.limit) > params.page) {
    params.page++;
    getDiscount();
  }
};
onMounted(() => {
  getClassfy();
  getDiscount();
});
</script>

<style scoped lang="less">
.el-carousel__item img {
  color: #475669;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.search_btn {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  color: #999;
}

.classfy_cell {
  height: 70px;
  border-bottom: 1px dotted #ccc;
  .classfy_item {
    flex: 1;
    position: relative;
    background: transparent;
    img {
      border-radius: 50%;
      width: 50px;
      height: 50px;
    }
    .classfy_name {
      font-size: 20px;
      font-weight: bold;
      font-family: "Franklin Gothic Medium";
      position: absolute;
      color: rgba(255, 255, 255, 0.781);
      width: 50px;
      height: 50px;
      padding: 0;
      text-align: center;
      line-height: 50px;
      border-radius: 50%;
      overflow: hidden;
      background: rgba(0, 0, 0, 0.2);
    }
    &:nth-last-child(1) {
      .classfy_name {
        display: none;
      }
    }
  }
}

// 商品
.commodity {
  column-count: 2;
  column-gap: 20px;
  row-gap: 10px;
  padding: 15px;
  background: transparent;
  .commodity_item {
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
    break-inside: avoid;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    img {
      width: 100%;
      min-height: 110px;
    }
    .content {
      background: #fff;
      padding: 10px;
      border-bottom-right-radius: 10px;
      border-bottom-left-radius: 10px;
      .name {
        font-size: 16px;
        line-height: 22px;
        letter-spacing: 1px;
        text-overflow: ellipsis;
        max-height: 45px;
        word-wrap: break-word;
        overflow: hidden;
      }
      .saleses {
        font-size: 12px;
        margin-top: 5px;
        color: #666;
        background: transparent;
      }
      .num {
        background-color: transparent;
        margin-top: 5px;
        position: relative;
        .money {
          color: #ee3f4d;
        }
        .old_money {
          font-size: 12px;
          padding-top: 4px;
          transform: scale(0.8);
          color: #666;
          text-decoration: line-through;
        }
        .discount {
          color: #ee3f4d;
          border: 1px solid #ee3f4d;
          font-size: 12px;
          line-height: 12px;
          height: 16px;
          padding: 1px;
          letter-spacing: 1px;
          position: absolute;
          right: 0;
          margin-top: 1px;
        }
      }
    }
  }
}
</style>
