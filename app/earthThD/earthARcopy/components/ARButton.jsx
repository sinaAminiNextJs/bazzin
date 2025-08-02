// components/ARButton.jsx
import { useEffect } from "react";
import { ARButton as ThreeARButton } from "three/addons/webxr/ARButton.js";

export default function ARButton({ renderer }) {
  useEffect(() => {
    if (!renderer.current) return;

    const button = ThreeARButton.createButton(renderer.current, {
      requiredFeatures: ["hit-test"],
      optionalFeatures: ["dom-overlay"],
      domOverlay: { root: document.body },
    });

    // استایل‌دهی به دکمه
    Object.assign(button.style, {
      position: "fixed",
      bottom: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      padding: "12px 24px",
      backgroundColor: "#4285f4",
      color: "white",
      border: "none",
      borderRadius: "4px",
      fontSize: "16px",
      cursor: "pointer",
      zIndex: "10000",
    });

    button.textContent = "شروع واقعیت افزوده";

    document.body.appendChild(button);

    return () => {
      if (button.parentNode) {
        button.parentNode.removeChild(button);
      }
    };
  }, [renderer]);

  return null;
}
