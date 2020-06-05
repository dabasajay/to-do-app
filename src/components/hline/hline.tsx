import React from 'react';

export const HLine = () : JSX.Element => {
  return (
    <hr
      style = {{
        'borderTop': '1px solid rgba(0, 0, 0, 0.1)',
        'borderBottom': '1px solid rgba(255, 255, 255, 0.3)'
      }}
    />
  );
}