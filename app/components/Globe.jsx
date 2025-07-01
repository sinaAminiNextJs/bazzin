"use client";

import { useEffect, useRef } from "react";
import Globe from "globe.gl";

export default function GlobeComponent() {
  const globeEl = useRef();

  useEffect(() => {
    if (!globeEl.current) return;

    fetch("/datasets/countries.json")
      .then((res) => res.json())
      .then((countries) => {
        const world = Globe()(globeEl.current)
          .globeImageUrl(
            "//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg"
          )
          .backgroundImageUrl(
            "//cdn.jsdelivr.net/npm/three-globe/example/img/night-sky.png"
          )
          .lineHoverPrecision(0)
          .polygonsData(
            countries.features.filter((d) => d.properties.ISO_A2 !== "AQ")
          )
          .polygonAltitude(0.0016)
          .polygonCapColor((d) => d.properties.COLOR || "rgba(0, 200, 0, 0.6)")
          .polygonSideColor(() => "rgba(0, 100, 0, 0.15)")
          .polygonStrokeColor(() => "#111")
          .polygonLabel(
            ({ properties: d }) => `
    <b>${d.ADMIN} (${d.ISO_A2}):</b> <br/>
    <i>${d.COLOR}</i><br/>
    قاره: <i>${d.CONTINENT}</i><br/>
    جمعیت: <i>${d.POP_EST}</i>
  `
          )
          .onPolygonHover((hoverD) =>
            world
              .polygonAltitude((d) => (d === hoverD ? 0.05 : 0.02))
              .polygonCapColor((d) =>
                d === hoverD
                  ? "steelblue"
                  : d.properties.COLOR || "rgba(0, 200, 0, 0.6)"
              )
          )
          .polygonsTransitionDuration(300);
      });
  }, []);

  return <div ref={globeEl} style={{ width: "100%", height: "600px" }} />;
}
