import React from 'react';
// import {Col} from 'react-bootstrap';

import avatar1 from '../../../data/profile/avatar-1.png';
import PatientInfoItem from '../../card/PatientInfoItem';

const PatientItem = ({fullname, gender, age}) => (
    <div className="col-lg-4 col-md-6">
        <section className="box ">
            <div className="content-body p">
                <div className="row">
                    <div className="doctors-list patient relative">
                        <div className="doctors-head relative text-center">
                            <div className="patient-img img-circle">
                                <img src={avatar1} className="rad-50 center-block" alt=""/>
                                <div className="stutas recent"></div>
                            </div>
                            <h3 className="header w-text relative bold">Nom : {fullname} </h3>
                            
                        </div>
                        <div className="row">
                            <div className="patients-info relative">
                                <PatientInfoItem title="Patient  Gender" value={gender} />
                                <PatientInfoItem title="Years Old" value={`Age: ${age}`} />
                            </div>
                        </div>
                        
                        <div className="col-xs-12 mb-30">
                            <div className="form-group no-mb">
                                <button type="button" className="btn btn-primary btn-lg gradient-blue" style={{width: 100+'%'}}> View Profile</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
)

export default PatientItem;