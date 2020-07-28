import React from 'react';
import './index.scss';

const Spinner = ({ showSpinner }) => {
  return (
    <div className='my-spinner'>
      {showSpinner ? (
        <div className='overlay spin'>
          <div className='spinner'></div>
        </div>
      ) : null}
    </div>
  );
};

export default Spinner;
