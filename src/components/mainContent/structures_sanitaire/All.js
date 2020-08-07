import React from "react";

import PageTitle from "../../card/PageTitle";
import HospitalItem from "./Item";
import StructureSanitaireDataService from "../../../services/structureSanitaire.service";
import MedecinStructureSanitaireDataService from "../../../services/medecinStructureSanitaire.service";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class HopitalList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hopitals: [],
    };
  }

  componentWillMount() {
    StructureSanitaireDataService.getMine()
      .then((response) => {
        console.log(response.data.results);
        this.setState({ hopitals: response.data.results });
      })
      .catch((e) => {
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

  edit = (id) => {};

  seeDetails = (id) => {};

  render() {
    return (
      <div>
        <PageTitle title="Liste des structures sanitaires" />

        <div className="row">
          {this.state.hopitals.map(
            ({
              denomination,
              adresse,
              id,
              email,
              description,
              owner,
              telephone,
            }) => (
              <div className="col-xs-12 col-lg-4" key={id}>
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
            )
          )}
        </div>
      </div>
    );
  }
}

export default HopitalList;
