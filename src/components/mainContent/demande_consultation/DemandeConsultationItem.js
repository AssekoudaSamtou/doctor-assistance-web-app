import React from 'react';
import {Link} from 'react-router-dom';
// import {Col} from 'react-bootstrap';

import doc2 from '../../../data/hos-dash/doc2.jpg';
import PatientInfoItem from '../../card/PatientInfoItem';

let v = true
class DemandeItem extends React.Component {
    render() {
        var demande = this.props.demande
        const date = new Date(demande.date_consultation)
        const mdate = ("0"+date.getDay()).slice(-2, 3)+"/"+("0"+date.getMonth()).slice(-2,3)+"/"+date.getFullYear()+" "+("0"+date.getHours()).slice(-2,3)+":"+("0"+date.getMinutes()).slice(-2,3)+":"+("0"+date.getSeconds()).slice(-2,3)
       return (
        <tr onClick={this.props.updateDemande} data-toggle="modal" href={`#cmpltadminModal-${demande.id}`} style={{cursor:'pointer'}}>
            <td>
                <div className="round">{demande.centre_medical.slice(0,2)}</div>
                <div className="designer-info">
                    <h6>
                        {demande.centre_medical}
                    </h6>
                 <p className="text-muted"></p>
                </div>
            </td>
            <td>{demande.patient}</td>
            <td>{demande.status=="1"?"accepte":"non accepte"}</td>
            <td>{mdate}</td>
        </tr>
       );
    }
 }
 export default DemandeItem;