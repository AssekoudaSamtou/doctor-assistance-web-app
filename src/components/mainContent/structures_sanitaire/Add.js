import React from 'react';
import StructureSanitaireForm from '../dashborad/doctor/StructureSanitaireForm';
import PageTitle from '../../card/PageTitle';
import AddHeader from '../../card/AddHeader';

class AddHospital extends React.Component {

    constructor(props) {
        super(props);
    }

    handleAddHospitalSuccess = () => {
        this.props.history.push("/hospitals/");
    }

  render() {
    const GenderSelectOptions = [
      { id: null, libelle: "----Selectionnez un genre-----" },
      { id: "M", libelle: "Masculin" },
      { id: "F", libelle: "Féminin" },
    ];
    const formBoxes = [
      {
        headerTitle: "Informations personnelles du patient",
        fields: [
          {
            type: "text",
            label: "Nom",
            name: "nom",
            value: this.state.patient.nom,
          },
          {
            type: "text",
            label: "Prénom",
            name: "prenom",
            value: this.state.patient.prenom,
          },
          {
            type: "text",
            label: "Adresse",
            name: "adresse",
            value: this.state.patient.adresse,
            description: 'e.g. "Agoe-cacaveli"',
          },
          {
            type: "text",
            label: "Téléphone",
            name: "telephone",
            value: this.state.patient.telephone,
            description: 'e.g. "00228 98 76 56 87"',
          },
          {
            type: "date",
            label: "Date de naissance",
            name: "date_naissance",
            value: this.state.patient.date_naissance,
          },
          {
            type: "select",
            label: "Genre",
            name: "genre",
            value: this.state.patient.genre,
            selectOptions: GenderSelectOptions,
          },
        ],
      },
    ];

        return (
            <div>
                <PageTitle title="Nouvelle Structure Sanitaire" />
                
                <div className="col-xs-12 ">
                    <AddHeader entityName="structure sanitaire" type="add" />

                    <div className="bg-w">
                        <StructureSanitaireForm onSuccess={this.handleAddHospitalSuccess} />
                    </div>
                </div>
            </div>
        )
    }
}

export default AddHospital;