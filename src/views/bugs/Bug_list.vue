<template>
  <div>
    <el-card class="box-card">
      <el-row>
        <el-input
            type="text"
            placeholder="请输入提交人"
            v-model="filter_data.filter_submitter"
            maxlength="64"
            show-word-limit
            style="width:180px;"
        >
        </el-input>
        <el-input
            type="text"
            placeholder="请输入问题描述"
            v-model="filter_data.filter_content"
            maxlength="64"
            show-word-limit
            style="width:180px;"
        >
        </el-input>
        <el-input
            type="text"
            placeholder="请输入问题跟进人"
            v-model="filter_data.filter_follow_up_person"
            maxlength="64"
            show-word-limit
            style="width:180px;"
        >
        </el-input>
        <el-input
            type="text"
            placeholder="请输入问题处理人"
            v-model="filter_data.filter_solver"
            maxlength="64"
            show-word-limit
            style="width:180px;"
        >
        </el-input>
        <el-input
            type="text"
            placeholder="请输入原因详情"
            v-model="filter_data.filter_cause_detail"
            maxlength="64"
            show-word-limit
            style="width:180px;"
        >
        </el-input>
        <el-select v-model="filter_data.filter_priority" placeholder="请选择bug优先级" style="width:180px;">
          <el-option
              v-for="(value, key) in bugPriority"
              :label="key + '（' + value + '）'"
              :value="key"
              :key="key"
          >
          </el-option>
        </el-select>
        <el-select v-model="filter_data.filter_level" placeholder="请选择bug等级" style="width: 180px">
          <el-option
              v-for="(value, key) in bugLevel"
              :label="key + '（' + value + '）'"
              :value="key"
              :key="key"
          >
          </el-option>
        </el-select>
        <el-select v-model="filter_data.filter_classification" placeholder="请选择bug分类" style="width: 180px">
          <el-option
              v-for="(value, key) in bugClassification"
              :label="value"
              :value="parseInt(key)"
              :key="key"
          >
          </el-option>
        </el-select>
        <el-select v-model="filter_data.filter_cause" placeholder="请选择bug引入原因" style="width: 180px">
          <el-option
              v-for="(value, key) in bugCause"
              :label="value"
              :value="parseInt(key)"
              :key="key"
          >
          </el-option>
        </el-select>
        <el-select v-model="filter_data.filter_department" placeholder="请选择bug所属端" style="width: 180px">
          <el-option
              v-for="(value, key) in bugDepartment"
              :label="value"
              :value="parseInt(key)"
              :key="key"
          >
          </el-option>
        </el-select>
        <el-select v-model="filter_data.filter_result" placeholder="请选择bug处理结果" style="width: 180px">
          <el-option
              v-for="(value, key) in bugResult"
              :label="value"
              :value="parseInt(key)"
              :key="key"
          >
          </el-option>
        </el-select>
        <el-select v-model="filter_data.filter_is_push" placeholder="是否发通知" style="width: 180px">
          <el-option
              v-for="(value, key) in bugIsPush"
              :label="value"
              :value="parseInt(key)"
              :key="key"
          >
          </el-option>
        </el-select>
      </el-row>
      <el-row>
        <el-button type="primary" icon="el-icon-search" @click="pageChange(1, 10)">搜 索</el-button>
        <el-button type="primary" @click="resetFilter()">重 置</el-button>
      </el-row>
      <el-row style="margin-top: 10px;">
        <el-button type="success" @click="linkToAddBug()" style="margin-bottom: 20px;">新建bug</el-button>
        <el-button type="success" icon="el-icon-download" @click="downloadExcel()" style="margin-bottom: 20px;">导出表格</el-button>
      </el-row>
    </el-card>

    <el-card class="box-card">
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" fixed="left"></el-table-column>
        <el-table-column prop="id" label="序号" width="50" fixed="left">
          <!--         <template slot-scope="scope">{{ scope.row.id }}</template>-->
        </el-table-column>
        <el-table-column prop="submitter" label="提交人" width="80"></el-table-column>
        <el-table-column prop="content" label="问题描述" width="300" show-overflow-tooltip></el-table-column>
        <el-table-column prop="priority" label="bug优先级" width="100">
          <template slot-scope="scope">{{ scope.row.priority + "(" + bugPriority[scope.row.priority] + ")" }}</template>
        </el-table-column>
        <el-table-column prop="level" label="严重程度" width="100">
          <template slot-scope="scope">{{ scope.row.level + "(" + bugLevel[scope.row.level] + ")" }}</template>
        </el-table-column>
        <el-table-column prop="classification" label="缺陷分类" width="100">
          <template slot-scope="scope">{{ bugClassification[scope.row.classification] }}</template>
        </el-table-column>
        <el-table-column prop="cause" label="引入原因" width="100">
          <template slot-scope="scope">{{ bugCause[scope.row.cause] }}</template>
        </el-table-column>
        <el-table-column prop="department" label="问题所属端" width="100">
          <template slot-scope="scope">{{ bugDepartment[scope.row.department] }}</template>
        </el-table-column>
        <el-table-column prop="result" label="问题处理结果" width="120">
          <template slot-scope="scope">{{ bugResult[scope.row.result] }}</template>
        </el-table-column>
        <el-table-column prop="follow_up_person" label="跟进人" width="100"></el-table-column>
        <el-table-column prop="solver" label="处理人" width="100"></el-table-column>
        <el-table-column prop="cause_detail" label="问题原因详情" show-overflow-tooltip width="300"></el-table-column>
        <el-table-column prop="update_user.username" label="更新人" width="100"></el-table-column>
        <el-table-column prop="update_time" label="更新时间" width="100"></el-table-column>
        <el-table-column prop="create_user.username" label="创建人" width="100"></el-table-column>
        <el-table-column prop="create_time" label="创建时间" width="100"></el-table-column>
        <el-table-column prop="is_push" label="发送状态">
          <template slot-scope="scope">
            <el-tag :type="bugPushTagFilter[scope.row.is_push]">{{ bugIsPush[scope.row.is_push] }} </el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="bugPush(scope.row.id)" type="success" size="mini" plain round>发通知</el-button>
            <el-button @click="editDetail(scope.row.id)" type="primary" size="mini" plain round style="margin-left: 0;">编辑</el-button>
            <el-popconfirm
                confirm-button-text='确定'
                cancel-button-text='取消'
                icon="el-icon-info"
                icon-color="red"
                title="确定删除吗？"
                @confirm="deleteClick(scope.row.id)"
            >
              <el-button type="danger" size="mini" slot="reference" plain round>删除</el-button>
            </el-popconfirm>


          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!--   分页-->
    <div class="pageSet">
      <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfo.current_page"
          :page-sizes="[10, 20, 30, 40, 50, 100, 200, 500, 1000]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
// import XLSX from 'xlsx'
import * as XLSX from 'xlsx/xlsx.mjs'
export default {
  name: "Bug_list",
  data(){
    return{
      pageInfo: {
        page: 1,
        size: 10,
        total: '',
        current_page: 1,   // 当前页
      },
      tableData: [],    // bug数据列表
      multipleSelection: [],  // 多选项的数组
      bugPriority:{
        // bug优先级
        a: '紧急',
        b: '高',
        c: '中',
        d: '低',
      },
      bugLevel: {
        // bug等级
        a: "致命",
        b: "严重",
        c: "一般",
        d: "轻微",
      },
      bugClassification: {
        // bug分类
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
        // bug引入原因
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
        // 问题所属端
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
        // bug当前状态
        0: "待处理",
        1: "处理中",
        2: "不是bug",
        3: "无法复现",
        4: "没找到原因，持续观察",
        5: "后续解决",
        6: "已解决",
        7: "下一版本修复",
      },
      bugIsPush: {
        // bug是否发送通知到钉钉
        0: "未发送",
        1: "已发送"
      },
      bugPushTagFilter: {
        // 发送的标签颜色，0未发送状态，1已发送状态
        0: "danger",
        1: "success"
      },
      filter_data: {
        filter_submitter: '',  // 搜索提交人
        filter_content: '',   // 搜索描述问题
        filter_follow_up_person: '',   // 搜索问题跟进人
        filter_solver: '',   // 搜索问题处理人
        filter_cause_detail: '',   // 搜索问题详情
        filter_priority: '',   // 搜索问题优先级
        filter_level: '',   // 搜索问题等级
        filter_classification: '',  // 搜索问题分类
        filter_cause: '',   // 搜索问题引入原因
        filter_department: '',   // 搜索问题所属端
        filter_result: '',    // 搜索问题处理结果
        filter_is_push: '',    // 搜索是否发送过通知
      },
      excel_data: [],
    }
  },
  methods: {
    pageChange(page, size){
      this.axios.get(
          "bug/bug_list/",
          {
            params:{
              page:page,
              size:size,
              submitter: this.filter_data.filter_submitter,
              content: this.filter_data.filter_content,
              follow_up_person: this.filter_data.filter_follow_up_person,
              solver: this.filter_data.filter_solver,
              cause_detail: this.filter_data.filter_cause_detail,
              priority: this.filter_data.filter_priority,
              level: this.filter_data.filter_level,
              classification: this.filter_data.filter_classification,
              cause: this.filter_data.filter_cause,
              department: this.filter_data.filter_department,
              result: this.filter_data.filter_result,
              is_push: this.filter_data.filter_is_push,
            }
          },
      ).then(res => {
        // console.log("请求成功", res);
        // console.log("results:", res.data.results)
        this.tableData = res.data.results;
        this.pageInfo.total = res.data.count;
        this.pageInfo.page = page;
        this.pageInfo.size = size;
        this.pageInfo.current_page = page;
      }).catch(reason => {
        console.log('请求失败', reason);
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageChange(this.pageInfo.page, val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageChange(val, this.pageInfo.size);
      this.pageInfo.current_page = val;
      return val
    },
    handleSelectionChange(val) {
      // 多选勾选的数据赋值给this.multipleSelection
      let that = this;
      that.multipleSelection = val;
      console.log(typeof(that.multipleSelection), that.multipleSelection);
    },
    linkToAddBug(){
      this.$router.push({name: "Add_bug"});
    },
    editDetail(id){
      // console.log(id);
      this.$router.push({name: "Edit_bug", query: {id: id}});
    },
    deleteClick(id){
      this.axios.delete(
          'bug/bug_list/'+id.toString()+'/'
      ).then(function(res) {
        console.log("请求成功", res);
        location.reload();

      }).catch(reason => {
        console.log('请求失败', reason);
      });

    },
    resetFilter(){
      // 重置所有搜索项的内容
      for(let key in this.filter_data){
        this.filter_data[key] = '';
      }
    },
    bugPush(id){
      this.axios.patch(
          "/bug/bug_push_message/" + id.toString() + "/",
          {
            "is_push": 1
          }
      ).then(res => {
        if (res.data.code === 1) {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: 'success'
          });
          location.reload();   // 刷新页面
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

    },
    CurrentTime(){
      var now = new Date();
      var year = now.getFullYear(); //获取完整的年份(4位,1970-????)
      var month = now.getMonth() + 1; //获取当前月份(0-11,0代表1月)
      var day = now.getDate(); //获取当前日(1-31)
      var hour = now.getHours(); //获取当前小时数(0-23)
      var minute = now.getMinutes(); //获取当前分钟数(0-59)
      var second = now.getSeconds(); //获取当前秒数(0-59)
      var current_time = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
      return current_time;
    },
    downloadExcel(){
      for (var index in this.multipleSelection){
        // 删除掉不需要展示的键值对
        delete this.multipleSelection[index]["create_user"];
        delete this.multipleSelection[index]["update_user"];
        delete this.multipleSelection[index]["is_push"];
        delete this.multipleSelection[index]["status"];
        delete this.multipleSelection[index]["at_persons"];
        // 给一些键重新赋值，使其展示中文
        this.multipleSelection[index]["priority"] = this.multipleSelection[index]["priority"] + "（" + this.bugPriority[this.multipleSelection[index]["priority"]] + "）";
        this.multipleSelection[index]["level"] = this.multipleSelection[index]["level"] + "（" + this.bugLevel[this.multipleSelection[index]["level"]] + "）";
        this.multipleSelection[index]["classification"] = this.bugClassification[this.multipleSelection[index]["classification"]];
        this.multipleSelection[index]["cause"] = this.bugClassification[this.multipleSelection[index]["cause"]];
        this.multipleSelection[index]["department"] = this.bugDepartment[this.multipleSelection[index]["department"]];
        this.multipleSelection[index]["result"] = this.bugResult[this.multipleSelection[index]["result"]];
      }
      const download_data = XLSX.utils.json_to_sheet(this.multipleSelection);
      const wb = XLSX.utils.book_new();
      const current_Time = this.CurrentTime();
      XLSX.utils.book_append_sheet(wb, download_data, '线上bug');
      XLSX.writeFile(wb, 'bug_list_' + current_Time + '.xlsx');
    }
  },
  created() {
    this.pageChange(1, 10)
  },

}
</script>

<style scoped>
.pageSet{
  margin-top: 20px;
  margin-left: 550px;
}
</style>