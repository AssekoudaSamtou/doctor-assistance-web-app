import React from 'react';
// import Select from 'react-select';
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
                    <div id={`${this.props.name}-control`}>
                        <select 
                            className="form-control" 
                            onChange={this.handleInputChange} 
                            name={this.props.name} value={this.props.value} >

                            {this.props.selectOptions.map((option) => (
                                option.id ?<option key={option.id} value={option.id}>{option.libelle}</option>:null
                            ))}
                            
                        </select>
                        <span className="">
                        </span>
                    </div>
                }
        
                {this.props.type === "textarea" && 
                    <div id={`${this.props.name}-control`} className="controls">
                        <textarea name={this.props.name} value={this.props.value}
                            className="form-control autogrow" cols="5" 
                            style={{overflow: 'hidden', overflowWrap: 'break-word', resize: 'horizontal', height: 54+'px',}}
                            onChange={this.handleInputChange} >
        
                        </textarea>
                        <span className="">
                        </span>
                    </div>
                }
        
                {this.props.type === "date" && 
                    <div id={`${this.props.name}-control`} className="controls">
                        <input type="date" name={this.props.name} value={this.props.value} className="form-control" onChange={this.handleInputChange} />
                        <span className="">
                        </span>
                    </div>
                }
        
                {this.props.type === "file" && 
                    <div id={`${this.props.name}-control`} className="controls">
                        <input type="file" name={this.props.name} value={this.props.value} className="form-control" onChange={this.handleInputChange} />
                        <span className="">
                        </span>
                    </div>
                }
        
                {this.props.type === "password" && 
                    <div id={`${this.props.name}-control`} className="controls">
                        <input type="password" name={this.props.name} value={this.props.value} className="form-control" onChange={this.handleInputChange} />
                        <span className="">
                        </span>
                    </div>
                }
        
                {this.props.type === "text" && 
                    <div id={`${this.props.name}-control`} className="controls">
                        <input type="text" name={this.props.name} value={this.props.value} className="form-control" onChange={this.handleInputChange} aria-required="true" aria-invalid="false"/>
                        <span className="">
                        </span>
                    </div>
                }

                {this.props.type === "email" && 
                    <div id={`${this.props.name}-control`} className="controls">
                        <input type="email" name={this.props.name} value={this.props.value} className="form-control" onChange={this.handleInputChange} />
                        <span className="">
                        </span>
                    </div>
                }
            </div>
        )
    }
}

export default FormBoxItem;