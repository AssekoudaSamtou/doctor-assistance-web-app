import React from 'react';
import {Link} from 'react-router-dom';
import computedAge, {GIRL_AVATAR, BOY_AVATAR} from '../../../utils';
import PatientInfoItem from '../../card/PatientInfoItem';

const PatientItem = ({fullname, gender, date_naissance, id, }) => {

    return (
        <div className="col-lg-4 col-md-6">
            <section className="box ">
                <div className="content-body p">
                    <div className="row">
                        <div className="doctors-list patient relative">
                            <div className="doctors-head relative text-center">
                                <div className="patient-img img-circle">
                                    {/* <img src={avatar1} className="rad-50 center-block" alt=""/> */}
                                    <img className="rad-50 center-block" src={gender === "M" ? BOY_AVATAR : GIRL_AVATAR}/>

                                    <div className="stutas recent"></div>
                                </div>
                                <h3 className="header w-text relative bold">{fullname} </h3>
                                
                            </div>
                            <div className="row">
                                <div className="patients-info relative">
                                    <PatientInfoItem title="Sexe" value={gender === "M" ? "Masculin" : "Féminin"} />
                                    <PatientInfoItem title="Age" value={`${computedAge(date_naissance)} Ans`} />
                                </div>
                            </div>
                            
                            <div className="col-xs-12 mb-30">
                                <div className="form-group no-mb">
                                    <Link to={`/patients_details/${id}`} className="btn btn-primary btn-lg gradient-blue" style={{width: 100+'%'}}>
                                        Voir le Profil
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default PatientItem;