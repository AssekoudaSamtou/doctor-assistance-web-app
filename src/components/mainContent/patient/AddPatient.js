import React, { useState } from 'react';
import Cookies from 'universal-cookie';

import AddHeader from '../../card/AddHeader';
import FormBox from '../../card/FormBox';

import PatientDataService from "../../../services/patient.service";

import PageTitle from '../../card/PageTitle';
import Alert from '../../card/Alert';

const cookies = new Cookies();

class AddPatient extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            patient: {id: null, nom: "", prenom: "", adresse: "", telephone: "", date_naissance: "", genre: "M"},
            submitted: false,
            isSubmitting: false
        };
        this.handleInputChange = this.handleInputChange.bind(this)
        this.savePatient = this.savePatient.bind(this)
        this.newPatient = this.newPatient.bind(this)
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
        console.log(data); 
    
        PatientDataService.create(data)
            .then(response => {
                this.newPatient();
                console.log(response.data, this.state.submitted);
                window.showSuccess('Your patient has been saved successfuly');
                setTimeout( () => {
                    this.props.history.push(`/patients_details/${response.data.id}`)
                }, 1000);
            })
            .catch(e => {
                console.log(e.response);
                window.showErrorMessage('Something went wrong');
            });
    }

    newPatient() {
        this.setState({ patient: {id: null, nom: null, prenom: null, adresse: null, telephone: null, date_naissance: null, genre: null} });
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
            }
        ];

        return (
            <div>
                <PageTitle title="Ajout de patient" />
                
                <div className="col-xs-12 ">
                    <AddHeader entityName="patient" type="add" />

                    <div className="bg-w">
                        { formBoxes.map((box) => 
                            <FormBox 
                                key={box.headerTitle}
                                box={box} fromType="add"
                                isSubmitting={this.state.isSubmitting}
                                onInputChange={this.handleInputChange} 
                                onSaveBtnTapped={this.savePatient} />
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default AddPatient;