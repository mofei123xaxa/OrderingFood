<template>
  <div id="shezhi" >
    <div class="title" ><span>店铺设置</span></div>
    <div class="content" >
      <div><el-button type="primary" class="btn" @click="toUpShop" >修改</el-button></div>
      <div class="contentList" v-loading="loading" >
        <div>
          <span>店铺名称：{{user.name}}</span>
        </div>
        <div>
          <span>店铺地址：{{user.address}}</span>
        </div>
        <div  >
          <span>
            店铺logo：
            <el-upload
            style=" display: inline-block;"
                action="http://127.0.0.1:5000/api/uploadres"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :file-list="urlList"
                >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
        name:"set-up",
        data() {
          return {
              user:{},//获取商家信息接口
              // 上传图片需要的数据
               dialogImageUrl: '',
               dialogVisible: false,
               urlList:[], //收集后端传送来的数据
               loading:true
          }
        },
        methods:{
          // 上传图片需要的回调
           handleRemove(file, fileList) {
            console.log(file, fileList);
          },
          handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
          },
          // 获取商家信息接口
          async getShopList(){
            let result = await this.$API.index.reqObtainshop();
            if(result.data.code == 200){
              this.user = result.data.data[0]
              let urls = {name:this.user.logo[0].uid,url:this.user.logo[0].url}
              this.urlList.push(urls)
              this.loading = false
            }
          },
          // 去往商品修改页面
          toUpShop(){
            this.$router.push({name:'shopMessage',query:'修改'})
          }
        },
        mounted() {
          this.getShopList();
        },
}
</script>

<style scoped >
  .title{
    font-size: 30px;
   
    text-align: center;
  }
  .content{
    position: relative;
  }
  .content .btn{
        position: absolute;
        right: 150px;
        top: -30px;
  }
  .contentList{
    font-size: 18px;
    margin: 80px;
  }
  .contentList div{
    margin: 30px;
  }
  /* .shezhi{
    height: 800vh;
  } */
</style>