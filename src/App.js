import React from 'react';

import TopBar from './components/topBar/TopBar';
import SideBar from './components/sideBar/SideBar';
import First from './components/First/First';
import PatientList from './components/mainContent/patient/PatientList';
import AddPatient from './components/mainContent/patient/AddPatient';

function App() {
    
    const patients = [
        {id: 1, fullname: "Sam Chris", gender:"Masculin", age: 21},
        {id: 2, fullname: "Sam Assek", gender:"Féminin", age: 21},
    ];

    return (
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
                    {/* <PatientList patients={patients} /> */}

                    <AddPatient/>
                </div>
            
            </section>
        </div>
        </div>
    );
    }

export default App;
