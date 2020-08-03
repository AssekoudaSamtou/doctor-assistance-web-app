import React from 'react';

import hospitalBuilding from '../../../data/icons/hospital-building.png'

const HospitalItem = ({nom, adresse, id }) => {
    return (
        <div id={`structureSanitaire-${id}`} className="doctor-card has-shadow" >
            <div className="doc-info-wrap text-left">
                <div className="doctor-img" style={{borderRadius: 0}}>
                    <img src={hospitalBuilding} alt=""/>
                </div>
                <div className="doc-info">
                    <h4 className="bold">{nom}</h4>
                    <h5>{adresse}</h5>
                    <div className="doc-rating">
                        <span className="" style={{cursor: 'pointer'}}>Ajouter</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HospitalItem;