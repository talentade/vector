import React from 'react';
import './index.scss';
import VerificationItem from "../verificationItem/index";

const VerificationGroup = ({ items }) => {
  return (
    <div className="verification-group">
      {
        items.map(data => <VerificationItem {...data} key={`${Math.random()}-${Math.random()}`}/>)
      }
    </div>
  )
};

export default VerificationGroup;
