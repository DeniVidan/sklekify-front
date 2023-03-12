<template>
  <div id="chart">
    <div>{{ post.name }}</div>
    <apexchart
      type="line"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apexchart>
    {{ series[0].data }}
    
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
export default {
  name: "ProgressChart",
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    post: Object
  },
  data() {
    return {
      /* reps: [], */
      series: [
        {
          name: this.post.name,
          data: [],
        },

      ],
      chartOptions: {
        chart: {
          height: 350,
          type: "line",
          dropShadow: {
            enabled: true,
            color: "#000",
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2,
          },
          toolbar: {
            show: false,
          },
        },
        colors: ["#77B6EA", "#545454"],
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: "smooth",
        },
        title: {
          text: "Average High & Low Temperature",
          align: "left",
        },
        grid: {
          borderColor: "#e7e7e7",
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        markers: {
          size: 1,
        },
        xaxis: {
          
          title: {
            text: "Month",
          },
          min: 1,
          max: 21,
        },
        yaxis: {
          title: {
            text: "Temperature",
          },
          min: 1,
          max: 10,
        },
        legend: {
          position: "top",
          horizontalAlign: "right",
          floating: true,
          offsetY: -25,
          offsetX: -5,
        },
      },
    };
  },
  methods: {
    repetitionSize(){
      console.log("hmmm: ", this.series[0].name)
/*       this.series[0].name = this.post.name
      console.log("names: ", this.series[0].name) */
      for(let i = 0; i < this.post.repetitions.length; i++){
        this.series[0].data.push(this.post.repetitions[i].number)

      }
     
      console.log("reps: ", this.series[0].data)

    }

  },

  mounted(){
    console.log("vjezba: ", this.post)
    this.repetitionSize()
  }
};
</script>

<style scoped></style>
