import React from 'react';

const FormBoxItem = ({type, label, description, selectOptions}) => (

    <div className="form-group">
        <label className="form-label">{label}</label>
        <span className="desc">{description} </span>
        
        {type === "select" && 
            <select className="form-control">
                {selectOptions.map((option) => (
                    <option key={option.id} value={option.id}>{option.label}</option>
                ))}
            </select>
        }

        {type === "textarea" && 
            <div className="controls">
                <textarea className="form-control autogrow" cols="5" style={{overflow: 'hidden', overflowWrap: 'break-word', resize: 'horizontal', height: 54+'px',}}></textarea>
            </div>
        }

        {type === "date" && 
            <div className="controls">
                <input type="text" value="" className="form-control"/>
            </div>
        }

        {type === "file" && 
            <div className="controls">
                <input type="file" value="" className="form-control"/>
            </div>
        }

        {type === "text" && 
            <div className="controls">
                <input type="text" value="" className="form-control"/>
            </div>
        }
            
    </div>
)

export default FormBoxItem;