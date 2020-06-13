import React from 'react';
import SelectBox from '../selectBox/index';
import FilterLogo from '../../themes/images/tradeDashboard/filter_logo.svg';
import './index.scss';

const Filter = ({ selectOptions }) => (
  <div className="filter-section">
    <img src={FilterLogo} alt="hamburger" />
    <SelectBox selectOptions={selectOptions} />
  </div>
);

export default Filter;
