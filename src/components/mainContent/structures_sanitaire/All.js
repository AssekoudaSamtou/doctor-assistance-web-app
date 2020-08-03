import React from 'react';

import PageTitle from '../../card/PageTitle';
import HospitalItem from './Item';
import StructureSanitaireDataService from "../../../services/structureSanitaire.service";


class HopitalList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hopitals: [],
        }
    }

    componentWillMount() {
        StructureSanitaireDataService.getMine()
        .then(response => {
            console.log(response.data.results);
            this.setState({hopitals: response.data.results});
        }).catch(e => {
            console.log(e);
        });
    }

    render() {
        return (
            <div>
                <PageTitle title="Toutes Les Structures Sanitaires" />
                
                <div className="row">
                    {this.state.hopitals.map(({denomination, adresse, id}) => 
                        <div className="col-xs-12 col-lg-3" key={id}>
                            <HospitalItem 
                                nom={denomination} 
                                id={id} 
                                adresse={adresse}/>
                        </div>
                        
                    )}
                </div>
                
            </div>
        )
    }
}

export default HopitalList;