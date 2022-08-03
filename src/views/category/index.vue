<template>
  <div v-loading.fullscreen.lock="loading" class="Category">
    <div class="CategoryTitle"><span>菜品类目</span></div>
    <div class="addCategory">
      <el-button @click="centerDialogVisible = true">添加类目</el-button>
    </div>
    <el-card class="categoryContent">
      <div class="content">
        <span>类目id</span>
        <span>类目</span>

      </div>
      <div class="content" v-for="(item,index) in categoryList" :key="item.uid" >
        <span>{{item.uid}}</span>
        <span>{{item.value}}</span>
      </div>
    </el-card>
    <!-- 点击添加类目 -->
    <el-dialog
      title="添加类目"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <el-form ref="form" :model="forms" label-width="80px">
        <el-input
          v-model="forms.category"
          placeholder=""
          ref="categoryInput"
        ></el-input>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addcategory">确 定</el-button>
      </span>
    </el-dialog>
    <el-pagination
      class="paging"
      style="text-align: center;"
      :page-size="10"
      :pager-count="11"
      layout="prev, pager, next"
      :total="tatal"
      @current-change="uppage"
      :current-page="page"
    >
    
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "category",
  data() {
    return {
      // loading效果
      loading: true,
      centerDialogVisible: false, //添加类目遮罩层
      forms: {
        category: "", //收集添加类目名称
      },
      page:1,//显示现在是第几页
      categoryList:[],//存储从服务器返回的类目
      tatal:0
    };
  },
  methods: {
    // 添加类目
    async addcategory() {
      if (this.forms.category.length > 0) {
        // this.$refs.categoryInput.focus();
        let result = await this.$API.index.reqCategory(this.forms);
        if (result.data.code == 200) {
          this.$message({
            type: "success",
            message: "类目添加成功",
          });
          this.centerDialogVisible = false
          this.uppage();
        }
      } else {
        this.$message("请输入菜品名称");
      }
    },
    // 改变当前页数
    // 使用的是阉割版
    async uppage(page){
       let result =  await this.$API.index.reqobtaincate();
       if(result.data.code == 200){
            this.categoryList = result.data.data.result
            this.tatal = result.data.data.tatal
            this.loading = false
       }
    }
  },
  mounted() {
    // 获取商家类目
    this.uppage();
  },
};
</script>

<style scoped >
.Category {
  position: relative;
}
.CategoryTitle {
  text-align: center;
  font-size: 25px;
}
.categoryContent {
  width: 600px;
  margin: 60px 0 0 290px;
}
.addCategory {
  position: absolute;
  top: 0;
  right: 20px;
  margin: 30px;
}
.content {
  display: flex;
  justify-content: space-around;
  margin: 20px 0 ;
}
.paging{
  margin:40px 0 ;
}
</style>