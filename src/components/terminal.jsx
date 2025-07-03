// src/components/Terminal.jsx
import React, { useEffect, useRef } from "react";

export default function Terminal({ lines = [], mensaje }) {
  const terminalRef = useRef();

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div className="terminal-container">
      <div className="terminal" ref={terminalRef}>
        <div className="terminal-title">[ Terminal del bot ]</div>
        {lines.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
        {mensaje && (
          <div>
            <br />👉 {mensaje}
          </div>
        )}
      </div>
    </div>
  );
}
