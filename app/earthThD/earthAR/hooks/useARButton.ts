import { useEffect } from "react";

export default function useARButton(selector = "a-scene") {
  useEffect(() => {
    const scene = document.querySelector(selector) as any;
    if (!scene || scene.getAttribute("ar-ready")) return;

    // دکمه استارت AR
    const arButton = document.createElement("button");
    arButton.textContent = "Start AR";
    arButton.id = "ar-button";
    Object.assign(arButton.style, {
      position: "absolute",
      bottom: "20px",
      left: "20px",
      padding: "8px 32px",
      backgroundColor: "#ffc585",
      color: "#000",
      borderRadius: "1rem",
      border: "2px solid #fff7c4",
      fontFamily: "iranyekan, sans-serif",
      fontSize: "1.25rem",
      boxShadow: "0 0 20px rgba(0, 0, 0, 0.6)",
      cursor: "pointer",
      zIndex: "11000",
    });

    // دکمه توقف AR
    const stopButton = document.createElement("button");
    stopButton.textContent = "Stop AR";
    stopButton.id = "stop-ar-button";
    Object.assign(stopButton.style, {
      position: "absolute",
      bottom: "80px",
      left: "20px",
      padding: "8px 32px",
      backgroundColor: "#ff8585",
      color: "#000",
      borderRadius: "1rem",
      border: "2px solid #fff7c4",
      fontFamily: "iranyekan, sans-serif",
      fontSize: "1.25rem",
      boxShadow: "0 0 20px rgba(0, 0, 0, 0.6)",
      cursor: "pointer",
      zIndex: "11000",
      display: "none", // اول پنهان باشه
    });

    arButton.addEventListener("click", () => {
      scene.setAttribute("xrweb", "allowedDevices: any");
      scene.setAttribute("webxr", "optionalFeatures: hit-test;");
      scene.enterAR?.(); // استفاده از ? چون TS خطا میده
      arButton.style.display = "none";
      stopButton.style.display = "block";
    });

    stopButton.addEventListener("click", () => {
      scene.exitAR?.(); // باید پشتیبانی‌شده باشه توسط XRSession
      stopButton.style.display = "none";
      arButton.style.display = "block";
    });

    document.body.appendChild(arButton);
    document.body.appendChild(stopButton);

    scene.setAttribute("ar-ready", "true");

    return () => {
      document.getElementById("ar-button")?.remove();
      document.getElementById("stop-ar-button")?.remove();
      scene.removeAttribute("ar-ready");
    };
  }, [selector]);
}
