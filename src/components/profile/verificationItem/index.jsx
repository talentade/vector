import React from "react";
import $ from 'jquery';
import server from '../../../services/server';
import app from '../../../services/app';
import Verified from "../../../themes/images/tradeDashboard/verifiedOne.svg";
import loader from "../loader.svg";
import Unverified from "../../../themes/images/tradeDashboard/verifiedTwo.svg";
import "./index.scss";

const handleDocChange = async (e, folder, name = null) => {
  const current = e.target.files[0];
  const fd = new FormData();
  fd.append('profile_doc.png', current, current.name);
  try {
    $("#verify-img-"+folder).attr("src", loader);
    let pi = await server.uploadDoc(fd, folder);
    const gp = await server.getProfile();
    app.profile(gp.data.profile);
    window._veripopcon = name;
    $(window).trigger("veripopcon");
  } catch (error) {
    window.location.href = "";
    return error.message;
  }
}

const VerificationItem = ({ verified, itemHead, itemContent, folder, name, buttonText }) => {
  return (
    <div className="verification-item">
      <div className="doc-img-info-section">
        <img src={verified ? Verified : Unverified} id={"verify-img-"+folder} alt="verify-status" />
        <div className="doc-info-section">
          <p className="verify-item-head">{itemHead}</p>
          <p className="verify-item-content">{itemContent}</p>
        </div>
      </div>
      <div className="verification-btn-section">
        <label htmlFor={`${itemHead}1`}>
          <p>{(verified ? 'Re-' : '')+buttonText}</p>
        </label>
        {folder
          ? <input type="file" name={name} onChange={(e) => handleDocChange(e, folder, name)} id={`${itemHead}1`} />
          : null
        }
        {/* style={{ background: verified ? '#C4C4C4' : null}} disabled={verified} */}
      </div>
    </div>
  );
}

export default VerificationItem;
