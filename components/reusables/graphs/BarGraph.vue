<template>
  <canvas ref="ctx" id="bar" class="w-full"/>
</template>

<script lang="ts" setup>
import { Chart, ChartConfiguration, ChartData, ChartOptions, registerables } from 'chart.js'
import { ref, onMounted } from 'vue';

const ctx = ref(null);

const options: ChartOptions = reactive({
  responsive: true,
  aspectRatio: 5,
  scales: {
    x: {
      grid: {
        display: false
      }
    },
    y: {
      grid: {
        display: false
      }
    },
  }
})

const data: ChartData = reactive({
  labels: ['January', 'February', 'March', 'Apr', 'May', 'June', 'July', 'January', 'February', 'March', 'Apr', 'May', 'June', 'July', 'January', 'February', 'March', 'Apr', 'May', 'June', 'July'],
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  },
  {
    label: 'My Second Dataset',
    data: [5, 95, 20, 41, 16, 75, 80, 65, 65, 59, 80, 81, 56, 55, 40, 59, 80, 81, 56, 55, 40],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }],
})

const chartconfig: ChartConfiguration = {
  type: 'bar',
  data: data,
  options: options,
}

onMounted(() => {
  if (ctx !== null &&  ctx.value !== null) {
    Chart.register(...registerables);
    new Chart(ctx.value, chartconfig)
  }
});

</script>