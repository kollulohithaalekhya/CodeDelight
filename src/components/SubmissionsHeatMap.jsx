import React, { useEffect, useMemo, useRef, useState } from "react";
import "../styles/SubmissionsHeatMap.css";
import HeatMap from "@uiw/react-heat-map";
import { useProfile } from "../context/ProfileContext";

// Track the active theme so the empty/colored cells stay legible in light & dark.
function useIsLight() {
  const read = () => {
    const t = document.documentElement.getAttribute("data-theme");
    if (t === "light") return true;
    if (t === "dark") return false;
    return typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-color-scheme: light)").matches
      : false;
  };
  const [light, setLight] = useState(read);
  useEffect(() => {
    const obs = new MutationObserver(() => setLight(read()));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const mq = window.matchMedia?.("(prefers-color-scheme: light)");
    const onMq = () => setLight(read());
    mq?.addEventListener?.("change", onMq);
    return () => { obs.disconnect(); mq?.removeEventListener?.("change", onMq); };
  }, []);
  return light;
}

const SubmissionsHeatMap = () => {
  const wrapperRef = useRef(null);
  const { profile } = useProfile();
  const isLight = useIsLight();

  // Real activity from the platform (quizzes, games, quest, problems…).
  // Backend already sends dates as YYYY/MM/DD, the format the lib expects.
  const submissionsData = profile?.activity || [];

  const [heatMapWidth, setHeatMapWidth] = useState(700);

  const today = new Date();
  const startDate = new Date(today.getFullYear(), today.getMonth() - 9, today.getDate());

  // Color scale that makes even a single activity clearly visible (the library's
  // defaults only start coloring at high counts, which made low days look empty).
  const panelColors = isLight
    ? { 0: "#e9edf3", 1: "#c6e48b", 3: "#7bc96f", 5: "#49af5d", 8: "#2e8b41", 13: "#196127" }
    : { 0: "#1b2440", 1: "#0e4429", 3: "#006d32", 5: "#26a641", 8: "#39d353", 13: "#57e06a" };
  const legendSwatches = Object.values(panelColors);

  const summary = useMemo(() => {
    const days = submissionsData.length;
    const total = submissionsData.reduce((a, d) => a + (d.count || 0), 0);
    return { days, total };
  }, [submissionsData]);

  useEffect(() => {
    const updateWidth = () => {
      if (!wrapperRef.current) return;
      const width = wrapperRef.current.clientWidth;
      if (width > 0) setHeatMapWidth(Math.max(300, width));
    };
    updateWidth();
    const resizeObserver = new ResizeObserver(updateWidth);
    if (wrapperRef.current) resizeObserver.observe(wrapperRef.current);
    window.addEventListener("resize", updateWidth);
    return () => { resizeObserver.disconnect(); window.removeEventListener("resize", updateWidth); };
  }, []);

  return (
    <div className={`submissions-heatmap-container ${isLight ? "light" : ""}`}>
      <div className="shm-head">
        <h2>Activity Heat Map</h2>
        <span className="shm-summary">
          {summary.total > 0
            ? `${summary.total} activit${summary.total === 1 ? "y" : "ies"} across ${summary.days} day${summary.days === 1 ? "" : "s"}`
            : "No activity yet — take a quiz or play a game to light it up!"}
        </span>
      </div>

      <div className="heatmap-wrapper" ref={wrapperRef}>
        <HeatMap
          className="my-heatmap"
          value={submissionsData}
          startDate={startDate}
          width={heatMapWidth}
          rectSize={16}
          space={3}
          rectProps={{ rx: 3 }}
          legendCellSize={0}
          panelColors={panelColors}
          rectRender={(props, data) => (
            <rect {...props}>
              <title>
                {data.count
                  ? `${data.count} activit${data.count === 1 ? "y" : "ies"} on ${data.date}`
                  : `No activity on ${data.date}`}
              </title>
            </rect>
          )}
        />
      </div>

      <div className="shm-legend">
        <span>Less</span>
        {legendSwatches.map((c, i) => (
          <span key={i} className="shm-swatch" style={{ background: c }} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
};

export default SubmissionsHeatMap;
