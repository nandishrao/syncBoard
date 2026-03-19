import { useState , useEffect } from "react";
import type { DrawLine, Tool } from "../types/whiteboard.types";
import { socket } from "../socket";

export const useWhiteboard = () => {
  const [lines, setLines] = useState<DrawLine[]>([]);
  const [history, setHistory] = useState<DrawLine[][]>([]);
  const [redoStack, setRedoStack] = useState<DrawLine[][]>([]);
  const [color, setColor] = useState("#e5e5e5");
  const [brushSize, setBrushSize] = useState(3);
  const [tool, setTool] = useState<Tool>("brush");
  const [scale, setScale] = useState(1);
  const [isDrawing, setIsDrawing] = useState(false);
useEffect(() => {
  socket.on("draw", (line) => {
    setLines((prev) => [...prev, line]);
  });

  socket.on("clear", () => {
    setLines([]);
  });

  return () => {
    socket.off("draw");
    socket.off("clear");
  };
}, []);
  const handleMouseDown = (pos: { x: number; y: number }) => {
    setIsDrawing(true);

    setHistory((prev) => [...prev, lines]);
    setRedoStack([]);

    setLines((prev) => [
      ...prev,
      {
        points: [pos.x, pos.y],
        stroke: tool === "eraser" ? "#000000" : color,
        strokeWidth: brushSize,
        compositeOperation:
          tool === "eraser" ? "destination-out" : "source-over",
      },
    ]);
  };

  const handleMouseMove = (pos: { x: number; y: number }) => {
    if (!isDrawing) return;

    setLines((prev) => {
      const lastLine = prev[prev.length - 1];
      const updatedLine = {
        ...lastLine,
        points: [...lastLine.points, pos.x, pos.y],
      };
      return [...prev.slice(0, -1), updatedLine];
    });
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    const lastLine = lines[lines.length - 1];
  if (lastLine) {
    socket.emit("draw", lastLine);
  }

  };

  const handleUndo = () => {
    if (history.length === 0) return;

    const previous = history[history.length - 1];

    setRedoStack((prev) => [...prev, lines]);
    setLines(previous);
    setHistory((prev) => prev.slice(0, -1));
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;

    const next = redoStack[redoStack.length - 1];

    setHistory((prev) => [...prev, lines]);
    setLines(next);
    setRedoStack((prev) => prev.slice(0, -1));
  };

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.1, 3));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.5));
  const handleResetZoom = () => setScale(1);
  const clearCanvas = () => {
  setHistory((prev) => [...prev, lines]);
  setRedoStack([]);
  setLines([]);

  socket.emit("clear");
};

  return {
    clearCanvas,
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
  };
};