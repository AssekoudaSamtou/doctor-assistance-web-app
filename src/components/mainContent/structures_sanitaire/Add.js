import React from 'react';
import StructureSanitaireForm from '../dashborad/doctor/StructureSanitaireForm';
import doctorService from '../../../services/doctor.service';
import PageTitle from '../../card/PageTitle';
import AddHeader from '../../card/AddHeader';

class AddHospital extends React.Component {

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
        };
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    add = () => {
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
            this.props.history.push(`/hospitals/`);
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

    cancel = () => {
        this.props.history.push("/hospitals/");
    }

    render() {

        return (
            <div>
                <PageTitle title="Nouvelle Structure Sanitaire" />
                
                <div className="col-xs-12 ">
                    <AddHeader entityName="structure sanitaire" type="add" />

                    <div className="bg-w">
                        <StructureSanitaireForm 
                            hospital={this.state}
                            onAddClick={this.add} 
                            onCancelClick={this.cancel} 
                            onInputChange={this.handleInputChange} 
                            send_btn_text={this.state.send_btn_text} />
                    </div>
                </div>
            </div>
        )
    }
}

export default AddHospital;