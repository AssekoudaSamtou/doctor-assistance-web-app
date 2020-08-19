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
