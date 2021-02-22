import React, { useContext, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import '../../../../App.css';

import Contents from '../Contents';
import BarTwo from '../BarTwo';
import EmployeeContext from "../../context/employee/employeeContext";
import AuthContext from "../../context/auth/authContext";
import  'react-bootstrap';


const Employee = (props) => {
  const employeeContext = useContext(EmployeeContext);
  const authContext = useContext(AuthContext);


  const { isAuthenticated } = authContext;

  const { getEmployees, users, setCurrent, clearCurrent, deleteUser } = employeeContext;

  

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push("/Employee");
    }
    //loading all appraisal
    // getAppraisals();
    //get all users users
    getEmployees()
    
    // eslint-disable-next-line
  }, [isAuthenticated, props.history]);

  const onDelete = (id) => {
    if (window.confirm('Are you sure')) {
      deleteUser(id);
      clearCurrent();
      console.log("Deleted");
    }

   
    
  };  

  

  
    return (
      
        <div>
          <BarTwo />
          <Contents />
      <section>
        <div className='container'>
          <div className='row'>
            <div className='col-xl-10 col-lg-9 col-md-8 ml-auto'>
              <div className='row pt-md-5 mt-md-3 mb-5'>
                <div className='col-md-12 mb-3'>
                  <div className='card'>
                    <div className='card-header'>
                      Employees
                      {/* <button className='btn btn-primary float-right'> */}
                      {/* <Link
                          to='/Register'
                          className=' nav-link text-white'
                        >
                          Add Employee
                        </Link> */}
                      {/* </button> */}
                    </div>
                    <div className='card-body'>
                      <table className='table'>
                        
                        <thead>
                          <tr>
                            
                            
                            
                            <th scope="col">Employee Name</th>
                            <th scope="col">Employee Email</th>
                            <th scope="col">Employee Role</th>
                          
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                          </tr>
                        </thead>

                        <tbody>
                          { users && users.map((user) =>  (
                            <Fragment>
                              
                              <tr key={user._id}> 
                                
                                
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                

                                <td>
                                  <button onClick={() => setCurrent(user)}>
                                  <Link to="/Employee/EditEmployee">
                                    <i
                                      className=" fas fa-pencil-alt"
                
                                    ></i>
                                  </Link>
                                  </button>
                                </td>
                                <td>
                                  <button onClick={() => onDelete(user._id)}>
                                  <i
                                    className="fas fa-trash"
                                  ></i>
                                  </button>
                                  
                                </td>
                              </tr>
                            </Fragment> 
                          ))}
                        
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    )
}

export default Employee;
