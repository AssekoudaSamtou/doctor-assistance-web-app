import React, { useState } from 'react';
import Cookies from 'universal-cookie';

import AddHeader from '../../card/AddHeader';
import FormBox from '../../card/FormBox';

import PatientDataService from "../../../services/patient.service";

import PageTitle from '../../card/PageTitle';
import NotFound from '../error/404';

const cookies = new Cookies();

class EditPatient extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            patient: {id: null, nom: "", prenom: "", adresse: "", telephone: "", date_naissance: "", genre: ""},
            submitted: false,
            isSubmitting: false
        };
        this.handleInputChange = this.handleInputChange.bind(this)
        this.savePatient = this.savePatient.bind(this)
        this.newPatient = this.newPatient.bind(this)
        this.deletePatient = this.deletePatient.bind(this)
    }

    componentWillMount() {
        const { match: { params } } = this.props;
        
        PatientDataService.get(params.id)
        .then(response => {
            console.log(response.data);
            this.setState({patient: {...response.data}});
        }).catch(e => {
            console.log(e);
            console.log(this.state.patient.id === null);
        });
    }

    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({ patient: { ...this.state.patient, [name]: value } });
        console.log("CHANGING... ", name, value);
    }

    savePatient() {
        let loggedDoctor = null;
        if (cookies.get("userType") === "medecin"){
            loggedDoctor = cookies.get("loggedUser")
        }
        var data = {
            created_by: loggedDoctor.id,
            nom: this.state.patient.nom,
            prenom: this.state.patient.prenom,
            adresse: this.state.patient.adresse,
            telephone: this.state.patient.telephone,
            date_naissance: this.state.patient.date_naissance,
            genre: this.state.patient.genre,
        }; 
    
        PatientDataService.update(this.state.patient.id, data)
            .then(response => {
                this.setState({ patient: { ...response.data } });
                console.log(response.data);
                window.showSuccess('Your patient has been saved successfuly');
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
                setTimeout( () => {
                    this.props.history.push("/patients/")
                }, 500)
            })
            .catch(e => {
                console.log(e);
                window.showErrorMessage('Something went wrong!!!');
            });
    }

    newPatient() {
        this.setState({ patient: {nom: "", prenom: "", adresse: "", telephone: "", date_naissance: "", genre: ""}, });
        this.setState({ submitted: true });
    }

    render() {

        const GenderSelectOptions = [
            {id: null, libelle: "----Selectionnez un genre-----"},
            {id: "M", libelle: "Masculin"},
            {id: "F", libelle: "Féminin"},
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
        ];

        return (
            <div>
                {this.state.patient.id !== null ? (
                    <div>
                        <PageTitle title="Edit patient" />
                        
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
                            </div>
                        </div>
                    </div>
                ) : (
                    <NotFound/>
                )}
                
            </div>
        )
    }
}

export default EditPatient;