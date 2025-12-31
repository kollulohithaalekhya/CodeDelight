import React from "react";
import ReactApexChart from "react-apexcharts";
import "../styles/Dashboard1.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faTasks,
  faGamepad,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import Badge from "react-bootstrap/Badge";


// Info Cards
const cardData = [
  {
    title: "Coding",
    value: "8",
    change: "+80 coins",
    color: "#0c8086ff",
    icon: faCode,
  },
  {
    title: "Tasks",
    value: "12",
    change: "+70 coins",
    color: "#0c8086ff",
    icon: faTasks,
  },
  {
    title: "Games",
    value: "18",
    change: "+50 coins",
    color: "#0c8086ff",
    icon: faGamepad,
  },
  {
    title: "Tests",
    value: "5",
    change: "+90 coins",
    color: "#0c8086ff",
    icon: faFileAlt,
  },
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
      labels: {
        style: {
          colors: "#00e3e3",
          fontWeight: 500,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#00e3e3",
          fontWeight: 500,
        },
      },
    },
    grid: { borderColor: "#333" },
    stroke: { curve: "smooth", width: 3 },
    theme: { mode: "dark" },
    legend: {
      labels: { colors: "#ffffff" },
    },
    colors: ["#276acfff", "#15b2baff"], // Bright teal + pink combo
    tooltip: {
      theme: "dark",
      style: { fontSize: "13px" },
    },
    markers: {
      size: 5,
      colors: ["#1A1A1A"],
      strokeColors: ["#276acfff", "#15b2baff"],
      hover: { sizeOffset: 4 },
    },
  },
  series: [
    {
      name: "Courses",
      data: [10, 85, 60, 95, 60, 80, 70, 60, 95, 39, 60, 90],
    },
    {
      name: "Games",
      data: [5, 25, 36, 44, 28, 46, 50, 34, 26, 20, 47, 22],
      type: "line",
      dashArray: 6,
    },
  ],
};

// Bar Chart (Expenses)
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
      toolbar: { show: true },
      zoom: { enabled: true },
      background: "transparent",
    },

    // 🎨 Custom colors for Quizes and Tasks
    colors: ["#2199d5ff", "#15b2baff"],

    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: ["#00c6ff", "#00e3e3"],
        opacityFrom: 0.9,
        opacityTo: 0.8,
        stops: [0, 100],
      },
    },

    grid: {
      borderColor: "#333",
      strokeDashArray: 4,
    },

    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last",
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: "13px",
              fontWeight: 900,
              color: "#00e3e3",
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
          colors: "#00e3e3",
          fontSize: "12px",
          fontWeight: 500,
        },
      },
      axisBorder: { color: "#00e3e3" },
      axisTicks: { color: "#00e3e3" },
    },

    yaxis: {
      labels: {
        style: {
          colors: "#00e3e3",
          fontSize: "12px",
        },
      },
    },

    legend: {
      position: "right",
      offsetY: 40,
      labels: {
        colors: "#00e3e3",
      },
      markers: {
        width: 12,
        height: 12,
        radius: 12,
      },
    },

    tooltip: {
      theme: "dark",
      style: {
        fontSize: "13px",
      },
      marker: {
        show: true,
      },
    },

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
  },
};

// Radial Chart Component
const RadialChart = () => {
  const [state] = React.useState({
    series: [96, 67, 38, 29],
    options: {
      chart: { height: 390, type: "radialBar" },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: 0,
          endAngle: 270,
          hollow: { margin: 5, size: "30%", background: "transparent" },
          dataLabels: { name: { show: false }, value: { show: false } },
          barLabels: {
            enabled: true,
            useSeriesColors: true,
            offsetX: -8,
            fontSize: "16px",
            formatter: (seriesName, opts) =>
              seriesName + ": " + opts.w.globals.series[opts.seriesIndex],
          },
        },
      },
      colors: ["#1ab7ea", "#0084ff", "#39539E", "#0077B5"],
      labels: ["Total Games", "Games Played", "Games Won", "Games Lost"],
      responsive: [{ breakpoint: 480, options: { legend: { show: false } } }],
    },
  });

  return (
    <ReactApexChart
      options={state.options}
      series={state.series}
      type="radialBar"
      height={390}
    />
  );
};

// Radial Chart Component
const RadialChart1 = () => {
  const [state] = React.useState({
    series: [100, 70, 30, 40],
    options: {
      chart: { height: 390, type: "radialBar" },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: 0,
          endAngle: 270,
          hollow: { margin: 5, size: "30%", background: "transparent" },
          dataLabels: { name: { show: false }, value: { show: false } },
          barLabels: {
            enabled: true,
            useSeriesColors: true,
            offsetX: -8,
            fontSize: "16px",
            formatter: (seriesName, opts) =>
              seriesName + ": " + opts.w.globals.series[opts.seriesIndex],
          },
        },
      },
      colors: ["#1ab7ea", "#0084ff", "#39539E", "#0077B5"],
      labels: ["Total Tasks", "Tasks done", "Tasks Won", "Tasks Lost"],
      responsive: [{ breakpoint: 480, options: { legend: { show: false } } }],
    },
  });

  return (
    <ReactApexChart
      options={state.options}
      series={state.series}
      type="radialBar"
      height={390}
    />
  );
};

// Radial Chart Component
const RadialChart2 = () => {
  const [state] = React.useState({
    series: [80, 60, 46, 14],
    options: {
      chart: { height: 390, type: "radialBar" },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: 0,
          endAngle: 270,
          hollow: { margin: 5, size: "30%", background: "transparent" },
          dataLabels: { name: { show: false }, value: { show: false } },
          barLabels: {
            enabled: true,
            useSeriesColors: true,
            offsetX: -8,
            fontSize: "16px",
            formatter: (seriesName, opts) =>
              seriesName + ": " + opts.w.globals.series[opts.seriesIndex],
          },
        },
      },
      colors: ["#1ab7ea", "#0084ff", "#39539E", "#0077B5"],
      labels: ["Total Quizes", "Quizes Played", "Quizes Won", "Quizes Lost"],
      responsive: [{ breakpoint: 480, options: { legend: { show: false } } }],
    },
  });

  return (
    <ReactApexChart
      options={state.options}
      series={state.series}
      type="radialBar"
      height={390}
    />
  );
};

// Leaderboard Chart
const leaderboardChart = {
  options: {
    chart: { type: "bar", background: "transparent" },
    xaxis: { categories: ["Alice", "Bob", "Charlie"] },
    theme: { mode: "dark" },
    plotOptions: {
      bar: {
        borderRadius: 6,
        horizontal: true,
        barHeight: "60%",
      },
    },
    colors: ["#00E396"],
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        gradientToColors: ["#008FFB"],
        opacityFrom: 0.9,
        opacityTo: 0.7,
        stops: [0, 100],
      },
    },
    dataLabels: { enabled: false },
  },
  series: [{ name: "Coins", data: [320, 280, 250] }],
};

// Info Card Component
function InfoCard({ title, value, change, color, icon }) {
  return (
    <div className="info-card">
      <div className="info-card-column">
        <Badge
          bg="info"
          text="dark"
          className="info-title"
          style={{ fontSize: "16px" }}
        >
          {title}{" "}
        </Badge>
        <div className="info-value">{value}</div>
        <span
          className="info-badge"
          style={{ background: "#0a1d3a", borderBottom: "1px solid #00f2fe" }}
        >
          {change}
        </span>
      </div>
      <FontAwesomeIcon icon={icon} className="info-icon" />
    </div>
  );
}

// Main Dashboard Component
function Dashboard1() {
  return (
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
          <h3>Monthly Comparison</h3>
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
        {/* Progress Charts */}
        <div className="dashboard-progress">
          <h3>Progress</h3>

          <div
            className="progress-charts"
            style={{
              display: "flex",
              gap: "80px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {/* Chart 1 */}
            <div className="dashboard-radial-wrapper">
              <h4 className="chart-subheading">Games Progress</h4>
              <RadialChart />
            </div>

            {/* Chart 2 */}
            <div className="dashboard-radial-wrapper">
              <h4 className="chart-subheading">Tasks Progress</h4>
              <RadialChart1 />
            </div>

            {/* Chart 3 */}
            <div className="dashboard-radial-wrapper">
              <h4 className="chart-subheading">Quiz Progress</h4>
              <RadialChart2 />
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="dashboard-leaderboard-chart">
          <h3>Top Users</h3>
          <ReactApexChart
            options={leaderboardChart.options}
            series={leaderboardChart.series}
            type="bar"
            height={200}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard1;
