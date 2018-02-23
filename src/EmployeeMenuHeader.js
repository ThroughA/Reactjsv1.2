import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';


import './EmployeeMenuPage.css';
import { FormErrors } from './FormErrors';
import {  BrowserRouter as Router,Route, a} from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';
import EmployeeMenuPage from './EmployeeMenuPage';
import Attendence from './Attendence';

import CryptoJS from 'crypto-js' ;
import Help from './Help';
import LoginPage from './LoginPage';
import ResetPassword from './ResetPassword';

import Maintenance from './Maintenance';
import RemoveEmployee from './RemoveEmployee';
import AddEmployee from './AddEmployee';
import SearchEmployee from './SearchEmployee';
import UpdateEmployee from './UpdateEmployee';
import Charts from './Charts';
import AttendanceDisplay from './AttendanceDisplay';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import idb from 'idb';



class EmployeeMenuHeader extends Component{

	constructor() {
        super()
        var emailId=CryptoJS.AES.decrypt(localStorage.getItem('EmailId'),"shinchanbaby").toString(CryptoJS.enc.Utf8)

        this.state = {

            emailId: emailId,
            
			}
		}

componentDidMount(){

	if(localStorage.getItem('isLoggedIn')){
var login=CryptoJS.AES.decrypt(localStorage.getItem('isLoggedIn'),"shinchanbaby").toString(CryptoJS.enc.Utf8);
if(login=="true")
{
this.interval = setInterval(() => this.Refresh(), 200000);
this.interval = setInterval(() => this.offlineData(), 2000); 
}
}
}
Refresh()
{
/*alert("refresh");
*/var today = new Date();
          today= today.getFullYear()+'-'+ (today.getMonth() + 1) + '-'+today.getDate() ;
          this.state.date=today;
     
		
    var emailId=CryptoJS.AES.decrypt(localStorage.getItem('EmailId'),"shinchanbaby").toString(CryptoJS.enc.Utf8);
    var password=CryptoJS.AES.decrypt(localStorage.getItem('Password'),"shinchanbaby").toString(CryptoJS.enc.Utf8);

    var self = this;
    $.ajax({
        type: 'POST',
        data: JSON.stringify({
          emailId: emailId,
          password: password,
          
        }),
        url: "http://13.127.39.136:8080/EmployeeAttendenceAPI/employee/employeeLogin",
        contentType: "application/json",
        dataType: 'json',
        async: false,

        success: function(data, textStatus, jqXHR)

        {
         /* console.log(data);
*/
          if (data.employeeId == "LOCKED"){
						localStorage.clear();
						ReactDOM.render(
							<Router>
								<div>
								
									 <Route path="/" component={LoginPage}/>
										
									 </div>
					 </Router>,document.getElementById('root'));
					 
	 }else if (data.employeeId == "BLOCKED"){
			localStorage.clear();
									
		ReactDOM.render(
			<Router>
				<div>
				
					 <Route path="/" component={LoginPage}/>
						
					 </div>
	 </Router>,document.getElementById('root'));

 }else if (data.employeeId == "PASSWORD_INCORRECT") {
						
						localStorage.clear();
						ReactDOM.render(<LoginPage / > , document.getElementById("root"));
 
				 

          } 
          else{
             var key="shinchanbaby";
            localStorage.setItem('isLoggedIn', CryptoJS.AES.encrypt("true".toString(),key));
            
            localStorage.setItem('Departments', CryptoJS.AES.encrypt(JSON.stringify(data.employeeDepartmentlist),key));
            localStorage.setItem('Roles', CryptoJS.AES.encrypt(JSON.stringify(data.employeeRolelist),key));
            localStorage.setItem('Permissions', CryptoJS.AES.encrypt(JSON.stringify(data.employeePermisionlist),key));
            localStorage.setItem('Role', CryptoJS.AES.encrypt(data.role,key));
            localStorage.setItem('EmployeeId', CryptoJS.AES.encrypt(data.employeeId,key));
            localStorage.setItem('EmpList', CryptoJS.AES.encrypt(JSON.stringify(data.employeeList),key));
			localStorage.setItem('CompanyId', CryptoJS.AES.encrypt(data.companyId,key));
			localStorage.setItem('CompanyName', CryptoJS.AES.encrypt(data.companyName,key));
			localStorage.setItem('LockList', CryptoJS.AES.encrypt(JSON.stringify(data.lockList),key));
			
			

             	}		



          },


           });

}

offlineData() {
 
 if (navigator.onLine) {

 
 var dbPromise = idb.open('Attendance-db');
 
 dbPromise.then(function (db) {
 if (db.objectStoreNames.contains('checkIn') || db.objectStoreNames.contains('checkOut')) {
 var tx = db.transaction('checkIn', 'readonly');
 var keyValStore = tx.objectStore('checkIn');
 var count = keyValStore.openCursor().then(function cursorIterate(cursor) {
 if (!cursor) return;
 /* console.log('cursor value', cursor.key);
 console.log('online');
 */
 

 $.ajax({
 type: 'POST',
 data: cursor.value,
 url: "http://13.127.39.136:8080/EmployeeAttendenceAPI/employee/employeecheckin",
 contentType: "application/json",
 dataType: 'json',
 async: false,

 success: function (data, textStatus, jqXHR) {
 /* console.log(data);
 alert(data);
 */ if (data.employeeName == "NOT_VAILD") {
 confirmAlert({
 title: 'Invalid EmployeeId', // Title dialog
 message: 'Enter Valid Employee Id', // Message dialog
 confirmLabel: 'Ok', // Text button confirm


 })
 }
 else if (data.employeeName == "ALREADY_CHECKIN") {
 confirmAlert({
 title: 'Already Checked In', // Title dialog
 message: data.employeeId + ' is already checked in today', // Message dialog
 confirmLabel: 'Ok', // Text button confirm


 })
 }

 else {

 confirmAlert({
 title: 'Checked In', // Title dialog
 message: 'Successfully Checked In ' + data.employeeId, // Message dialog
 confirmLabel: 'Ok', // Text button confirm


 })

 }



 },
 error: function (data) {
 /* console.log('#####################error:################################' + data);
 */ confirmAlert({
 title: 'No Internet', // Title dialog
 message: 'Network Connection Problem', // Message dialog
 confirmLabel: 'Ok', // Text button confirm


 });

 },


 });

 dbPromise.then(function (db) {
 var tx = db.transaction('checkIn', 'readwrite');
 var keyValStore = tx.objectStore('checkIn');
 /* console.log('deleting', cursor.key);
 */ return keyValStore.delete(cursor.key);

 });
 return cursor.continue().then(cursorIterate);
 });


 var dbPromise = idb.open('Attendance-db', 2);

 var tx = db.transaction('checkOut', 'readonly');
 var keyValStore = tx.objectStore('checkOut');
 var count = keyValStore.openCursor().then(function cursorIterate(cursor) {
 if (!cursor) return;
 /* console.log('cursor value', cursor.key);
 console.log('online');
 */ $.ajax({
 type: 'POST',
 data: cursor.value,
 url: "http://13.127.39.136:8080/EmployeeAttendenceAPI/employee/employeecheckout",
 contentType: "application/json",
 dataType: 'json',
 async: false,

 success: function (data, textStatus, jqXHR) {
 /*console.log(data);
 alert(data);
 */if (data.employeeName == "NOT_VAILD") {
 confirmAlert({
 title: 'Invalid EmployeeId', // Title dialog
 message: 'Enter Valid Employee Id', // Message dialog
 confirmLabel: 'Ok', // Text button confirm


 })
 }
 else if (data.employeeName == "NOT_CHECKED_IN") {
 confirmAlert({
 title: 'Not Checked In', // Title dialog
 message: data.employeeId + ' is not checked in today', // Message dialog
 confirmLabel: 'Ok', // Text button confirm


 })
 }
 else if (data.employeeName == "ALREADY_CHECKOUT") {
 confirmAlert({
 title: 'Already Checked In', // Title dialog
 message: data.employeeId + ' is already checked out today', // Message dialog
 confirmLabel: 'Ok', // Text button confirm


 })
 }
 else {

 confirmAlert({
 title: 'Checked Out', // Title dialog
 message: 'Successfully Checked Out ' + data.employeeId, // Message dialog
 confirmLabel: 'Ok', // Text button confirm


 })


 }




 },
 error: function (data) {
 /*console.log('#####################error:################################' + data);
 */confirmAlert({
 title: 'No Internet', // Title dialog
 message: 'Network Connection Problem', // Message dialog
 confirmLabel: 'Ok', // Text button confirm


 });

 },


 });





 dbPromise.then(function (db) {
 var tx = db.transaction('checkOut', 'readwrite');
 var keyValStore = tx.objectStore('checkOut');
 /* console.log('deleting', cursor.key);
 */ return keyValStore.delete(cursor.key);

 });
 return cursor.continue().then(cursorIterate);
 });





 }

 });
 }
 }


			     

			     

LogoutFunc(){
     localStorage.clear();
    ReactDOM.render(<LoginPage / > , document.getElementById("root"));
 }

 HelpFunc(){
    ReactDOM.render(
        <Router>
            <div>
            <Route path="/" component={EmployeeMenuHeader} />
                <Route path="/" component={Help} />
            </div>
        </Router>,
        document.getElementById('root'));
    }

MainPageFunc(){

/*alert(" Main page");
*/	 ReactDOM.render(
			<Router>
			  <div>
			  
					 <Route path="/" component={EmployeeMenuHeader}/>
					 <Route exact path="/" component={EmployeeMenuPage}/>
					 
					
								 </div>
								  </Router>,
											document.getElementById('root'));
											registerServiceWorker();
	 

}
ResetFunc(){
	ReactDOM.render(
        <Router>
            <div>
            <Route path="/" component={EmployeeMenuHeader} />
            
                <Route path="/" component={() => <ResetPassword emailId={this.state.emailId}/>} />
            </div>
        </Router>,
        document.getElementById('root'));
    
}
									 
render(){
		return(
		<div>

		<nav class="navbar navbar-default" style={{backgroundColor:"#002052"}}>
		  <div class="container-fluid">
		    <div class="navbar-header" style={{backgroundColor:"#002052"}}>
		      <a class="navbar-brand" id="logoheader" onClick= {()=> this.MainPageFunc()} href="#"></a>
		    </div>
		    
		    <div class="navbar-right dropdown" style={{textAlign:"right"}}>
		    <button  class="btn btn-md dropdown-toggle"  style={{backgroundColor:"#002052"}}  type="button" id="menu1" data-toggle="dropdown">
		    <a href="#"  class="btn btn-default btn-md">
		    <span class="glyphicon glyphicon-off"></span>
		     </a>
		    </button>
		<ul id="menulogoutbtn" class="dropdown-menu dropdown-menu-right" role="menu" aria-labelledby="menu1"
		    /* style={{margin: "-24px 1px 2px 2px",padding:" 10px 6px 13px 0"}} */>
		<li><a href="#"><span class="glyphicon glyphicon-hand-right" onClick= {()=> this.HelpFunc()} style={{float:"left"}}>Help</span></a></li>
		<li className="divider"></li>
		<li><a href="#"><span class="glyphicon glyphicon-eye-close" onClick= {()=> this.ResetFunc()} style={{float:"left"}} >ResetPassword</span></a></li>
		<li className="divider"></li>
		<li><a href="#"><span class="glyphicon glyphicon-user" onClick= {()=> this.LogoutFunc()} style={{float:"left"}}>LogOut</span></a></li>
		</ul>
		</div> 
		  </div>
		</nav>

			<div className="container-fluid " style={{textAlign:"center"}}>
					<div className="jumbotron" style={{textAlign:"center" ,backgroundColor:"#eeeeee14",color:"black",
        
        backgroundColor:" #b3e5fc",
		borderRadius: "10px 50px",
		boxShadow: "15px 18px 6px -6px rgb(0, 129, 188)"
        
    }}>
						<h2>{CryptoJS.AES.decrypt(localStorage.getItem('CompanyName'),"shinchanbaby").toString(CryptoJS.enc.Utf8)
						 }</h2>
						<h4>TicTocks</h4>
						<h4>powered by ThroughApps</h4>
					</div>
				</div>
</div>

					 
			
				
			
		);
	}

}


export default EmployeeMenuHeader;

