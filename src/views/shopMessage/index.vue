<template>
<div class="b" v-loading.fullscreen.lock="loading" >
    <div class="center" >
  <div class="shoptop">
     <span>设置店铺信息</span>
  </div>
   <div  class="b-center">
    <el-form ref="form" :model="shop" label-width="80px"   >
      <el-form-item label="店铺名称">
        <el-input v-model="shopName"  style="width:80%;"></el-input>
      </el-form-item>
      <el-form-item label="店铺地址">
        <el-input v-model="shopSite" style="width:80%;" ></el-input>
      </el-form-item>
      <el-form-item label="店铺图片">
        <!--不能上传图片就是因为这个地址对不对  -->
            <el-upload
                action="http://127.0.0.1:5000/api/uploadres"
                list-type="picture-card"
                name="file"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove" 
                :file-list="spuListImg"
                :on-success="handlerSuccessful"
                :limit="1"
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
     <el-button type="primary" @click="upShop" v-if="addUpShop" :v-loading="loading" >点击修改</el-button>
     <el-button type="primary" @click="upShop" v-else :v-loading="loading"  >点击添加</el-button>
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
        spuListImg:[],
        // 判断是否是从修改页面转跳
        upshopList:'',
        addUpShop:false, //显示修改页面还是添加页面
        loading:false
      }
    },
    methods: {
      // 删除成功以后的回调函数
        handleRemove(file, fileList) {
        this.spuListImg = []
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
      console.log(fileList[0]);
      this.spuListImg.push({url:fileList[0].response.data,uid:fileList[0].uid})
    },
    // 点击登录的回调函数
    async upShop(){
      
      if(this.shopName.trim() == ''){
        this.$message({
          type:'warning',
          message:'请输入店铺名称'
        })
        return false
      }
      if(this.shopSite.trim() == ''){
        this.$message({
          type:'warning',
          message:'请输入店铺地址'
        })
        return false
      }
      if(this.spuListImg.length <= 0){
        this.$message({
          type:'warning',
          message:'请输入店铺logo'
        })
        return false
      }
      this.loading = true
      // 进行数据整理
      let obj = {id:'8f75309d62e516240f8f773442fac764',name:this.shopName,address:this.shopSite,logo:JSON.stringify(this.spuListImg)};
      if(this.upshopList){
        // 修改数据
          let upResult = await this.$API.index.reqUpdateshop(obj)
          if(upResult.data.code == 200){
            this.$message({
              type:'success',
              message:'商家数据修改成功'
            })
            this.$router.push({name:'home'})
            this.loading = false
          }

      }else{
        // 添加数据
        let result =  await this.$API.index.requpShop(obj);
        if(result.data.code == 200){
          this.$message({
            type:'success',
            message:'数据添加成功'
          })
            this.loading = false

          this.$router.push({name:'home'})
      }else{
        this.$message({
            type:'warning',
            message:'数据添加失败，请重新尝试'
          })
      }
      }
      
    }
    },
    mounted() {
      // 获取上一个页面传递来的数据，是否是空 或是修改
      
      if(Object.keys(this.$route.query).length > 0){
      this.upshopList = this.$route.query
      }
    },
    watch:{
        async upshopList(){
          let result =  await this.$API.index.reqObtainshop()
          if(result.data.code == 200){
            this.shopName = result.data.data[0].name
            this.shopSite = result.data.data[0].address
            let url = {name:'shuju',url:result.data.data[0].logo[0].url}
            this.spuListImg.push(url)
            this.addUpShop = true
          }
        }
    }
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