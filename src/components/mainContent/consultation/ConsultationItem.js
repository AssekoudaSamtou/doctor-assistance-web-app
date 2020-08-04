import React from 'react';
import {Link} from 'react-router-dom';
// import {Col} from 'react-bootstrap';

import doc2 from '../../../data/hos-dash/doc2.jpg';
import PatientInfoItem from '../../card/PatientInfoItem';

let v = true
class ConsultationItem extends React.Component {
    render() {
        const date = new Date(this.props.demande?.date_consultation)
        const newDate = new Date()
        newDate.setFullYear(date.getFullYear())
        newDate.setMonth(date.getMonth())
        newDate.setDate(date.getDate())
        newDate.setHours(date.getHours())
        newDate.setMinutes(date.getMinutes())
        newDate.setSeconds(date.getSeconds())
        const mdate = ("0"+date.getDay()).slice(-2, 3)+"/"+("0"+date.getMonth()).slice(-2,3)+"/"+date.getFullYear()+" "+("0"+date.getHours()).slice(-2,3)+":"+("0"+date.getMinutes()).slice(-2,3)+":"+("0"+date.getSeconds()).slice(-2,3)
       return (
        <tr onClick={this.props.updateConsultation} data-toggle="modal" href={`#cmpltadminModal-${this.props.consultation.id}`} style={{cursor:'pointer'}}>
        <td>
            <div className="round">S</div>
            <div className="designer-info">
                <h6>
                {mdate}
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