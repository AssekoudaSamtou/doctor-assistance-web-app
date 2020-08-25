import React from "react";

import PageTitle from "../../../card/PageTitle";
import Cookies from "universal-cookie";
import DoctorDetailForm from "./DoctorDetailForm";
import patientIcon from '../../../../data/icons/gradient/icons8-fever-96.png';
import DashboardResumeItem from "../../../card/dashboard-resume-item";
import { BOY_AVATAR, random_item } from "../../../../utils";
import AvatarPreview from "../../../card/AvatarPreview";

const cookies = new Cookies();

class DoctorDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        let doctor = cookies.get("loggedUser");
    }

    render() {
        const borderColors = ['#2acd72', '#f46bd7', '#ffc04f', '#07c7e0'];

        return (
            <div>
                <PageTitle title="Tableau de board" />

                <div>
                    <div className="row">
                        <div className="col-lg-9"> 
                            <div className="row dashboard-resume-list">
                                
                                <DashboardResumeItem 
                                    title="Total Patients" 
                                    value="61,923" icon={patientIcon} 
                                    footer={{label: "Total nouveau patient", value: '32,303'}} 
                                    style={{
                                        backgroundImage: "linear-gradient(to right bottom, #00d0c2, #1fd3c6, #2fd6ca, #3bd9ce, #46dcd2)",
                                        boxShadow: "0px 0px 15px 0px rgba(70,220,210,1)"
                                    }}
                                />
                                <DashboardResumeItem 
                                    title="Total Consultations" 
                                    value="92" icon={patientIcon} 
                                    footer={{label: "Consultation à venir", value: '09'}} 
                                    style={{
                                        backgroundImage: "linear-gradient(to right top, #6e8df2, #6686f1, #5e7ff1, #5578f0, #4d71ef)",
                                        boxShadow: "0px 0px 15px 0px #4d71ef"
                                    }}
                                />
                                <DashboardResumeItem 
                                    title="Rendez-vous" 
                                    value="23" icon={patientIcon} 
                                    footer={{label: "Rendez-vous acceptés", value: '03'}} 
                                    style={{
                                        backgroundImage: "linear-gradient(to right top, #f29d6e, #f29765, #f1915d, #f18b54, #f0854c)",
                                        boxShadow: "0px 0px 15px 0px #F29D6E"
                                    }}
                                />
                                
                            </div>

                            <section className="box doctor-activity">
                                <header className="panel_header">
                                    <h2 className="title pull-left">Rapport des Activités</h2>
                                </header>
                                <div className="content-body">    
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <div className="doctor-activity-chart-box">
                                                
                                                <canvas id="line-chartjs"></canvas>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <div className="row">
                                <div className="col-lg-6">
                                    <section className="box diseases-report">
                                        <header className="panel_header">
                                            <h2 className="title pull-left">Rapport sur les maladies</h2>
                                        </header>
                                        <div className="content-body">    
                                            <div className="row">
                                                <div className="col-xs-12">
                                                    <div className="doctor-activity-chart-box">
                                                        
                                                        <canvas id="donut-chartjs"></canvas>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>

                                <div className="col-lg-6">
                                    <section className="box patient-income">
                                        <header className="panel_header">
                                            <h2 className="title pull-left">Historique d'arrivée des patients</h2>
                                        </header>
                                        <div className="content-body">    
                                            <div className="row">
                                                <div className="col-xs-12">
                                                    <div className="doctor-activity-chart-box">
                                                        
                                                        <canvas id="bar-chartjs"></canvas>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3" id="appointments" style={{height: '', overflowY: 'scroll'}}>
                            <div>
                                <div className="appointment-day today-appointment">
                                    <div className="appointment-day-header row">
                                        <div className="col-lg-8"><span>Rendez-vous à venir</span></div>
                                        <div className="col-lg-4" style={{padding: '5px'}}><span className="appointment-date">AUJOURD'HUI</span></div>
                                    </div>
                                    <div className="appointment-day-content">
                                        <div className="item">
                                            <div className="row" style={{borderLeft: `2px solid ${random_item(borderColors)}`}}>
                                                {/* <div className="col-lg-2" style={{padding: 0, background: 'white'}}>
                                                    <div className="avatar" style={{backgroundImage: `url(${BOY_AVATAR})`}}></div>
                                                </div> */}
                                                <div className="col-lg-12" style={{ background: 'white' }}>
                                                    <div className="nom-motif">
                                                        <span>Veronica </span>
                                                        <span> - </span>
                                                        <span> Control Général </span>
                                                    </div>
                                                    <div className="heure">
                                                        <span>14:45 </span>
                                                        <span> . </span>
                                                        <span> 30 Mins </span>
                                                    </div>
                                                    <div style={{padding: "10px 0 0 0"}}>
                                                        <span className="appointment-action">HISTORIQUE MEDICAL</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="row" style={{borderLeft: `2px solid ${random_item(borderColors)}`}}>
                                                {/* <div className="col-lg-2" style={{padding: 0, background: 'white'}}>
                                                    <div className="avatar" style={{backgroundImage: `url(${BOY_AVATAR})`}}></div>
                                                </div> */}
                                                <div className="col-lg-12" style={{ background: 'white' }}>
                                                    <div className="nom-motif">
                                                        <span>Veronica </span>
                                                        <span> - </span>
                                                        <span> Control Général </span>
                                                    </div>
                                                    <div className="heure">
                                                        <span>14:45 </span>
                                                        <span> . </span>
                                                        <span> 30 Mins </span>
                                                    </div>
                                                    <div style={{padding: "10px 0 0 0"}}>
                                                        <span className="appointment-action">HISTORIQUE MEDICAL</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="row" style={{borderLeft: `2px solid ${random_item(borderColors)}`}}>
                                                {/* <div className="col-lg-2" style={{padding: 0, background: 'white'}}>
                                                    <div className="avatar" style={{backgroundImage: `url(${BOY_AVATAR})`}}></div>
                                                </div> */}
                                                <div className="col-lg-12" style={{ background: 'white' }}>
                                                    <div className="nom-motif">
                                                        <span>Veronica </span>
                                                        <span> - </span>
                                                        <span> Control Général </span>
                                                    </div>
                                                    <div className="heure">
                                                        <span>14:45 </span>
                                                        <span> . </span>
                                                        <span> 30 Mins </span>
                                                    </div>
                                                    <div style={{padding: "10px 0 0 0"}}>
                                                        <span className="appointment-action">HISTORIQUE MEDICAL</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="row" style={{borderLeft: `2px solid ${random_item(borderColors)}`}}>
                                                {/* <div className="col-lg-2" style={{padding: 0, background: 'white'}}>
                                                    <div className="avatar" style={{backgroundImage: `url(${BOY_AVATAR})`}}></div>
                                                </div> */}
                                                <div className="col-lg-12" style={{ background: 'white' }}>
                                                    <div className="nom-motif">
                                                        <span>Veronica </span>
                                                        <span> - </span>
                                                        <span> Control Général </span>
                                                    </div>
                                                    <div className="heure">
                                                        <span>14:45 </span>
                                                        <span> . </span>
                                                        <span> 30 Mins </span>
                                                    </div>
                                                    <div style={{padding: "10px 0 0 0"}}>
                                                        <span className="appointment-action">HISTORIQUE MEDICAL</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="row" style={{borderLeft: `2px solid ${random_item(borderColors)}`}}>
                                                {/* <div className="col-lg-2" style={{padding: 0, background: 'white'}}>
                                                    <div className="avatar" style={{backgroundImage: `url(${BOY_AVATAR})`}}></div>
                                                </div> */}
                                                <div className="col-lg-12" style={{ background: 'white' }}>
                                                    <div className="nom-motif">
                                                        <span>Veronica </span>
                                                        <span> - </span>
                                                        <span> Control Général </span>
                                                    </div>
                                                    <div className="heure">
                                                        <span>14:45 </span>
                                                        <span> . </span>
                                                        <span> 30 Mins </span>
                                                    </div>
                                                    <div style={{padding: "10px 0 0 0"}}>
                                                        <span className="appointment-action">HISTORIQUE MEDICAL</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="row" style={{borderLeft: `2px solid ${random_item(borderColors)}`}}>
                                                {/* <div className="col-lg-2" style={{padding: 0, background: 'white'}}>
                                                    <div className="avatar" style={{backgroundImage: `url(${BOY_AVATAR})`}}></div>
                                                </div> */}
                                                <div className="col-lg-12" style={{ background: 'white' }}>
                                                    <div className="nom-motif">
                                                        <span>Veronica </span>
                                                        <span> - </span>
                                                        <span> Control Général </span>
                                                    </div>
                                                    <div className="heure">
                                                        <span>14:45 </span>
                                                        <span> . </span>
                                                        <span> 30 Mins </span>
                                                    </div>
                                                    <div style={{padding: "10px 0 0 0"}}>
                                                        <span className="appointment-action">HISTORIQUE MEDICAL</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="row" style={{borderLeft: `2px solid ${random_item(borderColors)}`}}>
                                                {/* <div className="col-lg-2" style={{padding: 0, background: 'white'}}>
                                                    <div className="avatar" style={{backgroundImage: `url(${BOY_AVATAR})`}}></div>
                                                </div> */}
                                                <div className="col-lg-12" style={{ background: 'white' }}>
                                                    <div className="nom-motif">
                                                        <span>Veronica </span>
                                                        <span> - </span>
                                                        <span> Control Général </span>
                                                    </div>
                                                    <div className="heure">
                                                        <span>14:45 </span>
                                                        <span> . </span>
                                                        <span> 30 Mins </span>
                                                    </div>
                                                    <div style={{padding: "10px 0 0 0"}}>
                                                        <span className="appointment-action">HISTORIQUE MEDICAL</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="row" style={{borderLeft: `2px solid ${random_item(borderColors)}`}}>
                                                {/* <div className="col-lg-2" style={{padding: 0, background: 'white'}}>
                                                    <div className="avatar" style={{backgroundImage: `url(${BOY_AVATAR})`}}></div>
                                                </div> */}
                                                <div className="col-lg-12" style={{ background: 'white' }}>
                                                    <div className="nom-motif">
                                                        <span>Veronica </span>
                                                        <span> - </span>
                                                        <span> Control Général </span>
                                                    </div>
                                                    <div className="heure">
                                                        <span>14:45 </span>
                                                        <span> . </span>
                                                        <span> 30 Mins </span>
                                                    </div>
                                                    <div style={{padding: "10px 0 0 0"}}>
                                                        <span className="appointment-action">HISTORIQUE MEDICAL</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="row" style={{borderLeft: `2px solid ${random_item(borderColors)}`}}>
                                                {/* <div className="col-lg-2" style={{padding: 0, background: 'white'}}>
                                                    <div className="avatar" style={{backgroundImage: `url(${BOY_AVATAR})`}}></div>
                                                </div> */}
                                                <div className="col-lg-12" style={{ background: 'white' }}>
                                                    <div className="nom-motif">
                                                        <span>Veronica </span>
                                                        <span> - </span>
                                                        <span> Control Général </span>
                                                    </div>
                                                    <div className="heure">
                                                        <span>14:45 </span>
                                                        <span> . </span>
                                                        <span> 30 Mins </span>
                                                    </div>
                                                    <div style={{padding: "10px 0 0 0"}}>
                                                        <span className="appointment-action">HISTORIQUE MEDICAL</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="row" style={{borderLeft: `2px solid ${random_item(borderColors)}`}}>
                                                {/* <div className="col-lg-2" style={{padding: 0, background: 'white'}}>
                                                    <div className="avatar" style={{backgroundImage: `url(${BOY_AVATAR})`}}></div>
                                                </div> */}
                                                <div className="col-lg-12" style={{ background: 'white' }}>
                                                    <div className="nom-motif">
                                                        <span>Veronica </span>
                                                        <span> - </span>
                                                        <span> Control Général </span>
                                                    </div>
                                                    <div className="heure">
                                                        <span>14:45 </span>
                                                        <span> . </span>
                                                        <span> 30 Mins </span>
                                                    </div>
                                                    <div style={{padding: "10px 0 0 0"}}>
                                                        <span className="appointment-action">HISTORIQUE MEDICAL</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="row" style={{borderLeft: `2px solid ${random_item(borderColors)}`}}>
                                                {/* <div className="col-lg-2" style={{padding: 0, background: 'white'}}>
                                                    <div className="avatar" style={{backgroundImage: `url(${BOY_AVATAR})`}}></div>
                                                </div> */}
                                                <div className="col-lg-12" style={{ background: 'white' }}>
                                                    <div className="nom-motif">
                                                        <span>Veronica </span>
                                                        <span> - </span>
                                                        <span> Control Général </span>
                                                    </div>
                                                    <div className="heure">
                                                        <span>14:45 </span>
                                                        <span> . </span>
                                                        <span> 30 Mins </span>
                                                    </div>
                                                    <div style={{padding: "10px 0 0 0"}}>
                                                        <span className="appointment-action">HISTORIQUE MEDICAL</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="row" style={{borderLeft: `2px solid ${random_item(borderColors)}`}}>
                                                {/* <div className="col-lg-2" style={{padding: 0, background: 'white'}}>
                                                    <div className="avatar" style={{backgroundImage: `url(${BOY_AVATAR})`}}></div>
                                                </div> */}
                                                <div className="col-lg-12" style={{ background: 'white' }}>
                                                    <div className="nom-motif">
                                                        <span>Veronica </span>
                                                        <span> - </span>
                                                        <span> Control Général </span>
                                                    </div>
                                                    <div className="heure">
                                                        <span>14:45 </span>
                                                        <span> . </span>
                                                        <span> 30 Mins </span>
                                                    </div>
                                                    <div style={{padding: "10px 0 0 0"}}>
                                                        <span className="appointment-action">HISTORIQUE MEDICAL</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="row" style={{borderLeft: `2px solid ${random_item(borderColors)}`}}>
                                                {/* <div className="col-lg-2" style={{padding: 0, background: 'white'}}>
                                                    <div className="avatar" style={{backgroundImage: `url(${BOY_AVATAR})`}}></div>
                                                </div> */}
                                                <div className="col-lg-12" style={{ background: 'white' }}>
                                                    <div className="nom-motif">
                                                        <span>Veronica </span>
                                                        <span> - </span>
                                                        <span> Control Général </span>
                                                    </div>
                                                    <div className="heure">
                                                        <span>14:45 </span>
                                                        <span> . </span>
                                                        <span> 30 Mins </span>
                                                    </div>
                                                    <div style={{padding: "10px 0 0 0"}}>
                                                        <span className="appointment-action">HISTORIQUE MEDICAL</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="row" style={{borderLeft: `2px solid ${random_item(borderColors)}`}}>
                                                {/* <div className="col-lg-2" style={{padding: 0, background: 'white'}}>
                                                    <div className="avatar" style={{backgroundImage: `url(${BOY_AVATAR})`}}></div>
                                                </div> */}
                                                <div className="col-lg-12" style={{ background: 'white' }}>
                                                    <div className="nom-motif">
                                                        <span>Veronica </span>
                                                        <span> - </span>
                                                        <span> Control Général </span>
                                                    </div>
                                                    <div className="heure">
                                                        <span>14:45 </span>
                                                        <span> . </span>
                                                        <span> 30 Mins </span>
                                                    </div>
                                                    <div style={{padding: "10px 0 0 0"}}>
                                                        <span className="appointment-action">HISTORIQUE MEDICAL</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade col-xs-12 d-none" id="doctorDetailsModal" tabIndex="-1" role="dialog"aria-hidden="true">
                    <div className="modal-dialog h-available" style={{ width: 96+"%"}}>
                        <div className="modal-content h-available" style={{  }}>
                            <div className="modal-body h-available" style={{ padding: 0 }}>
                                <DoctorDetailForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DoctorDashboard;
