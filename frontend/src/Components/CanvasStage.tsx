import React, { useRef } from "react";
import { Stage, Layer, Line, Rect } from "react-konva";
import type { DrawLine } from "../types/whiteboard.types";

interface CanvasStageProps {
  lines: DrawLine[];
  scale: number;
  width: number;
  height: number;
  handleMouseDown: (pos: { x: number; y: number }) => void;
  handleMouseMove: (pos: { x: number; y: number }) => void;
  handleMouseUp: () => void;
}

const CanvasStage: React.FC<CanvasStageProps> = ({
  lines,
  scale,
  width,
  height,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
}) => {
  const stageRef = useRef<any>(null);

  const renderGrid = () => {
    const gridSize = 40;
    const gridLines = [];

    for (let i = 0; i < width / gridSize; i++) {
      gridLines.push(
        <Line
          key={`v-${i}`}
          points={[i * gridSize, 0, i * gridSize, height]}
          stroke="#242424"
          strokeWidth={1}
        />
      );
    }

    for (let j = 0; j < height / gridSize; j++) {
      gridLines.push(
        <Line
          key={`h-${j}`}
          points={[0, j * gridSize, width, j * gridSize]}
          stroke="#242424"
          strokeWidth={1}
        />
      );
    }

    return gridLines;
  };

  return (
    <Stage
      ref={stageRef}
      width={width}
      height={height}
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
      {/* Background Layer */}
      <Layer>
        <Rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill="#1e1e1e"
        />
        {renderGrid()}
      </Layer>

      {/* Drawing Layer */}
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
  );
};

export default CanvasStage;