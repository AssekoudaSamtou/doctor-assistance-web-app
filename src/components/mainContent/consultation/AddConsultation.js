import React, { useState } from "react";
import AddHeader from "../../card/AddHeader";
import FormBox from "../../card/FormBox";

import ConsultationDataService from "../../../services/consultation.service";
import DemandeConsultationsDataService from "../../../services/demande_consultation.service";
import PatientDataService from "../../../services/patient.service";
import StructureSanitaireDataService from "../../../services/structureSanitaire.service";

import PageTitle from "../../card/PageTitle";
import StructureSanitaire from "../../card/StructureSanitaire";
import Cookies from "universal-cookie";
import FormBoxFooter from "../../card/FormBoxFooter";
import DemandeConsultationHeader from "../demande_consultation/DemandeConsultationHeader";

const cookies = new Cookies();
class AddConsultation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            consultation: {
                demande_consultation: null,
                motif: null,
                interrogatoire: null,
                resume: null,
                hypothese_diagnostique: null,
            },

            constantes: {
                temperature: null,
                poids: null,
                taille: null,
                systolique: null,
                diastolique: null,
                glycemie: null,
                cholesterol: null,
                pouls: null,
            },

            submitted: false,
            isSubmitting: false,
            isisDemandeConsultationChecked: false,
            demandes: [],
            patients: [],
            structures: [],
            structure: {},
            consultationMessage: String,
            demandeConsultation: { status: 1, patient: this.props.patientId },
            selectedPatient: null
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleConstanteInputChange = this.handleConstanteInputChange.bind(this);
        this.saveConsultation = this.saveConsultation.bind(this);
        this.newConsultation = this.newConsultation.bind(this);
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

    handleInputChange(name, value) {
        if (name === "demande_consultation") {
            console.log("CHANGING... ", value);
            this.changePatientPhoto(value);
        }

        this.setState({ structure: { ...this.state.structure, [name]: value }, consultation: { ...this.state.consultation, [name]: value } });
        console.log("CHANGING... ", name, value);
    }

    handleConstanteInputChange(name, value) {
        this.setState({ constantes: { ...this.state.constantes, [name]: value } });
        console.log("CHANGING... ", name, value);
    }

    handleCKEInputChange(name, data) {
        console.log(name, data);
        this.setState({
            consultation: { ...this.state.consultation, [name]: data },
        });
    }

    componentWillMount() {
        DemandeConsultationsDataService.getAll()
        .then((response) => {
            this.setState({ demandes: response.data.results });
            console.log(this.state.demandes);
        })
        .catch((e) => {
            console.log(e);
        });
        PatientDataService.getAll()
        .then((response) => {
            this.setState({ patients: response.data.results });
            console.log(this.state.patients);
        })
        .catch((e) => {
            console.log(e);
        });
        StructureSanitaireDataService.getMine()
        .then((response) => {
            this.setState({ structures: response.data.results });
            console.log(this.state.structures);
        })
        .catch((e) => {
            console.log(e);
        });
    }

    componentDidMount() {
        // window.$(document).ready( () => {
        //     window.$('#cmpltadminModal-7').modal();
        // })
    }

    saveConsultation() {
        var user = cookies.get("loggedUser")
        var data = {
            structure_sanitaire_pk:this.state.structure.id,
            medecin_pk:user.id,
            demande_consultation:this.state.consultation.demande_consultation,
            motif: this.state.consultation.motif,
            interrogatoire:this.state.consultation.interrogatoire,
            resume:this.state.consultation.resume,
            hypothese_diagnostique:this.state.consultation.hypothese_diagnostique,
            patient: this.state.demandeConsultation.patient,
            status:this.state.demandeConsultation.status,

            constantes: this.state.constantes
        };
        console.log(data);
        ConsultationDataService.create(data)
            .then(response => {
                console.log(response.data, this.state.submitted);
                window.showSuccess('the consultation has been saved successfuly');
                if(this.props.detail!="detail"){
                    this.props.history.push(`/consultations/`)
                }
                this.newConsultation();
                console.log(this.state.consultation)
            })
            .catch(e => {
                console.log(e.message);
            });
    }

    newConsultation(){
        this.setState({consultation:  {
            demande_consultation:"",
            motif: "",
            interrogatoire:"",
            resume:"",
            hypothese_diagnostique:"",
        }})
    }
    
    render() {
        function getConsultationMessage(patients,patient, ndate){
            const date = new Date(ndate)
            const mdate = ("0"+date.getDay()).slice(-2, 3)+"/"+("0"+date.getMonth()).slice(-2,3)+"/"+date.getFullYear()+" A "+("0"+date.getHours()).slice(-2,3)+":"+("0"+date.getMinutes()).slice(-2,3)+":"+("0"+date.getSeconds()).slice(-2,3)
            var person = patients.find((p) => p.id === patient);
            var message = person?.nom + " "+person?.prenom+" a demande une consultation, le  "+mdate
            return message
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
                        value: this.state.constantes.temperature,
                    },
                    {
                        type: "number",
                        label: "Poids (Kg)",
                        name: "poids",
                        value: this.state.constantes.poids,
                    },
                    {
                        type: "number",
                        label: "Taille (cm)",
                        name: "taille",
                        value: this.state.constantes.taille,
                    },
                    {
                        type: "number",
                        label: "Systolique",
                        name: "systolique",
                        value: this.state.constantes.systolique,
                    },
                    {
                        type: "number",
                        label: "Diastolique",
                        name: "diastolique",
                        value: this.state.constantes.diastolique,
                    },
                    {
                        type: "number",
                        label: "Glycemie (mg/dl)",
                        name: "glycemie",
                        value: this.state.constantes.glycemie,
                    },
                    {
                        type: "number",
                        label: "Cholesterol (mg/dl)",
                        name: "cholesterol",
                        value: this.state.constantes.cholesterol,
                    },
                    {
                        type: "number",
                        label: "Pouls (Par minute)",
                        name: "pouls",
                        value: this.state.constantes.pouls,
                    },

                ],
            },

            {
                headerTitle: "Details de la consultation",
                fields: [
                this.props.detail == "detail"
                    ? {
                        type: "select",
                        label: "Liste de structure sanitaires",
                        name: "id",
                        value: this.state.structure.id,
                        selectOptions: structureSelectOptions,
                    }
                    : {
                        type: "select",
                        label: "Demande de consultation",
                        name: "demande_consultation",
                        value: this.state.consultation.demande_consultation,
                        selectOptions: demandesSelectOptions,
                    },
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

    return (
      <div>
        <PageTitle title="Ajout d'une nouvelle consultation" />

        <div className="col-xs-12 ">
            
            <DemandeConsultationHeader 
                entityName="Nouvelle consultation" 
                patientPhoto={this.state.consultation.demande_consultation ? this.state.selectedPatient.photo : null} 
                hospitalPhoto={null} />
          
            <div className="bg-w">

                {formBoxes.map((box) => (
                    <FormBox
                        box={box}
                        key={box.headerTitle}
                        fromType="add"
                        isSubmitting={this.state.isSubmitting}
                        onInputChange={ box.headerTitle === "Constantes" ? this.handleConstanteInputChange : this.handleInputChange}
                        onCKEditorChange={this.handleCKEInputChange}
                        onSaveBtnTapped={this.saveConsultation}
                    />
                ))}

                <div className="row">
                    <div className="col-lg-10 col-lg-offset-1 col-xs-12">
                        <FormBoxFooter
                            isSubmitting={this.state.isSubmitting}
                            onSaveBtnTapped={this.saveConsultation}
                            fromType="add"
                        />
                    </div>
                </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddConsultation;
