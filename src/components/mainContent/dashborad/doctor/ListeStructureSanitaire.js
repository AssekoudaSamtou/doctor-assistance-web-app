import React, {useEffect, useState} from 'react';
import StructureSanitaire from '../../../card/StructureSanitaire';
import Cookies from 'universal-cookie';
import noItem from '../../../../data/icons/no-item3.png';
import loading from '../../../../data/icons/loading.svg';

const handleOnclik = (event) => {

}

const ListeStructureSanitaire = ({filterText, liste, onClick, owned, added}) => {
    console.log(owned);
    let filteredList = null;

    if (liste && added)
        filteredList = liste.filter( elt =>  {
            return !owned.includes(elt.id) && (elt.denomination.toLowerCase() + elt.adresse.toLowerCase()).indexOf(filterText.toLowerCase()) !== -1;
        });

    return (
        <div className="row">
            { filteredList && filteredList.map(({denomination, adresse, id}) => (
                <div className="col-lg-3 col-xs-12" key={id}>
                    <StructureSanitaire nom={denomination} adresse={adresse} id={id} onClick={onClick} isSelected={added.includes(id)} />
                </div>
            ))}

            { !filteredList && (
                <div>
                    <img src={loading} style={{width: '200px', margin: 'auto', display: 'block'}} />
                </div>
            )}
            
            { (filteredList && filteredList.length === 0) && (
                <div>
                    <img src={noItem} style={{width: '200px', margin: 'auto', display: 'block'}} />
                </div>
            )}
        </div>
    )
}

export default ListeStructureSanitaire;