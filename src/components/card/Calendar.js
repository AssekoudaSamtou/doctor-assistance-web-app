import React from "react";
import {WEEKDAYS, MONTHS} from "../../utils";
import CustomSelect from "./CustomSelect";

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dates: [[], [], []],
            currentMonth: (new Date()).getMonth(),
            currentYear: (new Date()).getFullYear(),
            showNewAppointmentModal: true,
        };
        
        this.getDatesArray = this.getDatesArray.bind(this);
        this.showNextMonth = this.showNextMonth.bind(this);
        this.showPreviousMonth = this.showPreviousMonth.bind(this);
        this.toggleAppointmentModal = this.toggleAppointmentModal.bind(this);
        this.handleAppointmentModalClick = this.handleAppointmentModalClick.bind(this);
    }

    getDatesArray() {
        console.log(this.state.currentMonth);
        var start = new Date();
        start.setMonth(this.state.currentMonth);
        start.setFullYear(this.state.currentYear);
        var end = new Date(start);

        start.setDate(1);
        end.setDate(1);
        end.setMonth(end.getMonth() + 1)
        end.setDate(end.getDate() - 1);

        var days = [[], [], []];

        var d = new Date(start);
        while(d.getDay() > 1) {
            d.setDate(d.getDate()-1);
            days[0].push(d.getDate());
        }

        days[0] = days[0].reverse();

        for (let i = 0; i < end.getDate(); i++) {
            days[1].push(i+1);
        }

        d = new Date(end);
        while(d.getDay() !== 0) {
            d.setDate(d.getDate()+1);
            days[2].push(d.getDate());
        }
        
        this.setState({dates: days});
    }

    componentWillMount() {
        
    }

    componentDidMount() {
        this.getDatesArray();
    }

    showNextMonth() {
        this.setState({
            currentMonth: this.state.currentMonth < 11 ? (this.state.currentMonth + 1) : 0,
            currentYear: this.state.currentMonth < 11 ? this.state.currentYear : (this.state.currentYear+1),
        }, this.getDatesArray);
    }

    showPreviousMonth() {
        this.setState({
            currentMonth: this.state.currentMonth > 0 ? (this.state.currentMonth - 1) : 11,
            currentYear: this.state.currentMonth > 0 ? this.state.currentYear : (this.state.currentYear-1),
            
        }, this.getDatesArray);
    }

    toggleAppointmentModal() {
        this.setState({showNewAppointmentModal: !this.state.showNewAppointmentModal});
    }

    handleAppointmentModalClick(event) {
        window.$(event.target).addClass("hide-modal");
        setTimeout( () => {
            this.toggleAppointmentModal();
        }, 1000);
    }

    render() {

        return (
            <div className="calendar-container">
                
                <div className={`new-appointment-modal ${ this.state.showNewAppointmentModal ? 'd-block show-modal' : 'd-none hide-modal'}` } onClick={ this.handleAppointmentModalClick }>
                    <div className="first-child" onClick={ (event) => { event.stopPropagation(); }}>
                        <h1 className="new-appointment-modal-header">nouveau rendez-vous</h1>

                        <div>
                            <CustomSelect/>
                        </div>
                    </div>
                </div>
                
                <div className="calendar-header">
                    <i className="fas fa-caret-left fa-3x month-chevron" style={{float: 'left'}} onClick={this.showPreviousMonth}></i>
                    <i className="fas fa-caret-right fa-3x month-chevron" style={{float: 'right'}} onClick={this.showNextMonth}></i>
                    <h1>{MONTHS[this.state.currentMonth]}</h1>
                    <p>{this.state.currentYear}</p>
                </div>

                <div className="calendar">
                    { WEEKDAYS.map( (dayname) => (
                        <span className="day-name" key={dayname}>{dayname}</span>
                    ))}

                    { this.state.dates[0].map( (date) => (
                        <div key={date} className="day day--disabled">{date}</div>
                    ))}

                    { this.state.dates[1].map( (date) => (
                        <div key={date} className="day" onClick={this.toggleAppointmentModal}>{date}</div>
                    ))}

                    { this.state.dates[2].map( (date) => (
                        <div key={date} className="day day--disabled">{date}</div>
                    ))}

                    <section className="task task--warning">Projects</section>
                    <section className="task task--danger">Design Sprint</section>

                    <div style={{gridColumn: '3 / span 2', gridRow: 4}}>
                        <section className="task task--primary">Product Checkup 1
                            <div className="task__detail">
                                <h2>Product Checkup 1</h2>
                                <p>15-17th November</p>
                            </div>
                        </section>
                        <section className="task task--danger">Product Checkup 2</section>
                    </div>
                    
                    <section className="task task--info">Product Checkup 2</section>
                </div>
                
            </div>
        );
    }
}

export default Calendar;
