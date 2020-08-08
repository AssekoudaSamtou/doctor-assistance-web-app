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
import {GIRL_AVATAR, BOY_AVATAR} from '../../utils';

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
                        
                        
                        { user && (
                        <li className="profile showopacity">
                                <a href="#" data-toggle="dropdown" className="toggle">
                                    <img className="img-circle img-inline" src={user.genre === "M" ? BOY_AVATAR : GIRL_AVATAR}/>
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