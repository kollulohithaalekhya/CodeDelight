import React from "react";
import "../styles/SubmissionsHeatMap.css";
import HeatMap from "@uiw/react-heat-map";

const submissionsData = [
  { date: "2025/01/01", count: 5 },
  { date: "2025/02/05", count: 2 },
  { date: "2025/03/10", count: 12 },
  { date: "2025/04/20", count: 7 },
  { date: "2025/05/15", count: 8 },
  { date: "2025/06/22", count: 3 },
  { date: "2025/07/18", count: 6 },
  { date: "2025/08/01", count: 1 },
  { date: "2025/04/21", count: 7 },
  { date: "2025/09/01", count: 5 },
  { date: "2025/10/05", count: 2 },
  { date: "2025/11/10", count: 12 },
  { date: "2025/12/20", count: 7 },
  { date: "2025/01/15", count: 8 },
  { date: "2025/02/22", count: 3 },
  { date: "2025/03/18", count: 6 },
  { date: "2025/04/01", count: 1 },
];

const SubmissionsHeatMap = () => {
  const today = new Date();
  const startDate = new Date(
    today.getFullYear(),
    today.getMonth() - 9,
    today.getDate()
  );

  return (
    <div className="submissions-heatmap-container">
      <h2>Submissions Heat Map</h2>
      <div className="heatmap-wrapper">
        <HeatMap
          className="my-heatmap"
          value={submissionsData}
          startDate={startDate}
          rectSize={18}
        />
      </div>
    </div>
  );
};

export default SubmissionsHeatMap;
