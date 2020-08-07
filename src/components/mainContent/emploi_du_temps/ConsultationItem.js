import React, { useState, useEffect } from 'react';

import clock from "../../../data/hos-dash/clock.png";
import sad from "../../../data/hos-dash/sad.png";

const ConsultationItem = ({consultation, demande_consultation}) => {
    
    return (
        <section className="box gradient-pink" style={{paddingLeft:'20px', paddingRight: '20px'}}>
            <div style={{width: 'fit-content', background: 'white', padding: '5px', fontWeight: 'bolder'}}><i className="far fa-calendar-alt"></i> Lun 02 Aout 20</div>
            <div className="doctor-card mb-0">
                <div className="row mt-5">
                    <div className="col-lg-6">
                        <div style={{textAlign: 'center'}}>
                            <i className="far fa-hospital fa-2x" style={{color:'aqua', marginBottom:'10px'}}></i>
                        </div>
                        <div style={{textAlign: "center"}}>
                            <span style={{fontWeight: 700}}> {demande_consultation.hopital.denomination} </span>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div style={{textAlign: 'center'}}>
                            <i className="far fa-user fa-2x" style={{color:'aqua', marginBottom:'10px'}}></i>
                        </div>
                        <div style={{textAlign: "center"}}>
                            <span style={{fontWeight: 700}}> {demande_consultation.patient.nom} {demande_consultation.patient.prenom} </span>
                        </div>
                    </div>
                </div>
                <div className="doc-info-wrap transparent mb-30" style={{padding:0}}>
                    <div className="patient-personal mb-0">
                        <h4 className="" style={{color: '#795548'}}>Motif :</h4>
                        <p className="mb-0 g-text">{consultation.motif}</p>
                    </div>
                    <div className="patient-personal mb-0">
                        <h4 className="" style={{color: '#795548'}}>Interrogatoire :</h4>
                        <p className="mb-0 g-text">{consultation.interrogatoire}</p>
                    </div>
                    <div className="patient-personal mb-0">
                        <h4 className="" style={{color: '#795548'}}>Hypothese Diagnostique :</h4>
                        <p className="mb-0 g-text">{consultation.hypothese_diagnostique}</p>
                    </div>
                </div>
                {/* <div className="progress mb-0">
                    <div className="progress-bar progress-bar-success text-left" role="progressbar" aria-valuenow="86" aria-valuemin="0" aria-valuemax="100" style={{width: '24%'}}>Unhappy</div>
                </div> */}
            </div>
        </section>
    )
}

export default ConsultationItem;