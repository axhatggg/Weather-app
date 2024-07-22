// src/CircularProgressBar.js
import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CircularProgressBar = ({ percentage }) => {
  const gradientId = 'gradient';

  return (
    <div className="w-full max-w-xs mx-auto">
      <svg style={{ height: 0 }}>
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3e98c7" />
            <stop offset="100%" stopColor="#e91e63" />
          </linearGradient>
        </defs>
      </svg>
      <div className="relative">
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            textColor: '#000000 ',
            pathColor: `url(#${gradientId})`,
            trailColor: '#d6d6d6',
            textSize: '20px',
            // Note: textWeight is not a valid property in buildStyles
            // Custom styling must be done via external CSS
          })}
        />
        
      </div>
    </div>
  );
};

export default CircularProgressBar;
