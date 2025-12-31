import React from "react";
import ReactApexChart from "react-apexcharts";
import ProfileSidebar from "./ProfileSidebar";
import "../styles/Dashboard.css";
import Badge from "react-bootstrap/Badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faTasks,
  faGamepad,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import ProfileHeader from "./ProfileHeader";


// Info Cards
const cardData = [
  { title: "Coding", value: "8", change: "+80 coins", color: "#0a1d3a", icon: faCode },
  { title: "Tasks", value: "12", change: "+60 coins", color: "#0a1d3a", icon: faTasks },
  { title: "Games", value: "18", change: "+180 coins", color: "#0a1d3a", icon: faGamepad },
  { title: "Tests", value: "5", change: "+50 coins", color: "#0a1d3a", icon: faFileAlt },
];

// Line Chart (Revenue)
const revenueChart = {
  options: {
    chart: { type: "line", background: "transparent" },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    grid: { show: false },
    stroke: { curve: "smooth" },
    theme: { mode: "dark" },
    colors: ["#00f2fe", "#b3c8e1ff"], 
  },
  series: [
    { name: "Primary", data: [10, 85, 60, 95, 60, 80, 70, 60, 95, 39, 60, 90] },
    {
      name: "Secondary",
      data: [12, 23, 34, 26, 23, 41, 49, 30, 46, 14, 27, 52],
      type: "line",
      dashArray: 5,
    },
  ],
};

const expensesChart = {
  series: [
    {
      name: "Quizes",
      data: [44, 55, 41, 67, 22, 43],
    },
    {
      name: "Tasks",
      data: [13, 23, 20, 8, 13, 27],
    },
  ],
  options: {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
      colors: ["#1b3233ff", "#010509ff"],
    },
    tooltip: {
      theme: "dark", // changes tooltip background to dark
    },
    yaxis: {
      labels: {
        style: {
          colors: "#2199d5ff", // 👈 Y-axis number color
          fontSize: "12px",
        },
      },
    },
    colors: ["#00f2fe", "#ffffff89"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        borderRadiusApplication: "end", // 'around', 'end'
        borderRadiusWhenStacked: "last", // 'all', 'last'
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: "13px",
              fontWeight: 900,
            },
          },
        },
      },
    },
    xaxis: {
      type: "datetime",
      categories: [
        "01/01/2011 GMT",
        "01/02/2011 GMT",
        "01/03/2011 GMT",
        "01/04/2011 GMT",
        "01/05/2011 GMT",
        "01/06/2011 GMT",
      ],
      labels: {
        style: {
          colors: "#00E396", // 🎨 text color of the x-axis labels
          fontSize: "12px",
          fontWeight: 500,
        },
      },
      // axisBorder: {
      //   show: true,
      //   color: '#00E396',     // 🎨 color of the bottom axis line
      // },
      // axisTicks: {
      //   show: true,
      //   color: '#00E396',     // 🎨 color of the small ticks under labels
      // },
    },
    legend: {
      position: "right",
      offsetY: 40,
    },
    fill: {
      opacity: 1,
    },
  },
};
// const expensesChart = {
//   series: [
//     { name: "PRODUCT A", data: [44, 55, 41, 67, 22, 43] },
//     { name: "PRODUCT B", data: [13, 23, 20, 8, 13, 27] },
//   ],
//   yaxis: {
//     labels: {
//       style: {
//         colors: "#2199d5ff", // 👈 Y-axis number color
//         fontSize: "12px",
//       },
//     },
//   },
//   labels: {
//     style: {
//       colors: "#00E396", // 🎨 text color of the x-axis labels
//       fontSize: "12px",
//       fontWeight: 500,
//     },
//   },
//   options: {
//     chart: {
//       type: "bar",
//       height: 350,
//       stacked: true,
//       toolbar: { show: true },
//       zoom: { enabled: true },
//     },
//     colors: ["#00f2fe", "#b3c8e1b7"],
//     responsive: [
//       {
//         breakpoint: 480,
//         options: {
//           legend: { position: "bottom", offsetX: -10, offsetY: 0 },
//         },
//       },
//     ],
//     plotOptions: {
//       bar: {
//         horizontal: false,
//         borderRadius: 10,
//         borderRadiusApplication: "end",
//         borderRadiusWhenStacked: "last",
//         dataLabels: {
//           total: {
//             enabled: true,
//             style: { fontSize: "13px", fontWeight: 900 },
//           },
//         },
//       },
//     },
//     xaxis: {
//       type: "datetime",
//       categories: [
//         "01/01/2011 GMT",
//         "01/02/2011 GMT",
//         "01/03/2011 GMT",
//         "01/04/2011 GMT",
//         "01/05/2011 GMT",
//         "01/06/2011 GMT",
//       ],
//     },
//     legend: { position: "right", offsetY: 40 },
//     fill: { opacity: 1 },
//   },
// };

// const expensesChart = {
//   options: {
//     chart: { type: "bar", background: "transparent" },
//     xaxis: {
//       categories: [
//         "Jan",
//         "Feb",
//         "Mar",
//         "Apr",
//         "May",
//         "Jun",
//         "Jul",
//         "Aug",
//         "Sep",
//         "Oct",
//         "Nov",
//         "Dec",
//       ],
//     },
//     grid: { show: false },
//     theme: { mode: "dark" },
//     plotOptions: {
//       bar: { horizontal: false, borderRadius: 4, columnWidth: "40%" },
//     },
//     colors: ["#00f2fe", "#417a85ff"],
//   },
//   series: [
//     {
//       name: "Primary",
//       data: [
//         2000, 1700, 1800, 2200, 1300, 1500, 1100, 2500, 2000, 2200, 3000, 2000,
//       ],
//     },
//     {
//       name: "Secondary",
//       data: [
//         1000, 700, 600, 1100, 1900, 2800, 600, 1800, 1600, 1400, 2000, 1000,
//       ],
//     },
//   ],
// };


// Bottom Radial Charts
const progressCharts = [
  { title: "Games Played", series: [60], labels: ["Games Played"] },
  { title: "Games Won", series: [45], labels: ["Games Won"] },
  { title: "Games Lost", series: [55], labels: ["Games Lost"] },
];






const leaderboardChart = {
  options: {
    chart: { type: "bar", background: "transparent" },
    xaxis: { categories: ["Ashrita", "Lakshan", "Charm"] },
    theme: { mode: "dark" },
    plotOptions: { bar: { borderRadius: 6, horizontal: true } },
    colors: ["#00f2fe"], 
  },
  series: [{ name: "Coins", data: [320, 280, 250] }],
};

function InfoCard({ title, value, change, color, icon }) {
  return (
    <div className="info-card">
      <div className="info-card-column">
        <Badge bg="info" text="dark" className="info-title">{title}</Badge>
        <div className="info-value">{value}</div>
        <span className="info-badge" style={{ background: color }}>{change}</span>
      </div>
      <FontAwesomeIcon icon={icon} className="info-icon" />
    </div>
  );
}

// Main Dashboard Component
function Dashboard() {
  return (
    <div className="dashboard-wrapper">
      <ProfileHeader />
      <div className="dashboard-container">
        <ProfileSidebar />
        <div className="dashboard-dark">
          {/* Top Cards */}
          <div className="dashboard-cards">
            {cardData.map((cd) => (
              <InfoCard key={cd.title} {...cd} />
            ))}
          </div>

          {/* Line & Bar Charts */}
          <div className="dashboard-charts-row">
            <div className="dashboard-chart">
              <h3>Daily Updates</h3>
              <ReactApexChart
                options={revenueChart.options}
                series={revenueChart.series}
                type="line"
                height={250}
              />
            </div>
            <div className="dashboard-chart">
              <h3>Monthly Map</h3>
              <ReactApexChart
                options={expensesChart.options}
                series={expensesChart.series}
                type="bar"
                height={250}
              />
            </div>
          </div>

          {/* Bottom Section */}
          <div className="dashboard-extra-sections">
            
            <div className="dashboard-progress">
              <h3>
                {" "}
                <span class="badge badge-primary">Game Progress</span>
              </h3>
              <div
                className="progress-charts"
                style={{ display: "flex", gap: "20px" }}
              >
                {progressCharts.map((pc) => (
                  <div key={pc.title} style={{ flex: 1 }}>
                    <h4>{pc.title}</h4>
                    <ReactApexChart
                      options={{
                        chart: { type: "radialBar" },
                        labels: pc.labels,
                        colors: ["#00f2fe"], 
                        plotOptions: {
                          radialBar: {
                            hollow: { size: "70%" },
                            dataLabels: {
                              name: { show: true },
                              value: { show: true },
                            },
                          },
                        },
                      }}
                      series={pc.series}
                      type="radialBar"
                      height={200}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Leaderboard */}
            <div className="dashboard-leaderboard-chart">
              <h3>
                <span class="badge badge-primary">Top users</span>
              </h3>
              <ReactApexChart
                options={leaderboardChart.options}
                series={leaderboardChart.series}
                type="bar"
                
                height={180}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
