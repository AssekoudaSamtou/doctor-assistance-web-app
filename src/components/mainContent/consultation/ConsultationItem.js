import React from 'react';
import {Link} from 'react-router-dom';
// import {Col} from 'react-bootstrap';

import doc2 from '../../../data/hos-dash/doc2.jpg';
import PatientInfoItem from '../../card/PatientInfoItem';

let v = true
class ConsultationItem extends React.Component {
    render() {
        const date = new Date(this.props.demande?.date_consultation)
        const mdate = ("0"+date.getDate()).slice(-2, 3)+"/"+("0"+date.getMonth()).slice(-2,3)+"/"+date.getFullYear()+" "+("0"+date.getHours()).slice(-2,3)+":"+("0"+date.getMinutes()).slice(-2,3)+":"+("0"+date.getSeconds()).slice(-2,3)
        const patient = this.props.patients.find(p => p.id === this.props.demande?.patient)
       return (
        <tr onClick={this.props.updateConsultation} data-toggle="modal" href={`#cmpltadminModal-${this.props.consultation.id}`} style={{cursor:'pointer'}}>
        <td>
            <div className="round">{patient?.nom[0]}.{patient?.prenom[0]}</div>
            <div className="designer-info">
                <h6>
                    {mdate}
                </h6>
                <small className="text-muted">{this.props.demande?.status=="1"?"accepte":"non accepte"}</small>
            </div>
        </td>
        <td><div dangerouslySetInnerHTML={{__html: this.props.consultation.motif}} /></td>
        <td><div dangerouslySetInnerHTML={{__html: this.props.consultation.interrogatoire}} /></td>
        <td><div dangerouslySetInnerHTML={{__html: this.props.consultation.resume}}/></td>
        <td><div dangerouslySetInnerHTML={{__html:this.props.consultation.hypothese_diagnostique}}/></td>
    </tr>
       );
    }
 }
 export default ConsultationItem;