import React, { memo } from "react";
import { shouldUseLiteMode } from "../utils/performance";

function InteractivePanel({
  children,
  className = "",
  innerClassName = "",
  hover = true,
  ...props
}) {
  const enableHover = hover && !shouldUseLiteMode();

  return (
    <div
      className={`${className} ${enableHover ? "panel-hover" : ""}`}
      {...props}
    >
      <div className={innerClassName}>{children}</div>
    </div>
  );
}

export default memo(InteractivePanel);
