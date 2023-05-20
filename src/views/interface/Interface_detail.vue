<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>接口详情</span>
      </div>
      <el-form label-width="80px;" :model="dataInterface">
        <el-form-item label="序号">
          <el-input :placeholder="dataInterface.id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="接口名称">
          <el-input :placeholder="dataInterface.interface_title" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="用户登录手机号">
          <el-input :placeholder="dataInterface.phone" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="登录用户名">
          <el-input :placeholder="dataInterface.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="登录密码">
          <el-input :placeholder="dataInterface.password" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="请求方式">
          <el-input :placeholder="dataInterface.method" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="path">
          <el-input :placeholder="dataInterface.path" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="domain">
          <el-input :placeholder="dataInterface.domain" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="get方式传参">
          <el-input :placeholder="dataInterface.params" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="post表单传参">
          <el-input :placeholder="dataInterface.data" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="postjson传参">
          <el-input :placeholder="dataInterface.json" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="请求头">
          <el-input :placeholder="dataInterface.headers" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="断言">
          <el-input :placeholder="dataInterface.asserts" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="是否执行">
          <el-input :placeholder="dataInterface.run" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input :placeholder="dataInterface.notes" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input :placeholder="dataInterface.create_time" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="更新时间">
          <el-input :placeholder="dataInterface.update_time" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="更新人">
          <el-input :placeholder="dataInterface.update_user.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="创建人">
          <el-input :placeholder="dataInterface.create_user.username" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Interface_detail",
  data() {
    return {
      dataInterface: {},
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
      this.dataInterface = res.data.data;
      if (this.dataInterface.run === 1) {
        this.dataInterface.run = "不执行"
      }else{
        this.dataInterface.run = "执行"
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
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.box-card {
  width: 100vh;
}
</style>