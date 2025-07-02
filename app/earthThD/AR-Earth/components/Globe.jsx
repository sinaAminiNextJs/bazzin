"use client";

import { useEffect, useRef } from "react";

export default function GlobeComponent({ isDay }) {
  const globeEl = useRef(null);
  const globeInstance = useRef(null);

  useEffect(() => {
    if (!globeEl.current) return;

    // Dynamically import globe.gl
    import("globe.gl").then((Globe) => {
      fetch("/datasets/countries.json")
        .then((res) => res.json())
        .then((countries) => {
          globeInstance.current = Globe.default()(globeEl.current)
            .globeImageUrl(isDay ? "/earth-day.jpg" : "/earth-night.jpg")
            .backgroundImageUrl(isDay ? "/day-sky.jpg" : "/night-sky.png")
            .lineHoverPrecision(0)
            .polygonsData(
              countries.features.filter((d) => d.properties.ISO_A2 !== "")
            )
            .polygonAltitude(0.0016)
            .polygonCapColor(
              (d) => d.properties.COLOR || "rgba(0, 200, 0, 0.6)"
            )
            .polygonSideColor(() => "rgba(0, 100, 0, 0.15)")
            .polygonStrokeColor(() => "#111")
            .polygonLabel(
              ({ properties: d }) => `
                <b>${d.ADMIN} (${d.ISO_A2}):</b> <br/>
                قاره: <i>${d.CONTINENT}</i><br/>
                جمعیت: <i>${d.POP_EST}</i>
              `
            )
            .onPolygonHover((hoverD) =>
              globeInstance.current
                .polygonAltitude((d) => (d === hoverD ? 0.05 : 0.02))
                .polygonCapColor((d) =>
                  d === hoverD
                    ? "steelblue"
                    : d.properties.COLOR || "rgba(0, 200, 0, 0.6)"
                )
            )
            .polygonsTransitionDuration(300);
        });
    });
  }, []);

  // Update globe texture if isDay changes
  useEffect(() => {
    if (globeInstance.current) {
      globeInstance.current
        .globeImageUrl(isDay ? "/earth-day.jpg" : "/earth-night.jpg")
        .backgroundImageUrl(isDay ? "/day-sky.jpg" : "/night-sky.png");
    }
  }, [isDay]);

  return <div ref={globeEl} style={{ width: "100%", height: "600px" }} />;
}
