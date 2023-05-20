<template>
<div>
  <el-card class="box-card">
    <el-table :data="showtableDataReport" style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column fixed prop="id" label="序号" width="150"></el-table-column>
      <el-table-column prop="task_title" label="任务名称" width="120"></el-table-column>
      <el-table-column prop="task_env" label="环境" width="120"></el-table-column>
      <el-table-column prop="pro_title" label="项目" width="120"></el-table-column>
      <el-table-column prop="create_user.username" label="创建人" width="120"></el-table-column>
      <el-table-column prop="create_time" label="创建时间" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作" width="300">
        <template slot-scope="scope">
          <el-button @click="searchClick(scope.row.id)" type="text">查看</el-button>
          <el-popconfirm
              confirm-button-text='确定'
              cancel-button-text='取消'
              icon="el-icon-info"
              icon-color="red"
              title="确定删除吗？"
              @confirm="deleteClick(scope.row.id)"
          >
          <el-button type="text" slot="reference" style="color: red; margin-left:4px;">删除</el-button>
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
        :current-page="pageInfo.page"
        :page-sizes="[10, 20, 30, 40, 50, 100, 200, 500, 1000]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total">
    </el-pagination>
  </div>
</div>
</template>

<script>
export default {
  name: "Interface_report_primary",
  data(){
    return {
      tableDataReport: [],   // 数据列表
      showtableDataReport: [],
      pageInfo: {
        page: 1,
        size: 10,
        total: '',
        current_page: '',   // 当前页
      },
      resultObj: {
        1: '成功',
        0: '失败'
      },
    };

  },
  methods: {
    searchClick(id) {
      console.log(id);
      // 打开新的标签页面
      const {href} = this.$router.resolve({
        name: 'Interface_report_second',
        query: {
          id: id
        }
      })
      window.open(href, '_blank')
      // that.$router.push({name: "Interface_report_second", query: {id: id}});
    },
    deleteClick(id){
      let that = this;
      console.log(id);
      that.axios.delete("/interface_test/requestor_report_primary/" + id + "/").then(res => {
        if (res.data.code === 1) {
          console.log(res);
          location.reload();  // 刷新页面
        } else {
          that.$message.error("请求失败");
        }
      }).catch(reason => {
        that.$message.error('请求失败');
        console.log('请求失败', reason);
      });
      },
    pageChange(page, size){
      this.axios.get(
          "/interface_test/requestor_report_primary/",
          {
            params:{
              page:page,
              size:size
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
    },
  watch: {

  },
  created() {
    this.axios.get(
        "/interface_test/requestor_report_primary/",
        {
          params:{
            page:1,
            size:10,
          }
        },
    ).then(res => {
      // console.log("请求成功", res);
      this.tableDataReport = res.data.results;
      this.showtableDataReport = this.tableDataReport;
      this.pageInfo.total = res.data.count;
      this.pageInfo.page = 1;
      this.pageInfo.size = 10;
    }).catch(reason => {
      console.log('请求失败', reason);
    })
  },
}
</script>

<style scoped>
.pageSet{
  margin-top: 20px;
  margin-left: 550px;
}
</style>