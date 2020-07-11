import React from 'react';
import AddHeader from '../../card/AddHeader';
import FormBox from '../../card/FormBox';

import PageTitle from '../../card/PageTitle';
// import PatientItem from './PatientItem';


class AddPatient extends React.Component {
    render() {
        const patient = {};
        const mySelectOptions = [
            {id: 1, label: "Male"},
            {id: 2, label: "Female"},
        ];
        const formBoxes = [
            {
                headerTitle: "Basic Info",
                fields: [
                    {type: "text", label: "Name"},
                    {type: "text", label: "Date of Birth", description: 'e.g. "04/03/2018"'},
                    {type: "text", label: "Gender", selectOptions: mySelectOptions},
                    {type: "text", label: "Profile Image"},
                    {type: "text", label: "Brief", description: 'e.g. "Enter any size of text description here"'},
                ]
            },
        ];

        return (
            <div>
                <PageTitle title="Ajout de patient" />
                
                <div className="col-xs-12 ">
                    <AddHeader entityName="patient"/>

                    <div className="bg-w">
                        
                        { formBoxes.map((box) => 
                            <FormBox box={box} />
                        )}
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default AddPatient;