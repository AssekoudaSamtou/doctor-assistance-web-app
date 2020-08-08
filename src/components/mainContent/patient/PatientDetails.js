import React from 'react';

import PageTitle from '../../card/PageTitle';
import PatientDataService from "../../../services/patient.service";
import NotFound from "../error/404";
import computedAge, {GIRL_AVATAR, BOY_AVATAR} from '../../../utils';

import profile from "../../../data/profile/profile.jpg"
import clock from "../../../data/hos-dash/clock.png"
import PatientInfoItem from '../../card/PatientInfoItem';
import { Link } from 'react-router-dom';
import AddConsultation from '../consultation/AddConsultation';
import loading from '../../../data/icons/loading.svg';

class PatientDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            patient: {id: null, nom: "", prenom: "", adresse: "", telephone: "", date_naissance: "", genre: ""},
        }
    }

    componentWillMount() {
        const { match: { params } } = this.props;
        
        PatientDataService.get(params.id)
        .then(response => {
            this.setState({patient: {...response.data}});
        }).catch(e => {
            this.setState({patient: {id: 0, nom: "", prenom: "", adresse: "", telephone: "", date_naissance: "", genre: ""}});
            console.log(e);
        });
    }

    componentDidMount() {
        
    }

    render() {
        return (
                <div>
                    { this.state.patient.id === null && (
                        <div>
                            <img src={loading} style={{width: '300px', margin: 'auto', display: 'block'}} />
                        </div>
                    )}

                    { (this.state.patient.id === 0) && (
                        <NotFound />
                    )}

                    {this.state.patient.id > 0 && (
                        <div>
                            <PageTitle title="Profil Patient" />
                            
                            <div className="clearfix"></div>

                            <div className="col-lg-4">
                                <section className="box ">
                                    <div className="content-body p">
                                        <div className="row">
                                            <div className="doctors-list patient relative">
                                                <div className="doctors-head relative text-center">
                                                    <div className="patient-img img-circle">
                                                    <img className="rad-50 center-block" src={this.state.patient.genre === "M" ? BOY_AVATAR : GIRL_AVATAR}/>
                                                        <div className="stutas"></div>
                                                    </div>
                                                    <h3 className="header w-text relative bold">Nom : {this.state.patient.nom} {this.state.patient.prenom}</h3>
                                                    {/* <p className="desc g-text relative">Lorem ipsum dolor sit amet, Earum nes ciunt fugiat enim. Sequi quos labore.</p> */}
                                                </div>
                                                <div className="row">
                                                    <div className="patients-info relative">
                                                        <PatientInfoItem title="Sexe" value={this.state.patient.genre === "M" ? "Masculin" : "Féminin"} />
                                                        <PatientInfoItem title="Age" value={`${computedAge(this.state.patient.date_naissance)} Ans`} />
                                                        <PatientInfoItem title="Patient  Height" value="176 cm" />
                                                        <PatientInfoItem title="Patient Weight" value="67 Kg" />
                                                    </div>
                                                </div>
                                                {/* <!-- end row --> */}
                                                
                                                <div className="col-xs-12 mb-30">
                                                    <div className="reminder-wrapper has-shadow2">
                                                        <div className="reminder-icon">
                                                            <img src={clock} width="60" alt=""/>
                                                        </div>
                                                        <div className="reminder-content">
                                                            <h4 className="w-text bold">Reminder Alarm</h4>
                                                            <h5 className="g-text">ask about medicine</h5>
                                                        </div>
                                                    </div>
                                                    <Link to={`/patients_update/${this.state.patient.id}`} className="btn btn-primary btn-lg gradient-blue d-block" style={{display: 'block', marginTop: '20px'}}>
                                                        <span>Edit</span>
                                                    </Link>
                                                    <a data-toggle="modal" href="#cmpltadminModal-7" className="btn btn-primary btn-lg gradient-blue d-block" style={{display: 'block', marginTop: '20px'}}>
                                                        <span>Nouvelle consultation</span>
                                                    </a>
                                                </div>
                                                <div class="modal fade col-xs-12" id="cmpltadminModal-7" tabindex="-1" role="dialog" aria-hidden="true">
                                            <div class="modal-dialog" style={{width:"80%"}}>
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                                        <h4 class="modal-title">{this.state.patient.nom} {this.state.patient.prenom}</h4>
                                                    </div>
                                                    <div class="modal-body">
                                                        <AddConsultation detail={"detail"} patientId={this.state.patient.id} />
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-info" data-dismiss="modal">Close</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                            </div>
                                        
                                        </div>
                                    </div>
                                </section>
                            </div>

                            <div className="col-lg-8 col-md-12">
                                <div className="row">
                                    <div className="col-xs-12 col-md-7">
                                        <section className="box ">
                                            <header className="panel_header">
                                                <h2 className="title pull-left">Blood Levels</h2>
                                                
                                            </header>
                                            <div className="content-body">    
                                                <div className="row">
                                                    <div className="col-xs-12">
                                                        <div className=""><canvas id="bar-chartjs" height="229" width="306" style={{width: 306+'px', height: 229+'px'}}></canvas></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </div>

                                    <div className="col-xs-12 col-md-5">
                                        
                                        <section className="box ">
                                            <header className="panel_header">
                                                <h2 className="title pull-left">Consultations</h2>
                                                
                                            </header>
                                            <div className="content-body">    
                                                <div className="row">
                                                    <div className="col-xs-12">
                                                        <ul className="project-activity list-unstyled mb-0">
                                                            <li className="activity-list warning">
                                                                <div className="detail-info">
                                                                    <div className="visit-doc">
                                                                        <small className="text-muted">
                                                                            I feel better Now :)
                                                                        </small>
                                                                        <p className="message">
                                                                            Meditation
                                                                        </p>
                                                                        
                                                                    </div>
                                                                    <div className="visit-date visit-stat pull-right">
                                                                        <p className="mb-0">OPENED</p>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li className="clearfix"></li>
                                                            <li className="activity-list info">
                                                                <div className="detail-info">
                                                                    <div className="visit-doc">
                                                                        <small className="text-muted">
                                                                            Treatment was good!
                                                                        </small>
                                                                        <p className="message">
                                                                            Thyroid Test
                                                                        </p>
                                                                    </div>
                                                                    <div className="visit-date visit-stat pull-right">
                                                                        <p className="mb-0 uppercase">closed</p>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li className="activity-list success">
                                                                <div className="detail-info">
                                                                    <div className="visit-doc">
                                                                        <small className="text-muted">
                                                                            My hair is gone!
                                                                        </small>
                                                                        <p className="message">
                                                                            Unhappy
                                                                        </p>
                                                                    </div>
                                                                    <div className="visit-date visit-stat pull-right">
                                                                        <p className="mb-0 uppercase">OPENED</p>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li className="activity-list warning">
                                                                <div className="detail-info">
                                                                    <div className="visit-doc">
                                                                        <small className="text-muted">
                                                                            My hair is gone!
                                                                        </small>
                                                                        <p className="message">
                                                                            Unhappy
                                                                        </p>
                                                                    </div>
                                                                    <div className="visit-date visit-stat pull-right">
                                                                        <p className="mb-0 uppercase">closed</p>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li className="activity-list danger">
                                                                <div className="detail-info pb0">
                                                                    <div className="visit-doc">
                                                                        <small className="text-muted">
                                                                            Great Mediacal Care 
                                                                        </small>
                                                                        <p className="message">
                                                                            Join Pain
                                                                        </p>
                                                                    </div>
                                                                    <div className="visit-date visit-stat pull-right">
                                                                        <p className="mb-0 uppercase">OPENED</p>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>      
                                                </div> 
                                                {/* <!-- End .row --> */}
                                            </div>
                                        </section>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 col-sm-12">
                                        <section className="box gradient-blue" style={{padding:20+'px'}}>
                                            <div className="patient-personal mb-0">
                                                <h4 className="w-text">Blood type :</h4>
                                                <p className="mb-0 g-text">AB+</p>
                                            </div>
                                            <div className="patient-personal mb-0">
                                                <h4 className="w-text">Allergies :</h4>
                                                <p className="mb-0 g-text">Penicilin, peanuts</p>
                                            </div>
                                            <div className="patient-personal mb-0">
                                                <h4 className="w-text">Diseases :</h4>
                                                <p className="mb-0 g-text">Diabetes</p>
                                            </div>
                                            <div className="patient-personal mb-0">
                                                <h4 className="w-text">Pressure :</h4>
                                                <p className="mb-0 g-text">130/80 mmHG</p>
                                            </div>
                                            <div className="patient-personal mb-0">
                                                <h4 className="w-text">Temperture :</h4>
                                                <p className="mb-0 g-text">36.8 Degree</p>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>

                            <div className="clearfix"></div>

                            <div className="col-md-12 col-sm-12 col-xs-12">

                                <div className="row mt-15">
                                    <div className="col-md-6 col-xs-12 ">
                                        <div className="r1_graph1 db_box db_box_large has-shadow2">
                                            <div className="pat-info-wrapper">
                                                <div className="pat-info text-left">
                                                    <h5 className="">Blood pressure</h5>
                                                    <h6>In the normal</h6>
                                                </div>
                                                <div className="pat-val relative">
                                                    <h4 className="value p-text">120/89 <span>mmHG</span></h4>
                                                </div>
                                            </div>
                                            <span className="sparklinedash2"><canvas width="121" height="60" style={{display: 'inline-block', width: 121+'px', height: 60+'px', verticalAlign: 'top'}}></canvas></span>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-xs-12">
                                        <div className="r1_graph1 db_box db_box_large has-shadow2">
                                            <div className="pat-info-wrapper">
                                                <div className="pat-info text-left">
                                                    <h5 className="">Heart Rate</h5>
                                                    <h6 className="red-text">Above the normal</h6>
                                                </div>
                                                <div className="pat-val relative">
                                                    <h4 className="value red-text">107 <span>Per min</span></h4>
                                                </div>
                                            </div>
                                            <span className="sparklinedash"><canvas width="121" height="60" style={{display: 'inline-block', width: 121+'px', height: 60+'px', verticalAlign: 'top'}}></canvas></span>
                                        </div>
                                    </div>
                                    
                                    <div className="col-md-6 col-xs-12">
                                        <div className="r1_graph1 db_box db_box_large has-shadow2">
                                            <div className="pat-info-wrapper">
                                                <div className="pat-info text-left">
                                                    <h5 className="">Glucose Rate</h5>
                                                    <h6>In the normal</h6>
                                                </div>
                                                <div className="pat-val relative">
                                                    <h4 className="value green-text"><i className="complete fa fa-arrow-up"></i>97<span>mg/dl</span></h4>
                                                </div>
                                            </div>
                                            <span className="sparkline8"><canvas width="214" height="60" style={{display: 'inline-block', width: 214+'px', height: 60+'px', verticalAlign: 'top'}}></canvas></span>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-xs-12">
                                    <div className="r1_graph1 db_box db_box_large has-shadow2">
                                        <div className="pat-info-wrapper">
                                            <div className="pat-info text-left">
                                                <h5 className="">Clolesterol</h5>
                                                <h6>In the normal</h6>
                                            </div>
                                            <div className="pat-val relative">
                                                <h4 className="value blue-text"><i className="cancelled fa fa-arrow-down"></i>124<span>mg/dl</span></h4>
                                            </div>
                                        </div>
                                        <span className="sparkline9"><canvas width="214" height="60" style={{display: 'inline-block', width: 214+'px', height: 60+'px', verticalAlign: 'top'}}></canvas></span>
                                    </div>
                                </div>
                                </div>
                            </div>

                            <div className="clearfix"></div>
                        </div>
                    )}
                    
                </div>
        )
    }
}

export default PatientDetails;