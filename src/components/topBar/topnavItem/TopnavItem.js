import React from 'react';

// import {Col} from 'react-bootstrap';

import '../../../assets/css/style.css';
import '../../../assets/plugins/bootstrap/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

// import hosIconSo1 from '../../data/icons/hos-icon-so1.png';

const TopnavItem = ({label, icon, to, isActive}) => (
    
    <li className={`topnav-item ${isActive? 'active': ''} item2`}>
        <Link to={to} className="nav-link w-text">
            <i className={`fa ${icon} mr-10`}></i>{label}
        </Link>
    </li>

)

export default TopnavItem;