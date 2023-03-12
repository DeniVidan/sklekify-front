<template>
  <div id="chart">
    <apexchart
      v-if="chartReady"
      type="line"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apexchart>
    <!-- {{ series[0].data }} -->
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
export default {
  name: "ProgressChart",
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    post: Object,
  },
  data() {
    return {
      /* reps: [], */
      proba: "burek",
      chartReady: false,
      series: [
        {
          name: "Repetitions",
          data: [],
        },
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
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
        colors: ["#000000"],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
          colors: "#292929",
        },
        title: {
          text: this.post.name,
          style: {
            fontSize: "30px",
            fontFamily: "Roboto, sans-serif;",
          },
          align: "left",
        },
        grid: {
          borderColor: "#e7e7e7",
          row: {
            colors: ["#f3f3f3", "#f3f3f3"], // takes an array which will be repeated on columns
            opacity: 0.4,
          },
        },
        markers: {
          size: 0.5,
        },
        tooltip: {
          enable: true,
          x: {
            show: true,
            format: "dd MMM",
            formatter: (seriesName) => "Day " + seriesName,
            
          },

        },
        xaxis: {
          title: {
            text: undefined,
            style: {
              fontSize: "20px",
              fontFamily: "Roboto, sans-serif;",
            },
          },
          min: 1,
          max: null,
        },
        yaxis: {
          title: {
            text: "Repetitions",
            style: {
              fontSize: "20px",
              fontFamily: "Roboto, sans-serif;",
            },
          },

          min: 1,
          max: null,
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
    repetitionSize() {
      for (let i = 0; i < this.post.repetitions.length; i++) {
        this.series[0].data.push(this.post.repetitions[i].number);
      }

      console.log("--------------new exercise--------------");
    },

    setChart() {
      this.chartOptions.xaxis.max = this.post.repetitions.length;
      this.chartOptions.xaxis.title.text = "LAST 30 DAYS";
      this.series[0].data = this.series[0].data.slice(-30);
      this.chartOptions.yaxis.max = Math.max.apply(Math, this.series[0].data);

      console.log("max: ", this.chartOptions.xaxis.max);
      console.log("reps: ", this.series[0].data);

      /*       if (this.post.repetitions.length > 30) {
        this.chartOptions.xaxis.title.text = "LAST 30 DAYS";
        console.log("proba: ", this.chartOptions.xaxis.title.text);
      } else {
        this.chartOptions.xaxis.title.text = `LAST ${this.post.repetitions.length} DAYS`;
        console.log("proba: ", this.chartOptions.xaxis.title.text);
      } */
    },

    setXaxis() {
      if (this.post.repetitions.length > 30) {
        this.chartOptions.xaxis.title.text = "LAST 30 DAYS";
        console.log("proba: ", this.chartOptions.xaxis.title.text);
      } else {
        /*       else if(){

      } */
        this.chartOptions.xaxis.title.text = `LAST ${this.post.repetitions.length} DAYS`;
        console.log("proba: ", this.chartOptions.xaxis.title.text);
      }
    },
  },

  mounted() {
    //console.log("vjezba: ", this.post)
    this.repetitionSize();
    this.setChart();
    this.setXaxis();

    this.chartReady = true;
  },
};
</script>

<style scoped></style>
