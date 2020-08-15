import React from 'react';
import { Link } from 'react-router-dom';

import PageTitle from '../../card/PageTitle';
import PatientDataService from "../../../services/patient.service";
import NotFound from "../error/404";
import computedAge, {GIRL_AVATAR, BOY_AVATAR} from '../../../utils';
import PatientInfoItem from '../../card/PatientInfoItem';
import AddConsultation from '../consultation/AddConsultation';
import loading from '../../../data/icons/loading.svg';
import AvatarPreview from '../../card/AvatarPreview';
import TagList from '../../card/TagList';

class PatientDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            patient: {id: null, 
                nom: "", 
                prenom: "", 
                adresse: "", 
                telephone: "", 
                date_naissance: "", 
                genre: "",
                groupage: "",
                maladies: "",
                allergies: "",
                habitude_alimentaires: "",
                photo: "",
            },
        }
    }

    componentWillMount() {
        const { match: { params } } = this.props;
        
        PatientDataService.get(params.id)
        .then(response => {
            this.setState({patient: {...response.data}});
        }).catch(e => {
            this.setState({patient: {...this.state.patient, id: 0}});
            console.log(e);
        });
    }

    componentDidMount() {
        // window.$(document).ready( () => {
        //     window.$('body').hide();
        //     window.$('body').fadeIn(1000);
        // })
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
                            <PageTitle title="Profil du patient" />
                            
                            <div className="clearfix"></div>

                            <div className="col-lg-4">
                                <section className="box ">
                                    <div className="content-body p">
                                        <div className="row">
                                            <div className="doctors-list patient relative">
                                                <div className="doctors-head relative text-center">
                                                    
                                                    { this.state.patient.photo ? (
                                                        <AvatarPreview avatar={this.state.patient.photo} />
                                                    ) : (
                                                        <AvatarPreview avatar={this.state.patient.genre === "M" ? BOY_AVATAR : GIRL_AVATAR} />
                                                    )}

                                                    <h3 className="header w-text relative bold">Nom : {this.state.patient.nom} {this.state.patient.prenom}</h3>
                                                    {/* <p className="desc g-text relative">Lorem ipsum dolor sit amet, Earum nes ciunt fugiat enim. Sequi quos labore.</p> */}
                                                </div>
                                                <div className="row">
                                                    <div className="patients-info relative">
                                                        <PatientInfoItem title="Sexe" value={this.state.patient.genre === "M" ? "Masculin" : "Féminin"} />
                                                        <PatientInfoItem title="Age" value={`${computedAge(this.state.patient.date_naissance)} Ans`} />
                                                        <PatientInfoItem title="Taille du patient" value="176 cm" />
                                                        <PatientInfoItem title="Poids du patient" value="67 Kg" />
                                                    </div>
                                                </div>
                                                {/* <!-- end row --> */}
                                                
                                                <div className="col-xs-12 mb-30">
                                                    <Link to={`/patients_update/${this.state.patient.id}`} className="btn btn-primary btn-lg gradient-blue d-block" style={{display: 'block', marginTop: '20px'}}>
                                                        <span>Modifier</span>
                                                    </Link>
                                                    <a data-toggle="modal" href="#cmpltadminModal-7" className="btn btn-primary btn-lg gradient-blue d-block" style={{display: 'block', marginTop: '20px'}}>
                                                        <span>Nouvelle consultation</span>
                                                    </a>
                                                </div>
                                                
                                                <div className="modal fade col-xs-12" id="cmpltadminModal-7" tabIndex="-1" role="dialog" aria-hidden="true">
                                                    <div className="modal-dialog" style={{width:"80%"}}>
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                                                <h4 className="modal-title">{this.state.patient.nom} {this.state.patient.prenom}</h4>
                                                            </div>
                                                            <div className="modal-body">
                                                                <AddConsultation detail={"detail"} patientId={this.state.patient.id} />
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button type="button" className="btn btn-info" data-dismiss="modal">Close</button>
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
                                                <h2 className="title pull-left">Historique des consultations</h2>
                                                
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
                                                            
                                                            { this.state.patient.consultations.map((consultation) => (
                                                                <li className="activity-list warning">
                                                                    <div className="detail-info">
                                                                        <div className="visit-doc">
                                                                            <small className="text-muted detail-consultation-overwiew" dangerouslySetInnerHTML={{__html: consultation.resume}}></small>
                                                                            <p className="message detail-consultation-overwiew" dangerouslySetInnerHTML={{__html: consultation.motif}}></p>
                                                                            
                                                                        </div>
                                                                        <div className="visit-date visit-stat pull-right">
                                                                            {/* <span></span> */}
                                                                            <p className="mb-0">OPEN</p>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            )) }
                                                            
                                                        </ul>
                                                    </div>      
                                                </div> 
                                                {/* <!-- End .row --> */}
                                            </div>
                                        </section>
                                    
                                    </div>
                                </div>
                                
                                <div className="row">
                                    <div className="col-md-12 col-sm-12">
                                        <section className="box gradient-blue" style={{padding:20+'px'}}>
                                            <div className="patient-personal mb-0">
                                                <h4 className="w-text">Groupe sanguin :</h4>
                                                <p className="mb-0 g-text info-medicales">{this.state.patient.groupage}</p>
                                            </div>
                                            <div className="patient-personal mb-0">
                                                <h4 className="w-text">Allergies :</h4>
                                                <TagList list={this.state.patient.allergies ? this.state.patient.allergies.split(',') : []} />
                                            </div>
                                            <div className="patient-personal mb-0">
                                                <h4 className="w-text">Maladies :</h4>
                                                <TagList list={this.state.patient.maladies ? this.state.patient.maladies.split(',') : []} />
                                            </div>
                                            <div className="patient-personal mb-0">
                                                <h4 className="w-text">Habitudes Alimentaires :</h4>
                                                <TagList list={this.state.patient.habitude_alimentaires ? this.state.patient.habitude_alimentaires.split(',') : []} />
                                            </div>
                                            <div className="patient-personal mb-0">
                                                <h4 className="w-text">Pression artérielle :</h4>
                                                <p className="mb-0 g-text info-medicales">130/80 mmHG</p>
                                            </div>
                                            <div className="patient-personal mb-0">
                                                <h4 className="w-text">Température :</h4>
                                                <p className="mb-0 g-text info-medicales">36.8 Degree</p>
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