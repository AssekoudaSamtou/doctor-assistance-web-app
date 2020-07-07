import React from 'react'

// import 'bootstrap/dist/css/bootstrap.css';
import '../../assets/css/style.css';
import '../../assets/plugins/bootstrap/css/bootstrap.min.css';

import hosIconSo1 from '../../data/icons/hos-icon-so1.png';

const First = () => (
    <div class="col-lg-3 col-sm-6 col-xs-12">
        <div class="r4_counter db_box">
            <i class="pull-left ico-icon icon-md icon-primary mt-10">
                <img src={hosIconSo1} class="ico-icon-o" alt=""/>
            </i>
            <div class="stats">
                <h3 class="mb-5">200 Bed</h3>
                <span>Total Hospital Beds </span>
            </div>
        </div>
    </div>
)

export default First;