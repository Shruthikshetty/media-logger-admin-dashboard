'use client';
import React, { JSX } from 'react';
import { AppColors } from '~/constants/colors.constants';

/**
 * A loading spinner component.
 *
 * @return {JSX.Element} A spinner element with specified size, color, and animation.
 */
const Spinner = () => {
  return (
    <div className="h-15 w-15 animate-spin rounded-full border-6 border-white/30 border-t-white md:h-18 md:w-18" />
  );
};

type DotRingSpinnerProps = {
  dotSize?: number;
  radius?: number;
  dots?: number;
  color?: string;
  durationMs?: number;
  label?: string;
  className?: string;
};

/**
 * A spinning ring of dots component.
 *
 * @param {number} [dotSize=8] - size of each dot in px
 * @param {number} [radius=28] - distance from center to each dot in px
 * @param {number} [dots=12] - number of dots around the circle
 * @param {string} [color=AppColors.base.white] - CSS color
 * @param {number} [durationMs=1300] - rotation duration in ms
 * @param {string} [label='Loading'] - ARIA label
 * @param {string} [className=''] - additional class names for the component
 * @return {JSX.Element} A spinning ring of dots element with specified size, color, and animation.
 */
export function DotRingSpinner({
  dotSize = 8,
  radius = 28,
  dots = 12,
  color = AppColors.base.white,
  durationMs = 1300,
  label = 'Loading',
  className = '',
}: DotRingSpinnerProps): JSX.Element {
  const containerSize = radius * 2 + dotSize;
  const items = Array.from({ length: dots });

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={label}
      className={`relative ${className}`}
      style={{
        width: containerSize,
        height: containerSize,
        // rotate the whole ring
        animation: `dot-ring-spin ${durationMs}ms linear infinite`,
      }}
    >
      {items.map((_, i) => {
        const angle = (i / dots) * 2 * Math.PI;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              width: dotSize,
              height: dotSize,
              left: containerSize / 2 - dotSize / 2 + x,
              top: containerSize / 2 - dotSize / 2 + y,
              backgroundColor: color,
              opacity: 0.25 + (i / dots) * 0.75, // subtle tail effect
            }}
          />
        );
      })}
      {/* screen reader only  */}
      <span className="sr-only">{label}…</span>
      {/* keyframe for ring animation */}
      <style jsx>{`
        @keyframes dot-ring-spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

export default Spinner;
