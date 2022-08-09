<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    // localStorage.setItem('id',1)
    let sub_message_a = localStorage.getItem('order_num')
    if(!sub_message_a || sub_message_a < 1 ){
        localStorage.setItem('order_num',0)
    }
    //1、建立连接
    this.goeasy.connect({
      id: "", //pubsub选填，im必填，最大长度60字符
      data: {}, //必须是一个对象，pubsub选填，im必填，最大长度300字符，用于上下线提醒和查询在线用户列表时，扩展更多的属性
      onSuccess: () => {
        //连接成功
        console.log("连接成功"); //连接成功
        this.sub_message();
      },
      onFailed: function (error) {
        //连接失败
        console.log(error);
      },
      onProgress: function (attempts) {
        //连接或自动重连中
        console.log("连接成功");
      },
    });
  },
  methods: {
    // 2、接收消息
    sub_message() {
      var pubsub = this.goeasy.pubsub;
      pubsub.subscribe({
        channel: "my_channel", //替换为您自己的channel
        onMessage:(message)=>{
          // 成功以后会进行调用，只是发送消息说明自己被调用。没有什么别的内容
          let sub_message_s = localStorage.getItem('order_num');
          localStorage.setItem('order_num',Number(sub_message_s) + 1);
          let sub_message_b = localStorage.getItem('order_num');
          this.$store.dispatch('order',Number(sub_message_b))
        },
        onSuccess: ()=>{
          console.log("Channel订阅成功。");
        },
        onFailed: function (error) {
          console.log(
            "Channel订阅失败, 错误编码：" +
              error.code +
              " 错误信息：" +
              error.content
          );
        },
      });
    },
  },
  beforeDestroy(){
    localStorage.setItem('id',1)
  }
};
</script>




<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
* {
  margin: 0;
  padding: 0;
}
</style>
