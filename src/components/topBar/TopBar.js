import React, {useState} from 'react';

import Avatar1 from '../../data/profile/avatar-1.png'
import Avatar2 from '../../data/profile/avatar-2.png'
import Avatar3 from '../../data/profile/avatar-3.png'
import Avatar4 from '../../data/profile/avatar-4.png'
import Avatar5 from '../../data/profile/avatar-5.png'
import Profile from '../../data/profile/profile.jpg'

import TopnavItem from './topnavItem/TopnavItem';
import TopNavSearchForm from './topnavSearchForm/TopNavSearchForm';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';

const cookies = new Cookies();

const TopBar = () => {
    const user = cookies.get("loggedUser");
    const [items, setItems] = useState([false, false, false]);

    const logout = () => {
        cookies.remove("loggedUser");
        cookies.remove("token");
        cookies.remove("userType");
        window.location.href =  "login";
    }

    const makeActive = (id) => {
        console.log("cli", id);
        var tmp = [false, false, false];
        tmp[id] = true;
        setItems(tmp);
    }

    return (
        <div className="page-topbar gradient-blue1">
            <div className="logo-area crypto">

            </div>
            <div className="quick-area">
                <div className="pull-left">
                    <ul className="info-menu left-links list-inline list-unstyled">
                        
                        <li className="sidebar-toggle-wrap">
                            <a href="#" data-toggle="sidebar" className="sidebar_toggle">
                                <i className="fa fa-bars"></i>
                            </a>
                        </li>

                        <TopnavItem label="Mon Planning" icon="fa-calendar-alt" to="/schedules/" isActive={items[0]} id={0} onClick={makeActive} />
                        {/* <TopnavItem label="Reports" icon="fa-area-chart" to="#" isActive={false}/> */}
                        <TopnavItem label="Mes Patients" icon="fa-users" to="/patients/" isActive={items[1]} id={1} onClick={makeActive}/>
                        <TopnavItem label="Mes Hopitaux" icon="fa-hospital" to="/hospitals/" isActive={items[2]} id={2} onClick={makeActive}/>
                        
                        {/* <TopNavSearchForm/> */}

                    </ul>
                </div>
                <div className="pull-right">
                    <ul className="info-menu right-links list-inline list-unstyled">
                        <li className="notify-toggle-wrapper spec showopacity" style={{marginRight: '40px'}}>
                            <a href="#" data-toggle="dropdown" className="toggle">
                                <i className="fa fa-plus"></i>
                            </a>
                            <ul className="dropdown-menu profile animated fadeIn" style={{ left:-20+'px'}}>
                                
                                <li>
                                    <Link to="/patients_new">
                                        <i className="fa fa-user"></i> Patient
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/hospitals_new">
                                        <i className="fas fa-hospital"></i> Hopital
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#">
                                        <i className="fa fa-book"></i> Consultation
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        
                        {/* <li className="notify-toggle-wrapper spec showopacity">
                            <a href="#" data-toggle="dropdown" className="toggle">
                                <i className="fa fa-bell"></i>
                                <span className="badge badge-accent">3</span>
                            </a>
                            <ul className="dropdown-menu notifications animated fadeIn">
                                <li className="total">
                                    <span className="small">
                                        You have <strong>3</strong> new notifications.
                                        <a href="javascript:;" className="pull-right">Mark all as Read</a>
                                    </span>
                                </li>
                                <li className="list ps-container">

                                    <ul className="dropdown-menu-list list-unstyled ps-scrollbar">
                                        <li className="unread available">
                                            <a href="javascript:;">
                                                <div className="notice-icon">
                                                    <i className="fa fa-check"></i>
                                                </div>
                                                <div>
                                                    <span className="name">
                                                        <strong>Successful transaction of 0.01 BTC</strong>
                                                        <span className="time small">15 mins ago</span>
                                                    </span>
                                                </div>
                                            </a>
                                        </li>
                                        <li className="unread away">
                                            <a href="javascript:;">
                                                <div className="notice-icon">
                                                    <i className="fa fa-clock-o"></i>
                                                </div>
                                                <div>
                                                    <span className="name">
                                                        <strong>4 of Pending Transactions!</strong>
                                                        <span className="time small">45 mins ago</span>
                                                    </span>
                                                </div>
                                            </a>
                                        </li>
                                        <li className=" busy">
                                            <a href="javascript:;">
                                                <div className="notice-icon">
                                                    <i className="fa fa-times"></i>
                                                </div>
                                                <div>
                                                    <span className="name">
                                                        <strong>Cancelled Order of 200 ICO</strong>
                                                        <span className="time small">1 hour ago</span>
                                                    </span>
                                                </div>
                                            </a>
                                        </li>
                                    
                                        <li className=" available">
                                            <a href="javascript:;">
                                                <div className="notice-icon">
                                                    <i className="fa fa-check"></i>
                                                </div>
                                                <div>
                                                    <span className="name">
                                                        <strong>Great Speed Notify of 1.34 LTC</strong>
                                                        <span className="time small">14th Mar</span>
                                                    </span>
                                                </div>
                                            </a>
                                        </li>

                                    </ul>

                                    <div className="ps-scrollbar-x-rail" style={{left: 0, bottom: 3+'px'}}>
                                        <div className="ps-scrollbar-x" style={{left: 0, width: 0+'px'}}></div>
                                    </div>
                                    <div className="ps-scrollbar-y-rail" style={{left: 0, right: 3+'px'}}>
                                        <div className="ps-scrollbar-y" style={{top: 0, height: 0+'px'}}></div>
                                    </div>
                                </li>

                                <li className="external">
                                    <a href="javascript:;">
                                        <span>Read All Notifications</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="message-toggle-wrapper spec showopacity">
                            <a href="#" data-toggle="dropdown" className="toggle mr-15">
                                <i className="fa fa-envelope"></i>
                                <span className="badge badge-accent">7</span>
                            </a>
                            <ul className="dropdown-menu messages animated fadeIn">

                                <li className="list ps-container">

                                    <ul className="dropdown-menu-list list-unstyled ps-scrollbar">
                                        <li className="unread status-available">
                                            <a href="javascript:;">
                                                <div className="user-img">
                                                    <img src={Avatar1} alt="user-image" className="img-circle img-inline"/>
                                                </div>
                                                <div>
                                                    <span className="name">
                                                        <strong>Clarine Vassar</strong>
                                                        <span className="time small">- 15 mins ago</span>
                                                    <span className="profile-status available pull-right"></span>
                                                    </span>
                                                    <span className="desc small">
                                                        Lorem ipsum dolor sit elit fugiat molest.
                                                    </span>
                                                </div>
                                            </a>
                                        </li>
                                        <li className=" status-away">
                                            <a href="javascript:;">
                                                <div className="user-img">
                                                    <img src={Avatar2} alt="user-image" className="img-circle img-inline"/>
                                                </div>
                                                <div>
                                                    <span className="name">
                                                        <strong>Brooks Latshaw</strong>
                                                        <span className="time small">- 45 mins ago</span>
                                                    <span className="profile-status away pull-right"></span>
                                                    </span>
                                                    <span className="desc small">
                                                        Lorem ipsum dolor sit elit fugiat molest.
                                                    </span>
                                                </div>
                                            </a>
                                        </li>
                                        <li className=" status-busy">
                                            <a href="javascript:;">
                                                <div className="user-img">
                                                    <img src={Avatar3} alt="user-image" className="img-circle img-inline"/>
                                                </div>
                                                <div>
                                                    <span className="name">
                                                        <strong>Clementina Brodeur</strong>
                                                        <span className="time small">- 1 hour ago</span>
                                                    <span className="profile-status busy pull-right"></span>
                                                    </span>
                                                    <span className="desc small">
                                                        Lorem ipsum dolor sit elit fugiat molest.
                                                    </span>
                                                </div>
                                            </a>
                                        </li>
                                        <li className=" status-offline">
                                            <a href="javascript:;">
                                                <div className="user-img">
                                                    <img src={Avatar4} alt="user-image" className="img-circle img-inline"/>
                                                </div>
                                                <div>
                                                    <span className="name">
                                                        <strong>Carri Busey</strong>
                                                        <span className="time small">- 5 hours ago</span>
                                                    <span className="profile-status offline pull-right"></span>
                                                    </span>
                                                    <span className="desc small">
                                                        Lorem ipsum dolor sit elit fugiat molest.
                                                    </span>
                                                </div>
                                            </a>
                                        </li>
                                        <li className=" status-offline">
                                            <a href="javascript:;">
                                                <div className="user-img">
                                                    <img src={Avatar5} alt="user-image" className="img-circle img-inline"/>
                                                </div>
                                                <div>
                                                    <span className="name">
                                                        <strong>Melissa Dock</strong>
                                                        <span className="time small">- Yesterday</span>
                                                    <span className="profile-status offline pull-right"></span>
                                                    </span>
                                                    <span className="desc small">
                                                        Lorem ipsum dolor sit elit fugiat molest.
                                                    </span>
                                                </div>
                                            </a>
                                        </li>
                                        <li className=" status-available">
                                            <a href="javascript:;">
                                                <div className="user-img">
                                                    <img src={Avatar1} alt="user-image" className="img-circle img-inline"/>
                                                </div>
                                                <div>
                                                    <span className="name">
                                                        <strong>Verdell Rea</strong>
                                                        <span className="time small">- 14th Mar</span>
                                                    <span className="profile-status available pull-right"></span>
                                                    </span>
                                                    <span className="desc small">
                                                        Lorem ipsum dolor sit elit fugiat molest.
                                                    </span>
                                                </div>
                                            </a>
                                        </li>
                                        <li className=" status-busy">
                                            <a href="javascript:;">
                                                <div className="user-img">
                                                    <img src={Avatar2} alt="user-image" className="img-circle img-inline"/>
                                                </div>
                                                <div>
                                                    <span className="name">
                                                        <strong>Linette Lheureux</strong>
                                                        <span className="time small">- 16th Mar</span>
                                                    <span className="profile-status busy pull-right"></span>
                                                    </span>
                                                    <span className="desc small">
                                                        Lorem ipsum dolor sit elit fugiat molest.
                                                    </span>
                                                </div>
                                            </a>
                                        </li>
                                        <li className=" status-away">
                                            <a href="javascript:;">
                                                <div className="user-img">
                                                    <img src={Avatar3} alt="user-image" className="img-circle img-inline"/>
                                                </div>
                                                <div>
                                                    <span className="name">
                                                        <strong>Araceli Boatright</strong>
                                                        <span className="time small">- 16th Mar</span>
                                                    <span className="profile-status away pull-right"></span>
                                                    </span>
                                                    <span className="desc small">
                                                        Lorem ipsum dolor sit elit fugiat molest.
                                                    </span>
                                                </div>
                                            </a>
                                        </li>

                                    </ul>

                                    <div className="ps-scrollbar-x-rail" style={{left: 0, bottom: 0+'px'}}>
                                        <div className="ps-scrollbar-x" style={{left: 0, width: 0}}></div>
                                    </div>
                                    <div className="ps-scrollbar-y-rail" style={{top: 0, right: 3+'px'}}>
                                        <div className="ps-scrollbar-y" style={{top: 0, height: 0}}></div>
                                    </div>
                                </li>

                                <li className="external">
                                    <a href="javascript:;">
                                        <span>Read All Messages</span>
                                    </a>
                                </li>
                            </ul>

                        </li>
                         */}
                        { user && (
                        <li className="profile showopacity">
                                <a href="#" data-toggle="dropdown" className="toggle">
                                    <img src={Profile} alt="user-image" className="img-circle img-inline"/>
                                    <span>@{user.username} <i className="fa fa-angle-down"></i></span>
                                </a>
                                <ul className="dropdown-menu profile animated fadeIn">
                                    <li>
                                        <a href="crypto-profile.html">
                                            <i className="fas fa-id-badge"></i> Profile
                                        </a>
                                    </li>
                                    <li className="">
                                        <a onClick={logout} style={{cursor : 'pointer'}}>
                                            <i className="fas fa-sign-out-alt"></i> Logout
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        )}
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default TopBar;