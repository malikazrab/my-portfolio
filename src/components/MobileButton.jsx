import React, { useEffect, useRef } from 'react';
import { useTouchRipple } from '../hooks/useTouchRipple';

/**
 * Enhanced mobile button with ripple effect and animations
 */
export default function MobileButton({
  children,
  className = '',
  onClick,
  type = 'button',
  ...props
}) {
  const { ref, onTouchStart } = useTouchRipple();

  return (
    <button
      ref={ref}
      type={type}
      className={`mobile-magnetic mobile-squeeze ${className}`}
      onClick={onClick}
      onTouchStart={onTouchStart}
      {...props}
    >
      {children}
    </button>
  );
}
