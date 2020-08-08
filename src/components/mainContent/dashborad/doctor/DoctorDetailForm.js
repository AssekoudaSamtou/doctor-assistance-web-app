import React from "react";

import Cookies from "universal-cookie";
import FormBoxItem from "../../../card/FormBoxItem";
import Specialite from "../../../card/Specialite";
import SpecialiteDataService from "../../../../services/specialite.service";
import DoctorDataService from "../../../../services/doctor.service";
import "./DoctorDetailForm.css";
import StructureSanitaireTabPane from "./StructureSanitaireTabPane";
import StructureSanitaireForm from "./StructureSanitaireForm";

const cookies = new Cookies();

class DoctorDetailForm extends React.Component {
  constructor(props) {
    super(props);
    var user = cookies.get("loggedUser");
    // console.log(user);
    this.state = {
      nom: user.first_name,
      prenom: user.last_name,
      date_naissance: user.date_naissance,
      genre: user.genre,
      adresse: user.adresse,
      specialite: user.specialite,
      telephone: user.telephone,
      bio: user.bio,
      specialites: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSpecialiteClik = this.handleSpecialiteClik.bind(this);
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  componentWillMount() {
    SpecialiteDataService.getAll()
      .then((response) => {
        this.setState({ specialites: response.data.results });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  }

  updateDoctorInfo = () => {
    let data = cookies.get("loggedUser");
    data = Object.assign({}, data, this.state);
    data["first_name"] = this.state.nom;
    data["last_name"] = this.state.prenom;

    window.$("#pills .finish").text("sending....").addClass("disabled");
    // window.setTimeout(()=>{console.log("waiting")}, 1000000);
    DoctorDataService.update(data["id"], data)
      .then((response) => {
        cookies.set("loggedUser", response.data);
        this.setState({ ...response.data });
        window.$("#pills .finish").text("Finish").removeClass("disabled");
        window.$("#doctorDetailsModal").modal("toggle");
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };

  handleSpecialiteChildMount = (specialite_id) => {
    const selector = `#pills-tab4 .r4_counter_.db_box`;
    if (specialite_id === this.state.specialite) {
      window
        .$(selector + `#specialite-${specialite_id}`)
        .css("background", "linear-gradient(-12deg,#2a57d7 0,#9eeeff 100%)");
      window
        .$(selector + `#specialite-${specialite_id}`)
        .find("h3")
        .css("color", "white");
    }
  };

  componentDidMount() {
    if (!this.mustComplete()) {
      window.$("#doctorDetailsModal").modal("toggle");
    }
    window.$("#pills .finish").click(this.updateDoctorInfo);
  }

  mustComplete() {
    // return this.state.nom && this.state.prenom && this.state.genre && this.state.date_naissance && this.state.specialite;
    return false;
  }

  handleSpecialiteClik(id) {
    const selector = `#pills-tab4 .r4_counter_.db_box`;
    window.$(selector).css("background", "white");
    window.$(selector).find("h3").css("color", "#505458");

    window
      .$(selector + `#specialite-${id}`)
      .css("background", "linear-gradient(-12deg,#2a57d7 0,#9eeeff 100%)");
    window
      .$(selector + `#specialite-${id}`)
      .find("h3")
      .css("color", "white");

    this.state.specialite = id;
    // this.setState({specialite: id});
    // this.setState(
    //     (prevState, props) => ({ specialite: id })
    // );
    console.log(this.state.specialite);
  }

  render() {
    const GenderSelectOptions = [
      { id: null, libelle: "----Selectionnez un genre-----" },
      { id: "M", libelle: "Masculin" },
      { id: "F", libelle: "Féminin" },
    ];
    return (
      <section className="box" style={{ margin: 0 }}>
        <header className="panel_header">
          <h2 className="title pull-left">
            Nous aimerions savoir un peu plus sur vous
          </h2>
        </header>
        <div className="content-body">
          <div className="row">
            <div className="col-xs-12">
              <form id="doctorDetailForm" noValidate="novalidate">
                <div id="pills" className="wizardpills">
                  <ul className="form-wizard nav nav-pills">
                    <li className="">
                      <a
                        href="#pills-tab1"
                        data-toggle="tab"
                        aria-expanded="true"
                      >
                        <span>
                          <i
                            class="fas fa-user-edit fa-3x"
                            title="Etat Civil"
                          ></i>
                        </span>
                      </a>
                    </li>
                    <li className="">
                      <a
                        href="#pills-tab2"
                        data-toggle="tab"
                        aria-expanded="false"
                      >
                        <span>
                          <i
                            class="fas fa-address-card fa-3x"
                            title="Adresse"
                          ></i>
                        </span>
                      </a>
                    </li>
                    <li className="">
                      <a
                        href="#pills-tab3"
                        data-toggle="tab"
                        aria-expanded="false"
                      >
                        <span>
                          <i
                            class="fas fa-info-circle fa-3x"
                            title="Biographie"
                          ></i>
                        </span>
                      </a>
                    </li>
                    <li className="">
                      <a
                        href="#pills-tab4"
                        data-toggle="tab"
                        aria-expanded="false"
                      >
                        <span>
                          <i
                            class="fas fa-briefcase-medical fa-3x"
                            title="Spécialité"
                          ></i>
                        </span>
                      </a>
                    </li>
                    <li className="">
                      <a
                        href="#pills-tab5"
                        data-toggle="tab"
                        aria-expanded="false"
                      >
                        <span>
                          <i
                            class="fas fa-hospital fa-3x"
                            title="Structures Sanitaires"
                          ></i>
                        </span>
                      </a>
                    </li>
                  </ul>
                  <div id="bar" className="progress active">
                    <div
                      className="progress-bar progress-bar-primary"
                      role="progressbar"
                      aria-valuenow="0"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ width: 20 + "%" }}
                    ></div>
                  </div>

                  <div className="tab-content">
                    <div className="tab-pane" id="pills-tab1">
                      <h4>Informations Personnelles</h4>
                      <br />
                      <div className="row">
                        <div className="col-lg-6 col-xs-12">
                          <FormBoxItem
                            type="text"
                            label="Nom"
                            onInputChange={this.handleInputChange}
                            name="nom"
                            value={this.state.nom}
                          />
                        </div>
                        <div className="col-lg-6 col-xs-12">
                          <FormBoxItem
                            type="text"
                            label="Prénoms"
                            onInputChange={this.handleInputChange}
                            name="prenom"
                            value={this.state.prenom}
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-6 col-xs-12">
                          <FormBoxItem
                            type="date"
                            label="Date de Naissance"
                            onInputChange={this.handleInputChange}
                            name="date_naissance"
                            value={this.state.date_naissance}
                          />
                        </div>
                        <div className="col-lg-6 col-xs-12">
                          <FormBoxItem
                            type="select"
                            label="Genre"
                            onInputChange={this.handleInputChange}
                            name="genre"
                            value={this.state.genre}
                            selectOptions={GenderSelectOptions}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="tab-pane" id="pills-tab2">
                      <h4>Contacts</h4>
                      <br />
                      <div className="row">
                        <div className="col-lg-6 col-xs-12">
                          <FormBoxItem
                            type="text"
                            label="Quartier de Résidence"
                            onInputChange={this.handleInputChange}
                            name="adresse"
                            value={this.state.adresse}
                          />
                        </div>
                        <div className="col-lg-6 col-xs-12">
                          <FormBoxItem
                            type="text"
                            label="Numéro de Téléphone"
                            onInputChange={this.handleInputChange}
                            name="telephone"
                            value={this.state.telephone}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="tab-pane" id="pills-tab3">
                      <h4>Biographie Professionnelle</h4>
                      <br />
                      <div className="row">
                        <div className="col-lg-12 col-xs-12">
                          <FormBoxItem
                            type="textarea"
                            label="Bio"
                            onInputChange={this.handleInputChange}
                            name="bio"
                            value={this.state.bio}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="tab-pane " id="pills-tab4">
                      <h4>Quelle est votre spécialité ? </h4>
                      <br />
                      <div className="row">
                        {this.state.specialites.map(({ libelle, icon, id }) => (
                          <div className="col-lg-3 col-xs-6" key={id}>
                            <Specialite
                              libelle={libelle}
                              icon={icon}
                              id={id}
                              onClick={this.handleSpecialiteClik}
                              onMount={this.handleSpecialiteChildMount}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="tab-pane" id="pills-tab5">
                      <StructureSanitaireTabPane
                        structureSanitaires={this.state.structureSanitaires}
                        onStructureSanitaireClick={
                          this.handleStructureSanitaireClick
                        }
                        onStructureSanitaireMount={
                          this.handleStructureSanitaireChildMount
                        }
                      />
                    </div>

                    <div className="clearfix"></div>

                    <ul className="pager wizard">
                      <li
                        className="previous first"
                        style={{ display: "none" }}
                      >
                        <a href="javascript:;">First</a>
                      </li>
                      <li className="previous">
                        <a href="javascript:;">Previous</a>
                      </li>
                      <li className="next last" style={{ display: "none" }}>
                        <a href="javascript:;">Last</a>
                      </li>
                      <li className="next">
                        <a href="javascript:;">Next</a>
                      </li>
                      <li className="finish">
                        <a href="javascript:;">Finish</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default DoctorDetailForm;
