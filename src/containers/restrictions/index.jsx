import React, { Component } from 'react';
import $ from 'jquery';
import Container from '../container/index';
import Breadcrumbs from '../../components/breadcrumbs/index';
import RestrictionNav from '../../components/restrictionNav/index';
import Spinner from '../../components/spinner/index';
import CancelIcon from '../../themes/images/cancel.svg';
import country from 'country-list-js';
import permissions from '../../utils/permissions-all';
import server from '../../services/server';
import app from '../../services/app';
import './index.scss';

class Restrictions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      country_names: [],
      showRestrictions: false,
    };

    this.permitted = [];
    this.showSpinner = false;
    this.profile = app.profile();
    this.id = this.profile.user_id;
  }

  async componentDidMount() {

    let permissions = await server.savedPermissions();
    let ps = Object.values(permissions.data.permissions);

    $(".p-check").each((k, v) => {
      if(ps.indexOf($(v).data("permit")) > -1) {
        $(v).prop("checked", true);
      }
    });

    $("#save-all-changes-btn").click(async () => {
      try {
        let sp = await server.savePermissions(this.permitted.join(","));
        window.location.href = "";
      } catch (e) {
        return e;
      }
    });

  }

  checkPermit = (e) => {

    let permitted = [];
    $(".p-check").each((k, v) => {
      if(v.checked) {
        permitted.push($(v).data("permit"));
      }
    });

    this.permitted = permitted;

  }

  render() {

    let perm = permissions[0], fetched = [];

    return (
      <Container>
        <div className='restrictions-section'>
          <Spinner showSpinner={this.showSpinner} />
          <Breadcrumbs breads={"Home, Restrictions"} />

          <div className="full-screen">
            <div className="main">
              <div className="not-overscroll">
              <table>
                <tr>
                {
                  "1,2,3".split(",").map((i, j) => (
                    <td>
                      {Object.keys(perm).map((p, k) => (
                        (
                          (j == 0 && k < 4) ||
                          (j == 1 && k < 6) ||
                          (j == 2)
                        ) && fetched.indexOf(k) < 0 ? (
                          <>
                            {fetched.push(k) && null}
                            <h3>{p.toUpperCase()}</h3>
                            <ul className="p-list section">
                              {perm[p].map((ps) => (
                                <li key={Math.random()+' '+Math.random()}>
                                  <span className="permission">{ps}</span>
                                  <span className="toggle">
                                    <label className="switch"><input type="checkbox" data-permit={ps.toLowerCase()} className="p-check" onChange={(e) => this.checkPermit(e)} /><span className="slider round"></span></label>
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </>
                        ) : null
                      ))}
                    </td>
                  ))
                }
                </tr>
              </table>
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

export default Restrictions;
