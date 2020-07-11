import React from 'react';

import '../../../assets/css/style.css';
import '../../../assets/plugins/bootstrap/css/bootstrap.min.css';

const TopNavSearchForm = () => (
    
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

)

export default TopNavSearchForm;