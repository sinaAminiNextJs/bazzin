"use client";
import React, { useState } from "react";

export default function CodeGenerator() {
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(false);

  function reorderDigits(num, order) {
    const str = num.toString();
    return order.map((i) => str[i]).join("");
  }

  function generateCodes() {
    setLoading(true);
    const validPasswords = [];
    const order = [0, 4, 5, 3, 1, 2];

    for (let n = 850000; n <= 999999; n++) {
      if (n % 29 === 0) {
        const reordered = reorderDigits(n, order);
        validPasswords.push(reordered);
      }
    }

    setCodes(validPasswords);
    setLoading(false);
  }

  return (
    <div className="p-6">
      <button
        onClick={generateCodes}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Codes"}
      </button>

      <p>Total codes generated: {codes.length}</p>

      <div className="max-h-96 overflow-auto border p-2 mt-2">
        {codes.length === 0 && !loading && <p>No codes generated yet.</p>}

        <ul className="list-disc pl-5">
          {codes.map((code, idx) => (
            <li key={idx} className="font-mono">
              {code}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
