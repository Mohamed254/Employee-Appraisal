import React, { Fragment} from 'react'
// import { Container } from 'react-bootstrap'

import Body from './components/Body'
import Bar from './screens/users/Bar';
import BarTwo from './screens/admin/component/BarTwo';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './screens/users/pages/Home';
import Appraisal from './screens/users/pages/Appraisal';
import Feedback from './screens/users/pages/Feedback';
import Appraisals from './screens/admin/component/pages/Appraisals';
import Report from './screens/admin/component/pages/Report';
import Employee from './screens/admin/component/pages/Employee';
import AddEmployee from './screens/admin/component/pages/AddEmployee';
import EditAppraisal from './screens/admin/component/pages/EditAppraisal';
import RegisteredAppraisal from './screens/users/pages/RegisteredAppraisal';
import Performance from './screens/users/pages/Performance';
import UserLogin from "./components/auth/UserLogin";
import Register from "./components/auth/Register";
import AdminLogin from "./screens/admin/component/auth/AdminLogin";
import "./App.css";
import PrivateRoute from "./components/routing/PrivateRoute";
import UserState from "./context/user/UserState";
import AuthState from "./screens/admin/context/auth/AuthState";
import EmployeeState from "./screens/admin/context/employee/EmployeeState";
import AppraisalsState from "./screens/admin/context/appraisal/AppraisalsState";
import AlertState from "./context/alert/AlertState";
import Alerts from "./components/layout/Alerts";
import AppraisalState from "./context/appraisal/AppraisalState";
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import EditEmployee from './screens/admin/component/pages/EditEmployee ';


const App = () => {
  return (
   
      <UserState>
      <AuthState>
        <EmployeeState>
          <AppraisalsState>
      <AppraisalState>
        <AlertState>
      <Router>
      <Fragment>
        <div className="container">
           <Alerts />     
        </div>
      
      <Switch>
          <Route exact path="/" component={Body} />
          
          <Route exact path="/login" component={UserLogin} />
          <Route exact path="/Forgot" component={ForgotPassword} />
          <Route exact path="/Reset/:token" component={ResetPassword} />
          <Route exact path="/Register" component={Register} />
          <Route exact path="/adminlogin" component={AdminLogin} />
          <PrivateRoute path='/user/Navbar' component={Bar} />
          <PrivateRoute path='/admin/Navbar' component={BarTwo} />
          <PrivateRoute path='/user/Navbar' exact component={Home} />
          <PrivateRoute path='/Appraisals/EditAppraisal' component={EditAppraisal} />
          <PrivateRoute path='/RegisteredAppraisal/Appraisal' component={Appraisal} />
          <PrivateRoute path='/Employee/AddEmployee' component={AddEmployee} />
          <PrivateRoute path='/Employee/EditEmployee' component={EditEmployee} />
          <PrivateRoute path='/Employee' component={Employee} />
          <PrivateRoute path='/Feedback' component={Feedback} />
          <PrivateRoute path='/RegisteredAppraisal' component={RegisteredAppraisal} />
          <PrivateRoute path='/Appraisals' component={Appraisals} />
          <PrivateRoute path='/Report' component={Report} />
          <PrivateRoute path='/user/Navbar/Performance' component={Performance} />

        </Switch>
        </Fragment>
      </Router>
      </AlertState>
      </AppraisalState>
      </AppraisalsState>
      </EmployeeState>
      </AuthState>
      </UserState>
      
      
      
         
      
   
    
  )
}
export default App