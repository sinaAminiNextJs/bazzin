// hooks/useARButton.js
import { useEffect } from "react";

export default function useARButton(selector = "a-scene") {
  useEffect(() => {
    const scene = document.querySelector("a-scene") as any;
    if (!scene || scene.getAttribute("ar-ready")) return;

    const arButton = document.createElement("button");
    arButton.textContent = "Start AR";
    arButton.id = "ar-button";
    arButton.style.position = "absolute";
    arButton.style.bottom = "20px";
    arButton.style.left = "20px";
    arButton.style.zIndex = "1000";

    arButton.addEventListener("click", () => {
      scene.setAttribute("xrweb", "allowedDevices: any");
      scene.setAttribute("webxr", "optionalFeatures: hit-test;");

      scene.enterAR();
      arButton.remove(); // بعد از شروع AR حذف دکمه
    });

    document.body.appendChild(arButton);

    // جلوگیری از تکرار
    scene.setAttribute("ar-ready", "true");

    // Cleanup
    return () => {
      const existingBtn = document.getElementById("ar-button");
      if (existingBtn) existingBtn.remove();
      scene.removeAttribute("ar-ready");
    };
  }, [selector]);
}
