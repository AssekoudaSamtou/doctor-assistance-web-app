import React from 'react';

const FormBoxFooter = ({onSaveBtnTapped}) => (
    <div className="padding-bottom-30">
        <div className="text-left">
            <button type="button" className="btn btn-primary gradient-blue" onClick={onSaveBtnTapped} >Save</button>
            <button type="button" className="btn">Cancel</button>
        </div>
    </div>
)

export default FormBoxFooter;