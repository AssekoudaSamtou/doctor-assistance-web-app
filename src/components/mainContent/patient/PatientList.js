import React from 'react';

import PageTitle from '../../card/PageTitle';
import PatientItem from './PatientItem';
import PatientDataService from "../../../services/patient.service";


class PatientList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            patients: [],
        }
    }

    componentWillMount() {
        PatientDataService.getAll()
        .then(response => {
            console.log(response.data.results);
            this.setState({patients: response.data.results});
        }).catch(e => {
            console.log(e);
        });
    }

    render() {
        return (
            <div>
                <PageTitle title="Tous Les Patients" />
                
                {this.state.patients.map(({nom, prenom, genre="Masculin", age=21, id, adresse}) => 
                    <PatientItem 
                        fullname={`${nom} ${prenom}`} 
                        gender={genre} 
                        age={age}
                        id={id}
                        key={id}/>
                )}
            </div>
        )
    }
}

export default PatientList;