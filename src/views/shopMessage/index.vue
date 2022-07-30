<template>
<div class="b">
    <div class="center" >
  <div class="shoptop">
     <span>设置店铺信息</span>
  </div>
   <div  class="b-center">
    <el-form ref="form" :model="shop" label-width="80px">
      <el-form-item label="店铺名称">
        <el-input v-model="shopName"  style="width:80%;"></el-input>
      </el-form-item>
      <el-form-item label="店铺地址">
        <el-input v-model="shopSite" style="width:80%;" ></el-input>
      </el-form-item>
      <el-form-item label="店铺图片">
        <!--不能上传图片就是因为这个地址不对  -->
            <el-upload
            
                action="http://127.0.0.1:5000/api/uploadres"
                list-type="picture-card"
                name="file"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove" 
                :file-list="spuListImg"
                :on-success="handlerSuccessful"

              >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
      </el-form-item>
    </el-form>
  
   </div>
    <div class="enroll">
     <el-button type="primary">点击注册</el-button>
   </div>
  </div>
</div>
</template>

<script>
export default {
    name:"shopMassage",
    data() {
      return {
        shop:{},//收集店铺信息
        shopName:'',//店铺名称
        shopSite:'',//店铺地址
        shopLogo:'',//店铺logo
        // 图片上传信息
         dialogImageUrl: '',
        dialogVisible: false,
        //
        spuListImg:[]
      }
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
          //照片上传成功以后的进行调用
    handlerSuccessful(response, file, fileList) {
      //response：就是服务器上传成功以后的数据
      //file：上传成功的图片
      //fileList：图片上传以后全部的数据
      console.log(fileList[0].response.data);
      this.spuListImg = fileList;
    },
    },
}
</script>

<style  scoped>
.b{
  display: flex;
  justify-content: center;
}
  .center{
    width: 800px;
    height: 600px;
    border: 1px solid #999;
  }
  .b-center{
       margin-left: 100px;
       margin-top:50px ;
  }
  .shoptop{
    text-align: center;
    font-size: 30px;
    margin-top: 25px;
  }
  .enroll{
    text-align: center;
  }
</style>