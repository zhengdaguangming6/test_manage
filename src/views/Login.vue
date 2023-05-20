<template>
  <div class="main">
    <div class="loginBox">

      <h3 class="title">测试管理平台</h3>

      <el-form :model="userForm" :rules="userRules" ref="userForm">
<!--        :model="userForm" 表示双向绑定的数据， :rules="userRules" 数据校验的规则  -->
<!--        只要userRules里面的字段和userForm的字段一致，那么该字段就按照对应的规则进行校验-->
        <el-form-item prop="username" style="margin-top: 24px;" :error="userFormError.username">
<!--          prop="username" 跟username的规则关联着，一旦校验没通过，错误信息就会显示在这个位置-->
<!--          :error="userFormError.username" 如果有错误信息，就会把错误信息显示到这里-->
          <el-input v-model="userForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password" :error="userFormError.password">
          <el-input v-model="userForm.password" placeholder="密码" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="submitForm('userForm')" type="primary" size="medium">登 录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      userForm: {
        username: "",
        password: ""
      },
      userFormError: {
        username: "",
        password: ""
      },
      userRules: {
        username: [
            // required： 必须的  trigger:'blur' 表示只要光标移除就进行校验
          {required: true, message: '请输入用户名', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
        ],
      },

    }
  },
  methods: {
    submitForm(formName) {
      // 清空原来的错误
      this.clearCustomFormError();

      // 执行验证规则
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          //console.log("验证未通过");
          return false;
        }
        // console.log("验证通过");
        // 验证通过，向后端的API发送请求
        this.axios.post("/user/auth/", this.userForm).then(res => {
          // res.data = {code:1000, detail:"...."}
          // res.data = {code:0, detail:"....", data:{ username:"用户名", token:"jwt"}}
          if (res.data.code === 1) {
            // 登录成功：写入cookie、写入state
            this.$store.commit("login", res.data.data);
            this.$router.push({path: "/"})
            return
          }
          // 1000，字段错误，把相关错误信息现在标签上
          if (res.data.code === 1000) {
            // 不好弄，API获取数据，错误显示表单。
            // detail = { username:['错误',] ,password: [11,22] }
            this.validateFormFailed(res.data.detail);
            return;
          }
          // 1001，整体错误，整体显示
          if (res.data.code === 1001) {
            this.$message.error(res.data.detail);
          } else {
            this.$message.error("请求失败");
          }

        });
      });
    },
    validateFormFailed(errorData) {
      for (let fieldName in errorData) {
        let error = errorData[fieldName][0];
        this.userFormError[fieldName] = error;
      }
    },
    clearCustomFormError() {
      for (let key in this.userFormError) {
        this.userFormError[key] = ""
      }

    }
  },
}

</script>

<style scoped>
.main {
  width: 100%;
  height: 100vh;
  background-color: #2E3E9C;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.loginBox {
  background-color: #FFFFFF;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
  border-radius: 2px;
  width: 380px;
  min-height: 200px;
  padding: 0 24px 20px;
}

.title {
    font-size: 26px;
    color: black;
    margin: 20px auto 20px auto;
    text-align: center;
    font-weight: bold;
  }

</style>