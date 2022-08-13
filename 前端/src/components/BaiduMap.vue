<template>
  <div class="cell">
    <div id="container"></div>
    <div class="rignt_btn" @click="getAddress()">确定</div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "@vue/reactivity";
// import { defineProps } from "vue";
import { getCurrentInstance, onMounted } from "vue"; // 引入全局
// 接收父组件传递的值
const props = defineProps({
  map: {
    type: String,
    default: "",
  },
});
console.log(props.map);
// 返回给父组件
const $emit = defineEmits(["position"]);

let map: BMapGL.Map;
onMounted(() => {
  map = new BMapGL.Map("container");
  // 创建地图实例
  let point = new BMapGL.Point(116.404, 39.915);
  let scaleCtrl = new BMapGL.ScaleControl(); // 添加比例尺控件
  map.addControl(scaleCtrl);
  let zoomCtrl = new BMapGL.ZoomControl(); // 添加缩放控件
  map.addControl(zoomCtrl);
  let cityCtrl = new BMapGL.CityListControl(); // 添加城市列表控件
  map.addControl(cityCtrl);
  // 定位
  let LocationCtr = new BMapGL.LocationControl(); // 启用鼠标滚轮缩放
  map.addControl(LocationCtr);
  map.enableScrollWheelZoom();
  // 创建点坐标
  map.centerAndZoom(point, 18);
  // https://mapopen-pub-jsapi.bj.bcebos.com/jsapi/reference/jsapi_webgl_1_0.html#a8b40
  // new BMapGL.Marker(point);
  //获取当前位置
  let geolocation = new BMapGL.Geolocation();
  geolocation.getCurrentPosition(function (r: GeolocationResult) {
    if (this.getStatus() == BMAP_STATUS_SUCCESS) {
      let marker = new BMapGL.Marker(r.point, {
        enableDragging: true,
      });
      map.addEventListener("dragend", function (e) {
        // 地图移动，他页移动
        marker.setPosition(map.getCenter());
      });
      map.addEventListener("moveend", function (e) {
        // 地图移动，他页移动
        marker.setPosition(map.getCenter());
      });
      console.log(r.point);

      map.panTo(r.point); // 将中心点移动到用户当前位置
      map.addOverlay(marker);
    } else {
      alert("failed" + this.getStatus());
    }
  });
});
//获取地址信息，设置地址label
function getAddress() {
  let point = map.getCenter();
  let gc = new BMapGL.Geocoder();
  gc.getLocation(point, function (rs) {
    let addComp = rs.addressComponents;
    let address =
      addComp.province +
      addComp.city +
      addComp.district +
      addComp.street +
      addComp.streetNumber; //获取地址
    // console.log(address);
    $emit("position", { address }); //返回给父组件
  });
}
</script>

<style scoped lang="less">
.cell {
  position: fixed;
  top: 0;
  z-index: 11;
}
#container {
  height: 100vh;
  width: 100vw;
}
.rignt_btn {
  position: fixed;
  right: 10px;
  width: 50px;
  height: 40px;
  z-index: 11;
  top: 10px;
  text-align: center;
  line-height: 40px;
  background: #0e8b94;
  color: #fff;
  border-radius: 5px;
}
</style>
