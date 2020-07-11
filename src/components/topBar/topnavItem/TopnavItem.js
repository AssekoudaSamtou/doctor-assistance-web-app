import React from 'react';

// import {Col} from 'react-bootstrap';

import '../../../assets/css/style.css';
import '../../../assets/plugins/bootstrap/css/bootstrap.min.css';

// import hosIconSo1 from '../../data/icons/hos-icon-so1.png';

const TopnavItem = ({label, icon, isActive}) => (
    
    <li className={`topnav-item ${isActive? 'active': ''} item2`}>
        <a href="#" className="nav-link w-text">
            <i className={`fa ${icon} mr-10`}></i>{label}
        </a>
    </li>

)

export default TopnavItem;