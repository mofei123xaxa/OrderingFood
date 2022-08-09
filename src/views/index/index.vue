<template>
  <div v-loading.fullscreen.lock="loading" >
    <div style="margin-bottom: 30px; font-size: 20px">
      <span>最近七天的销售额</span>
    </div>
    <div  >
      <div id="container"></div>
    </div>
  </div>
</template>

<script>
import { Column } from "@antv/g2plot";
export default {
  name: "index",
  data() {
    return {
     loading:true
    };
  },
  methods: {
    // 获取前七天数据
    async getHebdomadSell(){
      this.loading = true
        let result =  await this.$API.index.reqsalesvolume();
        console.log(result);
        this.house(result.data.data)
        this.loading = false
    },
    house(data) {
      const columnPlot = new Column("container", {
        data,
        xField: "time",
        yField: "sales_valume",
        label: {
          // 可手动配置 label 数据标签位置
          position: "middle", // 'top', 'bottom', 'middle',
          // 配置样式
          style: {
            fill: "#FFFFFF",
            opacity: 0.6,
          },
        },
        xAxis: {
          label: {
            autoHide: true,
            autoRotate: false,
          },
        },
        meta: {
          time: {
            alias: "时间",
          },
          sales_valume: {
            alias: "销售额",
          },
        },
      });
      columnPlot.render();
    },
  },
  mounted() {
    this.getHebdomadSell();
  },
};
</script>

<style>
</style>