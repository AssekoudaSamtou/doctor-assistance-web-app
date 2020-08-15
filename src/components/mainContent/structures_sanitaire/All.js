import React from "react";

import PageTitle from "../../card/PageTitle";
import HospitalItem from "./Item";
import StructureSanitaireDataService from "../../../services/structureSanitaire.service";
import MedecinStructureSanitaireDataService from "../../../services/medecinStructureSanitaire.service";

import Cookies from 'universal-cookie';
import noItem from '../../../data/icons/no-item3.png';
import loading from '../../../data/icons/loading.svg';

const cookies = new Cookies();

class HopitalList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hopitals: null,
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

    delete = (id, owner) => {
    let doctor_id = cookies.get("loggedUser")["id"];

    if (!owner) {
        MedecinStructureSanitaireDataService.delete(doctor_id, id, "my_hos")
        .then((response) => {
            window.showSuccess("Structure sanitaire supprimé !");
            this.setState({ hopitals: response.data });
        })
        .catch((e) => {
            console.log(e);
            window.showErrorMessage("Something went wrong!!!");
        });
    } else if (owner === doctor_id) {
        StructureSanitaireDataService.delete(id, "my_hos")
        .then((response) => {
            window.showSuccess("Structure sanitaire supprimée !");
            this.setState({ hopitals: response.data });
        })
        .catch((e) => {
            console.log(e);
            window.showErrorMessage("Something went wrong!!!");
        });
    }
    };

    seeDetails = (id) => {};

    edit = (id) => {
        this.props.history.push(`/hospitals_update/${id}`);
    }
    render() {
        return (
            <div>
                <PageTitle title="Toutes Les Structures Sanitaires" />
                
                <div className="row">
                    { this.state.hopitals !== null && this.state.hopitals.map(({denomination, adresse, id, email, description, owner, telephone}) => 
                        <div className="col-xs-12 col-lg-6 structure-sanitaire-column" key={id}>
                            <HospitalItem 
                                nom={denomination} 
                                id={id} 
                                email={email} 
                                description={description} 
                                owner={owner} 
                                telephone={telephone} 
                                adresse={adresse}
                                onDeleteClick={this.delete}
                                onEditClick={this.edit}
                                onSeeClick={this.seeDetails}
                            />
                        </div>
                    )}

                    { this.state.hopitals === null && (
                        <div>
                            <img src={loading} style={{width: '300px', margin: 'auto', display: 'block'}} />
                        </div>
                    )}

                    { (this.state.hopitals !== null && this.state.hopitals.length === 0) && (
                        <div>
                            <img src={noItem} style={{width: 50+'%', margin: 'auto', display: 'block'}} />
                        </div>
                    )}
                </div>
                
            </div>
        )
    }
}

export default HopitalList;
