<template>
  <div  v-loading.fullscreen.lock="loading" >
    <div style="font-size:20px;margin:20px;" ><span>桌号管理</span></div>
    <div class="add_table_number" ><el-button type="primary" @click="add_table_number" >添加桌号</el-button></div>
     <div class="table_add" >
      <el-table :data="alltable" style="width: 80%" border  align="center">
        <el-table-column prop="time" label="创建时间" width="width" align="center" >
        </el-table-column>
        <el-table-column prop="table" label="桌号" width="width" align="center" >
        </el-table-column>
        <el-table-column prop="prop" label="桌面二维码" width="width" align="center" >
          <template slot-scope="{row,$index}" >
          <el-image style="width: 60px; height: 60px" :src="row.code"></el-image>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <!--    @size-change="handleSizeChange"
       -->
    <el-pagination
      @current-change="getAll_table"
      :current-page.sync="currentPage1"
      :page-size="10"
      layout="total, prev, pager, next"
      :total="table"
       align="center"
      >
    </el-pagination>
    </div>
    <div>
      <el-dialog
        title="请输入想要添加的桌号"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
        >
          <el-input v-model="table_number" placeholder="请输入桌号"></el-input>
          <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="add_table">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "tables",
  data() {
    return {
      loading:true, 
      dialogVisible:false,//添加桌号的回调函数
      table_number:'',//收集的桌号信息
      currentPage1:1,//显示现在分页器是第几页数据
      table:0,//显示一共的条数
      alltable:[],//显示后端传递来的全部的数据
    };
  },
  methods: {
    // 显示添加桌号回调
    add_table_number(){
        this.dialogVisible = true
    },
    // 点击确认添加回调
    async add_table(){
      if(this.table_number.length <= 0) return 
      let obj = {table:this.table_number}
      let result =  await this.$API.index.reqQrcode(obj)
      if(result.data.code == 200){
        this.$message({
          type:'success',
          message:'桌号添加成功'
        })
        this.dialogVisible = false;
        this.getAll_table();
      }
    },
    // 请求全部的桌号数据
    async getAll_table(page = 1){
      this.loading = true;
      let result =  await this.$API.index.reqGetqrcode(page);
      if(result.data.code == 200){
        this.alltable = result.data.data.result
        this.table = result.data.data.tatal
        this.loading = false
      }
    },
    // 点击确定的回调函数
    handleClose(done) {
      console.log('回调');
        done();
      }
  },
  mounted() {
    this.getAll_table();
  },
};
</script>

<style scoped >
  .add_table_number{
    display: flex;
    justify-content: flex-end;
    margin: 20px  ;
  }
  .table_add{
    margin-left: 120px;
  }
</style>