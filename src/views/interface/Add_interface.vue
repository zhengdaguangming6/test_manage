<template>
  <div class="allDiv">
    <el-row>
      <el-col :span="18">
        <div>
          <el-form :model="interfaceForm" :rules="rules" ref="interfaceForm" label-width="150px" class="demo-ruleForm">
            <el-form-item label="接口名称" prop="interface_title">
              <el-input v-model="interfaceForm.interface_title" placeholder="请输入接口名称"></el-input>
            </el-form-item>
            <el-form-item label="登录账号" prop="phone">
              <el-input v-model="interfaceForm.phone" placeholder="请输入登录账号"></el-input>
            </el-form-item>
            <el-form-item label="登录用户名" prop="username">
              <el-input v-model="interfaceForm.username" placeholder="请输入登录用户名"></el-input>
            </el-form-item>
            <el-form-item label="登录密码" prop="password">
              <el-input v-model="interfaceForm.password" placeholder="请输入登录密码"></el-input>
            </el-form-item>

            <el-form-item label="请求方式" prop="method">
              <el-select v-model="interfaceForm.method" placeholder="请选择请求方式">
                <el-option label="GET" value="GET"></el-option>
                <el-option label="POST" value="POST"></el-option>
                <el-option label="PUT" value="PUT"></el-option>
                <el-option label="DELETE" value="DELETE"></el-option>
                <el-option label="PATCH" value="PATCH"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="domain" prop="domain">
              <el-select v-model="interfaceForm.domain" placeholder="请选择项目">
                <el-option label="tapi" value="tapi"></el-option>
                <el-option label="yapi" value="yapi"></el-option>
                <el-option label="m" value="m"></el-option>
                <el-option label="dapi" value="dapi"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="path" prop="path">
              <el-input v-model="interfaceForm.path" placeholder="请输入path"></el-input>
            </el-form-item>

            <el-form-item label="GET传参" prop="params">
              <el-input type="textarea" v-model="interfaceForm.params"
                        placeholder='请输入参数，举例 {"name":"张三", "age": 18}'></el-input>
            </el-form-item>

            <el-form-item label="POST传参(表单)" prop="data">
              <el-input type="textarea" v-model="interfaceForm.data"
                        placeholder='请输入参数，举例 {"name":"张三", "age": 18}'></el-input>
            </el-form-item>

            <el-form-item label="POST传参(json)" prop="json">
              <el-input type="textarea" v-model="interfaceForm.json"
                        placeholder='请输入参数，举例 {"name":"张三", "age": 18}'></el-input>
            </el-form-item>

            <el-form-item label="请求头" prop="headers">
              <el-input type="textarea" v-model="interfaceForm.headers"
                        placeholder='请输入参数，举例 {"name":"张三", "age": 18}'></el-input>
            </el-form-item>

            <el-form-item label="断言" prop="asserts">
              <el-input type="textarea" v-model="interfaceForm.asserts"
                        placeholder='请输入断言，举例 code=1,data.userinfo.uid="34246",data.list[3].type=0'></el-input>
            </el-form-item>

            <el-form-item label="是否执行" prop="run">
              <el-radio v-model="interfaceForm.run" label="1" border>执行</el-radio>
              <el-radio v-model="interfaceForm.run" label="0" border>不执行</el-radio>
            </el-form-item>

            <el-form-item label="备注" prop="notes">
              <el-input type="textarea" v-model="interfaceForm.notes" placeholder='请输入备注'></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm('interfaceForm')">创 建</el-button>
              <el-button @click="resetForm('interfaceForm')">重 置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: "Add_interface",
  data() {
    return {
      interfaceForm: {
        interface_title: '',
        phone: '',
        username: '',
        password: '',
        method: '',
        path: '',
        domain: '',
        params: '',
        data: '',
        json: '',
        headers: '',
        asserts: '',
        run: '',
        notes: '',
        // create_user: this.$store.state.user_id,
      },
      rules: {
        interface_title: [
          {required: true, message: '请输入接口名称', trigger: 'blur'},
          {min: 1, max: 64, message: '长度在 1 到 64 个字符', trigger: 'blur'}
        ],
        phone: [
          {required: true, message: '请输入登录账号', trigger: 'blur'},
          {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
        ],
        username: [
          {required: false, message: '请输入登录用户名', trigger: 'blur'},
          {min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入登录密码', trigger: 'blur'},
          {min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
        ],
        method: [
          {required: true, message: '请选择请求方式', trigger: 'change'}
        ],
        domain: [
          {required: true, message: '请选择请求方式', trigger: 'change'}
        ],
        path: [
          {required: true, message: '请输入url', trigger: 'blur'},
          {min: 1, max: 64, message: '长度在 1 到 64 个字符', trigger: 'blur'}
        ],

        params: [
          {required: false, message: '请填写GET请求参数', trigger: 'blur'},
          {min: 1, max: 500, message: '长度在 1 到 500 个字符', trigger: 'blur'}
        ],

        data: [
          {required: false, message: '请填写POST请求表单参数', trigger: 'blur'},
          {min: 1, max: 500, message: '长度在 1 到 500 个字符', trigger: 'blur'}
        ],

        json: [
          {required: false, message: '请填写POST请求json参数', trigger: 'blur'},
          {min: 1, max: 500, message: '长度在 1 到 500 个字符', trigger: 'blur'}
        ],

        headers: [
          {required: false, message: '请填写请求头', trigger: 'blur'},
          {min: 1, max: 1000, message: '长度在 1 到 100 个字符', trigger: 'blur'}
        ],

        asserts: [
          {required: false, message: '请填写请求头', trigger: 'blur'},
          {min: 1, max: 64, message: '长度在 1 到 64 个字符', trigger: 'blur'}
        ],

        run: [
          {required: true, message: '是否执行'}
        ],

        notes: [
          {required: false, message: '请填写备注', trigger: 'blur'}
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        //  校验值是否有效
        if (valid) {
          // console.log("数据：", this.ruleForm.method, this.ruleForm.url, this.ruleForm.params);
          console.log("数据：", this.interfaceForm);
          this.axios.post("/interface_test/interface/", this.interfaceForm).then(res => {
            if (res.data.code === 1) {
              this.$message({
                showClose: true,
                message: res.data.msg,
                type: 'success'
              });
              this.$router.push({name: "Interface_list"});
            } else if (res.data.code === 1001) {
              // {"code":1001,"detail":{"create_user":["该字段是必填项。"]},"msg":"保存失败"}
              this.$message({
                showClose: true,
                message: res.data.msg,
                type: 'error'
              });
            } else {
              this.$message({
                showClose: true,
                message: res.data.msg,
                type: 'error'
              });
              return false;
            }
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },


}
</script>

<style scoped>
.allDiv{
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}


</style>