import React from "react";
import type { Tool } from "../types/whiteboard.types";

interface ToolbarProps {
  color: string;
  brushSize: number;
  tool: Tool;
  scale: number;
  setColor: (color: string) => void;
  setBrushSize: (size: number) => void;
  setTool: (tool: Tool) => void;
  handleUndo: () => void;
  handleRedo: () => void;
  handleExport: () => void;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
  handleResetZoom: () => void;
  clearCanvas: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  color,
  brushSize,
  tool,
  scale,
  setColor,
  setBrushSize,
  setTool,
  handleUndo,
  handleRedo,
  handleExport,
  handleZoomIn,
  handleZoomOut,
  handleResetZoom,
  clearCanvas
}) => {
  const buttonStyle: React.CSSProperties = {
    background: "#3a3a3a",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
  };
  

  const activeButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    background: "#4dabf7",
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        left: 20,
        zIndex: 10,
        background: "#2a2a2a",
        padding: "10px",
        borderRadius: "8px",
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        style={{
          width: "40px",
          height: "40px",
          border: "none",
          background: "transparent",
          cursor: "pointer",
        }}
      />

      <input
        type="range"
        min="1"
        max="20"
        value={brushSize}
        onChange={(e) => setBrushSize(Number(e.target.value))}
      />

      <span style={{ color: "white" }}>{brushSize}px</span>

      <button
        style={tool === "brush" ? activeButtonStyle : buttonStyle}
        onClick={() => setTool("brush")}
      >
        Brush
      </button>

      <button
        style={tool === "eraser" ? activeButtonStyle : buttonStyle}
        onClick={() => setTool("eraser")}
      >
        Eraser
      </button>

      <button style={buttonStyle} onClick={handleUndo}>
        Undo
      </button>

      <button style={buttonStyle} onClick={handleRedo}>
        Redo
      </button>

      <button style={buttonStyle} onClick={handleExport}>
        Export PNG
      </button>
      <button style={buttonStyle} onClick={clearCanvas}>
  Clear
</button>

      <button style={buttonStyle} onClick={handleZoomIn}>
        Zoom +
      </button>

      <button style={buttonStyle} onClick={handleZoomOut}>
        Zoom -
      </button>

      <button style={buttonStyle} onClick={handleResetZoom}>
        Reset
      </button>

      <span style={{ color: "white" }}>
        {(scale * 100).toFixed(0)}%
      </span>
    </div>
  );
};

export default Toolbar;