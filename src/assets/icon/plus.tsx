import * as React from "react";

interface SVGProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
}

const Plus: React.FC<SVGProps> = ({ width = 20, height = 20, ...props }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9.99996 4.16667V15.8333M4.16663 10H15.8333"
      stroke="white"
      strokeWidth={1.66667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Plus;
