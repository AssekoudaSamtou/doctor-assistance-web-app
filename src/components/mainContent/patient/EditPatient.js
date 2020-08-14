import React, { useState } from "react";
import Cookies from "universal-cookie";
import AddHeader from "../../card/AddHeader";
import FormBox from "../../card/FormBox";
import PatientDataService from "../../../services/patient.service";
import PageTitle from '../../card/PageTitle';
import NotFound from '../error/404';
import loading from '../../../data/icons/loading.svg';
import FormBoxFooter from "../../card/FormBoxFooter";

const cookies = new Cookies();

class EditPatient extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            patient: {
                id: null, 
                nom: "", 
                prenom: "", 
                adresse: "", 
                telephone: "", 
                date_naissance: "", 
                genre: "",
                groupage: "null",
                maladies: "",
                allergies: "",
                habitude_alimentaires: "",
            },
            submitted: false,
            isSubmitting: false
        };
        this.handleInputChange = this.handleInputChange.bind(this)
        this.savePatient = this.savePatient.bind(this)
        this.cleanup = this.cleanup.bind(this)
        this.deletePatient = this.deletePatient.bind(this)
    }

    componentWillMount() {
        const { match: { params } } = this.props;
        
        PatientDataService.get(params.id)
        .then(response => {
            console.log(response.data);
            this.setState({patient: {...response.data}});
        }).catch(e => {
            this.setState({patient: {...this.state.patient, id: 0}});
            console.log(e);
        });
    }

    handleInputChange(name, value) {
        // const { name, value } = event.target;
        this.setState({ patient: { ...this.state.patient, [name]: value } });
        console.log("CHANGING... ", name, value);
    }

    savePatient() {
        let loggedDoctor = null;
        if (cookies.get("userType") === "medecin"){
            loggedDoctor = cookies.get("loggedUser")
        }
        var data = {
            doctor: loggedDoctor.id,
            nom: this.state.patient.nom,
            prenom: this.state.patient.prenom,
            adresse: this.state.patient.adresse,
            telephone: this.state.patient.telephone,
            date_naissance: this.state.patient.date_naissance,
            genre: this.state.patient.genre,
            groupage: this.state.patient.groupage,
            maladies: this.state.patient.maladies,
            allergies: this.state.patient.allergies,
            habitude_alimentaires: this.state.patient.habitude_alimentaires,            
        }; 
    
        PatientDataService.update(this.state.patient.id, data)
            .then(response => {
                this.setState({ patient: { ...response.data } });
                console.log(response.data);
                window.showSuccess('Your patient has been saved successfuly');
                this.props.history.push("/patients_details/" + this.state.patient.id);
            })
            .catch(e => {
                console.log(e);
                window.showErrorMessage('Something went wrong');
            });
    }

    deletePatient() {
        PatientDataService.delete(this.state.patient.id)
            .then(response => {
                console.log(response.status);
                window.$('#deleteConfirmationModal').modal('toggle');
                window.showSuccess('Patient deleted successfuly');
                this.props.history.push("/patients/");
            })
            .catch(e => {
                console.log(e);
                window.showErrorMessage('Something went wrong!!!');
            });
    }

    cleanup() {
        this.setState({ patient: {nom: "", prenom: "", adresse: "", telephone: "", date_naissance: "", genre: ""}, });
        // this.setState({ submitted: true });
    }

    render() {

        const GenderSelectOptions = [
            {id: null, libelle: "----Selectionnez un genre-----"},
            {id: "M", libelle: "Masculin"},
            {id: "F", libelle: "Féminin"},
        ];
        const groupageOptions = [
            { id: "null", libelle: "----Sélectionnez un groupage-----" },
            { id: "O+", libelle: "O+" },
            { id: "A+", libelle: "A+" },
            { id: "B+", libelle: "B+" },
            { id: "O-", libelle: "O-" },
            { id: "A-", libelle: "A-" },
            { id: "AB+", libelle: "AB+" },
            { id: "B-", libelle: "B-" },
            { id: "AB-", libelle: "AB-" },
        ];
        const formBoxes = [
            {
                headerTitle: "Informations personnelles du patient",
                fields: [
                    {type: "text", label: "Nom", name: "nom", value: this.state.patient.nom},
                    {type: "text", label: "Prénom", name: "prenom", value: this.state.patient.prenom},
                    {type: "text", label: "adresse", name: "adresse", value: this.state.patient.adresse, description: 'e.g. "Agoe-cacaveli"'},
                    {type: "text", label: "Téléphone", name: "telephone", value: this.state.patient.telephone, description: 'e.g. "00228 98 76 56 87"'},
                    {type: "date", label: "Date de naissance", name: "date_naissance", value: this.state.patient.date_naissance},
                    {type: "select", label: "Genre", name: "genre", value: this.state.patient.genre, selectOptions: GenderSelectOptions},
                ]
            },
            {
                headerTitle: "Informations médicales du patient",
                fields: [
                  {type: "select", label: "Groupe Sanguin", name: "groupage", value: this.state.patient.groupage, selectOptions: groupageOptions},
                  {type: "tagsinput", label: "Maladies", name: "maladies", value: this.state.patient.maladies},
                  {type: "tagsinput", label: "Allergies", name: "allergies", value: this.state.patient.allergies},
                  {type: "tagsinput", label: "Habitudes Alimentaires", name: "habitude_alimentaires", value: this.state.patient.habitude_alimentaires},
                ],
              },
        ];

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
                        <PageTitle title="Modifier un patient" />
                        
                        <div className="col-xs-12 ">
                            <AddHeader entityName="patient" type="edit" />

                            <div className="bg-w">
                                { formBoxes.map((box) => 
                                    <FormBox 
                                        box={box} fromType="edit"
                                        isSubmitting={this.state.isSubmitting}
                                        onInputChange={this.handleInputChange} 
                                        onSaveBtnTapped={this.savePatient}
                                        onDeleteBtnTapped={this.deletePatient} />
                                )}
                                
                                <div className="row">
                                    <div className="col-lg-10 col-lg-offset-1 col-xs-12">
                                        <FormBoxFooter
                                            isSubmitting={this.state.isSubmitting}
                                            onSaveBtnTapped={this.savePatient}
                                            onDeleteBtnTapped={this.deletePatient}
                                            fromType="edit"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
    );
  }
}

export default EditPatient;
