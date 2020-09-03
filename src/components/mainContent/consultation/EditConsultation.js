import React, { useState } from 'react';
import AddHeader from '../../card/AddHeader';
import FormBox from '../../card/FormBox';

import DoctorDataService from "../../../services/doctor.service";
import ConsultationDataService from "../../../services/consultation.service";
import DemandeConsultationsDataService from "../../../services/demande_consultation.service"
import PatientDataService from "../../../services/patient.service";
import OrdonnanceService from "../../../services/ordonnance.service";

import PageTitle from '../../card/PageTitle';
import NotFound from '../error/404';
import FormBoxFooter from '../../card/FormBoxFooter';
import DemandeConsultationHeader from '../demande_consultation/DemandeConsultationHeader';
import { LitteralDate, literalHour } from '../../../utils';


class EditConsultation extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            consultation:  {
                id:null,
                demande_consultation:-1,
                motif: "",
                interrogatoire:null,
                resume:null,
                hypothese_diagnostique:"",
                
                constantes: {
                    id: null,
                    temperature: null,
                    poids: null,
                    taille: null,
                    systolique: null,
                    diastolique: null,
                    glycemie: null,
                    cholesterol: null,
                    pouls: null,
                },
            },

            ordonnance: {
                consultation: null
            },

            selectedOrdonnance: null,

            submitted: false,
            isSubmitting: false,
            specialites:[],
            isisDemandeConsultationChecked: false,
            demandes:[],
            patients:[],
            ordonnances: [],
            consultationMessage: String,
            selectedPatient: null
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleConstanteInputChange = this.handleConstanteInputChange.bind(this);
        this.saveConsultation = this.saveConsultation.bind(this);
        this.deleteConsultation = this.deleteConsultation.bind(this);
        this.handleCKEInputChange = this.handleCKEInputChange.bind(this);
    }

    changePatientPhoto = (demande_id) => {
        for (let demande in this.state.demandes) {
            if (this.state.demandes[demande].id == demande_id) {
                
                for (let patient in this.state.patients) {
                    if(this.state.demandes[demande].patient == this.state.patients[patient].id)
                        this.setState({selectedPatient: this.state.patients[patient]});
                }
            }
        }
    }
    
    componentWillMount() {
        const params = this.props.match?.params
        DemandeConsultationsDataService.getAll()
        .then(response => {
            this.setState({demandes: response.data});
            // console.log(this.state.demandes)
        }).catch(e => {
            console.log(e);
        });

        this.refreshOrdonnances();

        PatientDataService.getAll()
        .then(response => {
            this.setState({patients: response.data});
            // console.log(this.state.patients)
        }).catch(e => {
            console.log(e);
        });

        ConsultationDataService.get(params?.id)
        .then(response => {
            this.setState({consultation: response.data, ordonnance: {consultation: response.data.id}});
            // console.log(this.state.consultation);
        }).catch(e => {
            console.log(e);
        });
    }

    componentDidMount() {
        window.$(document).ready(function () {
            //Initialize tooltips
            window.$('.nav-tabs > li a[title]').tooltip();
            
            //Wizard
            window.$('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
        
                var $target = window.$(e.target);
            
                if ($target.parent().hasClass('disabled')) {
                    return false;
                }
            });
        
            window.$(".next-step").click(function (e) {
        
                var $active = window.$('.wizard .nav-tabs li.active');
                $active.next().removeClass('disabled');
                nextTab($active);
        
            });
            window.$(".prev-step").click(function (e) {
        
                var $active = window.$('.wizard .nav-tabs li.active');
                prevTab($active);
        
            });

            function nextTab(elem) {
                window.$(elem).next().find('a[data-toggle="tab"]').click();
                window.scrollTo(0, 400);
            }
            function prevTab(elem) {
                window.$(elem).prev().find('a[data-toggle="tab"]').click();
                window.scrollTo(0, 400);
            }
        });
    }

    refreshOrdonnances = () => {
        OrdonnanceService.getAll()
        .then((response) => {
            this.setState({ ordonnances: response.data });
        })
        .catch((e) => {
            window.showErrorMessage("Echec!!")
        });
    }
    
    addOrdonnance = (e) => {
        const data = this.state.ordonnance;
        OrdonnanceService.create(data)
        .then((response) => {
            // this.setState({  }, this.refreshOrdonnances);
            this.refreshOrdonnances();
        })
        .catch((e) => {
            window.showErrorMessage("Echec!!")
        });
    }

    deleteOrdonnance = (id) => {
        OrdonnanceService.delete(id)
        .then((response) => {
            this.refreshOrdonnances();
        })
        .catch((e) => {
            window.showErrorMessage("Echec!!");
        });
    }

    editOrdonnance = (ordonnance) => {
        this.setState({selectedOrdonnance: ordonnance});
    }

    handleConstanteInputChange(name, value) {
        this.setState({ 
            consultation: { 
                ...this.state.consultation, 
                constantes: {...this.state.consultation.constantes, [name]: value} 
            } 
        });
    }

    handleInputChange(name, value) {
        this.setState({ consultation: { ...this.state.consultation, [name]: value } });
        console.log("CHANGING... ", name, value);
    }

    handleCKEInputChange(name, data) {
        // console.log(name, data);
        this.setState({
          consultation: { ...this.state.consultation, [name]: data },
        });
    }

    saveConsultation(e) {
        const target = e.target;
        var data = this.state.consultation;
        data['constantes_data'] = this.state.consultation.constantes;
        data['constantes'] = this.state.consultation.constantes.id;
    
        ConsultationDataService.update(this.state.consultation.id, data)
            .then(response => {
                window.showSuccess('the consultation has been updated successfuly');
                this.setState({
                    consultation: response.data
                });
                window.$(target).parent().prev().find("button").trigger("click");
            })
            .catch(e => {
                window.showErrorMessage('Error !!!');
            });
    }

    deleteConsultation() {    
        ConsultationDataService.delete(this.props.consultation.id)
            .then(response => {
                console.log(response.status);
                window.$('#deleteConfirmationModal').modal('toggle');
                window.showSuccess('Consultation deleted successfuly');
                if(this.props.history){
                    this.props.history.push("/consultations/");
                }else{
                    window.$("#closeBtnConsultation").click()
                }
            })
            .catch(e => {
                console.log(e);
                window.showErrorMessage('Something went wrong!!!');
            });
    }

    render() {

        function getConsultationMessage(patients,patient, date){
            const convDate = new Date(date)
            var person = patients.find((p) => p.id === patient);
            var message = person?.nom + " "+person?.prenom+" a demande une consultation le "+convDate.getDate()+"/"+convDate.getMonth()+"/"+convDate.getFullYear();
            message += " a "+convDate.getHours()+":"+convDate.getMinutes()
            return message
        }

        const GenderSelectOptions = [
            {id: null, libelle: "----Selectionnez un genre-----"},
            {id: "M", libelle: "Masculin"},
            {id: "F", libelle: "Féminin"},
        ];
        
        const demandesSelectOptions = [
            {id: -1, libelle: "----Selectionnez une demande de consultation-----"},
        ].concat(this.state.demandes.map((demande)=>(
            this.state.patients.find(patient =>patient.id == demande.patient)) ? (({id:demande.id, libelle: getConsultationMessage(this.state.patients,demande.patient,demande.date_consultation)})):{}
        ));

        const formBoxes = [
            {
                headerTitle: "Constantes",
                fields: [
                    {
                        type: "number",
                        label: "Température",
                        name: "temperature",
                        value: this.state.consultation.constantes.temperature,
                    },
                    {
                        type: "number",
                        label: "Poids (Kg)",
                        name: "poids",
                        value: this.state.consultation.constantes.poids,
                    },
                    {
                        type: "number",
                        label: "Taille (cm)",
                        name: "taille",
                        value: this.state.consultation.constantes.taille,
                    },
                    {
                        type: "number",
                        label: "Systolique",
                        name: "systolique",
                        value: this.state.consultation.constantes.systolique,
                    },
                    {
                        type: "number",
                        label: "Diastolique",
                        name: "diastolique",
                        value: this.state.consultation.constantes.diastolique,
                    },
                    {
                        type: "number",
                        label: "Glycemie (mg/dl)",
                        name: "glycemie",
                        value: this.state.consultation.constantes.glycemie,
                    },
                    {
                        type: "number",
                        label: "Cholesterol (mg/dl)",
                        name: "cholesterol",
                        value: this.state.consultation.constantes.cholesterol,
                    },
                    {
                        type: "number",
                        label: "Pouls (Par minute)",
                        name: "pouls",
                        value: this.state.consultation.constantes.pouls,
                    },

                ],
            },
            {
                headerTitle: "mise a jours de la consultation",
                fields: [
                    // {type: "select",label:"Demande de consultation",name:"demande_consultation", value:this.state.consultation.demande_consultation,selectOptions:demandesSelectOptions},
                    {type: "Cke", label: "Motif", name: "motif", value: this.state.consultation.motif},
                    {type: "Cke", label: "Interrogatoire", name: "interrogatoire", value: this.state.consultation.interrogatoire},
                    {type: "Cke", label: "Resume", name: "resume", value: this.state.consultation.resume},
                    {type: "Cke", label: "hypothese diagnostique", name: "hypothese_diagnostique", value: this.state.consultation.hypothese_diagnostique}
                ]
            }
        ];

        return (
            <div>
                {/* <PageTitle title="mise a jour de la consultation" /> */}
                <div className="col-xs-12 ">
                    <DemandeConsultationHeader
                        entityName="mise a jour de la consultation" 
                        patientPhoto={this.state.consultation.demande_consultation ? this.state.selectedPatient?.photo : null} 
                        hospitalPhoto={null} />
                    
                    <div className="bg-w">

                        <div className="">
                            <div className="row">
                                <section>
                                    <div className="wizard">
                                        <div className="wizard-inner">
                                            <div className="connecting-line"></div>
                                            <ul className="nav nav-tabs" role="tablist">

                                                <li role="presentation" className="active">
                                                    <a href="#step1" data-toggle="tab" aria-controls="step1" role="tab" title="Constantes">
                                                        <span className="round-tab">
                                                            <i className="fas fa-thermometer-half" style={{fontSize: '2rem', color: '#555555'}}></i>
                                                        </span>
                                                    </a>
                                                </li>

                                                <li role="presentation" className="disabled">
                                                    <a href="#step2" data-toggle="tab" aria-controls="step2" role="tab" title="Details de la consultation">
                                                        <span className="round-tab">
                                                            <i className="fas fa-book-medical" style={{fontSize: '2rem', color: '#555555'}}></i>
                                                        </span>
                                                    </a>
                                                </li>

                                                <li role="presentation" className="disabled">
                                                    <a href="#step3" data-toggle="tab" aria-controls="step3" role="tab" title="Ordonance">
                                                        <span className="round-tab">
                                                            <i className="fas fa-list-ol" style={{fontSize: '2rem', color: '#555555'}}></i>
                                                        </span>
                                                    </a>
                                                </li>

                                                <li role="presentation" className="disabled">
                                                    <a href="#complete" data-toggle="tab" aria-controls="complete" role="tab" title="Complete">
                                                        <span className="round-tab">
                                                            <i className="fas fa-thumbs-up" style={{fontSize: '2rem', color: '#555555'}}></i>
                                                        </span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>

                                        <div role="form">
                                            <div className="tab-content">

                                                { formBoxes.map((box, index) => (

                                                    <div key={index} className={`tab-pane ${index===0 ? "active" : ""}`} role="tabpanel" id={`step${index+1}`}>
                                                        {/* ${index===0 ? "active" : ""} */}
                                                        <FormBox
                                                            box={box}
                                                            key={box.headerTitle}
                                                            fromType="add"
                                                            isSubmitting={this.state.isSubmitting}
                                                            onInputChange={ box.headerTitle === "Constantes" ? this.handleConstanteInputChange : this.handleInputChange}
                                                            onCKEditorChange={this.handleCKEInputChange}
                                                            onSaveBtnTapped={this.saveConsultation}
                                                        />
                                                        <div>
                                                            { index === 0 && (
                                                                <ul className="list-inline pull-right">
                                                                    <li><button type="button" className="btn btn-primary next-step">Suivant</button></li>
                                                                </ul>
                                                            )}

                                                            { index === 1 && (
                                                                <ul className="list-inline pull-right">
                                                                    <li><button type="button" className="btn btn-default prev-step">Précédant</button></li>
                                                                    <li style={{display: 'none'}}><button type="button" className="btn btn-primary next-step">Enregistrer et continuer</button></li>
                                                                    <li><button type="button" onClick={this.saveConsultation} className="btn btn-primary">Enregistrer et continuer</button></li>
                                                                </ul>
                                                            )}

                                                            { index === 2 && (
                                                                <ul className="list-inline pull-right">
                                                                    <li><button type="button" className="btn btn-default prev-step">Précédant</button></li>
                                                                    <li><button type="button" className="btn btn-primary btn-info-full next-step">Terminer</button></li>
                                                                </ul>
                                                            )}
                                                        </div>
                                                            
                                                    </div>
                                                
                                                )) }

                                                <div className="tab-pane" role="tabpanel" id="step3">
                                                    <div id="ordonnance-tab-pane">
                                                        <div className="row">
                                                            { this.state.ordonnances.map( (ordonnance, index)=> {

                                                                return (
                                                                    <div key={ordonnance.id} className="col-lg-3">
                                                                        <div className="ordonnance-item">
                                                                            <div className="ordonnance-title">Ordonnance No {index+1} </div>
                                                                            <div>Date : {LitteralDate(ordonnance.mod_date_time, "SMALL")}</div>
                                                                            <div>Heure : {literalHour(ordonnance.mod_date_time)}</div>

                                                                            <section className="actions-overlay">
                                                                                <div onClick={ () => {this.editOrdonnance(ordonnance)} } className="action left-action"><i className="fas fa-pen-alt fa-2x"></i></div>
                                                                                <div onClick={ () => {this.deleteOrdonnance(ordonnance.id)} } className="action right-action"><i className="fas fa-trash fa-2x"></i></div>
                                                                            </section>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })}
                                                                    
                                                            <div className="col-lg-3">
                                                                <div className="new-record-placeholder" onClick={this.addOrdonnance}>
                                                                    <div className="content">
                                                                        <div className="moncircle monshape" style={{margin: '13px 10px 0 0', width: '70px', height: '70px', background: '#17a4d8' }} title="Ajouter une prescription">
                                                                            <i className="text fa fa-plus fa-3x" style={{textShadow: 'none', fontSize: '3em'}}></i>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <ul className="list-inline pull-right">
                                                        <li><button type="button" className="btn btn-default prev-step">Précédant</button></li>
                                                        <li><button type="button" className="btn btn-primary btn-info-full next-step">Terminer</button></li>
                                                    </ul>
                                                </div>

                                                <div className="tab-pane" role="tabpanel" id="complete">
                                                    <h3>Complete</h3>
                                                    <p>You have successfully completed all steps.</p>
                                                </div>
                                                <div className="clearfix"></div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default EditConsultation;