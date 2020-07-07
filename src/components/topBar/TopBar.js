import React from 'react';

// import Col from 'react-bootstrap/Col';
// import Image from 'react-bootstrap/Image';

import '../../assets/plugins/pace/pace-theme-flash.css';
import '../../assets/plugins/bootstrap/css/bootstrap.min.css';
import '../../assets/plugins/bootstrap/css/bootstrap-theme.min.css';
// import '../../assets/fonts/font-awesome/css/font-awesome.css';
import 'font-awesome/css/font-awesome.css';
import '../../assets/fonts/webfont/cryptocoins.css';
import '../../assets/css/animate.min.css';
import '../../assets/plugins/perfect-scrollbar/perfect-scrollbar.css';

import '../../assets/plugins/jvectormap/jquery-jvectormap-2.0.1.css';
import '../../assets/plugins/morris-chart/css/morris.css';
import '../../assets/plugins/calendar/fullcalendar.css';
import '../../assets/plugins/icheck/skins/minimal/minimal.css';

import '../../assets/css/style.css';
import '../../assets/css/responsive.css';

import Avatar1 from '../../data/profile/avatar-1.png'
import Avatar2 from '../../data/profile/avatar-2.png'
import Avatar3 from '../../data/profile/avatar-3.png'
import Avatar4 from '../../data/profile/avatar-4.png'
import Avatar5 from '../../data/profile/avatar-5.png'
import Profile from '../../data/profile/profile.jpg'

const TopBar = () => (
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
                    <li className="topnav-item item1">
                        <a href="#" className="new-link w-text">Schedule
                          <span className="badge badge-primary ml-5">New</span>
                        </a>
                    </li>
                    <li className="topnav-item active item2">
                        <a href="#" className="nav-link w-text">
                          <i className="fa fa-area-chart mr-10"></i>Reports
                        </a>
                    </li>
                    <li className="topnav-item item3">
                        <a href="#" className="nav-link w-text">
                          <i className="fa fa-sitemap mr-10"></i>Trading
                        </a>
                    </li>
                
                    
                    <li className="hidden-sm hidden-xs searchform showopacity">
                        <form action="#" method="post">
                            <div className="input-group">
                                <span className="input-group-addon">
                                <i className="fa fa-search"></i>
                            </span>
                                <input type="text" className="form-control animated fadeIn" placeholder="Search &amp; Enter"/>
                            </div>
                            <input type="submit" value=""/>
                        </form>
                    </li>
                </ul>
            </div>
            <div className="pull-right">
                <ul className="info-menu right-links list-inline list-unstyled">
                    <li className="notify-toggle-wrapper spec showopacity">
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
                                        {/* <!-- available: success, warning, info, error --> */}
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
                                        {/* <!-- available: success, warning, info, error --> */}
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
                                        {/* <!-- available: success, warning, info, error --> */}
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
                                        {/* <!-- available: success, warning, info, error --> */}
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
                    <li className="profile showopacity">
                        <a href="#" data-toggle="dropdown" className="toggle">
                            <img src={Profile} alt="user-image" className="img-circle img-inline"/>
                            <span>Arnold Ramsy <i className="fa fa-angle-down"></i></span>
                        </a>
                        <ul className="dropdown-menu profile animated fadeIn">
                            <li>
                                <a href="crypto-account-setting.html">
                                    <i className="fa fa-wrench"></i> Settings
                                </a>
                            </li>
                            <li>
                                <a href="crypto-profile.html">
                                    <i className="fa fa-user"></i> Profile
                                </a>
                            </li>
                            <li>
                                <a href="crypto-faq.html">
                                    <i className="fa fa-info"></i> Help
                                </a>
                            </li>
                            <li className="last">
                                <a href="crypto-login.html">
                                    <i className="fa fa-lock"></i> Logout
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>

    </div>
)

export default TopBar;