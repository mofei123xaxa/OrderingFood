<template>
  <div v-loading.fullscreen.lock="loading">
    <!-- 标题 -->
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>菜品管理</el-breadcrumb-item>
        <el-breadcrumb-item>添加菜品</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form ref="form" :model="form" label-width="80px" class="footForm">
      <!-- 添加类目 -->
      <el-form-item label="菜品类目" class="footFormItem">
        <el-select v-model="DishValue" placeholder="请选择菜品类目">
          <el-option
            v-for="item in DishList"
            :key="item.uid"
            :label="item.value"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 菜品名称 -->
      <el-form-item label="菜品名称" class="footFormItem">
        <el-input v-model="footName" placeholder="请输入菜品名称"></el-input>
      </el-form-item>
      <!-- 菜品价格（元） -->
      <el-form-item label="菜品价格" class="footFormItem">
        <el-input
          v-model="footMoney"
          placeholder="请输入菜品价格"
          style="width: 200px; padding-right: 20px"
        ></el-input>
        <el-select v-model="value" placeholder="请选择菜品单位">
          <el-option
            v-for="item in DishMoney"
            :key="item.uid"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-input
          v-model="AddDishunits"
          placeholder="请输入你需要的单位"
          style="width: 230px; margin: 0 15px"
        ></el-input>
        <el-button type="primary" style="width: 150px" @click="addDishunit"
          >添加自定义单位</el-button
        >
      </el-form-item>
      <!-- 菜品图片 -->
      <el-form-item label="菜品图片" class="footFormItem">
        <el-upload
          action="http://127.0.0.1:5000/api/uploadres"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="uploadImage"
          :file-list="goodsimage"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
        <el-button
          type="primary"
          style="margin-top: 30px"
          @click="addDishFoot"
          >{{ id ? "修改菜品" : "添加菜品" }}</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "AddFoot",
  props: ["row"],
  data() {
    return {
      loading: false,
      // 上传图片
      dialogImageUrl: "",
      dialogVisible: false,
      value: "", // 下拉菜单
      footName: "", //菜品名称
      form: {}, //收集form的总数据
      DishMoney: [], //获取菜品单位
      AddDishunits: "", //自定义添加菜品单位
      DishList: [], //获取全部类目名称
      DishValue: '', //获取选择的商品类目uid
      goodsimage: [], //收集上传图片以后的数据
      id: "", //自身的id就是一个空值
      footMoney: "", //收集的菜品价格
      ListImsge: [], //预览图片数据
      UidValue:{},//获取uid||value的数据
    };
  },
  methods: {
    // 上传图片需要的回调函数
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 上传图片成功的钩子
    uploadImage(response, file, fileList) {
      this.goodsimage.push({
        uid: fileList[0].uid,
        url: fileList[0].response.data,
      });
    },
    // 获取菜品单位
    async getDishMoney() {
      let result = await this.$API.index.reqDishMoney();
      if (result.data.code == 200) {
        this.DishMoney = result.data.data;
      }
    },
    // 添加需要的菜品单位
    async addDishunit() {
      if (this.AddDishunits.trim().length > 0) {
        let obj = { unit: this.AddDishunits.trim() };
        let result = await this.$API.index.reqAddDish(obj);
        if (result.data.code == 200) {
          this.$message({
            type: "success",
            message: "单位添加成功",
          });
          this.getDishMoney();
        } else {
          this.$message("单位已经存在");
        }
      } else {
        this.$message("请输入菜品内容");
      }
    },
    // 获取全部类目名称
    async getDishList() {
      let result = await this.$API.index.reqobtaincate();
      if (result.data.code == 200) {
        this.DishList = result.data.data.result;
      }
    },
    // 添加菜品
    async addDishFoot() {
      if (
        this.DishList.length != 0 &&
        this.footName != "" &&
        this.value != "" &&
        this.footMoney != "" &&
        this.goodsimage.length != 0
      ) {
        this.loading = true;
        // this.getUidValue();
        let cate = this.DishList.filter((item)=>  item.value == this.DishValue);
        let DishValue = cate.length == 0 ?'':cate[0].uid
        let obj = {
          id: this.id,
          category: this.DishValue,
          name: this.footName,
          unitprice: this.footMoney,
          unit: this.value,
          image: JSON.stringify(this.goodsimage),

          value: DishValue,
        };
        if (!this.id) {
          // 添加菜品
          let result = await this.$API.index.reqAdddishes(obj);
          if (result.data.code == 200) {
            this.$message({
              type: "success",
              message: "菜品添加成功",
            });
            this.loading = false;
            this.$emit("showDish", false);
          }
        } else {
          // 修改菜品
          let upresult = await this.$API.index.reqUpDish(obj);
          console.log(upresult);
          if (upresult.data.code == 200) {
            this.$message({
              type: "success",
              message: "菜品修改成功",
            });
            this.loading = false;
            this.$emit("showDish", false);
          }
        }
      } else {
        this.$message("数据请添加完整 ");
      }
    },
    // 获取从主页面传递来的数据
    getDishListFoot() {
      if (this.row) {
        this.DishValue = this.row.category;
        this.footName = this.row.name;
        this.footMoney = this.row.unitprice;
        this.value = this.row.unit;
        let image = this.row.image[0];
        this.goodsimage.push({
          name: image.uid,
          url: image.url,
          uid: image.uid,
        });
        // 添加修改数据需要的数据
        this.id = this.row._id;
      }
    },
  },
  mounted() {
    // 获取菜品单位
    this.getDishMoney();
    // 获取已经存在的商品类目
    this.getDishList();
    // 接收主页面传递来的数据
    this.getDishListFoot();
  },
};
</script>

<style scoped >
.footForm {
  margin: 50px;
}
.footFormItem {
  margin: 35px;
}
</style>