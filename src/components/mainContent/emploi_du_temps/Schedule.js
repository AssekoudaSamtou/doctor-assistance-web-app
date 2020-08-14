import React from 'react';
import scheduleService from '../../../services/schedule.service';
import HospitalItem from '../structures_sanitaire/Item';
// import Calendar from 'tui-calendar';
import noItem from '../../../data/icons/no-item3.png';
import ConsultationItem from './ConsultationItem';
import RDVItem from './RDVItem';


class Schedule extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            consultations: [],
            demande_consultations: [],
            structure_sanitaires: [],
        };
    }

    componentWillMount() {
        scheduleService.getAll()
        .then(response => {
            this.setState({...response.data});
        })
        .catch(error => {
            window.showErrorMessage("something wents wrong !!!");
        });
    }

    isAcceptable = (demande_consultation) => {
        var today = new Date();
        var date_demande = new Date(demande_consultation.date_consultation);
        return !demande_consultation.status && (today < date_demande);
    }

    findDemandeConsultationByConsultation = (consultation) => {
        let demande_consultation = null;
        for (let index = 0; index < this.state.demande_consultations.length; index++) {
            const element = this.state.demande_consultations[index];
            if (element.id == consultation.demande_consultation)
                demande_consultation = element;
        }

        return demande_consultation;
    }

    render() {
        
        return (
            <div>
                <div className="row">
                    {this.state.consultations.map((consultation) => 
                        <div className="col-xs-12 col-lg-6" key={consultation.id}>
                            <ConsultationItem
                                consultation={consultation}
                                demande_consultation={this.findDemandeConsultationByConsultation(consultation)} />
                        </div>
                    )}
                    {this.state.demande_consultations.map((demande_consultation) => (
                        <div key={demande_consultation.id}>
                            { this.isAcceptable(demande_consultation) && (
                                <div className="col-xs-12 col-lg-6">
                                    <RDVItem
                                        id={demande_consultation.id} />
                                </div>
                            ) }
                        </div> 
                        )
                    )}
                    { (this.state.consultations.length + this.state.demande_consultations.length) === 0 && (
                        <div>
                            <img src={noItem} style={{width: 50+'%', margin: 'auto', marginTop: '13%', display: 'block'}} />
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default Schedule;