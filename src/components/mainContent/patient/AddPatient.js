import React, { useState } from 'react';
import AddHeader from '../../card/AddHeader';
import FormBox from '../../card/FormBox';

import PatientDataService from "../../../services/patient.service";

import PageTitle from '../../card/PageTitle';
import Alert from '../../card/Alert';
// import PatientItem from './PatientItem';


class AddPatient extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            patient: {id: null, nom: "sam", prenom: "", adresse: ""},
            submitted: false,
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
        var data = {
            nom: this.state.patient.nom,
            prenom: this.state.patient.prenom,
            adresse: this.state.patient.adresse,
            "create_date_time": "2020-07-13T02:49:00Z",
            "mod_date_time": "2020-07-13T02:49:00Z",
        };
        console.log(data); 
    
        PatientDataService.create(data)
            .then(response => {
                this.setState({ patient: {
                        id: response.data.id,
                        nom: response.data.nom,
                        prenom: response.data.prenom,
                        adresse: response.data.adresse
                    } 
                });
                this.setState({ submitted: true });
                console.log(response.data, this.state.submitted);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newPatient() {
        this.setState({ patient: {id: null, nom: "", prenom: "", adresse: ""} });
        this.setState({ submitted: false });
    }

    render() {

        const GenderSelectOptions = [
            {id: 1, label: "Male"},
            {id: 2, label: "Female"},
        ];
        const formBoxes = [
            {
                headerTitle: "Basic Info",
                fields: [
                    {type: "text", label: "Nom", name: "nom", value: this.state.patient.nom},
                    {type: "text", label: "Prénom", name: "prenom", value: this.state.patient.prenom},
                    {type: "text", label: "adresse", name: "adresse", value: this.state.patient.adresse, description: 'e.g. "Agoe-cacaveli"'},
                    // {type: "text", label: "Profile Image"},
                    // {type: "text", label: "Brief", description: 'e.g. "Enter any size of text description here"'},
                ]
            },

            // {
            //     headerTitle: "Patient Account Info",
            //     fields: [
            //         {type: "text", label: "Email"},
            //         {type: "text", label: "Phone", description: 'e.g. "(534) 253-5353"'},
            //         {type: "password", label: "Password"},
            //         {type: "password", label: "Confirm Password"},
            //     ]
            // },

            // {
            //     headerTitle: "Patient Social Media Info",
            //     fields: [
            //         {type: "text", label: "Facebook URL"},
            //         {type: "text", label: "Twitter URL"},
            //         {type: "text", label: "Google Plus URL"},
            //     ]
            // },
        ];
        const SUCCESS_MSG = "Well done! You successfully read this important alert message.";

        return (
            <div>
                <PageTitle title="Ajout de patient" />
                
                <div className="col-xs-12 ">
                    <AddHeader entityName="patient"/>

                    <div className="bg-w">
                        
                        {this.state.submitted && (
                            <Alert type="success" mode="fade in" isDismissible={true} msg={SUCCESS_MSG} />
                        )}

                        { formBoxes.map((box) => 
                            <FormBox 
                                box={box} 
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