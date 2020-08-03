import React, { useState } from 'react';
import AddHeader from '../../card/AddHeader';
import FormBox from '../../card/FormBox';

import ConsultationDataService from "../../../services/consultation.service";
import DemandeConsultationsDataService from "../../../services/demande_consultation.service"
import PatientDataService from "../../../services/patient.service"

import PageTitle from '../../card/PageTitle';


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
            consultationMessage:String
        };
        this.handleInputChange = this.handleInputChange.bind(this)
        this.saveConsultation = this.saveConsultation.bind(this)
        this.newConsultation = this.newConsultation.bind(this)
    }

    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({ consultation: { ...this.state.consultation, [name]: value }});
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
    }


    saveConsultation() {
        var data = this.state.consultation;
        console.log(data); 
    
        ConsultationDataService.create(data)
            .then(response => {
                console.log(response.data, this.state.submitted);
                window.showSuccess('the consultation has been saved successfuly');
                // setTimeout( () => {
                //     this.props.history.push(`/consultations_details/${response.data.id}`)
                // }, 500);
                this.newConsultation();
                console.log(this.state.consultation)
            })
            .catch(e => {
                console.log(e.message);
            });
    }
    newConsultation(){
        this.setState({consultation:  {
            demande_consultation:null,
            motif: null,
            interrogatoire:null,
            resume:null,
            hypothese_diagnostique:null,
        }})
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
        ].concat(this.state.demandes.map((demande)=>(this.state.patients.find(patient =>patient.id == demande.patient))?(({id:demande.id, libelle: getConsultationMessage(this.state.patients,demande.patient,demande.date_consultation)})):{}));
        const formBoxes = [
            {
                headerTitle: "une nouvelle consultation",
                fields: [
                    {type: "select",label:"Demande de consultation",name:"demande_consultation", value:this.state.consultation.demande_consultation,selectOptions:demandesSelectOptions},
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
                
                <PageTitle title="Ajout de Medecin" />
                
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
