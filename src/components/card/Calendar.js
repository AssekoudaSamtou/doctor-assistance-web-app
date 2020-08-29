import React from "react";
import {WEEKDAYS, MONTHS} from "../../utils";
import CustomSelect from "./CustomSelect";
import PatientDataService from "../../services/patient.service";
import scheduleService from '../../services/schedule.service';

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dates: [[], [], []],
            currentMonth: (new Date()).getMonth(),
            currentYear: (new Date()).getFullYear(),
            showNewAppointmentModal: false,
            patients: [],
            consultations: [],
            demande_consultations: [],
            structure_sanitaires: [],
            orderedRDVs: {},
            grid: [],
        };
        
        this.getDatesArray = this.getDatesArray.bind(this);
        this.showNextMonth = this.showNextMonth.bind(this);
        this.showPreviousMonth = this.showPreviousMonth.bind(this);
        this.toggleAppointmentModal = this.toggleAppointmentModal.bind(this);
        this.handleAppointmentModalClick = this.handleAppointmentModalClick.bind(this);
        this.getOrderedRDVs = this.getOrderedRDVs.bind(this);
        this.getGrid = this.getGrid.bind(this);
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
        
        scheduleService.getByMonth(this.state.currentMonth, this.state.currentYear)
        .then(response => {
            this.setState({...response.data}, this.getOrderedRDVs);
            
        })
        .catch(error => {
            window.showErrorMessage("something wents wrong !!!");
        });

        this.setState({dates: days}, this.getGrid);
    }

    getOrderedRDVs() {
        var rdvs = {};

        this.state.demande_consultations.map( (rdv) => {
            var date = (new Date(rdv.date_consultation)).getDate().toString();

            if ( rdvs.hasOwnProperty(date) ) {
                rdvs[date].push(rdv);
            }
            else {
                rdvs[date] = [rdv];
            }
        });

        console.log(rdvs);
        this.setState({orderedRDVs: rdvs});
    }

    getGrid() {
        var dates = this.state.dates[0].concat(this.state.dates[1]).concat(this.state.dates[2]),
            grid = [],
            row = [];
        
        var rowscount = dates.length / 7;
        for (let index = 0; index < rowscount; index++) {
            row = dates.splice(0, 7);
            

            for (let i = 0; i < row.length; i++) {
                if ( (index === 0 && this.state.dates[0].includes(row[i])) || (index === rowscount-1 && this.state.dates[2].includes(row[i])) ) {
                    // console.log(index);
                }else {
                    grid.push({row: index + 2, column: i+1});
                }
            }
        }

        // console.log(grid);
        this.setState({grid: grid});
    }

    componentWillMount() {
        PatientDataService.getAll()
        .then(response => {
            this.setState({patients: response.data});
        }).catch(e => {
            window.showErrorMessage("something wents wrong !!!");
        });
    }

    componentDidMount() {
        this.getDatesArray();
        window.$(document).ready( () => {
            window.$('#datetimepicker1').datetimepicker();
        })
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

    handleTaskContainerClick = (event) => {
        event.stopPropagation();
    }

    handleTaskClick = (event) => {
        window.$(event.target).find(".task__detail").toggle();
    }

    render() {

        return (
            <div className="calendar-container">
                
                <div className={`new-appointment-modal ${ this.state.showNewAppointmentModal ? 'd-block show-modal' : 'd-none hide-modal'}` } onClick={ this.handleAppointmentModalClick }>
                    <div className="first-child" onClick={ (event) => { event.stopPropagation(); }}>
                        <h1 className="new-appointment-modal-header">nouveau rendez-vous</h1>

                        <div style={{padding: '0 10px'}}>
                            
                            <div className="row">
                                
                                <div className="col-lg-6">
                                    <CustomSelect 
                                        options={this.state.patients.map( (patient) => (
                                            {
                                                id: patient.id, 
                                                value: `${patient.nom} ${patient.prenom}`, 
                                                photo: patient.photo
                                            }
                                        ) )}
                                        isUser={1} default="---Selectioner un patient---" 
                                    />
                                </div>
                                
                                <div className="col-lg-6">
                                    <CustomSelect 
                                        options={this.state.patients.map( (patient) => (
                                            {
                                                id: patient.id, 
                                                value: `${patient.nom} ${patient.prenom}`, 
                                                photo: patient.photo
                                            }
                                        ) )}
                                        isUser={0} default="---Selectioner un hopital---" 
                                    />
                                </div>

                            </div>

                            <div className="row" style={{margin: '20px 0'}}>
                                <div className="col-lg-12">
                                    
                                    <div className='input-group date' id='datetimepicker1'>
                                        <input type='text' className="form-control" />
                                        <span className="input-group-addon">
                                            <span className="glyphicon glyphicon-calendar"></span>
                                        </span>
                                    </div>

                                </div>
                            </div>
                            
                            <div className="new-appointment-btn">ajouter</div>
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

                    { this.state.dates[1].map( (date) => {
                        var rdvs = this.state.orderedRDVs[date];
                        console.log(date, rdvs);
                        if (rdvs !== undefined)
                            return (
                                <div onClick={this.handleTaskContainerClick} className="task__container" style={{gridColumn: `${this.state.grid[date-1].column} / span 1`, gridRow: this.state.grid[date-1].row}}>
                                    { rdvs.map( (rdv) => (
                                        <section onClick={this.handleTaskClick} key={rdv.id} className="task task--primary">
                                            Product Checkup {date}
                                            <div className="task__detail">
                                                <h2>Product Checkup 1</h2>
                                                <p>15-17th November</p>
                                            </div>
                                        </section>
                                    )) }
                                </div>
                            );
                    })}

                    {/* <section className="task task--warning">Projects</section>
                    <section className="task task--danger">Design Sprint</section> */}

                    {/* <div style={{gridColumn: '3 / span 2', gridRow: 4}}>
                        <section className="task task--primary">Product Checkup 1
                            <div className="task__detail" style={{display: 'none'}}>
                                <h2>Product Checkup 1</h2>
                                <p>15-17th November</p>
                            </div>
                        </section>
                        <section className="task task--danger">Product Checkup 2</section>
                    </div> */}
                    
                    {/* <section className="task task--info">Product Checkup 2</section> */}
                </div>
                
            </div>
        );
    }
}

export default Calendar;
