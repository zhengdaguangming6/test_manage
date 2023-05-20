<template>
<div>
  <el-card class="box-card">
    <el-descriptions title="接口测试结果">
      <el-descriptions-item label="序号">{{resForm.id}}</el-descriptions-item>
      <el-descriptions-item label="任务名称">{{resForm.task_title}}</el-descriptions-item>
      <el-descriptions-item label="环境">{{resForm.task_env}}</el-descriptions-item>
      <el-descriptions-item label="项目">{{resForm.pro_title}}</el-descriptions-item>
      <el-descriptions-item label="创建人">{{resForm.create_user.username}}</el-descriptions-item>
      <el-descriptions-item label="创建时间">{{resForm.create_time}}</el-descriptions-item>
      <el-descriptions-item label="数量">{{showTableData.length}}</el-descriptions-item>
    </el-descriptions>
      <el-button @click="isBoth()" :type="this.propertyForm.propertyBoth">Both</el-button>
      <el-button @click="isPass()" :type="this.propertyForm.propertyPass">通过</el-button>
      <el-button @click="isNotPass()" :type="this.propertyForm.propertyNotPass">不通过</el-button>
    <div style="height: 5px;"></div>
    <el-button @click="searchAll()" :type="this.propertyForm.propertyAll">All</el-button>
    <el-button @click="searchM()" :type="this.propertyForm.propertyM">M</el-button>
    <el-button @click="searchTapi()" :type="this.propertyForm.propertyTapi">Tapi</el-button>
    <el-button @click="searchYapi()" :type="this.propertyForm.propertyYapi">Yapi</el-button>

    <div>
      <el-table :data="showTableData" style="width: 100%">
        <el-table-column fixed label="序号" width="100" type="index"></el-table-column>
        <el-table-column fixed prop="interface_title" label="接口名称" width="200"></el-table-column>
        <el-table-column prop="path" label="path" width="200"></el-table-column>
        <el-table-column prop="domain" label="项目（域名）" width="150"></el-table-column>
        <el-table-column prop="assert_code" label="是否通过" width="150">
          <template slot-scope="scope">{{ scope.row.assert_code === 1 ? assert_code_obj["1"] : assert_code_obj["0"] }}</template>
        </el-table-column>
        <el-table-column prop="assertion_list" label="断言详情" width="350">
              <template slot-scope="scope">
                <json-viewer :value="scope.row.assertion_list" copyable :expand-depth=0 sort style="background-color: rgba(159,138,127,0.11)"></json-viewer>
              </template>
        </el-table-column>
        <el-table-column prop="msg" label="参考消息" width="150"></el-table-column>
      </el-table>
    </div>
  </el-card>
</div>
</template>

<script>
export default {
  name: "Interface_report_second",
  data(){
    return{
      id: window.location.search.split('=')[1],
      resForm: {},
      tableData: [],
      showTableData: [],
      filterForm: {
        assert_code: "",
        domain: "",
      },
      propertyForm: {
        propertyBoth: "",
        propertyPass: "",
        propertyNotPass: "",
        propertyM: "",
        propertyTapi: "",
        propertyYapi: "",
        propertyAll: "",
      },
      assert_code_obj: {
        0: "不通过",
        1: "通过"
      },
      activeNames: ['1'],
      search_Data: [],

    }
  },
  methods:{
    searchCreated(){
      const loading = this.$loading({
        // 由于一次性获取的数据量比较大，所以进入页面之前，先打开全屏loading，等数据获取到，再关闭全屏loading
        lock: true,
        text: '拼命加载中...',
        spinner: 'el-icon-loading',
        // background: 'rgba(0, 0, 0, 0.7)',
        background: 'white',
      });
      var id = window.location.search.split('=')[1];
      console.log("当前页面的参数", window.location.search, typeof (window.location.search));
      console.log("当前页面的参数里的id", id, typeof (id));
      this.axios.get(
          '/interface_test/requestor_report_primary/' + id + '/'
      ).then(res => {
        this.resForm = res.data.data;
        this.tableData = res.data.data.content;
        this.showTableData = res.data.data.content;
        loading.close();   // 关闭全屏loading
        // console.log("this.tableData===", this.tableData);
        // console.log(res);
        // this.tableData = res.data.data.
      }).catch(reason => {
        console.log(reason);
        loading.close();   // 关闭全屏loading
      });
    },
    isBoth(){
      this.filterForm.assert_code = "";
      this.propertyForm.propertyBoth = "success";
      this.propertyForm.propertyNotPass = "";
      this.propertyForm.propertyPass = "";
      this.showTableData = [];
      for (var i in JSON.parse(JSON.stringify(this.tableData))){
        console.log(this.tableData[i].assert_code);
        if(this.filterForm.domain === "" || this.filterForm.domain === "all"){
          this.showTableData = this.tableData;
        }else if(this.tableData[i].domain === this.filterForm.domain){
          this.showTableData.push(this.tableData[i]);
        }
      }
    },
    isPass(){
      this.propertyForm.propertyBoth = "";
      this.propertyForm.propertyNotPass = "";
      this.propertyForm.propertyPass = "success";
      this.showTableData = [];
      this.filterForm.assert_code = 1;
      for (var i in JSON.parse(JSON.stringify(this.tableData))){
        console.log(this.tableData[i].assert_code);
        if(this.filterForm.domain === "" || this.filterForm.domain === "all"){
          if (this.tableData[i].assert_code === this.filterForm.assert_code){
            this.showTableData.push(this.tableData[i]);
          }
        }else if(this.tableData[i].assert_code === this.filterForm.assert_code && this.tableData[i].domain === this.filterForm.domain){
          this.showTableData.push(this.tableData[i]);
        }
      }
    },
    isNotPass(){
      this.propertyForm.propertyBoth = "";
      this.propertyForm.propertyNotPass = "success";
      this.propertyForm.propertyPass = "";
      this.showTableData = [];
      this.filterForm.assert_code = 0;
      for (var i in JSON.parse(JSON.stringify(this.tableData))){
        console.log(this.tableData[i]);
        if(this.filterForm.domain === "" || this.filterForm.domain === "all"){
          if (this.tableData[i].assert_code === this.filterForm.assert_code){
            this.showTableData.push(this.tableData[i]);
          }
        }else if(this.tableData[i].assert_code === this.filterForm.assert_code && this.tableData[i].domain === this.filterForm.domain){
          this.showTableData.push(this.tableData[i]);
        }
      }
    },
    searchAll(){
      this.propertyForm.propertyM = "";
      this.propertyForm.propertyYapi = "";
      this.propertyForm.propertyTapi = "";
      this.propertyForm.propertyAll = "success";
      this.showTableData = [];
      this.filterForm.domain = "all";
      for (var i in this.tableData){
        if(this.filterForm.assert_code === "" || this.filterForm.domain === "all"){
          this.showTableData = this.tableData;
        }else if(this.tableData[i].assert_code === this.filterForm.assert_code){
          this.showTableData.push(this.tableData[i]);
        }
      }
    },
    searchM(){
      this.propertyForm.propertyM = "success";
      this.propertyForm.propertyYapi = "";
      this.propertyForm.propertyTapi = "";
      this.propertyForm.propertyAll = "";
      this.showTableData = [];
      this.filterForm.domain = "m";
      for (var i in this.tableData){
        if(this.filterForm.assert_code === "" && this.tableData[i].domain === this.filterForm.domain){
            this.showTableData.push(this.tableData[i]);
        }else if(this.tableData[i].assert_code === this.filterForm.assert_code && this.tableData[i].domain === this.filterForm.domain){
          this.showTableData.push(this.tableData[i]);
        }
      }
    },
    searchTapi(){
      this.propertyForm.propertyM = "";
      this.propertyForm.propertyYapi = "";
      this.propertyForm.propertyTapi = "success";
      this.propertyForm.propertyAll = "";
      this.showTableData = [];
      this.filterForm.domain = "tapi";
      for (var i in this.tableData){
        if(this.filterForm.assert_code === "" && this.tableData[i].domain === this.filterForm.domain){
          this.showTableData.push(this.tableData[i]);
        }else if(this.tableData[i].assert_code === this.filterForm.assert_code && this.tableData[i].domain === this.filterForm.domain){
          this.showTableData.push(this.tableData[i]);
        }
      }
    },
    searchYapi(){
      this.propertyForm.propertyM = "";
      this.propertyForm.propertyYapi = "success";
      this.propertyForm.propertyTapi = "";
      this.propertyForm.propertyAll = "";
      this.showTableData = [];
      this.filterForm.domain = "yapi";
      for (var i in this.tableData){
        if(this.filterForm.assert_code === "" && this.tableData[i].domain === this.filterForm.domain){
          this.showTableData.push(this.tableData[i]);
        }else if(this.tableData[i].assert_code === this.filterForm.assert_code && this.tableData[i].domain === this.filterForm.domain){
          this.showTableData.push(this.tableData[i]);
        }
      }
    }
  },
  mounted() {

  },
  created() {
    this.searchCreated();
    this.searchAll();
    this.isBoth();

  },
}
</script>

<style scoped>

</style>