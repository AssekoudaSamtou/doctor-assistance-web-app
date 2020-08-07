import React from 'react';

import PageTitle from '../../card/PageTitle';
import DemandeConsultationsDataService from "../../../services/demande_consultation.service"
import DemandeItem from './DemandeConsultationItem';

class DemandeConsultationList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            consultations: [],
            patients:[],
            demandes:[],
            selectedDemande: {id:1},
            edit:false
        }
    }

    componentWillMount(){
        DemandeConsultationsDataService.getAllWithNames()
        .then(response => {
            this.setState({demandes: response.data});
            // console.log(response.data)
        }).catch(e => {
            console.log(e);
        });
    }
    render() {
        return (
            <div>
                <PageTitle title="Toutes les demandes de consultations" />
                <section className="box">
                        <header className="panel_header">
                            <h2 className="title pull-left">Toute les consultations</h2>
                            <div className="actions panel_actions pull-right">
                                <a className="box_toggle fa fa-chevron-down"></a>
                                <a className="box_setting fa fa-cog" data-toggle="modal" href="#section-settings"></a>
                                <a className="box_close fa fa-times"></a>
                            </div>
                        </header>
                        <div className="content-body">
                            <div className="row">
                                <div className="col-xs-12">

                                    <div className="table-responsive" data-pattern="priority-columns">
                                        <table id="tech-companies-1" className="table vm table-small-font no-mb table-bordered table-striped">
                                            <thead>
                                                <tr>
                                                    <th>centre medical</th>
                                                    {/* <th>medecin</th> */}
                                                    <th>patient</th>
                                                    <th>status</th>
                                                    <th>date de consultation</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* {this.state.demandes.map(demande =>
                                                <tr>
                                                    <th>{demande.medecin}</th>
                                                    <th>{demande.centre_medical}</th>
                                                    <th>{demande.patient}</th>
                                                    <th>{demande.status}</th>
                                                    <th>{demande.date_consultation}</th>
                                                </tr>)} */}
                                                {this.state.demandes.map(demande =>
                                                    <DemandeItem
                                                        updateDemande={()=>(this.setState({selectedDemande:demande}))}
                                                        demande={demande}
                                                    />
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="modal fade col-xs-12" id={`cmpltadminModal-${this.state.selectedDemande?.id}`} tabindex="-1" role="dialog" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                    <h4 class="modal-title">demande {this.state.selectedDemande.status=="1"?"accepte":"non accepte"}</h4>
                                </div>
                                <div class="modal-body">
                                    {/* {this.state.edit ? <EditConsultation consultation={this.state.selectedconsultation}/> : this.state.selectedconsultation.resume} */}

                                </div>
                                <div class="modal-footer">
                                    <button class="btn btn-default"  type="button">Afficher</button>
                                    <button class="btn btn-primary" type="button">Edit</button>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}

export default DemandeConsultationList;