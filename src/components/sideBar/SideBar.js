import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from "react-router-dom";

import icon1 from '../../data/hos-dash/icons/1.png';
import icon2 from '../../data/hos-dash/icons/2.png';
import icon3 from '../../data/hos-dash/icons/3.png';
import icon4 from '../../data/hos-dash/icons/4.png';
import icon5 from '../../data/hos-dash/icons/5.png';
import icon6 from '../../data/hos-dash/icons/6.png';
import icon7 from '../../data/hos-dash/icons/7.png';
import icon9 from '../../data/hos-dash/icons/9.png';
import icon10 from '../../data/hos-dash/icons/10.png';
import icon11 from '../../data/hos-dash/icons/11.png';

import icon13 from '../../data/crypto-dash/icons/13.png';
import icon14 from '../../data/crypto-dash/icons/14.png';
import icon15 from '../../data/crypto-dash/icons/15.png';
import icon16 from '../../data/crypto-dash/icons/16.png';
import icon17 from '../../data/crypto-dash/icons/17.png';
import icon18 from '../../data/crypto-dash/icons/18.png';
import icon19 from '../../data/crypto-dash/icons/19.png';
import icon20 from '../../data/crypto-dash/icons/20.png';

const SideBar = () => {
    
    let { path, url } = useRouteMatch();

    return (
        <div className="page-sidebar fixedscroll">
            <div className="page-sidebar-wrapper ps-container ps-active-y" id="main-menu-wrapper">
                <ul className="wraplist" style={{height: 'auto'}}>
                    <li className="menusection">Main</li>
                    <li className="">
                        <Link to={"/dashboard"}>
                            <i className="img">
                                <img src={icon1} alt="" className="width-20"/>
                            </i>
                            <span className="title">Dashboard</span>
                        </Link>
                    </li>
                    <li className="">
                        <a href="/patients">
                            <i className="img">
                                <img src={icon3} alt="" className="width-20"/>
                            </i>
                            <span className="title">Patient Dashboard</span>
                        </a>
                    </li>
                    <li className="">
                        <a href="hos-doctor-dash.html">
                            <i className="img">
                                <img src={icon4} alt="" className="width-20"/>
                            </i>
                            <span className="title">Doctor Dashboard</span>
                        </a>
                    </li>
                    <li className="">
                        <a href="javascript:;">
                            <i className="img">
                                <img src={icon2} alt="" className="width-20"/>
                            </i>
                            <span className="title">Doctors</span>
                            <span className="arrow "></span>
                        </a>
                        <ul className="sub-menu" wfd-invisible="true">
                            <li>
                                <Link to={"/doctors"}>
                                    All Doctors
                                </Link>
                            </li>
                            <li>
                                <Link to={"/doctors_new"}>
                                    Add Doctor
                                </Link>
                            </li>
                        </ul>
                        <ul className="sub-menu" wfd-invisible="true">
                            <li>
                                <Link to={"/doctors"}>
                                    All Doctors
                                </Link>
                            </li>
                            <li>
                                <Link to={"/doctors_new"}>
                                    Add Doctor
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li className="">
                        <a href="javascript:;">
                            <i className="img">
                                <img src={icon2} alt="" className="width-20"/>
                            </i>
                            <span className="title">Consultations</span>
                            <span className="arrow "></span>
                        </a>
                        
                        <ul className="sub-menu" wfd-invisible="true">
                            <li>
                                <Link to={"/consultations"}>
                                    All Consultations
                                </Link>
                            </li>
                            <li>
                                <Link to={"/consultation_new"}>
                                    Add Consultation
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li className="">
                        <a href="javascript:;">
                            <i className="img">
                                <img src={icon5} alt="" className="width-20"/>
                            </i>
                            <span className="title">Patients</span>
                            <span className="arrow "></span>
                        </a>
                        <ul className="sub-menu" wfd-invisible="true">
                            <li>
                                <Link to={"/patients"}>
                                    All Patients
                                </Link>
                            </li>
                            <li>
                                <Link to={"/patients_new"}>
                                    Add Patient
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="">
                        <a href="javascript:;">
                            <i className="img">
                                <img src={icon6} alt="" className="width-20"/>
                            </i>
                            <span className="title">Appointments</span>
                            <span className="arrow"></span>
                        </a>
                        <ul className="sub-menu" wfd-invisible="true">
                            <li>
                                <a className="" href="hos-schedule.html">Doctor Schedule</a>
                            </li>
                            <li>
                                <a className="" href="hos-book-appointment.html">Book Appointment</a>
                            </li>
                        </ul>
                    </li>
                    <li className="">
                        <a href="javascript:;">
                            <i className="img">
                                <img src={icon7} alt="" className="width-20"/>
                            </i>
                            <span className="title">Billing</span>
                            <span className="arrow "></span>
                        </a>
                        <ul className="sub-menu" wfd-invisible="true">
                            <li>
                                <a className="" href="hos-payment.html">Payments</a>
                            </li>
                            <li>
                                <a className="" href="hos-add-payment.html">Add Payment</a>
                            </li>
                            <li>
                                <a className="" href="hos-patient-invoice.html">Patient Invoice</a>
                            </li>
                        </ul>
                    </li>
                    <li className="">
                        <a href="hos-events.html">
                            <i className="img">
                                <img src={icon9} alt="" className="width-20"/>
                            </i>
                            <span className="title">Event Management</span>
                        </a>
                    </li>
                    
                    <li className="">
                        <a href="javascript:;">
                            <i className="img">
                                <img src={icon10} alt="" className="width-20"/>
                            </i>
                            <span className="title">Access Pages</span>
                            <span className="arrow "></span>
                        </a>
                        <ul className="sub-menu" wfd-invisible="true">
                            <li>
                                <a className="" href="ui-login.html">Login</a>
                            </li>
                            <li>
                                <a className="" href="ui-register.html">Registration</a>
                            </li>
                            <li>
                                <a className="" href="ui-404.html">404</a>
                            </li>
                        </ul>
                    </li>
                    <li className="">
                        <a href="javascript:;">
                            <i className="img">
                                <img src={icon11} alt="" className="width-20"/>
                            </i>
                            <span className="title">Support</span>
                            <span className="arrow "></span>
                        </a>
                        <ul className="sub-menu" wfd-invisible="true">
                            <li>
                                <a className="" href="hos-faq.html">FAQ</a>
                            </li>
                            <li>
                                <a className="" href="hos-support.html">Help center</a>
                            </li>
                        </ul>
                    </li>
                    <li className="menusection">Data Visualization</li>
                    <li className="">
                        <a href="javascript:;">
                            <i className="img">
                                <img src={icon16} alt="" className="width-20"/>
                            </i>
                            <span className="title">Echarts</span>
                            <span className="arrow "></span>
                        </a>
                        <ul className="sub-menu" wfd-invisible="true">
                            <li>
                                <a className="" href="charts-echart-line.html">Line &amp; Area Charts</a>
                            </li>
                            <li>
                                <a className="" href="charts-echart-bar.html">Bar &amp; Stacked Charts</a>
                            </li>
                        </ul>
                    </li>
                    <li className="">
                        <a href="javascript:;">
                            <i className="img">
                                <img src={icon17} alt="" className="width-20"/>
                            </i>
                            <span className="title">Morris Charts</span>
                            <span className="arrow "></span>
                        </a>
                        <ul className="sub-menu" wfd-invisible="true">
                            <li>
                                <a className="" href="charts-morris-line.html">Line Charts</a>
                            </li>
                            <li>
                                <a className="" href="charts-morris-bar.html">Bar &amp; Stacked Charts</a>
                            </li>
                            <li>
                                <a className="" href="charts-morris-area.html">Area Charts</a>
                            </li>
                            <li>
                                <a className="" href="charts-morris-pie.html">Pie Charts</a>
                            </li>
                        </ul>
                    </li>
                    <li className="">
                        <a href="javascript:;">
                            <i className="img">
                                <img src={icon18} alt="" className="width-20"/>
                            </i>
                            <span className="title">Charts JS</span>
                            <span className="arrow"></span>
                        </a>
                        <ul className="sub-menu" wfd-invisible="true">
                            <li>
                                <a className="" href="charts-chartjs-line.html">Line Charts</a>
                            </li>
                            <li>
                                <a className="" href="charts-chartjs-bar.html">Bar Charts</a>
                            </li>
                            <li>
                                <a className="" href="charts-chartjs-pie-donut.html">Pie &amp; Donut</a>
                            </li>
                        </ul>
                    </li>
                    <li className="">
                        <a href="javascript:;">
                            <i className="img">
                                <img src={icon19} alt="" className="width-20"/>
                            </i>
                            <span className="title">Flot Charts</span>
                            <span className="arrow open"></span>
                        </a>
                        <ul className="sub-menu" wfd-invisible="true">
                            <li>
                                <a className="" href="charts-flot-area.html">Area Charts</a>
                            </li>
                            <li>
                                <a className="" href="charts-flot-line.html">Line Charts</a>
                            </li>
                        </ul>
                    </li>
                    <li className="">
                        <a href="javascript:;">
                            <i className="img">
                                <img src={icon20} alt="" className="width-20"/>
                            </i>
                            <span className="title">Sparkline Charts</span>
                            <span className="arrow "></span>
                        </a>
                        <ul className="sub-menu" wfd-invisible="true">
                            <li>
                                <a className="" href="charts-sparkline-line.html">Line &amp; Area Charts</a>
                            </li>
                            <li>
                                <a className="" href="charts-sparkline-bar.html">Bar Charts</a>
                            </li>
                            <li>
                                <a className="" href="charts-sparkline-composite.html">Composite Charts</a>
                            </li>
                        </ul>
                    </li>
                    
                    <li className="menusection">User Interface</li>
                    <li className="">
                        <a href="javascript:;"> 
                        <i className="img">
                            <img src={icon13} alt="" className="width-20"/>
                        </i>
                        <span className="title">Ui Elements</span> <span className="arrow "></span> </a>
                        <ul className="sub-menu" wfd-invisible="true">
                            

                            <li className="">
                                <a href="javascript:;"><span className="title">Timeline</span> <span className="arrow "></span> </a>
                                <ul className="sub-menu">
                                    <li>
                                        <a className="" href="ui-timeline-centered.html">Centered timeline</a>
                                    </li>
                                    <li>
                                        <a className="" href="ui-timeline-left.html">Left Aligned timeline</a>
                                    </li>
                                </ul>
                            </li>
                            <li className="">
                                <a href="javascript:;"><span className="title">Pricing Tables</span> <span className="arrow "></span> </a>
                                <ul className="sub-menu">
                                    <li>
                                        <a className="" href="ui-pricing-expanded.html">Expanded</a>
                                    </li>
                                    <li>
                                        <a className="" href="ui-pricing-narrow.html">Narrow</a>
                                    </li>
                                </ul>
                            </li>
                            <li className="">
                                <a href="javascript:;"><span className="title">Icon Sets</span> <span className="arrow "></span> </a>
                                <ul className="sub-menu">
                                    <li>
                                        <a className="" href="ui-icons.html">Icon Styles</a>
                                    </li>
                                    <li>
                                        <a className="" href="ui-fontawesome.html">Font Awesome</a>
                                    </li>
                                    <li>
                                        <a className="" href="ui-glyphicons.html">Glyph Icons</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="javascript:;"><span className="title">Form Elements</span> <span className="arrow "></span> </a>
                                <ul className="sub-menu">
                                    <li>
                                        <a className="" href="form-elements.html">Field Elements</a>
                                    </li>
                                    <li>
                                        <a className="" href="form-elements-premade.html">Pre Made Forms</a>
                                    </li>
                                    <li>
                                        <a className="" href="form-elements-icheck.html">Checkbox &amp; Radio</a>
                                    </li>
                                    <li>
                                        <a className="" href="form-elements-grid.html">Form Grid</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="form-wizard.html"> <span className="title">Form Wizard</span> </a>
                            </li>
                            <li>
                                <a href="form-validation.html"> <span className="title">Form Validations</span> </a>
                            </li>
                            
                        </ul>
                    </li>
                    
                    <li className="">
                        <a href="javascript:;">
                            <i className="img">
                            <img src={icon14} alt="" className="width-20"/>
                        </i>
                            <span className="title">Components</span>
                            <span className="arrow "></span>
                        </a>
                        <ul className="sub-menu" wfd-invisible="true">
                            <li>
                                <a className="" href="ui-tabs.html">Tabs</a>
                            </li>
                            <li>
                                <a className="" href="ui-accordion.html">Accordions</a>
                            </li>
                            <li>
                                <a className="" href="ui-progress.html">Progress Bars</a>
                            </li>
                            <li>
                                <a className="" href="ui-buttons.html">Buttons</a>
                            </li>
                            <li>
                                <a className="" href="ui-modals.html">Modals</a>
                            </li>
                            <li>
                                <a className="" href="ui-alerts.html">Alerts</a>
                            </li>
                            <li>
                                <a className="" href="ui-notifications.html">Notifications</a>
                            </li>
                            <li>
                                <a className="" href="ui-tooltips.html">Tooltips</a>
                            </li>
                            <li>
                                <a className="" href="ui-popovers.html">Popovers</a>
                            </li>
                            <li>
                                <a className="" href="ui-navbars.html">Navbars</a>
                            </li>
                            <li>
                                <a className="" href="ui-dropdowns.html">Dropdowns</a>
                            </li>
                            <li>
                                <a className="" href="ui-breadcrumbs.html">Breadcrumbs</a>
                            </li>
                            <li>
                                <a className="" href="ui-pagination.html">Pagination</a>
                            </li>
                            <li>
                                <a className="" href="ui-labels-badges.html">Labels &amp; Badges</a>
                            </li>
                        </ul>
                    </li>

                    <li className="">
                        <a href="javascript:;">
                            <i className="img">
                                <img src={icon15} alt="" className="width-20"/>
                            </i>
                            <span className="title">Appearance</span>
                            <span className="arrow "></span>
                        </a>
                        <ul className="sub-menu" wfd-invisible="true">
                            <li>
                                <a className="" href="ui-typography.html">Typography</a>
                            </li>
                            <li>
                                <a className="" href="ui-grids.html">Grids</a>
                            </li>
                            <li>
                                <a className="" href="ui-panels.html">Draggable Panels</a>
                            </li>
                            <li>
                                <a className="" href="ui-group-list.html">Group Listing</a>
                            </li>
                        </ul>
                    </li>

                </ul>

                <div className="ps-scrollbar-x-rail" style={{left: 0+'px', bottom: 3+'px'}} wfd-invisible="true">
                    <div className="ps-scrollbar-x" style={{left: 0+'px', width: 0+'px'}}></div>
                </div>

                <div className="ps-scrollbar-y-rail" style={{top: 0+'px', height: 516+'px', right: 3+'px'}}>
                    <div className="ps-scrollbar-y" style={{top: 0+'px', height: 293+'px'}}></div>
                </div>
            </div>
        </div>
    )
}

export default SideBar;