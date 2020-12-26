import React, { Component } from 'react';
import $ from 'jquery';
import userDp from '../../themes/images/dummydp.png';
import cancel from '../../themes/images/cancel.png';
import Container from '../container/index';
import Pagination from '../../components/Pagination/index';
import UsersProfileList from '../usersprofile/s';
import Breadcrumbs from '../../components/breadcrumbs/index';
import Ptab from '../../components/ptabs/index';
import calls from "./calls.svg";
import view from "./view.svg";
import AddFunnel from '../../components/addfunnel/index';
import AddStage from '../../components/addstage/index';
import TableFilters from '../../components/tablefilters/index';
import SearchIcon from "../../themes/images/tradeDashboard/search.svg";
import server from '../../services/server';
import app from '../../services/app';
import '../../components/standard/standard.scss';
import './index.scss';



function allowDrop(ev) {
    ev.preventDefault();
}

function dragStart(ev) {
	let target = ev.target;
	if(!$(target).hasClass("sf-card")) {
		target = $(target).parents(".sf-card")[0];
		console.log("Locked on");
	}
    var myNode = document.getElementById(target.id);
    var row = $("#"+target.id).data("row");
    var uid = $("#"+target.id).data("uid");
    $(".putable[data-row='"+row+"']").addClass("highlight");
    var putable = '<div id="'+target.id+'-alt" data-row="'+row+'" data-uid="'+uid+'" class="card sf-card putable hide"></div>';
    if($(".putable.hide").length) {
        $(".putable.hide").remove();
    }
    if(myNode.nextSibling){
        myNode.parentNode.insertBefore($(putable)[0], myNode.nextSibling);
    } else {
        myNode.parentNode.appendChild($(putable)[0]);
    }
    ev.dataTransfer.setData("text/plain", target.id);
}

const dropIt = async (ev, dis) => {
    ev.preventDefault();
    let sourceId = ev.dataTransfer.getData("text/plain");
    let sourceIdEl=document.getElementById(sourceId);
    let targetEl=document.getElementById(ev.target.id);
    if(!targetEl || !targetEl.parentElement || !sourceIdEl || !sourceIdEl.parentElement) {
    	// console.log("Werey dey disguise");
    	return null;
    }
    let sourceIdParentEl=sourceIdEl.parentElement;
    let targetParentEl=targetEl.parentElement;
    if (targetParentEl.id!==sourceIdParentEl.id){
        if (targetEl.className === sourceIdEl.className){
        } else if($(targetEl).hasClass("putable") && $(targetEl).data("row") == $(sourceIdEl).data("row")) {
            let tid = targetEl.id;
            $(targetEl).replaceWith(sourceIdEl);
            $(".putable.hide").removeClass("hide");
            $("#"+sourceIdEl.id+"-alt").attr("id", tid);
            try {
	            let uf = await server.updateFunnel($(sourceIdEl).data("uid"), {fid: $(targetParentEl).data("funnel_id"), sid: $(targetParentEl).data("funnel_stage")});
	            let code = "#000000";
	            dis.state.funnels.forEach((v, k) => {
	            	if(v.id == $(targetParentEl).data("funnel_stage")) {
	            		code = v.code;
	            	}
	            });
              dataFunnel();
	            $("#"+sourceIdEl.id).css({borderLeft: "5px solid "+code});
	        } catch (e) {
	        	console.log(e);
	        	return e;
	        }
        }
    }
    $(".highlight").removeClass("highlight");
}

const dataFunnel = () => {
  setTimeout(() => {
    $("[data-funnel]").each((k, v) => {
      let fs = $(v).data("funnel_stage");
      let ct = Number($(v).find(".npt").length);
      $(v).find("#bl-"+fs).text(ct+" lead"+(ct > 1 ? "s" : ""));
    });
  }, 150);
}

const funnelStage = (d, f) => {
  if(d.length) {
    d = JSON.parse(d);
    let ret = d.hasOwnProperty(f) ? parseInt(d[f]) : 0;
    console.log(d, f, d.hasOwnProperty(f), d[f], ret);
    return ret;
  } else {
    return 0;
  }
}


class Salesfunnel extends Component {
  constructor(props) {
    super(props);

    this.state = {
    	half: false,
    	users: [],
      sid: 1,
    	funnels: [],
      showLoader: true,
      addfunnel: false,
      sfunnel: true,
      addStage: false,
    	stages: [],
    	uid: null
    }

  }

  async componentDidMount () {
    this.getAllUsers();
  }

  getAllUsers = async () => {
    this.setState({showLoader: true});
    try {
      let users   = await server.getAllUsers();
      let funnels = await server.getFunnels();
      let stages  = await server.getStages(this.state.sid);
      this.setState({users: users.data, funnels: funnels.data.funnels, stages: stages.data.stages, showLoader: false});
    } catch(e) {
      return e;
    }
    this.setState({showLoader: false});
  }

  switchFunnel = async (id) => {
    this.setState({showLoader: true, sfunnel: false});
    try {
      let stages  = await server.getStages(id);
      this.setState({stages: stages.data.stages, showLoader: false, sfunnel: true, sid: id});
    } catch(e) {
      return e;
    }
    this.setState({showLoader: false, sfunnel: true});
  }

  render() {
    const { navi, half, uid, sid, stages, funnels, users, addfunnel, addstage, sfunnel } = this.state;
    dataFunnel();

    return (
      <Container>
      <div className="col-12" id="sales-container">
        <div className="sales-section-right">
          {
            addfunnel ?
              <AddFunnel
                funnels={funnels}
                cancel={(e) => this.setState({addfunnel: false})}
              />
            : null
          }
          {
            addstage ?
              <AddStage
                funnels={funnels}
                sid={sid}
                cancel={(e) => this.setState({addstage: false})}
              />
            : null
          }
	        
			<Breadcrumbs breads="Home, Salesfunnel" />
			<h1 className="page-title">Salesfunnel</h1>
			<TableFilters table="sales" switch={this.switchFunnel} funnels={this.state.funnels} new={(e) => this.setState({addfunnel: true})} add={(e) => this.setState({addstage: true})} />

        <div
          className='loader-container'
          style={{ display: this.state.showLoader ? 'block' : 'none' }}
        >
          <div className='loader'></div>
        </div>

          {sfunnel ? 
          	<div className="board-layout">
  		      	<div id='boardlists' className="board-lists">
  				  	{
  					  	stages.map((st, sk) => (
  					    <div id={'list'+st.id} className="board-list" onDrop={(e) => dropIt(e, this)} data-funnel={st.stage} data-funnel_stage={st.id} data-funnel_id={st.funnel_id} onDragOver={(e) => allowDrop(e)}>
  							<div className="list-title">{st.stage}<br /><b id={"bl-"+st.id}>0 lead</b></div>
  					  		{
  					  			users.map((ut, uk) => (
  					  				funnelStage(ut.funnel, st.funnel_id) == st.id || (sk == 0 && funnelStage(ut.funnel, st.funnel_id) < 1) ?
  					          	<div id={'card-'+uk+'-'+st.id} className="card sf-card npt" draggable="true" style={{borderLeft: "5px solid "+st.code}} data-row={"row-"+uk} data-uid={ut.user_id} onDragStart={(e) => dragStart(e)}>
  					          		<img src={ut.profile_image.length ? ut.profile_image : userDp} /> <b>{ut.first_name+" "+ut.last_name}</b>
  					          		<div className="s2">${ut.bal.toFixed(2)} | 16 days ago <img src={calls} className="call" /> <img src={view} className="view" onClick={(e) => this.setState({uid: ut.user_id, half: true})} /></div>
  					          	</div> : <div id={'card-'+uk+'-'+st.id} className="card sf-card putable" data-row={"row-"+uk} data-uid={ut.user_id}></div>
  					        	))
  					      }
  					    </div>
  					  	))
  				  	}
  		      	</div>
		        </div>
            : null}

		    {half ?
		    <div className="half-screen">
		    <img src={cancel} className="x-half" onClick={() => this.setState({half: false})} />
			    <div>
			    	<UsersProfileList user_id={uid}/>
		    	</div>
		    </div> : null}


        </div>
      </div>
      </Container>
    );
  }
};

export default Salesfunnel;
