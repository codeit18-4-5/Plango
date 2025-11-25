declare module "@tomickigrzegorz/react-circular-progress-bar" {
  import * as React from "react";

  export interface CircularProgressBarProps {
    id?: number;
    percent: number;
    size?: number;
    colorSlice?: string;
    colorCircle?: string;
    fontColor?: string;
    fontSize?: number | string;
    fontWeight?: number | string;
    stroke?: number;
    speed?: number;
    opacity?: number;
    fill?: string;
    unit?: string;
    animationOff?: boolean;
    rotation?: number;
    linearGradient?: string[];
    blur?: string;
    strokeLinecap?: "round" | "butt" | "square";
    hideValue?: boolean;
    viewBox?: string;
    className?: string;
    style?: React.CSSProperties;
  }

  export const CircularProgressBar: React.FC<CircularProgressBarProps>;
}
