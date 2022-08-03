<template>
  <div v-loading.fullscreen.lock="loading">
    <div v-show="!showFood">
      <!-- 标题 -->
      <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>菜品管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 添加按钮 -->
      <div class="dishesAdd">
        <el-button class="add" @click="addFood">添加菜品</el-button>
      </div>
      <div class="dishesCenter">
        <el-table :data="dishlist" style="width: 80%" border>
          <el-table-column
            prop="time"
            label="创建时间"
            width="width"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="category"
            label="类目"
            width="width"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="菜品名称"
            width="width"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="prop"
            label="菜品图片"
            width="width"
            align="center"
          >
            <template slot-scope="{ row }">
              <el-image
                style="width: 50px; height: 50px"
                :src="row.image[0].url"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column
            prop="unitprice"
            label="价格（元）"
            width="width"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="prop"
            label="操作"
            width="width"
            align="center"
          >
          <!--  slot-scope="{ row, $index } " -->
            <template slot-scope="{ row, $index } ">
              <el-button
                size="mini"
                :disabled="!row.onsale"
                @click="addFood(row, $index)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                v-if="row.onsale"
                @click="soldOut(row)"
                >下架</el-button
              >
              <el-button
                size="mini"
                type="success"
                v-else
                @click="soldOutTrue(row)"
                >已下架</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页器
       @size-change="handleSizeChange"
       -->
      <div class="block">
        <el-pagination
          :current-page.sync="currentPage1"
          :page-size="10"
          layout="total, prev, pager, next"
          :total="tatal"
          align="center"
          @current-change="getDish"
        >
        </el-pagination>
      </div>
    </div>
    <AddFoot v-if="showFood" @showDish="showDish" :row="row" />
  </div>
</template>

<script>
import AddFoot from "../../components/AddFoot.vue";
export default {
  name: "dishes",
  components: { AddFoot },
  data() {
    return {
      loading: false, //给一个loading效果
      currentPage1: 1, //显示现在的页数
      data: [
        {
          name: "11",
        },
        {
          name: "22",
        },
      ], //具体的数据
      showFood: false, //控制显示添加页面
      dishlist: [], //获取存储的菜单信息内容
      tatal: 0, //获取几条数据
      row: {}, //向添加数据页面传递的数据
    };
  },
  methods: {
    // 添加菜品种类 || 修改菜品内容
    addFood(row, $index) {
      this.row = this.dishlist[$index];
      this.showFood = true;
    },
    // 显示主页面
    showDish(trues) {
      this.showFood = trues;
    },
    // 获取菜品全部信息
    async getDish(page = 1) {
      this.loading = true;
      let result = await this.$API.index.reqGetDish(page);
      if (result.data.code == 200) {
        this.dishlist = result.data.data.result;
        this.tatal = result.data.data.tatal;
        this.loading = false;
      }
    },
    // 下架商品
    async soldOut(row) {
      let result = await this.$API.index.reqSoldOut(row._id, row.uid);
      if (result.data.code == 200) {
        this.$message({
          type: "warning",
          message: "下架成功",
        });
        this.getDish();
      }
    },
    // 上架商品
    async soldOutTrue(row) {
      console.log('上架');
      let result = await this.$API.index.reqSoldOuttrue(row._id, row.uid);
      if (result.data.code == 200) {
        this.$message({
          type: "success",
          message: "上架成功",
        });
        this.getDish();

      }
    },
  },
  mounted() {
    // 获取全部的菜单信息
    this.getDish();
  },
};
</script>

<style  scoped>
.dishesCenter {
  display: flex;
  justify-content: center;
  margin: 100px 50px;
}
.dishesAdd {
  position: relative;
}
.dishesAdd .add {
  position: absolute;
  top: 10px;
  right: 50px;
}
</style>