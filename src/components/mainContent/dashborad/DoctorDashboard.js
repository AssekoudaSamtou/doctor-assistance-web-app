import React, { useState } from 'react';

import PageTitle from '../../card/PageTitle';
import First from '../../First/First';


class DoctorDashboard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            
        };
    }

    render() {
        return (
            <div>
                <PageTitle title="Doctor Dash" />
                
                <div className="row">
                    <First/>
                    <First/>
                </div>
                <button type="button" className="btn btn-success btn-icon btn-lg mt-10 right15">
                    <i className="fa fa-plus f-s-14"></i> &nbsp; <span>New Patient</span>
                </button>
            </div>
        )
    }
}

export default DoctorDashboard;