<template>
  <div id="myChart" ></div>
</template>

<script>
export default {
  name: 'echarts',
  data () {
    return {
      msg: ''
    }
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      let option = {
        dataset: {
          dimensions: ['score', 'amount', 'year'],
          source: [
            {score: 189.3, amount: 582, year: '2011'},
            {score: 289.3, amount: 122, year: '2012'},
            {score: 389.3, amount: 82, year: '2013'},
            {score: 89.3, amount: 182, year: '2014'},
            {score: 149.3, amount: 282, year: '2015'},
            {score: 169.3, amount: 382, year: '2016'}
          ]
        },
        xAxis: {type: 'category'},
        yAxis: {type: 'value'},
        series: [
          {
            type: 'bar',
            encode: {
              // 将 "amount" 列映射到 X 轴。
              x: 'year',
              // 将 "product" 列映射到 Y 轴。
              y: 'amount'
            }
          },
          {
            type: 'line',
            smooth: true,
            encode: {
              // 将 "amount" 列映射到 X 轴。
              x: 'year',
              // 将 "product" 列映射到 Y 轴。
              y: 'score'
            }
          }
        ]
      }
      // 绘制图表
      myChart.setOption(option)
    }
  }
}
</script>

<style scoped>

</style>
