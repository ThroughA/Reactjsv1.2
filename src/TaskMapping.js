import React,{Component} from 'react';
import ReactDOM from 'react-dom';
//import './App.css';
import $ from 'jquery';
import './EmployeeMenuPage.css';
import { FormErrors } from './FormErrors';
import {  BrowserRouter as Router,Route, NavLink} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import EmployeeMenuHeader from './EmployeeMenuHeader'
import Maintenance from './Maintenance'

import AddNewDepartment from './AddNewDepartment';
import AddNewRole from './AddNewRole';
import AddNewPermission from './AddNewPermission';

import BlockUnblock from './BlockUnblock';
import Unlock from './Unlock';
import EmployeeMenuPage from './EmployeeMenuPage';


class TaskMapping extends Component{

  constructor() {
        super()
        this.state = {

                      };
          }

/* react valitation*/


componentDidMount(){


   ReactDOM.render(
        <Router >
        <div>
        <Route path="/" component={EmployeeMenuHeader}/>
        <Route path="/" component={TaskMapping}/>
                 
        <Route path="/" component={BlockUnblock}/>
                                            
          </div>
        </Router>, document.getElementById('root'));
     

}



        

 BlockUnblockFunc(){
      ReactDOM.render(
        <Router >
        <div>
        <Route path="/" component={EmployeeMenuHeader}/>
        <Route path="/" component={TaskMapping}/>
                 
        <Route path="/" component={BlockUnblock}/>
                                            
          </div>
        </Router>, document.getElementById('root'));
                  

}

UnlockFunc(){
  ReactDOM.render(
    <Router >
    <div>
    <Route path="/" component={EmployeeMenuHeader}/>
    <Route path="/" component={TaskMapping}/>
             
    <Route path="/" component={Unlock}/>
                                        
      </div>
    </Router>, document.getElementById('root'));
              

}


AddNewPermission(){
  ReactDOM.render(
    <Router >
    <div>
    <Route path="/" component={EmployeeMenuHeader}/>
    <Route path="/" component={TaskMapping}/>
                  
    <Route path="/" component={AddNewPermission}/>
                                        
      </div>
    </Router>, document.getElementById('root'));
                  

}

BackbtnFunc(){
  ReactDOM.render(
          <Router>
            <div>           
                   <Route path="/" component={EmployeeMenuHeader}/>
                   <Route path="/" component={EmployeeMenuPage}/>
                   
                           </div>
                                </Router>,
                                          document.getElementById('root'));
                                          registerServiceWorker();
                                      }
  

render(){
    return(
        

<div className="container">
    <ul class="previous disabled" 
    style={{float:"none",
    display:"inline-block",
    marginLeft:"5px",
    borderRadius: "5px",
    padding: "3px 7px 3px 7px"
    }}>
        <a href="#" onClick={()=>this.BackbtnFunc()}><span aria-hidden="true">&larr;</span> BACK</a></ul>
       

 

    
  <div id='horMenu'>
    <ul>
  <li><a onClick={()=>this.BlockUnblockFunc()}><span class="glyphicon glyphicon-ban-circle">Block/ Unblock</span></a></li>
  <li><a onClick={()=>this.UnlockFunc()}><span class="glyphicon glyphicon-lock">Unlock</span></a></li>
  
  <li><a className="active" onClick={()=>this.AddNewPermission()}><span class="glyphicon glyphicon-eye-open">Permission</span></a></li>
  
  </ul>
</div>
</div>

                    
                
            );
        }
    
    }
    
      


 
 
  
        
      
  


export default TaskMapping;

