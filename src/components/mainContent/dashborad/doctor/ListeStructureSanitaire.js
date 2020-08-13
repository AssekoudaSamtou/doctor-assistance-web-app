import React, {useEffect, useState} from 'react';
import StructureSanitaire from '../../../card/StructureSanitaire';
import Cookies from 'universal-cookie';
import noItem from '../../../../data/icons/no-item3.png';
import loading from '../../../../data/icons/loading.svg';

const handleOnclik = (event) => {

}

const ListeStructureSanitaire = ({filterText, liste, onClick, owned, added}) => {
    console.log("owned", owned);
    console.log("listee", liste);
    let filteredList = null;
    let ownedList = null;

    if (liste && added) {
        filteredList = liste.filter( elt =>  {
            return !owned.includes(elt.id) && (elt.denomination.toLowerCase() + elt.adresse.toLowerCase()).indexOf(filterText.toLowerCase()) !== -1;
        });
        ownedList = liste.filter( elt =>  {
            return owned.includes(elt.id);
        });
    }

    return (

        <div className="row">
            <div className="col-lg-6 col-xs-12" style={{boxShadow: 'inset -1px 1px 28px 13px rgba(0,0,0,.09)', borderRight: '5px solid white'}}>
                <div className="row">
                    { filteredList && filteredList.map(({denomination, adresse, id}) => (
                        <div className="col-lg-6 col-xs-12" key={id}>
                            <StructureSanitaire nom={denomination} adresse={adresse} id={id} onClick={onClick} isSelected={added.includes(id)} isOwned={false} />
                        </div>
                    ))}

                    { !filteredList && (
                        <div>
                            <img src={loading} style={{width: '200px', margin: 'auto', display: 'block'}} />
                        </div>
                    )}
                    
                    { (filteredList && filteredList.length === 0) && (
                        <div>
                            <img src={noItem} style={{width: '400px', margin: 'auto', display: 'block'}} />
                        </div>
                    )}
                </div>
            </div>
            
            
            <div className="col-lg-6 col-xs-12" style={{boxShadow: 'rgb(43 42 42) -1px 1px 6px 5px', borderLeft: '5px solid white'}}>
                <div className="list-hospital-title"></div>
                <div className="row">
                    { ownedList && ownedList.map(({denomination, adresse, id}) => (
                        <div className="col-lg-6 col-xs-12" key={id} style={{marginTop: '20px'}}>
                            <StructureSanitaire nom={denomination} adresse={adresse} id={id} onClick={onClick} isOwned={true} />
                        </div>
                    ))}

                    { !ownedList && (
                        <div>
                            <img src={loading} style={{width: '200px', margin: 'auto', display: 'block'}} />
                        </div>
                    )}
                    
                    { (ownedList && ownedList.length === 0) && (
                        <div>
                            <img src={noItem} style={{width: '400px', margin: 'auto', display: 'block'}} />
                        </div>
                    )}
                </div>
            </div>
        </div>




        // <div className="row">
        //     { filteredList && filteredList.map(({denomination, adresse, id}) => (
        //         <div className="col-lg-6 col-xs-12" key={id}>
        //             <StructureSanitaire nom={denomination} adresse={adresse} id={id} onClick={onClick} isSelected={added.includes(id)} />
        //         </div>
        //     ))}

        //     { !filteredList && (
        //         <div>
        //             <img src={loading} style={{width: '200px', margin: 'auto', display: 'block'}} />
        //         </div>
        //     )}
            
        //     { (filteredList && filteredList.length === 0) && (
        //         <div>
        //             <img src={noItem} style={{width: '400px', margin: 'auto', display: 'block'}} />
        //         </div>
        //     )}
        // </div>
    )
}

export default ListeStructureSanitaire;