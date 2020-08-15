import React from 'react';
import AddHeader from '../../card/AddHeader';
import FormBox from '../../card/FormBox';

import PageTitle from '../../card/PageTitle';

import DemandeConsultationsDataService from "../../../services/demande_consultation.service"
import PatientDataService from "../../../services/patient.service"
import StructureSanitaireDataService from "../../../services/structureSanitaire.service"
import Cookies from 'universal-cookie';
import FormBoxFooter from '../../card/FormBoxFooter';

const cookies = new Cookies();


class EditDemandeConsultation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            demmande_consultation: {id:this.props.demande.id,medecin:cookies.get("loggedUser").id,status:null,patient:null,centre_medical:null},
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
        DemandeConsultationsDataService.update(data.id, data)
            .then(response => {
                window.showSuccess('demande de consultation modifie');
                    setTimeout( () => {
                        // this.props.history.push(`/consultations/${this.state.demmande_consultation.id}`)
                    }, 500);
                this.newDemandeConsultation();
            })
            .catch(e => {
                console.log(e.response);
            });
    }
    newDemandeConsultation() {
        this.setState({demmande_consultation:{
            status:"",
            centre_medical:"",
            patient:"",
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

    handleInputChange(name, value) {
        // const { name, value } = event.target;
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
        ].concat(this.state.patients.map((patient)=>({id:patient.id,libelle:patient.nom+" "+patient.prenom})));
        const CenterSelectOptions = [
            {id: -1, libelle: "--------Choisir le center medical-------"},
        ].concat(this.state.centre_medicals.map((centre_medical)=>({id:centre_medical.id,libelle:centre_medical.denomination})));;
        const formBoxes = [
            {
                headerTitle: "Ajout Demande consultation",
                fields: [
                    {type: "select", name:"centre_medical", label: "Centre medical", selectOptions: CenterSelectOptions},
                    {type: "select",name:"patient", label: "Patient", selectOptions: PatientSelectOptions},
                    {type: "select",name:"status", label: "Status", selectOptions: StatusSelectOptions},
                ]
            }
        ];

        return (
            <div>
                <PageTitle title="Ajout de la Demande de consultation" />
                
                <div className="col-xs-12 ">
                    <AddHeader entityName="Modification de la Demande de consultation"/>

                    <div className="bg-w">
                        
                        { formBoxes.map((box) => 
                            <FormBox box={box} 
                                box={box} fromType="edit"
                                isSubmitting={this.state.isSubmitting}
                                onInputChange={this.handleInputChange} 
                                onSaveBtnTapped={this.saveDemandeConsultation}
                            />
                        )}
                        
                    </div>

                    <div className="row">
                        <div className="col-lg-10 col-lg-offset-1 col-xs-12">
                            <FormBoxFooter
                                isSubmitting={this.state.isSubmitting}
                                onSaveBtnTapped={this.saveDemandeConsultation}
                                fromType="edit"
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditDemandeConsultation;