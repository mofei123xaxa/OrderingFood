<template>
  <div class="login">
    <div class="center">
      <span class="top">扫码点单客户端</span>
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        style="margin-left: 80px"
      >
        <el-form-item label="账户">
          <el-input
            v-model="form.account"
            size="mini"
            style="width: 200px"
            @change="verifyPhone"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="form.password"
            show-password
            size="mini"
            style="width: 200px"
            @change="verifypassWord"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="dianji">
        <el-button @click="goToShop" :loading="loading">点击登录</el-button>
      </div>
      <div class="below">
        <el-button>注册</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      form: {
        account: "15639489833", // 手机号
        password: "16156161mhcao", //密码
      }, //最外边的form

      loading: false, //点击以后有一个转圈效果
    };
  },
  methods: {
    // 进行判断是否是第一次登录，如果是第一次登录就直接定向到店铺信息模块
    //不是第一次登录就直接定位到首页就好
    async goToShop() {
      this.loading = true;
      //登录接口
      let result = await this.$API.index.reqLogin(this.form);
      console.log(result);
      if (result.data.code == 200) {
        // 存储登录token
        localStorage.setItem("token", result.data.data.token);
        this.$message({
          type: "success",
          message: "登录成功",
        });
        let user = await this.$API.index.reqObtainshop();
        // 这个存储ids
        let ids = user.data.data[0].name;
        localStorage.setItem("nuvmenuid", JSON.parse(JSON.stringify(ids)));
        this.loading = false;
        // 去往修改店铺信息页面,应该是再进行判断一次
        try {
          let loginShop = await this.$API.index.reqObtainshop();
          // 判断信息库中是否有信息，有的话就直接转跳到首页，没有就直接转跳到信息注册页面
          if (loginShop.data.data.length == 0) {
            this.$router.push({ name: "shopMessage" });
          } else {
            localStorage.setItem("company", loginShop.data.data[0].name);
            this.$router.push({ name: "home" });
          }
        } catch (error) {
          return Promise.reject(error);
        }
        // this.$router.push({name:'shopMessage'})
      } else if (result.data.code != 200) {
        this.$message({
          type: "error",
          message: "检测密码和账号是否正确",
        });
      }
      // this.$router.push({
      //   name:'shopMessage',
      //   query:111,
      // })
    },
    // 验证手机号是否符合要求是否符合要求
    verifyPhone() {
      let phone = /^1[3456789]\d{9}$/;
      if (!phone.test(this.form.account.trim())) {
        return this.$message("请正确输入11位手机号");
      }
    },
    // 验证密码是否符合要求
    verifypassWord() {
      // 6-16位数字字母组合
      let passWord = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
      if (!passWord.test(this.form.password.trim())) {
        return this.$message("请输入6-16位数字与字母组合");
      }
    },
  },
};
</script>

<style scoped >
* {
  margin: 0;
  padding: 0;
}
.login {
  margin: 0;
  padding: 0;
  height: 690px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1114%2F102920105033%2F201029105033-6-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1661616895&t=4ca75d8aef9afec542985cd5a51c6b41");
  background-size: 100%;
}
.center {
  width: 500px;
  height: 300px;
  background: #fafad2;
  position: relative;
}
.dianji {
  width: 200px;
  height: 25px;
  margin-top: 15px;
  margin-left: 160px;
}
.dianji button {
  width: 100%;
  height: 100%;
}
.top {
  display: flex;
  justify-content: center;
  font-size: 25px;
  margin: 25px;
}
.below {
  position: relative;
}
.below button {
  width: 200px;
  height: 25px;
  position: absolute;
  top: 20px;
  left: 161px;
}
</style>