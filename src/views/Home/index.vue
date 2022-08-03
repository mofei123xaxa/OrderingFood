<template>
  <div>
    <!-- 顶部区域 -->
    <el-container>
      <el-header class="homeTop">
        <span>{{ name }}</span>
        <span><button>退出</button></span>
      </el-header>
      <!-- 左边栏||中间路由 -->
      <el-container class="homeCenter" >
        <el-aside width="180px">
           <el-menu
          :default-active="highlighted"
          class="el-menu-vertical-demo"
          >
         <div v-for="(item,index) in sidebar" :key="item.id" @click="toDetails(item)" >
           <el-menu-item :index="item.id">
            <i :class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
         </div>
        </el-menu>
        </el-aside>
        <!-- 中间路由 -->
        <el-container >
          <el-main>
            <el-card>
                  <router-view  ></router-view>
            </el-card>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      name: "饭庄",
      activeIndex: "菜单",// 侧边栏需要的数据
      listName:'',//现在是处于那个路由的
      highlighted:'',//默认高亮的数据
      sidebar: [{
						id: '1',
						icon: 'el-icon-s-data',
						title: '数据分析',
						router: 'Index',
						tip: 'shuju',
						Subclass: []
					},
					{
						id: '2',
						icon: 'el-icon-bank-card',
						title: '订单管理',
						router: 'Order',
						tip: 'dingdan',
						Subclass: []
					},
					{
						id: '3',
						icon: 'el-icon-tableware',
						title: '菜品管理',
						router: 'Dishes',
						tip: 'caiping',
						Subclass: []
					},
					{
						id: '4',
						icon: 'el-icon-menu',
						title: '菜品类目',
						router: 'Category',
						tip: 'leimu',
						Subclass: []
					},
					{
						id: '5',
						icon: 'el-icon-takeaway-box',
						title: '桌号管理',
						router: 'Tables',
						tip: 'zhuohao',
						Subclass: []
					},
					{
						id: '6',
						icon: 'el-icon-setting',
						title: '店铺设置',
						router: 'Set-up',
						tip: 'shezhi',
						Subclass: []
					}
				]
    };
  },
  methods: {
    // 点击菜单栏需要的回调函数
    menuSelect() {
      console.log("111");
    },
    // 
    handleOpen(){

    },
    // 去往那个页面的详情
    toDetails(item){
      if(item.router != this.listName){
         localStorage.setItem('id',item.id)
        this.highlighted = localStorage.getItem('id')
        this.listName = item.router
        this.$router.push({name:item.router})
      }
    },
  },
  // created(){
  //   localStorage.setItem('id','1')
  // },
  mounted(){
    //获取店铺名称,并且进行展示
    this.name = localStorage.getItem('nuvmenuid')
    // this.$router.push({name:'home'})
        this.highlighted = localStorage.getItem('id')

  },
  beforedestroy() {
    localStorage.removeItem('id')
  },
};
</script>

<style scoped >
.homeTop {
  width: 100%;
  height: 50px;
  background: pink;
}
.homeCenter{
  height: 90vh;
}
/* 
    <div class="homeTop" >
      <span>{{}}</span>
      <span>退出</span>
    </div>
    <div class="homeLeft" ></div>
    <div class="homeRouter" ></div>
    */
.el-header,
.el-footer {
  /* background-color: #B3C0D1; */
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  /* text-align: center; */
  /* line-height: 160px; */
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.homeTop {
  position: relative;
  background: #b3c0d1;
}
.homeTop span:nth-child(1) {
  position: absolute;
  left: 80px;
}
.homeTop span:nth-child(2) {
  position: absolute;
  right: 15px;
}
.homeTop button {
  width: 50px;
  height: 30px;
}
.homeLeft {
  text-align: center;
}
</style>
