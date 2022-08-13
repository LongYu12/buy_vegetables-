<template>
  <div class="flex bg flex-col a-c j-c">
    <div @click="toR('/')" class="toRegister">登录</div>
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
        <el-form-item prop="password2">
          <el-input
            placeholder="请输入密码"
            type="password"
            @focus="focusPassword2 = true"
            @blur="focusPassword2 = false"
            v-model="ruleForm.password2"
          />
          <div
            class="border_bottom"
            :style="{ width: focusPassword2 ? '100%' : '' }"
          ></div>
        </el-form-item>
        <el-form-item prop="code">
          <div class="left_cell flex">
            <el-input
              placeholder="请输入手机验证码"
              type="text"
              @focus="focusCode = true"
              @blur="focusCode = false"
              v-model="ruleForm.code"
              style="width: 150px"
            />
            <div class="border_bottom" :style="{ width: focusCode ? '150px' : '' }"></div>
            <div class="get_code_btn" @click="sendCode">
              {{ isSendCode == 0 ? "发送验证码" : `重新发送${isSendCode}s` }}
            </div>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">注册</el-button>
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
import { vertifyPhone } from "../../utils/index";
const { $http } = (getCurrentInstance() as any).proxy;

const ruleFormRef = ref<FormInstance>();
// 表单数据
const ruleForm = reactive({
  phone: "13246117630",
  password: "123456",
  password2: "123456",
  code: "",
});
let getCode: string = ""; // 接收到的验证码
// 特效显示
const focusPhone = ref(false);
const focusPassword = ref(false);
const focusPassword2 = ref(false);
const focusCode = ref(false);

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("确认密码不能为空"));
  } else if (ruleForm.password2 != ruleForm.password) {
    callback(new Error("两个密码不一样"));
  } else {
    if (ruleForm.password2 !== "") {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("checkPass", () => null);
    }
    callback();
  }
};

// 表单验证规则
const rules = reactive<FormRules>({
  phone: [
    { required: true, message: "手机号不能为空", trigger: "blur" },
    { min: 11, max: 11, message: "请输入11位的手机号", trigger: "blur" },
  ],
  password: [
    { required: true, message: "密码不能为空", trigger: "blur" },
    { min: 6, max: 11, message: "请输入至少六位密码", trigger: "blur" },
  ],
  password2: [{ validator: validatePass, trigger: "blur" }],
  code: [{ required: true, message: "验证码不能为空", trigger: "blur" }],
});

const isSendCode = ref(0);

//函数===================

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid: boolean, fields: any) => {
    if (valid) {
      if (ruleForm.code.length == 0 || getCode != ruleForm.code) {
        ElMessage({
          message: "验证码错误",
          type: "error",
        });
        return;
      }
      if (isSendCode.value == 0) {
        ElMessage({
          message: "请重新获取验证码",
          type: "error",
        });
        return;
      }
      await $http.Register(ruleForm).then((res: any) => {
        console.log(res);
        if (res.code == 200) {
          localStorage.setItem("kuaishi_user", user.data);
          ElMessage({
            message: "注册成功",
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

// 路由跳转
import { useRouter } from "vue-router";
const Router = useRouter();
const toR = (str: string = "/") => {
  Router.push({ path: str });
};

// 发送验证码
let timer: any = null;
const sendCode = async () => {
  if (isSendCode.value > 0) return;
  if (!vertifyPhone(ruleForm.phone)) {
    ElMessage({
      message: "请输入正确的手机号",
      type: "error",
    });
    return;
  }

  await $http.sendCodeByPone({ phone: ruleForm.phone }).then((res: any) => {
    console.log(res);
    if (res.code == 200) {
      getCode = res.data.data;
      ElMessage({
        message: "发送成功",
        type: "success",
      });
      if (timer) {
        clearInterval(timer);
      }
      isSendCode.value = 60;
      timer = setInterval(() => {
        isSendCode.value--;
        if (isSendCode.value == 0) {
          clearInterval(timer);
        }
      }, 1000);
    } else {
      ElMessage({
        message: res.msg,
        type: "error",
      });
    }
  });
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
    background: url("../../assets/img/Register.png") center no-repeat;
    background-size: cover;
  }

  .login_cell {
    z-index: 11;
    width: 375px;
    height: 375px;
    padding: 20px 30px;
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
    left: 10px;
    top: 10px;
    color: @color;
    border: none;
    font-size: 20px;
    text-decoration: none;
  }
  .get_code_btn {
    border: 1px solid @color;
    width: 150px;
    position: absolute;
    right: 0;
    margin-top: -10px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin-left: 20px;
    border-radius: 20px;
    color: #fff;
    font-size: 18px;
    background-color: rgba(0, 0, 0, 0.1);
  }
}
</style>
