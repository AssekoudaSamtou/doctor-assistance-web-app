import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from "react-router-dom";

import TopBar from './components/topBar/TopBar';
import SideBar from './components/sideBar/SideBar';
import First from './components/First/First';
import PatientList from './components/mainContent/patient/PatientList';
import AddPatient from './components/mainContent/patient/AddPatient';
import PatientDetails from './components/mainContent/patient/PatientDetails';

function App() {

    let { path, url } = useRouteMatch();
    
    const patients = [
        {id: 1, fullname: "Sam Chris", gender:"Masculin", age: 21},
        {id: 2, fullname: "Sam Assek", gender:"Féminin", age: 21},
    ];

    return (
        <Router>
            <div className="App">

                <div className="pace pace-inactive">
                    <div id="account-pace" className="pace-progress" data-progress-text="100%" data-progress="99">
                        <div className="pace-progress-inner"></div>
                    </div>
                    <div className="pace-activity"></div>
                </div>

                <TopBar/>

                <div className="page-container row-fluid container-fluid">

                    <SideBar/>

                    <section id="main-content">
                        <div className="wrapper main-wrapper row">
                            <Switch>
                                <Route exact path={["/", "/dashboard"]} component={First}/>
                                <Route path="/patients">
                                    <PatientList patients={patients} />
                                </Route>
                                <Route path={`/patients_new`} >
                                    <AddPatient />
                                </Route>
                                <Route path={`/patients_details/:id`} >
                                    <PatientDetails />
                                </Route>
                                {/* <Route exact path="/patients/new" component={First} /> */}
                                {/* <Route path="/tutorials/:id" component={Tutorial} /> */}
                            </Switch>
                        </div>
                    </section>
                </div>

                
            </div>
        </Router>
    );
    }

export default App;
