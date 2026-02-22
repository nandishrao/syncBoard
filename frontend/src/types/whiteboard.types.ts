export type Tool = "brush" | "eraser";

export type CompositeMode = "source-over" | "destination-out";

export interface DrawLine {
  points: number[];
  stroke: string;
  strokeWidth: number;
  compositeOperation: CompositeMode;
}