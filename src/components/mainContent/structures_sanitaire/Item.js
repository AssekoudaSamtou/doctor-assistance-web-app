import React from 'react';

import hospitalBuilding from '../../../data/icons/hospital-building.png'

const HospitalItem = ({nom, adresse, id, email, description, owner, onDeleteClick, onEditClick, onSeeClick }) => {

    let handleDeleteClick = () => {
        onDeleteClick(id, owner);
    }

    let handleEditClick = (id) => {
        onEditClick();
    }

    let handleSeeClick = (id) => {
        onSeeClick();
    }
    return (
        <div id={`structureSanitaire-${id}`} className="doctor-card has-shadow structure-sanitaire" style={{marginBottom: 20+'px', background: "linear-gradient(-12deg,#2a57d7 0,#9eeeff 100%)"}} >
            <div className="doc-info-wrap text-left">
                <div className="doctor-img" style={{borderRadius: 0}}>
                    <img src={hospitalBuilding} alt=""/>
                </div>
                <div className="doc-info">
                    <span className="bold text-uppercase h3" style={{color: '#777'}}>{nom}</span>
                    <h5>{adresse}</h5>
                    <div className="">
                        <span className="dot" style={{cursor: 'pointer', marginRight:15+'px', marginLeft:15+'px'}} onClick={handleDeleteClick}>
                            <i className="fas fa-trash" style={{color:'black'}}></i>
                        </span>
                        <span className="dot" style={{cursor: 'pointer', marginRight:15+'px'}} onClick={handleEditClick}>
                            <i className="far fa-edit" style={{color:'black'}}></i>
                        </span>
                        <span className="dot" style={{cursor: 'pointer', marginRight:15+'px'}} onClick={handleSeeClick}>
                            <i className="far fa-eye" style={{color:'black'}}></i>
                        </span>
                    </div>
                </div>
            </div>
            <div className="hos-info-footer mt-5">
                <div className="row mt-5">
                    <div className="col-lg-6 col-xs-6 mt-5" style={{borderRight: "2px solid black", color: 'aliceblue'}}>
                        <div className="text-center"><i className="fas fa-hospital-user fa-3x"></i></div>
                        <div className="text-center" style={{marginTop: 15+'px'}}><span className="h3" style={{fontWeight: "bolder"}}>1923</span></div>
                    </div>
                    <div className="col-lg-6 col-xs-6 mt-5" style={{color: 'aliceblue'}}>
                        <div className="text-center"><i className="fas fa-hand-holding-medical fa-3x"></i></div>
                        <div className="text-center" style={{marginTop: 15+'px'}}><span className="h3" style={{fontWeight: "bolder"}}>1923</span></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HospitalItem;