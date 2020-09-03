import React, { useState } from 'react';
import AddHeader from '../../card/AddHeader';
import FormBox from '../../card/FormBox';

import DoctorDataService from "../../../services/doctor.service";
import ConsultationDataService from "../../../services/consultation.service";
import DemandeConsultationsDataService from "../../../services/demande_consultation.service"
import PatientDataService from "../../../services/patient.service"

import PageTitle from '../../card/PageTitle';
import NotFound from '../error/404';
import FormBoxFooter from '../../card/FormBoxFooter';
import DemandeConsultationHeader from '../demande_consultation/DemandeConsultationHeader';


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

            submitted: false,
            isSubmitting: false,
            specialites:[],
            isisDemandeConsultationChecked: false,
            demandes:[],
            patients:[],
            consultationMessage:String,
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
        PatientDataService.getAll()
        .then(response => {
            this.setState({patients: response.data});
            // console.log(this.state.patients)
        }).catch(e => {
            console.log(e);
        });
        ConsultationDataService.get(params?.id)
        .then(response => {
            this.setState({consultation: response.data});
            // console.log(this.state.consultation);
        }).catch(e => {
            console.log(e);
        });
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

    saveConsultation() {
        var data = this.state.consultation;
        data['constantes_data'] = this.state.consultation.constantes;
        data['constantes'] = this.state.consultation.constantes.id;
    
        ConsultationDataService.update(this.state.consultation.id, data)
            .then(response => {
                console.log(response.data, this.state.submitted);
                window.showSuccess('the consultation has been updated successfuly');
                this.props.history.push("/consultations/");
                console.log(this.state.consultation);
            })
            .catch(e => {
                console.log(e.message);
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
                <PageTitle title="mise a jour de la consultation" />
                <div className="col-xs-12 ">
                    <DemandeConsultationHeader
                        entityName="mise a jour de la consultation" 
                        patientPhoto={this.state.consultation.demande_consultation ? this.state.selectedPatient?.photo : null} 
                        hospitalPhoto={null} />
                    
                    <div className="bg-w">
                        { formBoxes.map((box) => 
                            <FormBox 
                                key={box.headerTitle}
                                box={box} fromType="edit"
                                isSubmitting={this.state.isSubmitting}
                                onInputChange={box.headerTitle === "Constantes" ? this.handleConstanteInputChange : this.handleInputChange} 
                                onSaveBtnTapped={this.saveConsultation}
                                onCKEditorChange={this.handleCKEInputChange}
                                onDeleteBtnTapped={this.deleteConsultation}
                            />
                        )}

                        <div className="row">
                            <div className="col-lg-10 col-lg-offset-1 col-xs-12">
                                <FormBoxFooter
                                    isSubmitting={this.state.isSubmitting}
                                    onSaveBtnTapped={this.saveConsultation}
                                    onDeleteBtnTapped={this.deleteConsultation}
                                    fromType="edit"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditConsultation;