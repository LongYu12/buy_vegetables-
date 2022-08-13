<template>
  <div class="flex bg flex-col a-c j-c">
    <div @click="toR()" class="toRegister">注册</div>
    <div class="login_cell">
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="0">
        <el-form-item prop="phone">
          <el-input
            placeholder="请输入手机号"
            type="text"
            @focus="focusPhone = true"
            @blur="focusPhone = false"
            v-model="ruleForm.phone"
          />
          <div class="border_bottom" :style="{ width: focusPhone ? '100%' : '' }"></div>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            type="password"
            @focus="focusPassword = true"
            @blur="focusPassword = false"
            v-model="ruleForm.password"
          />
          <div
            class="border_bottom"
            :style="{ width: focusPassword ? '100%' : '' }"
          ></div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
          <!-- <button class="submit" @click="submitForm(ruleFormRef)">登录</button> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "@vue/reactivity";
import type { FormInstance, FormRules } from "element-plus";
import { getCurrentInstance } from "vue";
import { ElMessage, ElNotification } from "element-plus";
import { useRouter } from "vue-router";
const { $http } = (getCurrentInstance() as any).proxy;

const ruleFormRef = ref<FormInstance>();

const ruleForm = reactive({
  phone: "13246117630",
  password: "123456",
});

const focusPhone = ref(false);
const focusPassword = ref(false);
const rules = reactive<FormRules>({
  phone: [
    { required: true, message: "手机号不能为空", trigger: "blur" },
    { min: 11, max: 11, message: "请输入11位的手机号", trigger: "blur" },
  ],
  password: [
    { required: true, message: "手机号不能为空", trigger: "blur" },
    { min: 6, max: 11, message: "请输入至少六位密码", trigger: "blur" },
  ],
});
const t = reactive<any>({
  a:{
    b:'jiji'
  }
})

//
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid: boolean, fields: any) => {
    if (valid) {
      await $http.Login(ruleForm).then((res: any) => {
        console.log(res);
        if (res.code == 200) {
          localStorage.setItem("kuaishi_user", res.data);
          ElMessage({
            message: "登录成功",
            type: "success",
          });
          setTimeout(() => {
            toR("/mian/Home");
          }, 1000);
        } else {
          ElMessage({
            message: res.msg,
            type: "error",
          });
        }
      });
    } else {
      console.log("error submit!", fields);
    }
  });
};

const Router = useRouter();
const toR = (path = "/Register") => {
  Router.push({ path: path });
};
</script>

<style scoped lang="less">
.bg {
  width: 100%;
  height: 100%;
  // background: url("../../assets/img/LoginBg.png") center no-repeat;
  // background-size: cover;
  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 0;
    background: url("../../assets/img/LoginBg.png") center no-repeat;
    background-size: cover;
  }

  .login_cell {
    z-index: 11;
    width: 375px;
    height: 375px;
    padding: 20px 30px;
    margin-top: 100px;
    ::v-deep .el-input__inner {
      background-color: transparent;
      border: none;
      border-bottom: 1px solid @color;
      padding: 0;
      box-shadow: none;
      border-radius: 0;
      position: relative;
      font-size: 20px;
    }
    ::v-deep .el-form-item.is-error .el-input__inner,
    .el-form-item.is-error .el-input__inner:focus,
    .el-form-item.is-error .el-select-v2__wrapper,
    .el-form-item.is-error .el-select-v2__wrapper:focus,
    .el-form-item.is-error .el-textarea__inner,
    .el-form-item.is-error .el-textarea__inner:focus {
      border: none;
      border-bottom: 1px solid #f56c6c;
      box-shadow: none;
    }
    .el-form-item {
      position: relative;
    }
    .border_bottom {
      width: 0;
      transition: all 1s;
      height: 1px;
      background-color: rgb(48, 204, 10);
      position: absolute;
      left: 0;
      bottom: 0;
      box-shadow: 0 0px 0 rgb(3, 214, 38);
    }
    .el-form-item:focus .border_bottom {
      width: 100%;
    }
    ::v-deep.el-input__inner:focus {
      outline: 0;
      box-shadow: none !important;
    }
    .el-form-item {
      margin: 30px 0;
    }
    ::v-deep .el-button--primary {
      background-color: transparent;
      width: 100%;
      height: 39px;
      color: @color;
      font-size: 20px;
      font-weight: bold;
      letter-spacing: 25px;
      margin-top: 20px;
      border: 1px solid @color;
    }
  }
  .toRegister {
    position: absolute;
    right: 10px;
    top: 10px;
    color: #fff;
    border: none;
    font-size: 20px;
    text-decoration: none;
  }
}
</style>
