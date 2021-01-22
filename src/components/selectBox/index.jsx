import React from 'react';
import './index.scss';

const selectBox = ({ selectOptions, onChange, id, defaultOption }) => (
  <select onChange={onChange} required className="f select" id={id ? id : ""}>
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
