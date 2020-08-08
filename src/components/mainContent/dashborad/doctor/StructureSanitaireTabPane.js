import React, {useEffect, useState, Component} from 'react';
import ListeStructureSanitaire from './ListeStructureSanitaire';
import StructureSanitaireDataService from '../../../../services/structureSanitaire.service';
import MedecinStructureSanitaireDataService from '../../../../services/medecinStructureSanitaire.service';
import doctorService from '../../../../services/doctor.service';
import Cookies from 'universal-cookie';
import StructureSanitaireForm from './StructureSanitaireForm';

const cookies = new Cookies();
class StructureSanitaireTabPane extends Component {

    constructor(props) {
        super(props);
        var user = cookies.get("loggedUser");
        this.state = {
            structureSanitaire: {
                denomination: "",
                telephone: "",
                adresse: "",
                description: "",
                email: "",
                username: "",
            },
            filterText : "",
            structureSanitaires: [],
            addedStructureSanitaires: [],
            ownedStructureSanitaires: user.structure_sanitaires,
            showModal: false,
            send_btn_text: "Enregister",
        };
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        // this.setState({ [name]: value });
        this.setState({ structureSanitaire: {...this.state.structureSanitaire, [name]: value} });
        console.log(name, value);
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

        StructureSanitaireDataService.getAdded()
        .then(response => {
            this.setState({ addedStructureSanitaires: response.data.results.map( ss => { return ss.id }) });
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
        // this.toggleModal();
    }

    handleFilterTextChange = (event) => {
        this.setState({
            filterText: event.target.value,
        });
    }

    setAdded = (added) => {
        console.log("###", added)
        this.setState({
            addedStructureSanitaires: added,
        });
        this.toggleModal();
    }

    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal,
        });
    }

    handleStructureSanitaireClick = (id) => {
        console.log(id);
        const selector = "#pills-tab5 #structureSanitaire-";
        if (!this.state.addedStructureSanitaires.includes(id)) {
            var data = {
                "demandeur": "M",
                "medecin": cookies.get("loggedUser")["id"],
                "centre_medical": id
            };
            window.$(selector + id).find(".doc-info span").addClass("disabled").text("En cours...");
            MedecinStructureSanitaireDataService.create(data)
            .then(response => {
                window.showSuccess("Demande envoer");
                this.setState({addedStructureSanitaires: this.state.addedStructureSanitaires.concat([id])});
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
                // cookies.set("loggedUser", response.data);
                window.showSuccess("Demande supprimée");
                this.state.addedStructureSanitaires.splice(this.state.addedStructureSanitaires.indexOf(id), 1)
                this.setState({addedStructureSanitaires: this.state.addedStructureSanitaires});
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

    addStructureSanitaire = () => {
        this.setState({send_btn_text: "En cours..."});
        let data = {
            denomination: this.state.structureSanitaire.denomination,
            telephone: this.state.structureSanitaire.telephone,
            description: this.state.structureSanitaire.description,
            adresse: this.state.structureSanitaire.adresse,
            email: this.state.structureSanitaire.email,
            username: this.state.structureSanitaire.denomination.replace(/\s+/g, ''),
        };
        doctorService.addHospital(data)
        .then(response => {
            window.showSuccess("Structure sanitaire ajoutée");
            this.setState({send_btn_text: "Ajouter"});
            this.setState({structureSanitaire: {denomination: "", telephone: "", adresse: "", description: "", email: "", username: "",}});
            this.toggleModal();
            // this.props.history.push(`/hospitals/`);
            // this.props.history.push(`/hospitals_details/${response.data.id}`);
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

    cancelAdding = () => {
        this.toggleModal();
    }

    render() {
        return (
            <div style={{marginTop: 20+'px'}}>
                <h4>Vous intervenez dans l'une de ces structures en tant que Médécin ? sans plus tarder, .</h4>
                
                <div id="searchbarbox">
                    <div className="row">
                        <div className="col-lg-7">
                            <div className="input-group">
                                <input type="text" className="form-control animated fadeIn" placeholder="Search &amp; Enter" onChange={this.handleFilterTextChange}  />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <span className="btn btn-success btn-lg" style={{marginTop: 0+'px'}} onClick={this.toggleModal} >
                                <i className="fas fa-plus"></i> Nouvelle structure sanitaire
                            </span>
                        </div>
                        <div className="col-lg-1">
                            
                        </div>
                    </div>
                </div>

                <ListeStructureSanitaire 
                    owned={this.state.ownedStructureSanitaires}
                    added={this.state.addedStructureSanitaires}
                    filterText={this.state.filterText}
                    liste={this.state.structureSanitaires}
                    onClick={this.handleStructureSanitaireClick} />

                <div className={`modal fade col-xs-12 ${this.state.showModal ? 'in' : ''}`} id="cmpltadminModal-10" tabindex="-1" role="dialog" aria-hidden="true" style={{display: `${this.state.showModal ? 'block' : 'none'}`, background: '#8e898982'}}>
                    <div className="modal-dialog animated fadeInDown" style={{width: '750px'}}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" onClick={this.toggleModal} >×</button>
                                <h4 className="modal-title">Ajouter une nouvelle structure sanitaire</h4>
                            </div>
                            <div className="modal-body">

                            <StructureSanitaireForm 
                                hospital={this.state.structureSanitaire}
                                onAddClick={this.addStructureSanitaire} 
                                onCancelClick={this.cancelAdding} 
                                onInputChange={this.handleInputChange} 
                                send_btn_text={this.state.send_btn_text} />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
}

export default StructureSanitaireTabPane;