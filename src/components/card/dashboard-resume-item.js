import React from 'react';


const DashboardResumeItem = ({title, value, icon, footer, style}) => (
    <div className="col-lg-4" >
        <div className="dashboard-resume-item" style={{backgroundImage: style.backgroundImage, boxShadow: style.boxShadow}}>
            <div className="row">
                <div className="col-lg-8">
                    <div className="dashboard-resume-header">{title}</div>
                    <div className="h2 dashboard-resume-body">{value}</div>
                </div>
                <div className="col-lg-4">
                    <div className="dashboard-resume-icon-box">
                        <img src={icon} />
                    </div>
                    
                </div>
            </div>
            <div className="dashboard-resume-footer">{footer.label} : <span> {footer.value}</span></div>
        </div>
    </div>
)

export default DashboardResumeItem;