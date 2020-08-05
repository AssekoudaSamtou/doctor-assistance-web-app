import React from 'react';
import Calendar from 'tui-calendar';
// import Calendar from '@toast-ui/react-calendar';
// import "tui-calendar/dist/tui-calendar.css";

// import 'tui-date-picker/dist/tui-date-picker.css';
// import 'tui-time-picker/dist/tui-time-picker.css';


class Schedule extends React.Component {

    calendarRef = React.createRef();

    handleClickNextButton = () => {
        const calendarInstance = this.calendarRef.current.getInstance();
        calendarInstance.next();
    };

    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    componentWillMount() {
        
    }

    render() {
        
        return (
            <div>
                <div id="lnb">
                    <div className="lnb-new-schedule">
                        <button id="btn-new-schedule" type="button" className="btn btn-default btn-block lnb-new-schedule-btn" data-toggle="modal">
                            New schedule</button>
                    </div>
                    <div id="lnb-calendars" className="lnb-calendars">
                        <div>
                            <div className="lnb-calendars-item">
                                <label>
                                    <input className="tui-full-calendar-checkbox-square" type="checkbox" value="all" checked/>
                                    <span></span>
                                    <strong>View all</strong>
                                </label>
                            </div>
                        </div>
                        <div id="calendarList" className="lnb-calendars-d1">
                        </div>
                    </div>
                    <div className="lnb-footer">
                        © NHN Corp.
                    </div>
                </div>
                <div id="right">
                    <div id="menu">
                        <span className="dropdown">
                            <button id="dropdownMenu-calendarType" className="btn btn-default btn-sm dropdown-toggle" type="button" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="true">
                                <i id="calendarTypeIcon" className="calendar-icon ic_view_month" style={{marginRight: 4+'px'}}></i>
                                <span id="calendarTypeName">Dropdown</span>&nbsp;
                                <i className="calendar-icon tui-full-calendar-dropdown-arrow"></i>
                            </button>
                            <ul className="dropdown-menu" role="menu" aria-labelledby="dropdownMenu-calendarType">
                                <li role="presentation">
                                    <a className="dropdown-menu-title" role="menuitem" data-action="toggle-daily">
                                        <i className="calendar-icon ic_view_day"></i>Daily
                                    </a>
                                </li>
                                <li role="presentation">
                                    <a className="dropdown-menu-title" role="menuitem" data-action="toggle-weekly">
                                        <i className="calendar-icon ic_view_week"></i>Weekly
                                    </a>
                                </li>
                                <li role="presentation">
                                    <a className="dropdown-menu-title" role="menuitem" data-action="toggle-monthly">
                                        <i className="calendar-icon ic_view_month"></i>Month
                                    </a>
                                </li>
                                <li role="presentation">
                                    <a className="dropdown-menu-title" role="menuitem" data-action="toggle-weeks2">
                                        <i className="calendar-icon ic_view_week"></i>2 weeks
                                    </a>
                                </li>
                                <li role="presentation">
                                    <a className="dropdown-menu-title" role="menuitem" data-action="toggle-weeks3">
                                        <i className="calendar-icon ic_view_week"></i>3 weeks
                                    </a>
                                </li>
                                <li role="presentation" className="dropdown-divider"></li>
                                <li role="presentation">
                                    <a role="menuitem" data-action="toggle-workweek">
                                        <input type="checkbox" className="tui-full-calendar-checkbox-square" value="toggle-workweek" checked/>
                                        <span className="checkbox-title"></span>Show weekends
                                    </a>
                                </li>
                                <li role="presentation">
                                    <a role="menuitem" data-action="toggle-start-day-1">
                                        <input type="checkbox" className="tui-full-calendar-checkbox-square" value="toggle-start-day-1"/>
                                        <span className="checkbox-title"></span>Start Week on Monday
                                    </a>
                                </li>
                                <li role="presentation">
                                    <a role="menuitem" data-action="toggle-narrow-weekend">
                                        <input type="checkbox" className="tui-full-calendar-checkbox-square" value="toggle-narrow-weekend"/>
                                        <span className="checkbox-title"></span>Narrower than weekdays
                                    </a>
                                </li>
                            </ul>
                        </span>
                        <span id="menu-navi">
                            <button type="button" className="btn btn-default btn-sm move-today" data-action="move-today">Today</button>
                            <button type="button" className="btn btn-default btn-sm move-day" data-action="move-prev">
                                <i className="calendar-icon ic-arrow-line-left" data-action="move-prev"></i>
                            </button>
                            <button type="button" className="btn btn-default btn-sm move-day" data-action="move-next">
                                <i className="calendar-icon ic-arrow-line-right" data-action="move-next"></i>
                            </button>
                        </span>
                        <span id="renderRange" className="render-range"></span>
                    </div>
                    <div id="calendar"></div>
                </div>
            </div>
        )
    }
}

export default Schedule;