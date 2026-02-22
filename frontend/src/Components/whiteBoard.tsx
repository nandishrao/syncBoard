import { Stage, Layer, Line, Rect } from "react-konva";
import { useState, useEffect, useRef } from "react";
import { useWhiteboard } from "../hooks/useWhiteBoard";

const Whiteboard = () => {
  const stageRef = useRef<any>(null);

  const {
    lines,
    color,
    brushSize,
    tool,
    scale,
    setColor,
    setBrushSize,
    setTool,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleUndo,
    handleRedo,
    handleZoomIn,
    handleZoomOut,
    handleResetZoom,
    clearCanvas,
  } = useWhiteboard();

  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleExport = () => {
    if (!stageRef.current) return;

    const uri = stageRef.current.toDataURL({
      pixelRatio: 2,
    });

    const link = document.createElement("a");
    link.download = "syncboard.png";
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderGrid = () => {
    const gridSize = 40;
    const gridLines = [];

    for (let i = 0; i < size.width / gridSize; i++) {
      gridLines.push(
        <Line
          key={`v-${i}`}
          points={[i * gridSize, 0, i * gridSize, size.height]}
          stroke="#242424"
          strokeWidth={1}
        />
      );
    }

    for (let j = 0; j < size.height / gridSize; j++) {
      gridLines.push(
        <Line
          key={`h-${j}`}
          points={[0, j * gridSize, size.width, j * gridSize]}
          stroke="#242424"
          strokeWidth={1}
        />
      );
    }

    return gridLines;
  };

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
    <>
      {/* Toolbar */}
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

        <button style={buttonStyle} onClick={clearCanvas}>
          Clear
        </button>

        <button style={buttonStyle} onClick={handleExport}>
          Export PNG
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

      {/* Canvas */}
      <Stage
        ref={stageRef}
        width={size.width}
        height={size.height}
        onMouseDown={(e) => {
          const stage = e.target.getStage();
          if (!stage) return;
          const pos = stage.getPointerPosition();
          if (!pos) return;
          handleMouseDown(pos);
        }}
        onMouseMove={(e) => {
          const stage = e.target.getStage();
          if (!stage) return;
          const pos = stage.getPointerPosition();
          if (!pos) return;
          handleMouseMove(pos);
        }}
        onMouseUp={handleMouseUp}
      >
        <Layer>
          <Rect
            x={0}
            y={0}
            width={size.width}
            height={size.height}
            fill="#1e1e1e"
          />
          {renderGrid()}
        </Layer>

        <Layer scaleX={scale} scaleY={scale}>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke={line.stroke}
              strokeWidth={line.strokeWidth}
              lineCap="round"
              tension={0.5}
              globalCompositeOperation={line.compositeOperation}
            />
          ))}
        </Layer>
      </Stage>
    </>
  );
};

export default Whiteboard;