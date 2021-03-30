<template>
  <div>
    <el-main>
      <div class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-xl-3 col-md-6">
              <stats-card>
                <div slot="header" class="icon-warning">
                  <i class="nc-icon nc-chart text-warning"></i>
                </div>
                <div slot="content">
                  <p class="card-category">Ca đã cứu</p>
                  <h4 class="card-title">20</h4>
                </div>
                <div slot="footer">
                  <i class="fas fa-file-alt"></i>
                </div>
              </stats-card>
            </div>

            <div class="col-xl-3 col-md-6">
              <stats-card>
                <div slot="header" class="icon-success">
                  <i class="nc-icon nc-light-3 text-success"></i>
                </div>
                <div slot="content">
                  <p class="card-category">Pet nhận nuôi</p>
                  <h4 class="card-title">50</h4>
                </div>
                <div slot="footer">
                  <i class="fa fa-calendar-o"></i>
                </div>
              </stats-card>
            </div>

            <div class="col-xl-3 col-md-6">
              <stats-card>
                <div slot="header" class="icon-danger">
                  <i class="nc-icon nc-vector text-danger"></i>
                </div>
                <div slot="content">
                  <p class="card-category">Pet đang tìm chủ</p>
                  <h4 class="card-title">23</h4>
                </div>
                <div slot="footer"><i class="fa fa-clock-o"></i></div>
              </stats-card>
            </div>

            <div class="col-xl-3 col-md-6">
              <stats-card>
                <div slot="header" class="icon-info">
                  <i class="nc-icon nc-favourite-28 text-primary"></i>
                </div>
                <div slot="content">
                  <p class="card-category">Volunteer</p>
                  <h4 class="card-title">15</h4>
                </div>
                <div slot="footer">
                  <i class="fa fa-refresh"></i>
                </div>
              </stats-card>
            </div>
          </div>
          <div class="row">
            <div class="col-md-8">
              <chart-card
                :chart-data="lineChart.data"
                :chart-options="lineChart.options"
                :responsive-options="lineChart.responsiveOptions"
              >
                <template slot="header">
                  <h4 class="card-title">Thống kê</h4>
                </template>
                <template slot="footer">
                  <div class="legend">
                    <i class="fa fa-circle text-info"></i> Open
                    <i class="fa fa-circle text-danger"></i> Click
                    <i class="fa fa-circle text-warning"></i> Click Second Time
                  </div>
                  <hr />
                  <div class="stats">
                    <i class="fa fa-history"></i> Updated 3 minutes ago
                  </div>
                </template>
              </chart-card>
            </div>
          </div>
        </div>
      </div>
    </el-main>
  </div>
</template>
<script>
import ChartCard from "@/components/Card/ChartCard.vue";
import StatsCard from "@/components/Card/StatsCard.vue";

export default {
  components: {
    ChartCard,
    StatsCard,
  },
  data() {
    return {
      editTooltip: "Edit Task",
      deleteTooltip: "Remove",
      pieChart: {
        data: {
          labels: ["40%", "20%", "40%"],
          series: [40, 20, 40],
        },
      },
      lineChart: {
        data: {
          labels: [
            "9:00AM",
            "12:00AM",
            "3:00PM",
            "6:00PM",
            "9:00PM",
            "12:00PM",
            "3:00AM",
            "6:00AM",
          ],
          series: [
            [287, 385, 490, 492, 554, 586, 698, 695],
            [67, 152, 143, 240, 287, 335, 435, 437],
            [23, 113, 67, 108, 190, 239, 307, 308],
          ],
        },
        options: {
          low: 0,
          high: 800,
          showArea: false,
          height: "245px",
          axisX: {
            showGrid: false,
          },
          lineSmooth: true,
          showLine: true,
          showPoint: true,
          fullWidth: true,
          chartPadding: {
            right: 50,
          },
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              axisX: {
                labelInterpolationFnc(value) {
                  return value[0];
                },
              },
            },
          ],
        ],
      },
      barChart: {
        data: {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "Mai",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          series: [
            [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
            [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695],
          ],
        },
        options: {
          seriesBarDistance: 10,
          axisX: {
            showGrid: false,
          },
          height: "245px",
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc(value) {
                  return value[0];
                },
              },
            },
          ],
        ],
      },
      tableData: {
        data: [
          {
            title:
              'Sign contract for "What are conference organizers afraid of?"',
            checked: false,
          },
          {
            title:
              "Lines From Great Russian Literature? Or E-mails From My Boss?",
            checked: true,
          },
          {
            title:
              "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
            checked: true,
          },
          {
            title: "Create 4 Invisible User Experiences you Never Knew About",
            checked: false,
          },
          { title: 'Read "Following makes Medium better"', checked: false },
          { title: "Unfollow 5 enemies from twitter", checked: false },
        ],
      },
    };
  },
};
</script>
<style>
</style>
