"use client";

import { useEffect, useRef } from "react";

export default function GlobeComponent({ isDay }) {
  const globeEl = useRef(null);
  const globeInstance = useRef(null);

  useEffect(() => {
    if (!globeEl.current) return;

    // Dynamically import globe.gl
    import("globe.gl").then((Globe) => {
      fetch("/datasets/countries.geojson")
        .then((res) => res.json())
        .then((countries) => {
          globeInstance.current = Globe.default()(globeEl.current)
            .globeImageUrl(isDay ? "/earth-day.webp" : "/night-earth.webp")
            .backgroundImageUrl(isDay ? "/day-sky.webp" : "/night-sky.webp")
            .lineHoverPrecision(0)
            .polygonsData(
              countries.features.filter((d) => d.properties.ISO_A2 !== "")
            )
            .polygonAltitude(0.05)
            .polygonCapColor(
              (d) => d.properties.COLOR || "rgba(0, 200, 0, 0.6)"
            )
            .polygonSideColor(() => null)
            .polygonStrokeColor(() => "rgba(0, 0, 0, 0.5)")
            .polygonLabel(
              ({ properties: d }) => `
                <b>${d.NAME_FA}</b> <br/>
                قاره <i>${d.CONTINENT_FA}</i><br/>
                <i>${d.POP_EST_FA}</i>
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
        .globeImageUrl(isDay ? "/earth-day.webp" : "/night-earth.webp")
        .backgroundImageUrl(isDay ? "/day-sky.webp" : "/night-sky.webp");
    }
  }, [isDay]);

  return <div ref={globeEl} style={{ width: "100%", height: "600px" }} />;
}
