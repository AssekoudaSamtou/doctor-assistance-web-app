import React, {useEffect, useState} from 'react';
import StructureSanitaire from '../../../card/StructureSanitaire';
import Cookies from 'universal-cookie';
import noItem from '../../../../data/icons/no-item2.png';

const handleOnclik = (event) => {

}

const ListeStructureSanitaire = ({filterText, liste, onClick, owned, added}) => {
    
    const filteredList = liste.filter( elt =>  {
        return !owned.includes(elt.id) && (elt.denomination.toLowerCase() + elt.adresse.toLowerCase()).indexOf(filterText.toLowerCase()) !== -1;
    })

    return (
        <div className="row">
            { filteredList.map(({denomination, adresse, id}) => (
                <div className="col-lg-3 col-xs-12" key={id}>
                    <StructureSanitaire nom={denomination} adresse={adresse} id={id} onClick={onClick} isSelected={added.includes(id)} />
                </div>
            ))}
            { filteredList.length === 0 && (
                <div>
                    <img src={noItem} style={{width: 10+'%', margin: 'auto', display: 'block'}} />
                </div>
            )}
        </div>
    )
}

export default ListeStructureSanitaire;