import React from 'react';

import PageTitle from '../../card/PageTitle';
import PatientItem from './PatientItem';
import PatientDataService from "../../../services/patient.service";
import noItem from '../../../data/icons/no-item3.png';


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
                <PageTitle title="Tous Mes Patients" />
                
                {this.state.patients.map(({nom, prenom, genre, id, adresse, telephone, date_naissance}) => 
                    <PatientItem 
                        fullname={`${nom} ${prenom}`} 
                        gender={genre} 
                        adresse={adresse}
                        telephone={telephone}
                        date_naissance={date_naissance}
                        id={id}
                        key={id}/>
                )}

                { this.state.patients.length === 0 && (
                    <div>
                        <img src={noItem} style={{width: 50+'%', margin: 'auto', display: 'block'}} />
                    </div>
                )}
            </div>
        )
    }
}

export default PatientList;