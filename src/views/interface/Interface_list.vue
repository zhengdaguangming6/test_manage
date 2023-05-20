<template>
 <div>
   <el-card class="box-card">
     <el-row>
       <el-button type="primary" @click="toAddinterface()" style="margin-bottom: 20px;">创 建</el-button>
     </el-row>
     <el-row>
       <el-col :span="8">
         <el-input
             type="text"
             placeholder="请输入接口名称"
             v-model="search_interface_title"
             maxlength="64"
             show-word-limit
             style="width:180px; margin-right: 5px;"
         >
         </el-input>
         <el-button type="primary" @click="searchInterfaceTitle" plain>搜索</el-button>
       </el-col>
       <el-col :span="8">
         <el-input
             type="text"
             placeholder="请输入创建人"
             v-model="search_create_user"
             maxlength="32"
             show-word-limit
             style="width:180px; margin-right: 5px;"
         >
         </el-input>
         <el-button type="primary" @click="searchCreateUser" plain>搜索</el-button>
       </el-col>
       <el-col :span="8">
         <el-input
             type="text"
             placeholder="请输入更新人"
             v-model="search_update_user"
             maxlength="32"
             show-word-limit
             style="width:180px; margin-right: 5px;"
         >
         </el-input>
         <el-button type="primary" @click="searchUpdateUser" plain>搜索</el-button>
       </el-col>
     </el-row>
     <el-row style="margin-top: 20px;">
       <el-rol :span="8">
         执行状态：
         <el-radio v-model="runStatus" label="1">执行</el-radio>
         <el-radio v-model="runStatus" label="0">不执行</el-radio>
         <el-button type="primary" @click="searchRun()" plain>搜索</el-button>
       </el-rol>
     </el-row>

     <el-row style="margin-top: 10px;">
       <el-button :type="propertyAll" @click="allChange">all</el-button>
       <el-button :type="propertyYapi" @click="yapiChange">yapi</el-button>
       <el-button :type="propertyTapi" @click="tapiChange">tapi</el-button>
       <el-button :type="propertyM" @click="mChange">m</el-button>
       <el-button style="margin-left: 50px;" type="primary" @click="manyRequestor" v-loading="loading" element-loading-text="正在努力测试中..." element-loading-spinner="el-icon-loading" element-loading-background="#F2F6FC">多选-批量接口测试</el-button>
       <json-viewer :value="requestor_result" copyable :expand-depth=3 sort style="background-color: rgba(159,138,127,0.11)"></json-viewer>

     </el-row>
   </el-card>

   <el-card class="box-card">
     <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
       <el-table-column type="selection" width="55" fixed="left"></el-table-column>
       <el-table-column prop="id" label="序号" width="50" fixed="left">
<!--         <template slot-scope="scope">{{ scope.row.id }}</template>-->
       </el-table-column>
       <el-table-column prop="interface_title" label="接口名称" width="150"></el-table-column>
       <el-table-column prop="method" label="请求方式"></el-table-column>
       <el-table-column prop="path" label="path" width="150"></el-table-column>
       <el-table-column prop="domain" label="domain"></el-table-column>
       <el-table-column prop="run" label="是否执行">
         <template slot-scope="scope">{{ scope.row.run == 1 ? runObj["1"] : runObj["0"] }}</template>
       </el-table-column>
       <el-table-column prop="update_user.username" label="更新人"></el-table-column>
       <el-table-column prop="update_time" label="更新时间"></el-table-column>
       <el-table-column prop="create_user.username" label="创建人"></el-table-column>
       <el-table-column prop="create_time" label="创建时间"></el-table-column>
       <el-table-column prop="notes" label="备注" show-overflow-tooltip></el-table-column>

       <el-table-column fixed="right" label="操作" width="250">
         <template slot-scope="scope">
           <el-button @click="runClick(scope.row.id)" type="primary" size="mini" plain round>RUN</el-button>
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
           <el-button @click="interface_detail(scope.row.id)" type="success" size="mini" plain round>查看</el-button>
           <el-button @click="editClick(scope.row.id)" type="primary" size="mini" plain round style="margin-left: 0;">编辑</el-button>

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
  name: "Interface_list",
  data() {
    return {
      // tableData: [{
      //   id: 1,
      //   interface_title: '接口名字叫克里斯朵夫就撒到了；看见风；拉动是快放假啊拉萨；的克己复礼说；阿的看见风快乐撒；键',
      //   method: 'getpostput看的撒酒疯；离开大家快疯了；但看撒酒疯拉萨快到房间了；sadkjfdklsadsjkklfjsaldkfjdlskafjsald;',
      //   url: '上海市普陀区金沙江路 1518 弄sfdfsafsadfljsadlkfjlsadk;fjals;kdfjl;kasjfl;askdjfl;',
      //   params: '{\'page\': \'1\'}fsdfsadfasdlfjsal;kdfjlsadkjflaks;dfjladksfj;ladskjl;fks',
      //   data: 'slfjls;kdjflk;sajfl;kdsjf看见风撒到了；看见风的拉萨；克己复礼；撒克己复礼；的看见发的路上；肯德基；lJ里；阿是看大家发了看；的撒酒疯了；可是到的肌肤；lasdjfl',
      //   headers: '是否对发生的撒房间撒了；大家发拉萨；但看风景啊拉萨；看大家发了；打算克己复礼；阿斯顿看见啊了；可是大家发；lksdf',
      //   run: 1,
      //   notes: '是大家发了；可是大家发了；看撒酒疯离开的事实但看风景；拉萨的科技力量；都开始放假啊拉萨克己复礼；卡苏里；疯狂的撒'
      // }],
      pageInfo: {
        page: 1,
        size: 10,
        total: '',
        current_page: '',   // 当前页
      },
      tableData: [],    // 数据列表
      runObj: {           //用于每一行的展示
        1: "执行",
        0: "不执行"
      },
      singleDate: '',   // 单条数据
      visible: false,   // 删除弹窗
      propertyTapi: '',  // tapi按钮的type
      propertyYapi: '',  // yapi按钮的type
      propertyAll: 'success',   // all按钮的type
      propertyM: '',  // m按钮的type
      tapi: '',         // 筛选tapi
      yapi: '',          // 筛选yapi
      m: '',   // 筛选m
      search_interface_title: '',      // 筛选接口名称
      search_create_user: '',          // 筛选创建人
      search_update_user: '',          // 筛选更新人
      runStatus: '',  // 用于筛选执行状态
      result_json: '',  // 单条请求的返回值
      multipleSelection: [],  // 多选项的数组
      requestor_result: {},  // 批量接口测试结果
      loading: '',
    }
  },

  methods: {
    pageChange(page, size){
      this.axios.get(
          "interface_test/interface/",
          {
            params:{
              page:page,
              size:size,
              interface_title: this.search_interface_title,
              create_user: this.search_create_user,
              update_user: this.search_update_user,
              run: this.runStatus,
              yapi: this.yapi,
              tapi: this.tapi,
              m: this.m,
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
      // this.axios.get(
      //     "interface_test/interface/",
      //     {
      //       params:{
      //         page:1,
      //         size:val,
      //         interface_title: this.search_interface_title,
      //         create_user: this.search_create_user,
      //         updata_user: this.search_update_user,
      //       }
      //     },
      // ).then(res => {
      //   // console.log("请求成功", res);
      //   // console.log("results:", res.data.results)
      //   this.tableData = res.data.results;
      //   this.pageInfo.total = res.data.count;
      //   this.pageInfo.size = val;
      //   this.pageInfo.page = 1;
      //   this.pageInfo.current_page = 1;
      // }).catch(reason => {
      //   console.log('请求失败', reason);
      // })
      // this.pageInfo.size = val;
      // return val
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageChange(val, this.pageInfo.size);
      this.pageInfo.current_page = val;
      return val
    },
    deleteClick(id){
      this.axios.delete(
        'interface_test/interface/'+id.toString()+'/'
      ).then(function(res) {
        console.log("请求成功", res);
        location.reload();
          }).catch(reason => {
        console.log('请求失败', reason);
      })
    },
    editClick(id){
        this.$router.push({name: "Edit_interface", query: {id: id}});

    },
    interface_detail(id){
      this.$router.push({name: "Interface_detail", query: {id: id}});
    },
    toAddinterface(){
      this.$router.push({name: "Add_interface"});
    },
    searchFunc(){
      this.axios.get(
          "interface_test/interface/",
          {
            params:{
              page: 1,
              size: 10,
              tapi: this.tapi,
              yapi: this.yapi,
              m: this.m,
              interface_title: this.search_interface_title,
              create_user: this.search_create_user,
              update_user:  this.search_update_user,
              run: this.runStatus,
            }
          },
      ).then(res => {
        // console.log("请求成功", res);
        // console.log("results:", res.data.results)
        this.tableData = res.data.results;
        this.pageInfo.total = res.data.count;
        this.pageInfo.page = 1;
        this.pageInfo.size = 10;
        this.pageInfo.current_page = 1;
      }).catch(reason => {
        console.log('请求失败', reason);
      })
    },
    yapiChange(){
      this.propertyAll = '';
      this.propertyTapi = '';
      this.propertyM = '';
      this.propertyYapi = "success";
      this.yapi = 'yapi';
      this.tapi = '';
      this.m = '';
      this.searchFunc();
    },
    tapiChange(){
      this.propertyAll = '';
      this.propertyYapi = '';
      this.propertyM = '';
      this.propertyTapi = "success";
      this.tapi = 'tapi';
      this.yapi = '';
      this.m = '';
      this.searchFunc();
    },
    mChange(){
      this.propertyAll = '';
      this.propertyYapi = '';
      this.propertyTapi = "";
      this.propertyM = 'success';
      this.tapi = '';
      this.yapi = '';
      this.m = 'm';
      this.searchFunc();
    },
    allChange(){
      this.propertyYapi = '';
      this.propertyTapi = '';
      this.propertyM = '';
      this.propertyAll = 'success';
      this.tapi = '';
      this.yapi = '';
      this.m = '';
      this.searchFunc();
    },
    searchInterfaceTitle(){
      this.searchFunc();
    },
    searchCreateUser(){
      this.searchFunc();
    },
    searchUpdateUser(){
      this.searchFunc();
    },
    searchRun(){
      this.searchFunc();
    },
    runClick(id){
      this.axios.get(
          "interface_test/requestor/" + id + "/",
      ).then(res => {
        if (res.data){
          this.$message({
            message: res.data.msg,
            type: 'success'
          });
          this.result_json = res.data.data
        }else{
          this.$message.error('接口测试失败');
        }
        console.log("请求成功", res);
        console.log("接口测试数据：", res.data.data);

      }).catch(reason => {
        this.$message.error('请求失败');
        console.log('请求失败', reason);
      })
    },
    handleSelectionChange(val) {
      let that = this;
      that.multipleSelection = val;
      console.log(that.multipleSelection);
    },
    manyRequestor(){
      let that = this;
      that.loading = true;  // 打开loading效果
      that.axios.post(
          "interface_test/requestor_many/",
          {
              data_list: that.multipleSelection,
          },
      ).then(res => {
        console.log("请求成功", res);
        that.loading = false;   // 关闭loading效果
        that.requestor_result = res.data;
      }).catch(reason => {
        that.loading = false;   // 关闭loading效果
        that.$message.error('请求失败');
        console.log('请求失败', reason);
      })
    }
  },
  created() {
    this.axios.get(
        "interface_test/interface/",
        {
          params:{
            page:1,
            size:10,
          }
        },
    ).then(res => {
      // console.log("请求成功", res);
      // console.log("results:", res.data.results)
      this.tableData = res.data.results;
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