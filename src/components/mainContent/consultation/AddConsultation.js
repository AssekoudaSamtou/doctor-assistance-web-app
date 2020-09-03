import React, { useState } from "react";
import qs from "qs";
import AddHeader from "../../card/AddHeader";
import FormBox from "../../card/FormBox";

import ConsultationDataService from "../../../services/consultation.service";
import DemandeConsultationsDataService from "../../../services/demande_consultation.service";
import PatientDataService from "../../../services/patient.service";
import StructureSanitaireDataService from "../../../services/structureSanitaire.service";
import OrdonnanceService from "../../../services/ordonnance.service";

import PageTitle from "../../card/PageTitle";
import StructureSanitaire from "../../card/StructureSanitaire";
import Cookies from "universal-cookie";
import FormBoxFooter from "../../card/FormBoxFooter";
import DemandeConsultationHeader from "../demande_consultation/DemandeConsultationHeader";

const cookies = new Cookies();
class AddConsultation extends React.Component {
    
    constructor(props) {
        super(props);

        const { match: { params } } = this.props;
        const { location: { search } } = this.props;
        const queries = qs.parse(search.slice(1));
        console.log(queries);
        
        this.state = {
            consultation: {
                demande_consultation: (queries.appointment) ? parseInt(queries.appointment) : null,
                motif: "Motif",
                interrogatoire: "interrogatoire",
                resume: "resume",
                hypothese_diagnostique: "hypothese_diagnostique",

                constantes: {
                    id: null,
                    temperature: "30",
                    poids: "100",
                    taille: "160",
                    systolique: "30",
                    diastolique: "30",
                    glycemie: "30",
                    cholesterol: "35",
                    pouls: "45",
                },
            },

            ordonnance: {
                consultation: null
            },

            submitted: false,
            isSubmitting: false,
            isisDemandeConsultationChecked: false,
            demandes: [],
            patients: [],
            structures: [],
            ordonnances: [],
            structure: {},
            consultationMessage: String,
            demandeConsultation: { status: 1, patient: this.props.patientId },
            selectedPatient: null
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleConstanteInputChange = this.handleConstanteInputChange.bind(this);
        this.saveConsultation = this.saveConsultation.bind(this);
        this.handleCKEInputChange = this.handleCKEInputChange.bind(this);
    }

    changePatientPhoto = (demande_id) => {
        for (let demande of this.state.demandes) {
            if (demande.id === demande_id) {
                for (let patient of this.state.patients) {
                    if (demande.patient === patient.id) {
                        this.setState({selectedPatient: patient});
                    }
                }
            }
        }
    }

    handleInputChange(name, value) {
        if (name === "demande_consultation") {
            console.log("CHANGING... ", value);
            this.changePatientPhoto(value);
        }

        this.setState({ structure: { ...this.state.structure, [name]: value }, consultation: { ...this.state.consultation, [name]: value } });
        console.log("CHANGING... ", name, value);
    }

    handleConstanteInputChange(name, value) {
        this.setState({ 
            consultation: { 
                ...this.state.consultation, 
                constantes: {...this.state.consultation.constantes, [name]: value} 
            } 
        });
    }

    handleCKEInputChange(name, data) {
        console.log(name, data);
        this.setState({
            consultation: { ...this.state.consultation, [name]: data },
        });
    }

    componentWillMount() {

        const { match: { params } } = this.props;
        const { location: { search } } = this.props;
        const queries = qs.parse(search.slice(1));

        DemandeConsultationsDataService.getAll()
        .then((response) => {
            this.setState({ demandes: response.data }, () => { 
                if (queries.appointment) {
                    this.changePatientPhoto(parseInt(queries.appointment));
                }
            });
        })
        .catch((e) => {
            window.showErrorMessage("Echec!!")
        });

        this.refreshOrdonnances();

        PatientDataService.getAll()
        .then((response) => {
            this.setState({ patients: response.data }, () => { 
                if (queries.appointment) {
                    this.changePatientPhoto(parseInt(queries.appointment));
                }
            });
        })
        .catch((e) => {
            window.showErrorMessage("Echec!!")
        });

        StructureSanitaireDataService.getMine()
        .then((response) => {
            this.setState({ structures: response.data });
        })
        .catch((e) => {
            window.showErrorMessage("Echec!!")
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
            }
            function prevTab(elem) {
                window.$(elem).prev().find('a[data-toggle="tab"]').click();
            }
        });
    }

    saveConsultation(e) {
        const target = e.target;
        var user = cookies.get("loggedUser");
        
        var data = {
            structure_sanitaire_pk:this.state.structure.id,
            medecin_pk:user.id,
            ...this.state.consultation,
            ...this.state.demandeConsultation,
        };

        ConsultationDataService.create(data)
            .then(response => {
                window.showSuccess('the consultation has been saved successfuly');
                this.setState({
                    ordonnance: {consultation: response.data.id},
                    consultation: response.data
                });
                window.$(target).parent().prev().find("button").trigger("click");
            })
            .catch(e => {
                window.showErrorMessage("Echec!!")
            });
    }

    addOrdonnance = (e) => {
        const data = this.state.ordonnance;
        OrdonnanceService.create(data)
        .then((response) => {
            this.refreshOrdonnances();
        })
        .catch((e) => {
            window.showErrorMessage("Echec!!")
        });
    }
    
    render() {

        const { match: { params } } = this.props;
        const { location: { search } } = this.props;
        const queries = qs.parse(search.slice(1));

        function getConsultationMessage(patients,patient, ndate){
            const date = new Date(ndate)
            const mdate = ("0"+date.getDay()).slice(-2, 3)+"/"+("0"+date.getMonth()).slice(-2,3)+"/"+date.getFullYear()+" A "+("0"+date.getHours()).slice(-2,3)+":"+("0"+date.getMinutes()).slice(-2,3)+":"+("0"+date.getSeconds()).slice(-2,3)
            var person = patients.find((p) => p.id === patient);
            var message = person?.nom + " "+person?.prenom+" a demande une consultation, le  "+mdate
            return message;
        }
        
        const GenderSelectOptions = [
            {id: null, libelle: "----Selectionnez un genre-----"},
            {id: "M", libelle: "Masculin"},
            {id: "F", libelle: "Féminin"},
        ];

        const demandesSelectOptions = [ {id: -1, libelle: "----Selectionnez une demande de consultation-----"} ].concat(this.state.demandes.map((demande)=>(this.state.patients.find(patient =>patient.id == demande.patient))?(({id:demande.id, libelle: getConsultationMessage(this.state.patients,demande.patient,demande.date_consultation)})):{}));

        const structureSelectOptions = [ {id: -1, libelle: "---- selectionner une stucture sanitaire -----"} ].concat(this.state.structures.map((structure)=>({id:structure.id,libelle:structure.denomination})));

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
                headerTitle: "Details de la consultation",
                fields: [
                    {
                        type: "Cke",
                        label: "Motif",
                        name: "motif",
                        value: this.state.consultation.motif,
                    },
                    {
                        type: "Cke",
                        label: "Interrogatoire",
                        name: "interrogatoire",
                        value: this.state.consultation.interrogatoire,
                    },
                    {
                        type: "Cke",
                        label: "Resume",
                        name: "resume",
                        value: this.state.consultation.resume,
                    },
                    {
                        type: "Cke",
                        label: "hypothese diagnostique",
                        name: "hypothese_diagnostique",
                        value: this.state.consultation.hypothese_diagnostique,
                    }
                ],
            },
            
        ];

        var tmp = queries.appointment ? null : (
            this.props.detail == "detail" ? {
                type: "select",
                label: "Liste de structure sanitaires",
                name: "id",
                value: this.state.structure.id,
                selectOptions: structureSelectOptions,
            } : {
                type: "select",
                label: "Demande de consultation",
                name: "demande_consultation",
                value: this.state.consultation.demande_consultation,
                selectOptions: demandesSelectOptions,
            }
        )

        if (tmp)
            formBoxes[1].fields = [tmp].concat(formBoxes[1].fields);

    return (
      <div>
        {/* <PageTitle title="Ajout d'une nouvelle consultation" /> */}

        <div className="col-xs-12 ">
            
            <DemandeConsultationHeader 
                entityName="Nouvelle consultation" 
                patientPhoto={this.state.consultation.demande_consultation && this.state.selectedPatient ? this.state.selectedPatient.photo : null} 
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
                                            <a href="#step1" data-toggle="tab" aria-controls="step1" role="tab" title="Step 1">
                                                <span className="round-tab">
                                                    <i className="glyphicon glyphicon-folder-open"></i>
                                                </span>
                                            </a>
                                        </li>

                                        <li role="presentation" className="disabled">
                                            <a href="#step2" data-toggle="tab" aria-controls="step2" role="tab" title="Step 2">
                                                <span className="round-tab">
                                                    <i className="glyphicon glyphicon-pencil"></i>
                                                </span>
                                            </a>
                                        </li>

                                        <li role="presentation" className="disabled">
                                            <a href="#step3" data-toggle="tab" aria-controls="step3" role="tab" title="Step 3">
                                                <span className="round-tab">
                                                    <i className="glyphicon glyphicon-picture"></i>
                                                </span>
                                            </a>
                                        </li>

                                        <li role="presentation" className="disabled">
                                            <a href="#complete" data-toggle="tab" aria-controls="complete" role="tab" title="Complete">
                                                <span className="round-tab">
                                                    <i className="glyphicon glyphicon-ok"></i>
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
                                                    { this.state.ordonnances.map( ()=> {

                                                        return (
                                                            <div className="col-lg-3">
                                                                <div className="ordonnance-item">
                                                                    <div className="ordonnance-title">Ordonnance No 1</div>
                                                                    <div>Date : 3 Sept 2020</div>
                                                                    <div>Heure : 13:45</div>

                                                                    <section className="actions-overlay">
                                                                        <div className="action left-action"></div>
                                                                        <div className="action right-action"></div>
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
    );
  }
}

export default AddConsultation;
