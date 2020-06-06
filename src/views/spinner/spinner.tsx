import React from 'react';
import './spinner.css';

import { ApplicationContainer } from '../../providers/application';

// A loading spinner with application status text.

const Spinner = () : JSX.Element => {

  const {
    state: applicationState
  } = ApplicationContainer.useContainer();

  return (
    <div className = 'loading-spinner-container'>
      <div className = 'loading-spinner'>
      </div>
      <div style = {{margin: '10px 0'}}>
        {applicationState.loadingStatus}
      </div>
    </div>
  );
}

export default Spinner;