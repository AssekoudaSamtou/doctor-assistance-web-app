import React, { useState } from "react";

import PageTitle from "../../../card/PageTitle";
import First from "../../../First/First";
import Cookies from "universal-cookie";
import DoctorDetailForm from "./DoctorDetailForm";

const cookies = new Cookies();

class DoctorDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let doctor = cookies.get("loggedUser");
  }

  render() {
    return (
      <div>
        <PageTitle title="Doctor Dash" />

        <div className="row">
          <First />
          <First />
        </div>


        <form className="freefrontend-custom-select-box">
	<div className="select-box">
		<input type="checkbox" className="options-view-button"/>
		<div className="select-button brd">
			<div className="selected-value">
				<span>Select a platform</span>
			</div>
			<div className="chevrons">
				<i className="fas fa-chevron-up"></i>
				<i className="fas fa-chevron-down"></i>
			</div>
		</div>
		
		<div className="options">
			<div className="option">
				<input className="s-c top" type="radio" name="platform" value="codepen"/>
				<input className="s-c bottom" type="radio" name="platform" value="codepen"/>
				<i className="fab fa-codepen"></i>
				<span className="label">CodePen</span>
				<span className="opt-val">CodePen</span>
			</div>

			<div className="option">
				<input className="s-c top" type="radio" name="platform" value="dribbble"/>
				<input className="s-c bottom" type="radio" name="platform" value="dribbble"/>
				<i className="fab fa-dribbble"></i>
				<span className="label">Dribbble</span>
				<span className="opt-val">Dribbble</span>
			</div>

			<div className="option">
				<input className="s-c top" type="radio" name="platform" value="behance"/>
				<input className="s-c bottom" type="radio" name="platform" value="behance"/>
				<i className="fab fa-behance"></i>
				<span className="label">Behance</span>
				<span className="opt-val">Behance</span>
			</div>

			<div className="option">
				<input className="s-c top" type="radio" name="platform" value="hackerrank"/>
				<input className="s-c bottom" type="radio" name="platform" value="hackerrank"/>
				<i className="fab fa-hackerrank"></i>
				<span className="label">HackerRank</span>
				<span className="opt-val">HackerRank</span>
			</div>

			<div className="option">
				<input className="s-c top" type="radio" name="platform" value="stackoverflow"/>
				<input className="s-c bottom" type="radio" name="platform" value="stackoverflow"/>
				<i className="fab fa-stack-overflow"></i>
				<span className="label">StackOverflow</span>
				<span className="opt-val">StackOverflow</span>
			</div>

			<div className="option">
				<input className="s-c top" type="radio" name="platform" value="freecodecamp"/>
				<input className="s-c bottom" type="radio" name="platform" value="freecodecamp"/>
				<i className="fab fa-free-code-camp"></i>
				<span className="label">FreeCodeCamp</span>
				<span className="opt-val">FreeCodeCamp</span>
			 </div>
			<div className="option-bg"></div>
		</div>
	</div>
</form>

        <div
          className="modal fade col-xs-12 d-none" id="doctorDetailsModal" tabIndex="-1" role="dialog"aria-hidden="true">

          <div className="modal-dialog h-available" style={{ width: 96+"%"}}>
            <div className="modal-content h-available" style={{  }}>
              <div className="modal-body h-available" style={{ padding: 0 }}>
                <DoctorDetailForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DoctorDashboard;
