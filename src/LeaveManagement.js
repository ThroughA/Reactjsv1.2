
import datepicker from 'jquery-ui/ui/widgets/datepicker';
import './datepicker.css';
import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
//import './LoginPage.css';
import {
    FormErrors
} from './FormErrors';
import {
    BrowserRouter as Router,
    Route,
    NavLink
} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import CryptoJS from 'crypto-js';
import PeriodAttendanceReportDisplay from './PeriodAttendanceReportDisplay';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import AttendanceRegulationMenuPage from './AttendanceRegulationMenuPage';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import './LoginPage.css';
//import timepicker from 'jquery-ui-timepicker-addon/src/jquery-ui-timepicker-addon';
//import timepicker from 'jquery-ui/ui/widgets/timepicker';
//import timepicker from 'timepicker/jquery.timepicker';
import 'timepicker/jquery.timepicker.css';
import timepicker from 'timepicker/jquery.timepicker';
import TimePicker from 'react-bootstrap-time-picker';

import AttendanceRegulation from './AttendanceRegulation';

class LeaveManagement extends Component {


    constructor(props) {
        super(props)
        var employeeId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
        var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
        var department = CryptoJS.AES.decrypt(localStorage.getItem('Department'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
        
        
        this.state = {
            date: '',
            employeeId:employeeId ,
            companyId: '',
            role: role,
            department: department,
            noOfDays:'',
            fromDate:'',
            toDate:'',
            

        }
    }
    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,
           
        });

    }





    Submit() {
  /*  alert(this.state.date);
   alert(this.state.checkOutTime);
  */  var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        this.state.companyId = companyId;
        this.setState({
            companyId: companyId,
        });
        var self = this;

            /* alert(JSON.stringify(this.state));
            */ $.ajax({
            type: 'POST',
            data: JSON.stringify({
                date: this.state.date,
                checkInTime: this.state.checkInTime,
                checkOutTime: this.state.checkOutTime,
                employeeId: this.state.employeeId,
                companyId: this.state.companyId,
            }),
            url: "http://13.127.39.136:8080/EmployeeAttendenceAPI/employee/employeeTimeRegulation",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
                      /* console.log(data);
                      alert(data);
                      */ if (data.employeeId == "BLOCKED") {

                    confirmAlert({
                        title: 'Blocked',                        // Title dialog
                        message: self.state.employeeId + ' Id has been Blocked',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm
                    })

                }
                else {

                    confirmAlert({
                        title: 'Attendance Regulation',                        // Title dialog
                        message: 'Attendance values are Updated',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm
                    })

                    ReactDOM.render(
                        <Router>
                            <div>

                                <Route path="/" component={EmployeeMenuHeader} />
                                <Route path="/" component={AttendanceRegulationMenuPage} />
                                <Route path="/" component={AttendanceRegulation} />


                            </div>
                        </Router>,
                        document.getElementById('root'));
                    registerServiceWorker();

                }


            },
            error: function (data) {
                        /* console.log('#####################error:################################'+data);
                        */confirmAlert({
                    title: 'No Internet',                        // Title dialog
                    message: 'Network Connection Problem',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm


                });

            },
        });

        this.setState({
            date: '',
            checkInTime: '',
            checkOutTime: '',
            employeeId: '',
            companyId: '',
            dateValid: false,
            checkInTimeValid: false,
            checkOutTimeValid: false,
            employeeIdValid: false,

        });


    }

    componentDidMount() {
        var self = this;
        $('#toDate').datepicker({ 
            onSelect: function(date) {
              var dt = new Date(date);
                 dt.setDate(dt.getDate() - 1);
                 $("#fromDate").datepicker("option", "maxDate", dt);
            self.setState({
             toDate:date,
            });
             
          },
          dateFormat: 'yy/mm/dd',
          minDate: 'M', 
          maxDate: '+3M',
         numberOfMonths:1 } );
         $('#fromDate').datepicker({
           onSelect: function(date) {
             var dt = new Date(date);
                 dt.setDate(dt.getDate() + 1);
                 $("#toDate").datepicker("option", "minDate", dt);
            self.setState({
             fromDate:date,
            });
          },
           dateFormat: 'yy/mm/dd',
           minDate: 'M',
           maxDate: '+3M', 
           numberOfMonths:1 });  
                 
        
    }

    render() {


        return (




            <div className="container" style={{ marginBottom: '30%' }}>
                <div class="jumbotron">
                    <h3>Leave Form</h3>

                    <form style={{ paddingBottom: '20px', position: 'inline-block' }}>

                    {/*     <div className="panel panel-default">
                            <FormErrors formErrors={this.state.formErrors} />
                        </div> */}

                        <form >

                            <label for="employeeName">
                                Employee Name*
    		</label>
                          
                                
                                <input type="text"
                                    onChange={this.handleUserInput}
                                    id="employeeName"
                                    value={this.state.employeeName}
                                    name="employeeName"
                                    placeholder="Your name.."
                                    required />
                          

                            <label for="employeeId">
                                Employee ID*
		    		</label>

                          
                                <input type="text"
                                    onChange={this.handleUserInput}
                                    value={this.state.employeeId}
                                    id="employeeId1"
                                    name="employeeId"
                                    placeholder="Your last name.."
                                    readOnly
                                     />
                            
                            <label for="department">
                                Department*
		    		</label>

                           
                                <input type="text"
                                    onChange={this.handleUserInput}
                                    value={this.state.department}
                                    id="department"
                                    name="department"
                                    placeholder="Your department .."
                                    required />
                          
                            <label for="role">
                                Role*
		    		</label>

                          
                                <input type="text"
                                    onChange={this.handleUserInput}
                                    value={this.state.role}
                                    id="role"
                                    name="role"
                                    placeholder="Your role .."
                                    required />
                           
                            <label for="noOfDays">
                                No of days*
		    		</label>

                          
                                <input type="text"
                                    onChange={this.handleUserInput}
                                    id="noOfDays"
                                    name="noOfDays"
                                    placeholder="Your Number of Days.."
                                    required />
                            

                            <form style={{ paddingBottom: '50px', position: 'inline-block' }}>
                                <label htmlFor="fromDate" style={{ paddingRight: '50px' }}> From:</label>
                                <input
                                    style={{ width: '46%' }}
                                    type="text"
                                    value={this.state.fromDate}
                                    id="fromDate" name="fromDate"
                                    onChange={this.handleUserInput} />

                            </form>

                            <form style={{ paddingRight: '50px' }}   >
                                <label
                                    htmlFor="toDate"
                                    style={{ marginRight: '70px' }}> To:</label>

                                <input
                                    style={{ width: '50%' }}
                                    type="text"
                                    value={this.state.toDate}
                                    id="toDate" name="toDate"
                                    onChange={this.handleUserInput} />


                            </form >


                        </form >
                        <label for="reason">
                        Reason*
    		</label>

                    <div >
                        <textarea id="address"
                            onChange={this.handleUserInput}
                            name="reason"
                            maxlength="250"
                            placeholder="Your reason.." required style={{ height: '200px' }}> </textarea>
                    </div>
                   

                        <button type="button" id="submitAttendanceReg" disabled={!(this.state.employeeIdValid && this.state.dateValid && this.state.checkInTimeValid && this.state.checkOutTimeValid)} style={{ marginBottom: "10px", marginLeft: "auto", marginRight: "auto", marginTop: "175px" }} onClick={() => this.Submit()} class="btn btn-info">Submit</button>

                    </form>

                </div>




            </div>

        );



    }

}
export default LeaveManagement;


