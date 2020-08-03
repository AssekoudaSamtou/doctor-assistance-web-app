import React from 'react';
import {Link} from 'react-router-dom';
// import {Col} from 'react-bootstrap';

import doc2 from '../../../data/hos-dash/doc2.jpg';
import PatientInfoItem from '../../card/PatientInfoItem';

let v = true
class ConsultationItem extends React.Component {
    render() {
       return (
        <tr onClick={this.props.updateConsultation} data-toggle="modal" href={`#cmpltadminModal-${this.props.consultation.id}`} style={{cursor:'pointer'}}>
        <td>
            <div className="round">S</div>
            <div className="designer-info">
                <h6>{new Intl.DateTimeFormat("en-US", {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(new Date())}
                </h6>
                <small className="text-muted">Status: {this.props.demande?.status}</small>
            </div>
        </td>
        <td>{this.props.consultation.motif}</td>
        <td>{this.props.consultation.interrogatoire}</td>
        <td>{this.props.consultation.resume}</td>
        <td>{this.props.consultation.hypothese_diagnostique}</td>
    </tr>
       );
    }
 }
 export default ConsultationItem;