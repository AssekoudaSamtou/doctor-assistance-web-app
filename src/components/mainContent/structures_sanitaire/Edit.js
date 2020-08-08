import React from 'react';
import StructureSanitaireForm from '../dashborad/doctor/StructureSanitaireForm';
import doctorService from '../../../services/doctor.service';
import PageTitle from '../../card/PageTitle';
import AddHeader from '../../card/AddHeader';

class EditHospital extends React.Component {

    constructor(props) {
        super(props);
    }

    handleUpdateHospitalSuccess = () => {
        this.props.history.push("/hospitals/");
    }

    render() {
        const { match: { params } } = this.props;
        return (
            <div>
                <PageTitle title="Modifier Structure Sanitaire" />
                
                <div className="col-xs-12 ">
                    <AddHeader entityName="structure sanitaire" type="edit" />

                    <div className="bg-w">
                        <StructureSanitaireForm onSuccess={this.handleUpdateHospitalSuccess} id={params.id} />
                    </div>
                </div>
            </div>
        ) }
}

export default EditHospital;