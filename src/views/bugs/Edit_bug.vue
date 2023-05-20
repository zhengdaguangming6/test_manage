<template>
  <div class="allDiv">
    <el-row>
      <el-col :span="18">
        <div>
          <el-form :model="bugForm" :rules="rules" ref="bugForm" label-width="150px" class="demo-ruleForm" size="medium">
            <el-form-item label="问题提交人" prop="submitter">
              <el-input v-model="bugForm.submitter" placeholder="请输入问题提交人" style="width: 600px"></el-input>
            </el-form-item>
            <el-form-item label="问题描述" prop="content">
              <el-input
                  type="textarea"
                  :rows="9"
                  placeholder="请尽量提供以下信息，以便于定位问题：
            用户昵称：如 钱太
            用户id: 如 345435
            应用版本：如5.16.0
            系统版本：ios 15.2
            所使用网络：如电信4G
            所在地：如杭州、日本
            手机型号：如华为p30
            问题表现：比如页面打不开，信息错误，加载缓慢等。"
                  v-model="bugForm.content"
                  style="width: 600px"
              >
              </el-input>
            </el-form-item>

            <el-form-item label="bug优先级" prop="priority">
              <el-select v-model="bugForm.priority" placeholder="请选择优先级" style="width: 600px">
                <el-option
                    v-for="(value, key) in bugPriority"
                    :label="key + '（' + value + '）'"
                    :value="key"
                    :key="key"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="bug等级" prop="level">
              <el-select v-model="bugForm.level" placeholder="请选择等级" style="width: 600px">
                <el-option
                    v-for="(value, key) in bugLevel"
                    :label="key + '（' + value + '）'"
                    :value="key"
                    :key="key"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="bug分类" prop="classification">
              <el-select v-model="bugForm.classification" placeholder="请选择分类" style="width: 600px">
                <el-option
                    v-for="(value, key) in bugClassification"
                    :label="value"
                    :value="parseInt(key)"
                    :key="key"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="引入原因" prop="cause">
              <el-select v-model="bugForm.cause" placeholder="请选择引入原因" style="width: 600px">
                <el-option
                    v-for="(value, key) in bugCause"
                    :label="value"
                    :value="parseInt(key)"
                    :key="key"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="问题所属端" prop="department">
              <el-select v-model="bugForm.department" placeholder="请选择问题所属端" style="width: 600px">
                <el-option
                    v-for="(value, key) in bugDepartment"
                    :label="value"
                    :value="parseInt(key)"
                    :key="key"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="问题处理结果" prop="result">
              <el-select v-model="bugForm.result" placeholder="请选择处理结果" style="width: 600px">
                <el-option
                    v-for="(value, key) in bugResult"
                    :label="value"
                    :value="parseInt(key)"
                    :key="key"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="问题跟进人" prop="follow_up_person">
              <el-input v-model="bugForm.follow_up_person" placeholder="请输入问题跟进人" style="width: 600px"></el-input>
            </el-form-item>
            <el-form-item label="问题处理人" prop="solver">
              <el-input v-model="bugForm.solver" placeholder="请输入问题跟进人" style="width: 600px"></el-input>
            </el-form-item>
            <el-form-item label="@相关人员" prop="solver">
              <el-input v-model="bugForm.at_persons" placeholder="请输入相关人员姓名全拼，例如张三（zhangsan）或张三李四（zhangsan,lisi）" style="width: 600px"></el-input>
            </el-form-item>
            <el-form-item label="问题原因详情" prop="cause_detail">
              <el-input
                  type="textarea"
                  :rows="9"
                  placeholder="详细描述问题原因及解决方案
          -在哪个版本可以修复？
          -此问题的影响范围是？
          -此问题的处理时间是？
          -是临时方案还是最终解决方案？
          -最终解决方案的时间是？"
                  v-model="bugForm.cause_detail"
                  style="width: 600px"
              >
              </el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="editForm('bugForm')">保 存</el-button>
              <el-button @click="resetForm('bugForm')">重 置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Edit_bug",
  data(){
    return{
      bugForm: {},
      bugPriority:{
        a: '紧急',
        b: '高',
        c: '中',
        d: '低',
      },
      bugLevel: {
        a: "致命",
        b: "严重",
        c: "一般",
        d: "轻微",
      },
      bugClassification: {
        0: "功能",
        1: "界面",
        2: "兼容性",
        3: "易用性",
        4: "安全性",
        5: "性能",
        6: "服务器配置",
        7: "DB",
        8: "其他",
      },
      bugCause: {
        0: "需求不清晰",
        1: "代码设计缺陷",
        2: "代码错误",
        3: "环境问题",
        4: "运营配置问题",
        5: "用户理解有歧义",
        6: "大数据相关",
        7: "其他",
      },
      bugDepartment: {
        0: "需求问题",
        1: "iOS",
        2: "安卓",
        3: "server端",
        4: "管理后台",
        5: "web官网",
        6: "活动页面",
        7: "app内H5",
        8: "小程序",
        9: "算法",
        10: "大数据",
        11: "运营",
        12: "其他",
      },
      bugResult: {
        0: "待处理",
        1: "处理中",
        2: "不是bug",
        3: "无法复现",
        4: "没找到原因，持续观察",
        5: "后续解决",
        6: "已解决",
        7: "下一版本修复",
      },
      id: window.location.search.split('=')[1],
      rules: {
        submitter: [{ required: true, message: "不能为空", trigger: "blur" }],
        content: [{ required: true, message: "不能为空", trigger: "blur" }],
      }
    }
  },
  methods: {
    editForm(val){
      this.$refs[val].validate((valid) => {
        //  校验值是否有效
        if (valid) {
          // console.log("数据：", this.ruleForm.method, this.ruleForm.url, this.ruleForm.params);
          console.log("数据：", this.bugForm);
          this.axios.patch("/bug/bug_list/" + this.bugForm.id.toString() + "/", this.bugForm).then(res => {
            if (res.data.code === 1) {
              this.$message({
                showClose: true,
                message: res.data.msg,
                type: 'success'
              });
              this.$router.push({name: "Bug_list"});
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
          }).catch(reason => {
            console.log('请求失败', reason)})
        }
      });
    },
    resetForm(val) {
      this.$refs[val].resetFields();
    },

  },
  created() {
    // # ?id=126
    var id = window.location.search.split('=')[1];
    console.log("当前页面的参数", window.location.search, typeof (window.location.search))
    console.log("当前页面的参数里的id", id, typeof (id))
    this.axios.get(
        'bug/bug_list/' + id + '/'
    ).then(res => {
      this.bugForm = res.data.data;
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