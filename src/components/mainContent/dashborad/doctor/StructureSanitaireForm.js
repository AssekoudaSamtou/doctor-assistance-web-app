import React, {} from 'react';
import FormBoxItem from '../../../card/FormBoxItem';
import doctorService from '../../../../services/doctor.service';
import structureSanitaireService from '../../../../services/structureSanitaire.service';


class StructureSanitaireForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            denomination: "",
            telephone: "",
            adresse: "",
            description: "",
            email: "",
            username: "",
            send_btn_text: "Enregister",
            delete_btn_text: "Supprimer",
        };
    }

    componentWillMount() {
        if (this.props.id) {
            structureSanitaireService.get(this.props.id)
            .then(response => {
                console.log(response.data);
                this.setState({...response.data});
            }).catch(e => {
                console.log(e);
            });
        }
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    clean = () => {
        this.setState({
            denomination: "",
            telephone: "",
            adresse: "",
            description: "",
            email: "",
            username: "",
        });
    }

    save = event => {
        this.setState({send_btn_text: "En cours..."});
        let data = {
            denomination: this.state.denomination,
            telephone: this.state.telephone,
            description: this.state.description,
            adresse: this.state.adresse,
            email: this.state.email,
            username: this.state.denomination.replace(/\s+/g, ''),
        };
        doctorService.addHospital(data)
        .then(response => {
            window.showSuccess("Structure sanitaire ajoutée");
            this.setState({send_btn_text: "Ajouter"});
            this.clean();
            this.props.onSuccess(response.data);
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

    update = event => {
        this.setState({send_btn_text: "En cours..."});
        let data = {
            denomination: this.state.denomination,
            telephone: this.state.telephone,
            description: this.state.description,
            adresse: this.state.adresse,
            email: this.state.email,
            // username: this.state.denomination.replace(/\s+/g, ''),
        };
        structureSanitaireService.delete(this.props.id)
        .then(response => {
            window.showSuccess("Structure sanitaire supprimée");
            this.setState({send_btn_text: "Enregister"});
            this.clean();
            this.props.onSuccess(response.data);
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

    render() {
        return (
            <div style={{padding: '10px'}}>
                <div className="row">
                    <div className="col-lg-6 col-xs-12">
                        <FormBoxItem type="text" label="Dénomination" onInputChange={this.handleInputChange} name="denomination" value={this.state.denomination}/>
                    </div>
                    <div className="col-lg-6 col-xs-12">
                        <FormBoxItem type="email" label="Adresse Email" onInputChange={this.handleInputChange} name="email" value={this.state.email}/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6 col-xs-12">
                        <FormBoxItem type="text" label="Téléphone" onInputChange={this.handleInputChange} name="telephone" value={this.state.telephone}/>
                    </div>
                    <div className="col-lg-6 col-xs-12">
                        <FormBoxItem type="text" label="Adresse" onInputChange={this.handleInputChange} name="adresse" value={this.state.adresse} description="'ville, quartier, boite postale...'" />
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12 col-xs-12">
                        <FormBoxItem type="textarea" label="Description" onInputChange={this.handleInputChange} name="description" value={this.state.description}/>
                    </div>
                </div>

                <div className="row" style={{padding: '15px'}}>
                    <span className="btn btn-primary gradient-blue" onClick={this.save} >{ this.state.send_btn_text}</span>
                    { this.props.id && (
                        <span className="btn btn-default" onClick={this.delete} >{ this.state.delete_btn_text}</span>
                    )}
                    
                </div>
            </div>
        )
    }
    
}

export default StructureSanitaireForm;