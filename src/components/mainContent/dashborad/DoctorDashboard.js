import React, { useState } from 'react';

import PageTitle from '../../card/PageTitle';
import First from '../../First/First';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class DoctorDashboard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            
        };
    }

    componentDidMount() {
        let doctor = console.log(cookies.get("loggedUser"));
        window.$('#cmpltadminModal').modal('toggle');
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

                <div className="modal fade col-xs-12 d-none" id="cmpltadminModal" tabIndex="-1" role="dialog" aria-hidden="true" >
                    <div className="modal-dialog" style={{width: 96+'%'}}>
                        <div className="modal-content">
                            <div className="modal-body">

                            <section className="box ">
                                    <header className="panel_header">
                                        <h2 className="title pull-left">Nous aimerions savoir un peu plus sur vous</h2>
                                    </header>
                                    <div className="content-body">
                                        <div className="row">
                                            <div className="col-xs-12">

                                                <form id="commentForm" noValidate="novalidate">

                                                    <div id="pills" className="wizardpills">
                                                        <ul className="form-wizard nav nav-pills">
                                                            <li className="active"><a href="#pills-tab1" data-toggle="tab" aria-expanded="false"><span>Basic</span></a></li>
                                                            <li className=""><a href="#pills-tab2" data-toggle="tab" aria-expanded="true"><span>Profile</span></a></li>
                                                            <li className=""><a href="#pills-tab3" data-toggle="tab" aria-expanded="false"><span>Address</span></a></li>
                                                            <li className=""><a href="#pills-tab4" data-toggle="tab" aria-expanded="false"><span>Settings</span></a></li>
                                                        </ul>
                                                        <div id="bar" className="progress active">
                                                            <div className="progress-bar progress-bar-primary " role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style={{width: 50+'%'}}></div>
                                                        </div>
                                                        <div className="tab-content">
                                                            <div className="tab-pane active" id="pills-tab1">

                                                                <h4>Basic Information</h4>
                                                                <br/>
                                                                <div className="row">
                                                                    <div className="form-group col-lg-6 col-xs-12">
                                                                        <label className="form-label">Full Name</label>
                                                                        <div className="controls">
                                                                            <input type="text" placeholder="Nom" className="form-control" name="txtFullName" id="txtFullName"/>
                                                                        </div>
                                                                    </div>

                                                                    <div className="form-group col-lg-6 col-xs-12">
                                                                        <label className="form-label">Email</label>
                                                                        <div className="controls">
                                                                            <input type="text" placeholder="Prénom" className="form-control" name="txtEmail" id="txtEmail"/>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className="row">
                                                                    <div className="form-group">
                                                                        <label className="form-label">Phone</label>
                                                                        <div className="controls">
                                                                            <input type="text" placeholder="Phone" className="form-control" name="txtPhone" id="txtPhone"/>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                    
                                                            </div>
                                                            <div className="tab-pane" id="pills-tab2">
                                                                <h4>Profile Information</h4>
                                                                <br/>
                                                                <p>Form goes here</p>
                                                            </div>
                                                            <div className="tab-pane" id="pills-tab3">
                                                                <h4>Contact Information</h4>
                                                                <br/>
                                                                <p>Form goes here</p>
                                                            </div>
                                                            <div className="tab-pane" id="pills-tab4">
                                                                <h4>Settings Information</h4>
                                                                <br/>
                                                                <p>Form goes here</p>
                                                            </div>
                                                            <div className="tab-pane" id="pills-tab5">
                                                                <h4>Portfolio Information</h4>
                                                                <br/>
                                                                <p>Form goes here</p>
                                                            </div>

                                                            <div className="clearfix"></div>

                                                            <ul className="pager wizard">
                                                                <li className="previous first" style={{display:'none'}}><a href="javascript:;">First</a></li>
                                                                <li className="previous"><a href="javascript:;">Previous</a></li>
                                                                <li className="next last" style={{display:'none'}}><a href="javascript:;">Last</a></li>
                                                                <li className="next"><a href="javascript:;">Next</a></li>
                                                                <li className="finish"><a href="javascript:;">Finish</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                            </div>
                            {/* <div className="modal-footer">
                                <button type="button" className="btn btn-info" data-dismiss="modal">Close</button>
                            </div> */}
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default DoctorDashboard;