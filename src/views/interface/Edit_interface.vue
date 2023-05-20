<template>
  <div class="allDiv">
    <el-row :gutter="50">
      <el-col :span="12">
        <div>
          <el-form :model="interfaceForm" :rules="rules" ref="interfaceForm" label-width="150px" class="demo-ruleForm">
            <el-form-item label="序号" prop="id">
              <el-input v-model="interfaceForm.id" placeholder="interfaceForm.id" :disabled="true"></el-input>
            </el-form-item>
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
              <el-button type="primary" @click="editForm('interfaceForm')">保 存</el-button>
              <el-button @click="resetForm('interfaceForm')">重 置</el-button>
              <el-button @click="sendRequestor(id)" v-loading="loading" element-loading-text="加载中" element-loading-spinner="el-icon-loading" element-loading-background="#F2F6FC">单接口测试</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="12">
        <div>
          <el-card shadow="always">
            <json-viewer :value="assertion_list" copyable :expand-depth=2 sort style="background-color: rgba(159,138,127,0.11)"></json-viewer>
          </el-card>
          <el-card shadow="always">
            <json-viewer :value="result" copyable :expand-depth=2 sort style="background-color: rgba(159,138,127,0.11)"></json-viewer>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Edit_interface",
  data() {
    return {
      result: {},   // 当前接口测试的返回数据
      assertion_list: [], // 当前接口的断言
      interfaceForm: {},
      rules: {
        id : [],
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
          {min: 0, max: 500, message: '长度在 0 到 500 个字符', trigger: 'blur'}
        ],

        data: [
          {required: false, message: '请填写POST请求表单参数', trigger: 'blur'},
          {min: 0, max: 500, message: '长度在 0 到 500 个字符', trigger: 'blur'}
        ],

        json: [
          {required: false, message: '请填写POST请求json参数', trigger: 'blur'},
          {min: 0, max: 500, message: '长度在 0 到 500 个字符', trigger: 'blur'}
        ],

        headers: [
          {required: false, message: '请填写请求头', trigger: 'blur'},
          {min: 0, max: 1000, message: '长度在 0 到 1000 个字符', trigger: 'blur'}
        ],

        asserts: [
          {required: false, message: '请填写请求头', trigger: 'blur'},
          {min: 0, max: 500, message: '长度在 0 到 500 个字符', trigger: 'blur'}
        ],

        run: [
          {required: true, message: '是否执行'}
        ],

        notes: [
          {required: false, message: '请填写备注', trigger: 'blur'}
        ],
      },
      id: window.location.search.split('=')[1],
      loading: '',
    };
  },
  methods: {
    editForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log("数据：", this.ruleForm.method, this.ruleForm.url, this.ruleForm.params);
          console.log("数据：", this.interfaceForm);
          this.axios.patch("/interface_test/interface/" + this.interfaceForm.id.toString() + "/", this.interfaceForm).then(res => {
            if (res.data.code === 1) {
              this.$message({
                showClose: true,
                message: '保存成功',
                type: 'success'
              });
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
                message: '保存失败',
                type: 'error'
              });
              return false;
            }
          }).catch(reason => {
            this.$message.error('请求失败');
            console.log('请求失败', reason);
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    sendRequestor(id){
      let that = this;
      that.loading = true;  // 打开loading效果
      this.axios.get(
          "interface_test/requestor/" + id + "/",
      ).then(res => {
        if (res.data){
          that.$message({
            message: res.data.msg,
            type: 'success'
          });
          that.result = res.data.data;
          that.assertion_list = res.data.assertion_list;
          that.loading = false;   // 关闭loading效果
        }else{
          that.loading = false;   // 关闭loading效果
          that.$message.error('接口测试失败');
        }
        console.log("请求成功", res);
        console.log("接口测试数据：", typeof(res.data.data), res.data.data);

      }).catch(reason => {
        that.loading = false;   // 关闭loading效果
        that.$message.error('请求失败');
        console.log('请求失败', reason);
      })
    }
  },
  created() {
    // # ?id=126
    var id = window.location.search.split('=')[1];
    console.log("当前页面的参数", window.location.search, typeof (window.location.search))
    console.log("当前页面的参数里的id", id, typeof (id))
    this.axios.get(
        'interface_test/interface/' + id + '/'
    ).then(res => {
      this.interfaceForm = res.data.data;
      if (this.interfaceForm.run === 0) {
        this.interfaceForm.run = "不执行"
      }else{
        this.interfaceForm.run = "执行"
      }
      // {
      //   "code": 0,
      //     "msg": "查询单条数据成功",
      //     "data": {
      //   "id": 3,
      //       "interface_title": "给note点赞2132",
      //       "method": "POST",
      //       "url": "https://www.baidu.com/add",
      //       "params": null,
      //       "data": null,
      //       "json": "{\"name\": \"小明\", \"age\": 28}",
      //       "headers": null,
      //       "status": 1,
      //       "create_time": "2023-04-01T06:14:02.582303Z",
      //       "update_time": "2023-04-01T06:14:02.582371Z",
      //       "update_uid": 0,
      //       "create_user": 1,
      //       "notes": "这是备注",
      //       "run": 0,
      //       "username": null,
      //       "phone": null,
      //       "password": null
      // }
      // }

    }).catch(reason => {
      console.log(reason)
    })
  }

}
</script>

<style scoped>
.allDiv{
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}


</style>