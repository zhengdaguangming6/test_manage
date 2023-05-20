<template>
  <div>
    <el-container>

      <el-header class="top-header" style="position: fixed;left: 0;right: 0;top: 0;bottom: 60px;z-index: 100;">
        <!--顶部菜单-->
          <el-menu mode="horizontal" text-color="#fff" background-color="gray" router>
            <el-menu-item index="1" :route="{name: 'Interface_list'}">接口列表</el-menu-item>
            <el-menu-item index="2" :route="{name: 'Bug_list'}">bug列表</el-menu-item>

            <el-submenu index="3" style="float: right;">
              <template slot="title">{{ username }}</template>
              <el-menu-item index="3-1">个人中心</el-menu-item>
              <el-menu-item @click="logOut()">
                <el-button type="text">退出登录</el-button>
              </el-menu-item>
            </el-submenu>
          </el-menu>
      </el-header>

      <div class="content">
        <el-container>

          <el-aside :width="isCollapse ? '64px' : '205px'">
            <div class="toggle-button" @click="toggleCollapse">
              <i class="el-icon-s-fold"></i>
              <i class="el-icon-s-unfold"></i>
            </div>
            <!--左侧菜单-->
            <el-menu :default-active="rootActiveRouter" class="el-menu-vertical-demo" @open="handleOpen"
                     @close="handleClose"
                     :collapse="isCollapse"
                     :collapse-transition="false"
                     background-color="#545c64"
                     text-color="#fff"
                     active-text-color="#ffd04b" style="height: 100vh; width: 205px;"
                     router>

              <!--               :default-active="rootActiveRouter" 默认选中对应的菜单选项-->
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-view"></i>
                  <span slot="title">线上问题反馈</span>
                </template>
                <el-menu-item index="Bug_list" :route="{name: 'Bug_list'}">bug列表</el-menu-item>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-s-order"></i>
                  <span slot="title">接口管理</span>
                </template>
                <el-menu-item index="Interface_list" :route="{name: 'Interface_list'}">接口列表</el-menu-item>
                <el-menu-item index="Interface_run" :route="{name: 'Interface_run'}">接口自动化</el-menu-item>
                <el-menu-item index="Interface_report_primary" :route="{name: 'Interface_report_primary'}">测试报告</el-menu-item>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span slot="title">测试工具</span>
                </template>
                <el-menu-item index="3-1">解码工具</el-menu-item>
                <el-menu-item index="3-2">URL解码</el-menu-item>
              </el-submenu>
            </el-menu>
          </el-aside>

          <el-container>
            <el-header class="sub_header">
              <ReturnMenu></ReturnMenu>
            </el-header>
            <el-main>
              <router-view></router-view>
            </el-main>

          </el-container>

        </el-container>
      </div>
    </el-container>

  </div>
</template>

<script>


import store from "@/store";
import router from "@/router";
import ReturnMenu from "@/components/ReturnMenu.vue";

export default {
  name: "layout",
  components: {
    ReturnMenu,
  },
  data() {
    return {
      isCollapse: false,  //是否折叠
      rootActiveRouter: "",  // 默认选中的菜单选项
      aa: "true",
      activeNames: ['1'],
      itemRouter: {},
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    logOut() {
      this.$confirm('是否退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.commit("logout");
        router.push({name: "Login"});
        this.$message({
          type: 'success',
          message: '退出登录!'
        });
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消退出登录'
        // });
      });


    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse   // 取反
    }
  },
  watch: {
    $router: function (to) {
      // 把跳转到的url路由赋值给this.rootActiveRouter，使对应的菜单选项默认选中
      this.rootActiveRouter = to.name
    }
  },
  mounted() {
    // 获取当前的所有路由
    this.rootActiveRouter = this.$route.matched[2].name
  },
  computed: {
    username() {
      return this.$store.state.username
    }
  },
  created() {
    this.axios.get("user/test/").then(res => {
      console.log("请求成功", res);
    }).catch(reason => {
      console.log('请求失败', reason);
    })
  }
}
</script>

<style scoped>

.el-menu.el-menu--horizontal {
  border-bottom: 0;
}

.el-header, .el-footer {
  background-color: gray;
  color: #333;
  text-align: left;
  line-height: 50px;
}

.el-aside {
  background-color: rgb(84, 92, 100);
  color: #333;
  text-align: left;
  /*line-height: 100px;*/
}

.el-main {
  background-color: white;
  color: #333;
  text-align: left;
  /*line-height: 160px;*/
  padding: 0 0 20px 0;
}

.toggle-button {
  /*// 添加背景颜色*/
  background-color: #4A5064;
  /*// 设置文本大小*/
  font-size: 10px;
  /*// 设置文本行高*/
  line-height: 24px;
  /*// 设置文本颜色*/
  color: #fff;
  /*// 设置文本居中*/
  text-align: center;
  /*// 设置文本间距*/
  letter-spacing: 0.2em;
  /*// 设置鼠标悬浮变小手效果*/
  cursor: pointer;
}

.sub_header {
  background-color: white;
}

.content {
  margin-top: 60px;
}



</style>