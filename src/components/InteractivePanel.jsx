import React, { memo } from "react";

function InteractivePanel({
  children,
  className = "",
  innerClassName = "",
  hover = true,
  ...props
}) {
  return (
    <div
      className={`${className} ${hover ? "panel-hover" : ""}`}
      {...props}
    >
      <div className={innerClassName}>{children}</div>
    </div>
  );
}

export default memo(InteractivePanel);
