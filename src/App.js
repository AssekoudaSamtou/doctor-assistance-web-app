import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";

import TopBar from './components/topBar/TopBar';
import SideBar from './components/sideBar/SideBar';
import First from './components/First/First';
import PatientList from './components/mainContent/patient/PatientList';
import AddPatient from './components/mainContent/patient/AddPatient';
import PatientDetails from './components/mainContent/patient/PatientDetails';
import Login from './components/mainContent/auth/Login';
import Register from './components/mainContent/auth/Register';
import Cookies from 'universal-cookie';
import EditPatient from './components/mainContent/patient/EditPatient';
import DoctorList from './components/mainContent/medecin/DoctorList';
import DoctorDetails from './components/mainContent/medecin/DoctorDetails';

import DoctorDashboard from './components/mainContent/dashborad/doctor/DoctorDashboard';
import HopitalList from './components/mainContent/structures_sanitaire/All';

import AddDoctor from './components/mainContent/medecin/AddDoctor';
import EditDoctor from './components/mainContent/medecin/EditDoctor';
import AddConsultation from './components/mainContent/consultation/AddConsultation';
import ConsultationList from './components/mainContent/consultation/ConsultationList';


const cookies = new Cookies();

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoginPageLoaded: false,
            isRegisterPageLoaded: false,
            loggedIn: cookies.get("token") && cookies.get("loggedUser") ? true : false
        };
        this.handleLoginPageLoaded = this.handleLoginPageLoaded.bind(this);
        this.handleRegisterPageLoaded = this.handleRegisterPageLoaded.bind(this);
        
    }

    handleLoginPageLoaded() {
        this.setState({isLoginPageLoaded: true});
    }

    handleRegisterPageLoaded() {
        this.setState({isLoginPageLoaded: true});
    }

    componentWillMount() {
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route 
                        exact path="/login"
                        render={ props => (
                            <Login onLoginPageLoaded={this.handleLoginPageLoaded} {...props} />
                        )} >
                        
                    </Route>
                    <Route 
                        exact path="/signup"
                        render={ props => (
                            <Register onLoginPageLoaded={this.handleLoginPageLoaded} {...props} />
                        )} >
                        
                    </Route>
                </Switch>

                { !this.state.isLoginPageLoaded && (
                    <div>
                        <TopBar/>
                        <div className="page-container row-fluid container-fluid">
                            <SideBar/>
                            <section id="main-content">
                                <div className="wrapper main-wrapper row">
                                    <Switch>
                                        <Route exact path={["/", "/dashboard"]}
                                            render={ props => (
                                                this.state.loggedIn ? <DoctorDashboard {...props} /> : <Redirect to="/login" />
                                            )}>
                                        </Route>

                                        <Route path="/patients">
                                            {this.state.loggedIn ? <PatientList /> : <Redirect to="/login" />}
                                        </Route>

                                        <Route 
                                            exact path={`/patients_new`}
                                            render={ props => (
                                                this.state.loggedIn ? <AddPatient {...props} /> : <Redirect to="/login" />
                                            ) } >
                                        </Route>

                                        <Route 
                                            path={`/patients_details/:id`} 
                                            render={ props => (
                                                this.state.loggedIn ? <PatientDetails {...props} /> : <Redirect to="/login" />
                                            ) } />

                                        <Route 
                                            path={`/patients_update/:id`} 
                                            render={ props => (
                                                this.state.loggedIn ? <EditPatient {...props} /> : <Redirect to="/login" />
                                            ) } />

                                        <Route path="/doctors">
                                            {this.state.loggedIn ? <DoctorList /> : <Redirect to="/login" />}
                                        </Route>
                                        <Route 
                                            exact path={`/doctors_new`}
                                            render={ props => (
                                                this.state.loggedIn ? <AddDoctor {...props} /> : <Redirect to="/login" />
                                            ) } >
                                        </Route>
                                        <Route 
                                            path={`/doctors_details/:id`} 
                                            render={ props => (
                                                this.state.loggedIn ? <DoctorDetails {...props} /> : <Redirect to="/login" />
                                            ) } />

                                        <Route 
                                            path={`/doctors_update/:id`} 
                                            render={ props => (
                                                this.state.loggedIn ? <EditDoctor {...props} /> : <Redirect to="/login" />
                                            ) } />

                                        <Route 
                                            path={`/consultations`} 
                                            render={ props => (
                                                this.state.loggedIn ? <ConsultationList {...props} /> : <Redirect to="/login" />
                                            ) } />

                                        <Route 
                                            path={`/consultation_new`} 
                                            render={ props => (
                                                this.state.loggedIn ? <AddConsultation {...props} /> : <Redirect to="/login" />
                                            ) } />
                                        
                                        <Route path="/hospitals">
                                            {this.state.loggedIn ? <HopitalList /> : <Redirect to="/login" />}
                                        </Route>

                                        <Route 
                                            exact path={`/hospitals_new`}
                                            render={ props => (
                                                this.state.loggedIn ? <AddPatient {...props} /> : <Redirect to="/login" />
                                            ) } >
                                        </Route>

                                        <Route 
                                            path={`/hospitals_details/:id`} 
                                            render={ props => (
                                                this.state.loggedIn ? <PatientDetails {...props} /> : <Redirect to="/login" />
                                            ) } />
                                    </Switch>
                                </div>
                            </section>
                        </div>
                    </div>
                )}
            </div>
        );
    }

        
}

export default App;
