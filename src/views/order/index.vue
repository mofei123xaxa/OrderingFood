<template>
  <div   v-loading.fullscreen.lock="loading">
    <!-- 上方头部的数据 -->
    <div>
      <div style="font-size: 22px; margin-bottom: 15px">
        <span>订单管理</span>
      </div>
      <div>
        <span>交易状态：</span>
        <el-select v-model="queryOrder" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.state"
          >
          </el-option>
        </el-select>
        <el-button style="margin: 20px" @click="queryList" >查询</el-button>
      </div>
    </div>
    <!-- 下方具体的订单信息 -->
    <div>
      <div class="uppage">
        <el-badge :value="order_number" class="item">
                <el-button @click="upPage"  >刷新页面</el-button>

      </el-badge>
      </div>
      <el-table :data="orderAll" style="width: 100%" border>
        <el-table-column prop="order_tiem" label="交易时间" width="width" align="center" >
        </el-table-column>
        <el-table-column prop="table_number" label="桌号" width="width" align="center" >
        </el-table-column>
        <el-table-column prop="number_of_diners" label="用餐人数" width="width" align="center" >
        </el-table-column>
        <el-table-column prop="prop" label="菜单详情" width="120px" >
          <template slot-scope="{row,$index}" >
              <el-button size="mini" @click="detailed_menu(row,$index)" >详细菜单</el-button>
              <el-dialog
                title="详细菜单数据"
                :visible.sync="dialogVisible"
                width="25%"
                >
                  <div class="itemorder" v-for="(item,index) in detailedList" >
                    <span>第{{detailedList.length - index}}次提交</span>
                    <div class="itemordercenter"  v-for="(value,index) in item.good_list" >
                      <span>{{value.name}}</span>
                      <span>{{value.quantity}}份</span>
                    </div>
                  </div>
                </span>
              </el-dialog>
          </template>
        </el-table-column>
        <el-table-column prop="sett_amount" label="交易金额（元）" width="width" align="center" >
        </el-table-column>
        <el-table-column prop="prop" label="交易状态" width="width" align="center" >
          <template slot-scope="{row,$index}" >
            <el-button type="warning" size="mini" v-if="row.order_receiving != 'rec_order'" @click="leave_for_order(row)" >待接单</el-button>
            <!-- <el-button  size="mini" v-else >已接单</el-button> -->
            <el-button type="success" size="mini" @click="wait_settle_accounts(row,$index)" v-if="row.transac_status != 'success'" >待结账</el-button>
            <el-button  size="mini" v-else >已结账</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <div style="margin-top:20px;">
          <!-- @size-change="handleSizeChange" -->
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage1"
          :page-size="10"
          layout="total, prev, pager, next"
          :total="this.tatal"
          align="center"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "order",
  data() {
    return {
      loading:true,
      // 头部表单
      form: {},
      queryOrder: "", //向服务器中请求相关数据
      // 下方具体的数据
      data: [],
      options: [
        {
          id: "001",
          name: "已完成",
          state: "success",
        },
        {
          id: "002",
          name: "未完成",
          state: "unsettled",
        },
      ],
      page: 1, //存储现在是那一页的数据
      transac_status: "", //这是查询什么状态的数据
      orderAll: [],//存储全部数据
      tatal: 0,//显示全部数据条
      currentPage1:1,//现在是分页器的第几页
      detailedList:[],//存储详细数据
      dialogVisible:false,//显示全部菜品的数据
      order_number:0,//显示有几条小程序传来的订单数据
    };
  },
  methods: {
    //获取全部的订单数据
    async getAllorder(page = 1,transac_status = '') {
      this.loading = true
      let result = await this.$API.index.reqOrder(
        page,
        transac_status
      );
      if (result.data.code == 200) {
        this.orderAll = result.data.data.result;
        this.tatal = result.data.data.tatal;
        this.loading = false
      }
    },
    // 点击分页以后会触发
    handleCurrentChange(page){
      this.getAllorder(page)
    },
    // 查询已完成||未完成
    queryList(){
      if(this.queryOrder.length == 0)return false
      this.getAllorder(1,this.queryOrder)
    },
    // 获取详细菜单的数据
    async detailed_menu(row,$index){
      let result =  await this.$API.index.reqvieworder(row._id)
      if(result.data.code == 200){
          this.detailedList = result.data.data
      }
      // 显示
      this.dialogVisible = true
    },
    // 点击接单
    async leave_for_order(row){
      let result =  await this.$API.index.reqreceiving(row._id);
      if(result.data.code == 200){
        this.$message({
          type:'success',
          message:'已接单'
        })
        this.getAllorder();
      }
    },
    // 待结账回调函数
    async wait_settle_accounts(row,$index){
      console.log(row);
      const {_id,sett_amount,order_no,_openid} = row
      let result =  await this.$API.index.reqcheckout(_id,_openid,sett_amount,order_no);
     if(result.data.code == 200){
        this.$message({
          type:'success',
          message:'结账成功'
        })
        this.getAllorder();
     }
    },
    // 刷新页面回调函数
    upPage(){
      localStorage.setItem('order_num',0) 
      this.$store.commit('ling',0)
      this.loading = true
      this.getAllorder(1);

    }
  },
  mounted() {
    // 获取全部的订单数据
    this.getAllorder();
    // 获取本地数据
    this.order_number = localStorage.getItem('order_number')
  },
  watch:{
    // 监视小程序传递来的几条订单信息
    "$store.state.order"(newVal){
      this.order_number = newVal;
    }
  }
};
</script>

<style scoped >
.uppage {
  display: flex;
  margin-bottom: 15px;
  margin-right: 30px;
  justify-content: flex-end;
}
.itemorder{

  margin: 20px 20px;

}
.itemordercenter{
  display: flex;
  justify-content: space-between;
  /* margin-top:15px ; */
}
</style>