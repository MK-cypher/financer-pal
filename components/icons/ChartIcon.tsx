import React from "react";

export default function ChartIcon({
  width,
  height,
  bgColor,
  strokeColor,
}: {
  bgColor: string;
  strokeColor: string;
  width?: number;
  height?: number;
}) {
  return (
    <svg viewBox="0 0 600 600" width={width || 35} height={height || 35}>
      <path
        d="M0,517.25897L174.511138,395.851046l157.116136-63.254549l92.841354-63.254549l80.598537,39.789151l94.932834-199.965992-.000001,490.834891h-599.999998v-82.741028Z"
        transform="translate(.000002 0.000002)"
        fill={bgColor + "40"}
        stroke="rgba(0,0,0,0.41)"
        strokeWidth="1.2"
      />
      <path
        d="M0,517.258972L174.51114,395.851048l157.116136-63.254549l92.841354-63.25455l80.598537,39.78915L600,109.165106"
        transform="translate(.000001 0.000003)"
        fill="none"
        stroke={strokeColor}
        strokeWidth="10"
      />
    </svg>
  );
}
