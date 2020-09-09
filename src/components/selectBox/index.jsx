import React from 'react';
import './index.scss';

const selectBox = ({ selectOptions, onChange, defaultOption }) => (
  <select onChange={onChange} required className="f select">
    {defaultOption ? (
      <option value="">
        {defaultOption}
      </option>
    ) : null}
    {selectOptions
      ? selectOptions.map((option) => (
          <option key={`${option}-1`} value={option}>
            {option}
          </option>
        ))
      : null}
  </select>
);

export default selectBox;
