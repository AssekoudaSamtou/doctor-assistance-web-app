import React from 'react';
import {Link} from 'react-router-dom';


const NotFound = () => (
    <div className="container-fluid">
        <div className="row">
            <div className="col-lg-12">
                <section className="box nobox">
                    <div className="content-body">
                        <div className="row">
                            <div className="col-xs-12">

                                <h1 className="page_error_code text-primary">404</h1>
                                <h1 className="page_error_info">Oops! Page Not Found</h1>
                                <div className="row">
                                    <div className="col-md-offset-3 col-sm-offset-3 col-xs-offset-2 col-xs-8 col-sm-6">
                                        <div className="text-center page_error_btn">
                                        <Link to={"/"}>
                                                <a className="btn btn-primary btn-lg">
                                                    <i className="fa fa-location-arrow"></i> &nbsp; Back to Home
                                                </a>
                                        </Link>
                                            
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
)

export default NotFound;