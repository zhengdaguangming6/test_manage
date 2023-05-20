<template>
<div>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>bug详情</span>
    </div>
    <el-form label-width="80px;" :model="dataBug">
      <el-form-item label="序号">
        <el-input :placeholder="dataBug.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="提交人">
        <el-input :placeholder="dataBug.submitter" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="问题描述">
        <el-input :placeholder="dataBug.content" :disabled="true" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="问题优先级">
        <el-input :placeholder="dataBug.priority" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="问题等级">
        <el-input :placeholder="dataBug.level" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="问题分类">
        <el-input :placeholder="dataBug.classification" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="引入原因">
        <el-input :placeholder="dataBug.cause" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="问题所属端">
        <el-input :placeholder="dataBug.department" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="问题处理结果">
        <el-input :placeholder="dataBug.result" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="问题跟进人">
        <el-input :placeholder="dataBug.follow_up_person" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="问题处理人">
        <el-input :placeholder="dataBug.solver" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="问题原因详情">
        <el-input :placeholder="dataBug.cause_detail" :disabled="true" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-input :placeholder="dataBug.create_time" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="更新时间">
        <el-input :placeholder="dataBug.update_time" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="更新人">
        <el-input :placeholder="dataBug.update_user.username" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="创建人">
        <el-input :placeholder="dataBug.create_user.username" :disabled="true"></el-input>
      </el-form-item>
    </el-form>
  </el-card>
</div>
</template>

<script>
export default {
  name: "Bug_detail",
  data() {
    return {
      dataBug: {},
    }
  },
  created() {
    // # ?id=126
    var id = window.location.search.split('=')[1];
    console.log("当前页面的参数", window.location.search, typeof (window.location.search))
    console.log("当前页面的参数里的id", id, typeof (id))
    this.axios.get(
        'bug/bug_list/' + id + '/'
    ).then(res => {
      this.dataBug = res.data.data;

    }).catch(reason => {
      console.log(reason)
    })
  }
}
</script>

<style scoped>

</style>