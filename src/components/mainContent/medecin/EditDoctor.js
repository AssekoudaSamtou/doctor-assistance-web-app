import React, { useState } from 'react';
import AddHeader from '../../card/AddHeader';
import FormBox from '../../card/FormBox';

import PatientDataService from "../../../services/patient.service";

import PageTitle from '../../card/PageTitle';
import NotFound from '../error/404';


class EditPatient extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            doctor: {id: null, first_name: "sam", last_name: "", username: ""},
            submitted: false,
            isSubmitting: false
        };
        this.handleInputChange = this.handleInputChange.bind(this)
        this.saveDoctor = this.saveDoctor.bind(this)
        this.deleteDoctor = this.deleteDoctor.bind(this)
    }

    componentWillMount() {
        const { match: { params } } = this.props;
        
        DocotrDataService.get(params.id)
        .then(response => {
            console.log(response.data);
            this.setState({doctor: {...response.data}});
        }).catch(e => {
            console.log(e);
            console.log(this.state.doctor.id === null);
        });
    }

    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({ docotr: { ...this.state.doctor, [name]: value } });
        console.log("CHANGING... ", name, value);
    }

    saveDoctor() {
        var data = {
            ...this.state.doctor,
            "create_date_time": "2020-07-13T02:49:00Z",
            "mod_date_time": "2020-07-13T02:49:00Z",
        }; 
    
        PatientDataService.update(this.state.patient.id, data)
            .then(response => {
                this.setState({ patient: { ...response.data } });
                console.log(response.data);
                window.showSuccess('Your patient has been saved successfuly');
            })
            .catch(e => {
                console.log(e);
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