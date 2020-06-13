import React from "react";
import SearchIcon from "../../themes/images/tradeDashboard/search.svg";
import "./index.scss";

const Search = ({ handleChange, name, placeholder }) => (
  <div className="search-container">
    <input
      type="text"
      onChange={handleChange}
      name={name}
      placeholder={placeholder}
    />
    <img src={SearchIcon} alt="" />
  </div>
);

export default Search;
