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
                demande_consultation:null,
                motif: "",
                interrogatoire:null,
                resume:null,
                hypothese_diagnostique:"",
            },
            submitted: false,
            isSubmitting: false,
            specialites:[],
            isisDemandeConsultationChecked: false,
            demandes:[],
            patients:[],
            consultationMessage:String
        };
        this.handleInputChange = this.handleInputChange.bind(this)
        this.saveConsultation = this.saveConsultation.bind(this)
        this.deleteConsultation = this.deleteConsultation.bind(this)
        this.handleCKEInputChange = this.handleCKEInputChange.bind(this)
        this.newConsultation = this.newConsultation.bind(this)
    }

    
    
    componentWillMount() {
        const params = this.props.match?.params
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
        ConsultationDataService.get(this.props.consultation?.id||params?.id)
        .then(response => {
            this.setState({consultation: response.data});
        }).catch(e => {
            console.log(e);
        });
    }

    handleInputChange(name, value) {
        // const { name, value } = event.target;
        this.setState({ consultation: { ...this.state.consultation, [name]: value } });
        // data-dismiss="modal"
        console.log("CHANGING... ", name, value);
    }
    handleCKEInputChange(name, data) {
        console.log(name, data);
        this.setState({
          consultation: { ...this.state.consultation, [name]: data },
        });
    }

    saveConsultation() {
        var data = this.state.consultation;
        console.log("====Edite processing==="); 
    
        ConsultationDataService.update(this.state.consultation.id,data)
            .then(response => {
                console.log(response.data, this.state.submitted);
                window.showSuccess('the consultation has been saved successfuly');
                if(this.props.history){
                    this.props.history.push("/consultations/");
                }else{
                    window.$("#closeBtnConsultation").click()
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
        ].concat(this.state.demandes.map((demande)=>(this.state.patients.find(patient =>patient.id == demande.patient))?(({id:demande.id, libelle: getConsultationMessage(this.state.patients,demande.patient,demande.date_consultation)})):{}));
        const formBoxes = [
            {
                headerTitle: "mise a jours de la consultation",
                fields: [
                    {type: "select",label:"Demande de consultation",name:"demande_consultation", value:this.state.consultation.demande_consultation,selectOptions:demandesSelectOptions},
                    {type: "Cke", label: "Motif", name: "motif", value: this.state.consultation.motif},
                    {type: "Cke", label: "Interrogatoire", name: "interrogatoire", value: this.state.consultation.interrogatoire},
                    {type: "Cke", label: "Resume", name: "resume", value: this.state.consultation.resume},
                    {type: "Cke", label: "hypothese diagnostique", name: "hypothese_diagnostique", value: this.state.consultation.hypothese_diagnostique}
                    // {type: "text", label: "Profile Image"},
                    // {type: "text", label: "Brief", description: 'e.g. "Enter any size of text description here"'},
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
                        box={box} fromType="edit"
                        isSubmitting={this.state.isSubmitting}
                        onInputChange={this.handleInputChange} 
                        onSaveBtnTapped={this.saveConsultation}
                        onCKEditorChange={this.handleCKEInputChange}
                        onDeleteBtnTapped={this.deleteConsultation}
                        />
                )}
                </div>
                </div>
            </div>
        )
    }
}

export default EditConsultation;