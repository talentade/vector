import React from 'react';
import SelectBox from '../selectBox/index';
import FilterLogo from '../../themes/images/tradeDashboard/filter_logo.svg';
import './index.scss';

const Filter = ({ selectOptions, onChange }) => (
  <div className="filter-section">
    <img src={FilterLogo} alt="hamburger" />
    <SelectBox selectOptions={selectOptions} onChange={onChange} />
  </div>
);

export default Filter;
