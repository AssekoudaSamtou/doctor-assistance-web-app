import React from 'react';

class FormBoxItem extends React.Component{

    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e) {
        this.props.onInputChange(e);
    }

    render() {
        return (
            <div className="form-group">
                <label className="form-label">{this.props.label}</label>
                <span className="desc">{this.props.description} </span>
                
                {this.props.type === "select" && 
                    <select 
                        className="form-control" 
                        onChange={this.handleInputChange} 
                        name={this.props.name} value={this.props.value} >
                        {this.props.selectOptions.map((option) => (
                            <option key={option.id} value={option.id}>{option.label}</option>
                        ))}
                    </select>
                }
        
                {this.props.type === "textarea" && 
                    <div className="controls">
                        <textarea name={this.props.name} value={this.props.value}
                            className="form-control autogrow" cols="5" 
                            style={{overflow: 'hidden', overflowWrap: 'break-word', resize: 'horizontal', height: 54+'px',}}
                            onChange={this.handleInputChange} >
        
                        </textarea>
                    </div>
                }
        
                {this.props.type === "date" && 
                    <div className="controls">
                        <input type="text" name={this.props.name} value={this.props.value} className="form-control" onChange={this.handleInputChange} />
                    </div>
                }
        
                {this.props.type === "file" && 
                    <div className="controls">
                        <input type="file" name={this.props.name} value={this.props.value} className="form-control" onChange={this.handleInputChange} />
                    </div>
                }
        
                {this.props.type === "password" && 
                    <div className="controls">
                        <input type="password" name={this.props.name} value={this.props.value} className="form-control" onChange={this.handleInputChange} />
                    </div>
                }
        
                {this.props.type === "text" && 
                    <div className="controls">
                        <input type="text" name={this.props.name} value={this.props.value} className="form-control" onChange={this.handleInputChange} />
                    </div>
                }

                {this.props.type === "email" && 
                    <div className="controls">
                        <input type="email" name={this.props.name} value={this.props.value} className="form-control" onChange={this.handleInputChange} />
                    </div>
                }
                    
            </div>
        )
    }
}

export default FormBoxItem;