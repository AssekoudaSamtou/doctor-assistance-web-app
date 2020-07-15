import React from 'react';

import FormBoxHeader from './FormBoxHeader';
import FormBoxItem from './FormBoxItem';
import FormBoxFooter from './FormBoxFooter';

class FormBox extends React.Component {

    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSaveBtnTapped = this.handleSaveBtnTapped.bind(this);
    }

    handleInputChange(e) {
        this.props.onInputChange(e);
    }
    handleSaveBtnTapped() {
        this.props.onSaveBtnTapped();
    }

    render() {
        return (
            <div className="col-lg-10 col-lg-offset-1 col-xs-12">
                <section className="box">
                    
                    <FormBoxHeader title={this.props.box.headerTitle} />
        
                    <div className="content-body">
                        <div className="row">
                            <div className="col-xs-12">
                                <form action="#" method="post">
                                    
                                    { this.props.box.fields.map(({type, label, description, selectOptions, name, value}) =>
                                        <FormBoxItem 
                                            type={type} 
                                            label={label} 
                                            description={description} 
                                            selectOptions={selectOptions} 
                                            onInputChange={this.handleInputChange}
                                            name={name}
                                            value={value} />
                                    )}
        
                                    <FormBoxFooter onSaveBtnTapped={this.handleSaveBtnTapped} />
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
} 

export default FormBox;