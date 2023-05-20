<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-card class="box-card">
          <el-form :model="taskForm" :rules="rules" ref="taskForm" label-width="100px">
            <el-form-item label="任务名称" prop="task_title">
              <el-input v-model="taskForm.task_title"></el-input>
            </el-form-item>
            <el-form-item label="运行环境" prop="task_env">
              <el-input v-model="taskForm.task_env"></el-input>
            </el-form-item>
            <el-form-item label="项目名称" prop="pro_title">
              <el-select v-model="taskForm.pro_title" placeholder="请选择项目">
                <el-option label="all" value="all"></el-option>
                <el-option label="yapi" value="yapi"></el-option>
                <el-option label="tapi" value="tapi"></el-option>
                <el-option label="m" value="m"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="runForm('taskForm')" v-loading="loading" element-loading-text="接口测试中..." element-loading-spinner="el-icon-loading" element-loading-background="#F2F6FC">立即运行</el-button>
              <el-button @click="resetForm('taskForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name: "interface_run",
  data(){
    return{
      taskForm: {
        task_title: '',
        pro_title: '',
        task_env: '',
      },
      rules: {
        task_title: [
          { required: true, message: '请输入任务名称', trigger: 'blur' },
          { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
        ],
        task_env: [
          { required: true, message: '请输入运行环境', trigger: 'blur' },
          { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
        ],
        pro_title: [
          { required: true, message: '请选择项目', trigger: 'change' }
        ],
      },
      loading: '',
    };

    },
  methods: {
    runForm(formName) {
      this.$refs[formName].validate((valid) => {
        let that = this;
        if (valid) {
          that.loading = true;   // 打开loading效果
          // alert('submit!');
          // 验证通过，向后端的API发送请求
          that.axios.post("/interface_test/requestor/", that.taskForm).then(res => {
            if (res.data.code === 1) {
              console.log(res)
              // this.$router.push({path: "/"})
              that.$message.success("请求成功");
              that.loading = false;   // 关闭loading效果
              that.$router.push({name: "Interface_report_primary"});
            } else {
              that.$message.error("请求失败");
              that.loading = false;   // 关闭loading效果
            }
          }).catch(reason => {
            that.loading = false;   // 关闭loading效果
            that.$message.error('请求失败');
            console.log('请求失败', reason);
          });
        } else {
          console.log('error submit!!');
          that.loading = false;   // 关闭loading效果
          return false;
        }
      });


    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }

}
</script>

<style scoped>

</style>