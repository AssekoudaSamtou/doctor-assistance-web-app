import React from 'react';

const AddHeader = ({entityName,  type}) => (
    <div className="add-header-wrapper gradient-blue curved-section text-center">
        <h2 className="uppercase bold w-text">  {entityName}</h2>
        <div className="before-text"> {entityName}</div>
        {/* <p className="g-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto magni consequatur excepturi ab veritatis id facere facilis tempora sit amet, consectetur adipisicing elit. Iusto magni.</p> */}
    </div>
)

export default AddHeader;