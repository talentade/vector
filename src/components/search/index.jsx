import React from "react";
import SearchIcon from "../../themes/images/tradeDashboard/search.svg";
import "./index.scss";

const Search = ({ handleChange, name, id, placeholder }) => (
  <div className="search-container">
	  {
	  	id ? 
	  	<input
	      type="text"
	      onKeyUp={handleChange}
	      name={name}
	      id={id}
	      placeholder={placeholder}
	    /> : 
	    <input
	      type="text"
	      onKeyUp={handleChange}
	      name={name}
	      placeholder={placeholder}
	    />
	  }
    <img src={SearchIcon} alt="" />
  </div>
);

export default Search;
