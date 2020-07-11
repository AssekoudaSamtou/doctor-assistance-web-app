import React from 'react';

import FormBoxHeader from './FormBoxHeader';
import FormBoxItem from './FormBoxItem';
import FormBoxFooter from './FormBoxFooter';

const FormBox = ({box}) => (
    <div className="col-lg-10 col-lg-offset-1 col-xs-12">
        <section className="box">
            
            <FormBoxHeader title={box.headerTitle} />

            <div className="content-body">
                <div className="row">
                    <div className="col-xs-12">
                        <form action="#" method="post">
                            { box.fields.map(({type, label, description, selectOptions}) => 
                                <FormBoxItem type={type} label={label} description={description} selectOptions={selectOptions} />
                            )}
                            {/* <FormBoxItem type="text" label="Name" />

                            <FormBoxItem type="date" label="Date of Birth" description='e.g. "04/03/2018"' />
                            
                            <FormBoxItem type="select" label="Gender" selectOptions={mySelectOptions} />
                            
                            <FormBoxItem type="file" label="Profile Image" />
                            
                            <FormBoxItem type="text" label="Name" /> */}

                            <FormBoxFooter/>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>
)

export default FormBox;