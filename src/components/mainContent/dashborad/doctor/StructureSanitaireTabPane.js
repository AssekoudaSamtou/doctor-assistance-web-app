import React, {useEffect, useState, Component} from 'react';
import ListeStructureSanitaire from './ListeStructureSanitaire';
import StructureSanitaireDataService from '../../../../services/structureSanitaire.service';
import MedecinStructureSanitaireDataService from '../../../../services/medecinStructureSanitaire.service';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
class StructureSanitaireTabPane extends Component {

    constructor(props) {
        super(props);
        var user = cookies.get("loggedUser");
        this.state = {
            filterText : "",
            structureSanitaires: [],
            selectedStructureSanitaires: user.structure_sanitaires,
        };
    }

    componentWillMount() {
        StructureSanitaireDataService.getAll()
        .then(response => {
            this.setState({ structureSanitaires: response.data.results });
        })
        .catch(error => {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } 
            else if (error.request) {
                console.log(error.request);
            } 
            else {
                console.log('Error', error.message);
            }
            console.log(error.config);
        });
    }

    componentDidMount() {
        window.$('#pills ul li a[href="#pills-tab5"]').parent().addClass("active");
        window.$('#pills-tab5').addClass("active");
    }

    handleFilterTextChange = (event) => {
        this.setState({
            filterText: event.target.value,
        });
    }

    handleStructureSanitaireClick = (id) => {
        console.log(id);
        const selector = "#pills-tab5 #structureSanitaire-";
        if (!this.state.selectedStructureSanitaires.includes(id)) {
            var data = {
                "demandeur": "M",
                "medecin": cookies.get("loggedUser")["id"],
                "centre_medical": id
            };
            window.$(selector + id).find(".doc-info span").addClass("disabled").text("En cours...");
            MedecinStructureSanitaireDataService.create(data)
            .then(response => {
                let temp = cookies.get("loggedUser");
                temp.structure_sanitaires = this.state.selectedStructureSanitaires.concat([id]);
                cookies.set("loggedUser", temp);
                window.showSuccess("Demande envoer");
                this.setState({selectedStructureSanitaires: this.state.selectedStructureSanitaires.concat([id])});
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } 
                else if (error.request) {
                    console.log(error.request);
                } 
                else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
        }
        else {
            window.$(selector + id).find(".doc-info span").addClass("disabled").text("En cours...");            
            var user = cookies.get("loggedUser");
            MedecinStructureSanitaireDataService.delete(user.id, id)
            .then(response => {
                cookies.set("loggedUser", response.data);
                window.showSuccess("Demande supprimée");
                this.setState({selectedStructureSanitaires: response.data.structure_sanitaires});
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } 
                else if (error.request) {
                    console.log(error.request);
                } 
                else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
        }
        
    }

    render() {
        return (
            <div style={{marginTop: 20+'px'}}>
                <h4>Vous intervenez dans l'une de ces structures en tant que Médécin ? sans plus tarder, .</h4>
                
                <div id="searchbarbox">
                    <div className="row">
                        <div className="col-lg-7">
                            <div className="input-group">
                                <input type="text" className="form-control animated fadeIn" placeholder="Search &amp; Enter" onChange={this.handleFilterTextChange} />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <span className="btn btn-success btn-sm" style={{marginTop: 20+'px'}}>
                                <i className="fas fa-plus"></i> Nouvelle structure sanitaire
                            </span>
                        </div>
                        <div className="col-lg-1">
                            
                        </div>
                    </div>
                </div>

                <ListeStructureSanitaire 
                    selected={this.state.selectedStructureSanitaires}
                    filterText={this.state.filterText}
                    liste={this.state.structureSanitaires}
                    onClick={this.handleStructureSanitaireClick} />

            </div>
        )
    }
    
}

export default StructureSanitaireTabPane;