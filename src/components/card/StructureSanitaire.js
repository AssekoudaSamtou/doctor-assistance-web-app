import React, {useEffect, useState} from 'react';
import {Image} from 'react-bootstrap';

import {BASE_URL} from '../../http-common';
import hospitalBuilding from '../../data/icons/hospital-building.png'

const handleOnclik = (event) => {

}

const StructureSanitaire = ({nom, adresse, onClick, id, onMount}) => {

    useEffect(() => {
        onMount(id);
    });

    return (
        <div id={`structureSanitaire-${id}`} className="doctor-card has-shadow" onClick={(event) => {onClick(id);}}>
            <input type='hidden' name='medecinStructureSanitaireID' value=''/>
            <div className="doc-info-wrap text-left">
                <div className="doctor-img">
                    <img src={hospitalBuilding} alt=""/>
                </div>
                <div className="doc-info">
                    <h4 className="bold">{nom}</h4>
                    <h5>{adresse}</h5>
                    <div className="doc-rating">
                        <span className="btn" style={{cursor: 'pointer'}}>Ajouter</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StructureSanitaire;