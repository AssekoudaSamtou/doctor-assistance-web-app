import React from 'react';
import AddHeader from '../../card/AddHeader';
import FormBox from '../../card/FormBox';

import PageTitle from '../../card/PageTitle';

import DemandeConsultationsDataService from "../../../services/demande_consultation.service"
import PatientDataService from "../../../services/patient.service"
import StructureSanitaireDataService from "../../../services/structureSanitaire.service"
import Cookies from 'universal-cookie';

const cookies = new Cookies();


class AddDemandeConsultation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            demmande_consultation: {medecin:cookies.get("loggedUser").id,status:null,patient:null,medecin_centre_medical:null},
            submitted: false,
            isSubmitting: false,
            centre_medicals:[],
            patients:[],
        };
        this.handleInputChange = this.handleInputChange.bind(this)
        this.saveDemandeConsultation = this.saveDemandeConsultation.bind(this)
        this.newDemandeConsultation = this.newDemandeConsultation.bind(this)
    }
    saveDemandeConsultation() {
        var data = {
                ...this.state.demmande_consultation
            };
            console.log(data)
        DemandeConsultationsDataService.create(data)
            .then(response => {
                window.showSuccess('demande de consultation effectuee');
                    setTimeout( () => {
                        // this.props.history.push(`/consultations/`)
                    }, 500);
                this.newDemandeConsultation();
            })
            .catch(e => {
                console.log(e.response);
            });
    }
    newDemandeConsultation() {
        this.setState({demmande_consultation:{
            status:1,
            medecin_centre_medical:-1,
            patient:-1,
        }})
    }

    componentWillMount() {
        StructureSanitaireDataService.getAll()
        .then(response => {
            this.setState({centre_medicals: response.data.results});
        }).catch(e => {
            console.log(e);
        });

        PatientDataService.getAll()
        .then(response => {
            this.setState({patients: response.data.results});
        }).catch(e => {
            console.log(e);
        });
    }

    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({ demmande_consultation: { ...this.state.demmande_consultation, [name]: value }});
        console.log("CHANGING... ", name, value);
    }
    render() {
        const patient = {};
        const StatusSelectOptions = [
            {id: -1, libelle: "--------Choisir le status-------"},
            {id: 1, libelle: "accepte"},
        ];
        const PatientSelectOptions = [
            {id: -1, libelle: "--------Choisir le patient--------"},
        ].concat(this.state.patients.map((patient)=>({id:patient.id,libelle:patient.nom+" "+patient.nom})));
        const CenterSelectOptions = [
            {id: -1, libelle: "--------Choisir le center medical-------"},
        ].concat(this.state.centre_medicals.map((centre_medical)=>({id:centre_medical.id,libelle:centre_medical.denomination})));;
        const formBoxes = [
            {
                headerTitle: "Ajout Demande consultation",
                fields: [
                    {type: "select", name:"medecin_centre_medical", label: "Centre medical", selectOptions: CenterSelectOptions},
                    {type: "select",name:"patient", label: "Patient", selectOptions: PatientSelectOptions},
                    {type: "select",name:"status", label: "Status", selectOptions: StatusSelectOptions},
                ]
            }
        ];

        return (
            <div>
                <PageTitle title="Ajout de la Demande de consultation" />
                
                <div className="col-xs-12 ">
                    <AddHeader entityName="Demande de consultation"/>

                    <div className="bg-w">
                        
                        { formBoxes.map((box) => 
                            <FormBox box={box} 
                                box={box} fromType="add"
                                isSubmitting={this.state.isSubmitting}
                                onInputChange={this.handleInputChange} 
                                onSaveBtnTapped={this.saveDemandeConsultation}
                            />
                        )}
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default AddDemandeConsultation;