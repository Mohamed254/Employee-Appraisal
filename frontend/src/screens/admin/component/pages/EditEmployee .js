/* eslint-disable react/style-prop-object */
import React, { useContext, useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import '../../../../App.css';
import BarTwo from '../BarTwo';

import EmployeeContext from "../../context/employee/employeeContext";
import AuthContext from "../../context/auth/authContext";
import  'react-bootstrap';


const EditEmployee = props => {
  const employeeContext = useContext(EmployeeContext);
  const authContext = useContext(AuthContext);


  const { isAuthenticated } = authContext;

  const { updateEmployee, current } = employeeContext;

  


  

  

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push("/Employee/EditEmployee");
    }
    // //clear errors
    // clearErrors();
    // eslint-disable-next-line
  }, [isAuthenticated, props.history]);

  

  const [ update, setUpdate] = useState({
    name: current.name,
    email: current.email,
    role: current.role
    
    
  });

  const {
   name,
   email,
   role
    
  } = update;

  const onChange = e =>
    setUpdate({
      ...update,
      [e.target.name]: e.target.value
    });


 

    const onSubmit = e => {
      e.preventDefault();
    
    updateEmployee({
      name,
      email,
      role
    },
      current
    );
    console.log({updateEmployee});
    props.history.push("/Employee")
    
  };


  
  
  
  


  


  return (
    <Fragment>
      <BarTwo />
      

      <section>
        <div className='container'>
          <div className='row'>
            <div className='col-xl-10 col-lg-9 col-md-8 ml-auto'>
              <div className='row pt-md-5 mt-md-3 mb-5'>
                <div className='col-md-12 mb-3'>
                  <div className='card'>
                    <div className='card-header'>
                      <b>Empoyee</b>
                      <button className=' btn btn-primary float-right '>
                        <Link
                          to='/Appraisals'
                          className=' nav-link text-white'
                        >
                          Check Employee
                        </Link>
                      </button>
                    </div>

                    <div className='card-body'>
                      <form onSubmit={onSubmit}>
                        <div className='form-row'>

                        <div className='form-group col-md-12'>
                            <label for='inputPassword4'>Employee Name</label>
                            <input
                              type='text'
                              className='form-control'
                              name='name'
                              value={name}
                             
                              placeholder='Name'
                              onChange={onChange}
                              required
                            />
                          </div>


                          <div className='form-group col-md-12'>
                            <label for='inputPassword4'>Employee Email</label>
                            <input
                              type='text'
                              className='form-control'
                              name='email'
                              value={email}
                            
                              placeholder='email'
                              onChange={onChange}
                              required
                            />
                          </div>



                          <div className='form-group col-md-12'>
                            <label for='inputPassword4'>Employee Role</label>
                            <input
                              type='text'
                              className='form-control'
                              name='role'
                              value={role}
                             
                              placeholder='Name'
                              onChange={onChange}
                              required
                            />
                          </div>

                       
                        
                        
                         
                          

                          <div className='form-group col-md-12'>
                            <button
                              className='btn btn-success btn-block btn-lg'
                              type='submit'
                            >
                              Update Employee
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
     
      {/* <!-- end of cards --> */}
    </Fragment>
  );
};

export default EditEmployee ;
