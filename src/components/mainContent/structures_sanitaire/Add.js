import React from 'react';
import StructureSanitaireForm from '../dashborad/doctor/StructureSanitaireForm';
import PageTitle from '../../card/PageTitle';
import AddHeader from '../../card/AddHeader';

class AddHospital extends React.Component {

    constructor(props) {
        super(props);
    }

    handleAddHospitalSuccess = () => {
        this.props.history.push("/hospitals/");
    }

    render() {

        return (
            <div>
                <PageTitle title="Nouvelle Structure Sanitaire" />
                
                <div className="col-xs-12 ">
                    <AddHeader entityName="structure sanitaire" type="add" />

                    <div className="bg-w">
                        <StructureSanitaireForm onSuccess={this.handleAddHospitalSuccess} />
                    </div>
                </div>
            </div>
        )
    }
}

export default AddHospital;