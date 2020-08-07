import React, { useState } from 'react';
import AddHeader from '../../card/AddHeader';
import FormBox from '../../card/FormBox';

import ConsultationDataService from "../../../services/consultation.service";
import DemandeConsultationsDataService from "../../../services/demande_consultation.service"
import PatientDataService from "../../../services/patient.service"
import StructureSanitaireDataService from "../../../services/structureSanitaire.service"

import PageTitle from '../../card/PageTitle';
import StructureSanitaire from '../../card/StructureSanitaire';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
class AddConsultation extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            consultation:  {
                demande_consultation:null,
                motif: null,
                interrogatoire:null,
                resume:null,
                hypothese_diagnostique:null,
            },
            submitted: false,
            isSubmitting: false,
            isisDemandeConsultationChecked: false,
            demandes:[],
            patients:[],
            structures:[],
            structure:{},
            consultationMessage:String,
            demandeConsultation:{status:1,patient:this.props.patientId}
        };
        this.handleInputChange = this.handleInputChange.bind(this)
        this.saveConsultation = this.saveConsultation.bind(this)
        this.newConsultation = this.newConsultation.bind(this)
    }

    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({ consultation: { ...this.state.consultation, [name]: value }});
        this.setState({ structure: { ...this.state.structure, [name]: value }});
        console.log("CHANGING... ", name, value);
    }

    componentWillMount() {
        DemandeConsultationsDataService.getAll()
        .then(response => {
            this.setState({demandes: response.data.results});
            console.log(this.state.demandes)
        }).catch(e => {
            console.log(e);
        });
        PatientDataService.getAll()
        .then(response => {
            this.setState({patients: response.data.results});
            console.log(this.state.patients)
        }).catch(e => {
            console.log(e);
        });
        StructureSanitaireDataService.getMine()
        .then(response => {
            this.setState({structures: response.data.results});
            console.log(this.state.structures)
        }).catch(e => {
            console.log(e);
        });
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
                status:this.state.demandeConsultation.status
            };
        console.log(data);
        ConsultationDataService.create(data)
            .then(response => {
                console.log(response.data, this.state.submitted);
                window.showSuccess('the consultation has been saved successfuly');
                if(this.props.detail!="detail"){
                    setTimeout( () => {
                        this.props.history.push(`/consultations/`)
                    }, 500);
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
        const demandesSelectOptions = [
            {id: -1, libelle: "----Selectionnez une demande de consultation-----"},
        ].concat(this.state.demandes.map((demande)=>(this.state.patients.find(patient =>patient.id == demande.patient))?(({id:demande.id, libelle: getConsultationMessage(this.state.patients,demande.patient,demande.date_consultation)})):{}));

        const structureSelectOptions = [
            {id: -1, libelle: "---- selectionner une stucture sanitaire -----"},
        ].concat(this.state.structures.map((structure)=>({id:structure.id,libelle:structure.denomination})));
        const formBoxes = [
            {
                headerTitle: "une nouvelle consultation",
                fields: [
                    this.props.detail=="detail"?{type: "select",label:"Liste de structure sanitaires",name:"id", value:this.state.structure.id,selectOptions:structureSelectOptions}:{type: "select",label:"Demande de consultation",name:"demande_consultation", value:this.state.consultation.demande_consultation,selectOptions:demandesSelectOptions},
                    {type: "text", label: "Motif", name: "motif", value: this.state.consultation.motif},
                    {type: "text", label: "Interrogatoire", name: "interrogatoire", value: this.state.consultation.interrogatoire},
                    {type: "text", label: "Resume", name: "resume", value: this.state.consultation.resume},
                    {type: "text", label: "hypothese diagnostique", name: "hypothese_diagnostique", value: this.state.consultation.hypothese_diagnostique}
                    // {type: "text", label: "Profile Image"},
                    // {type: "text", label: "Brief", description: 'e.g. "Enter any size of text description here"'},
                ]
            }
        ];

        return (
            <div>
                
                <PageTitle title="Ajout d'une nouvelle consultation" />
                
                <div className="col-xs-12 ">
                    <AddHeader entityName="consultation" type="add" />
                    <div className="bg-w">
                        { formBoxes.map((box) => 
                            <FormBox 
                                box={box} fromType="add"
                                isSubmitting={this.state.isSubmitting}
                                onInputChange={this.handleInputChange} 
                                onSaveBtnTapped={this.saveConsultation} />
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default AddConsultation;
