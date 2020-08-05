import React from 'react';
import { Link } from 'react-router-dom';


const TopnavItem = ({label, icon, to, isActive}) => (
    
    <li className={`topnav-item ${isActive? 'active': ''} item2`}>
        <Link to={to} className="nav-link w-text">
            <i className={`fa ${icon} mr-10`}></i>{label}
        </Link>
    </li>

)

export default TopnavItem;