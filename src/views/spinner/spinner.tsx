import React from 'react';
import './spinner.css';

const Spinner = () : JSX.Element => {
  return (
    <div className = 'loading-spinner-container'>
      <div className = 'loading-spinner'>
      </div>
    </div>
  );
}

export default Spinner;