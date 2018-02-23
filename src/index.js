import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import LoginPage from './LoginPage';
import EmployeeMenuPage from './EmployeeMenuPage';
import Attendence from './Attendence';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import Maintenance from './Maintenance';
import RemoveEmployee from './RemoveEmployee';
import AddEmployee from './AddEmployee';
import SearchEmployee from './SearchEmployee';
import UpdateEmployee from './UpdateEmployee';
import Charts from './Charts';
import CryptoJS from 'crypto-js' ;
import AttendanceDisplay from './AttendanceDisplay';
import {  BrowserRouter as Router,Route, NavLink} from 'react-router-dom';
import ReportMenuPage from './ReportMenuPage';
import LeaveManagement from './LeaveManagement';





if(localStorage.getItem('isLoggedIn')){
var login=CryptoJS.AES.decrypt(localStorage.getItem('isLoggedIn'),"shinchanbaby").toString(CryptoJS.enc.Utf8);
if(login=="true")
{
	 ReactDOM.render(
			<Router>
			  <div>
			  
					 <Route path="/" component={EmployeeMenuHeader}/>
					 <Route exact path="/" component={EmployeeMenuPage}/>
					 <Route exact path="/Attendence" component={Attendence}/>
					 <Route exact path="/Charts" component={Charts}/>
					<Route exact path="/AttendanceDisplay" component={AttendanceDisplay}/>
					
					<Route exact path="/Maintenance" component={Maintenance}/>
					 <Route exact path="/AddEmployee" component={AddEmployee}/>
					 <Route exact path="/RemoveEmployee" component={RemoveEmployee}/>
					 <Route exact path="/SearchEmployee" component={SearchEmployee}/>
					 <Route exact path="/UpdateEmployee" component={UpdateEmployee}/>

					 
					 </div>
					 </Router>,document.getElementById('root'));
					registerServiceWorker();
}
else{
ReactDOM.render(<LoginPage / > , document.getElementById("root"));
registerServiceWorker();
}

}
else{
ReactDOM.render(<LoginPage / > , document.getElementById("root"));
registerServiceWorker();
}