<template>
<div>
  <el-row>
    <el-col :span="2">
      <span @click="returnBack">
        <el-link :underline="false" type="primary"><i class="el-icon-back">上一页</i></el-link>
      </span>
    </el-col>
    <el-col :span="22" style="margin-top: 20px;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">
          <el-link target="_blank" :underline="false">首页</el-link>
        </el-breadcrumb-item>
<!--        <el-breadcrumb-item>{{router_title}}</el-breadcrumb-item>-->
<!--        <el-breadcrumb-item>接口列表</el-breadcrumb-item>-->
<!--        <el-breadcrumb-item v-if="path" :to="{path: path}">{{title}}</el-breadcrumb-item>-->
      </el-breadcrumb>
    </el-col>
  </el-row>


</div>
</template>

<script>
import routerList from '../../src/router';
const {options:{routes}}  = routerList;

console.log(`routerList: `,routes)
export default {
  name: "ReturnMenu",
  data(){
    return{
      current_path: '',
      routerList: routes,
      router_title: '',
    }
  },
  methods:{
    returnBack(){
      window.history.go(-1);
    }
  },
  created() {

    // this.current_path = this.$route.path;
    // console.log(this.$route.path);
    // for (var i in this.routerList){
    //   console.log(this.routerList[i]);
    //   console.log(this.routerList[i].path)
    //   if (this.routerList[i].path === this.$route.path.split("/")[-1]){
        // this.router_title = this.routerList[i].

  //     }
  //   }
  }
}
</script>

<style scoped>
.footer{
  background-color: lightsteelblue;
  color: #333;
  text-align: left;

}

</style>