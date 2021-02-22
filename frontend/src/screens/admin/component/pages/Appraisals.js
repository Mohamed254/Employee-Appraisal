import React, { Fragment, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import '../../../../App.css';

import Contents from '../Contents';
import BarTwo from '../BarTwo';
import AppraisalsContext from "../../context/appraisal/appraisalsContext";
// import UserContext from "../../../../context/user/userContext";
import AuthContext from "../../context/auth/authContext";
import  'react-bootstrap';


const Appraisals = (props) => {
  const appraisalsContext = useContext(AppraisalsContext);
  const authContext = useContext(AuthContext);
  // const userContext = useContext(UserContext);

  // const { user } = userContext;

  const { isAuthenticated } = authContext;

  const { getAppraisals, appraisals,  setCurrent, clearCurrent, deleteAppraisal  } = appraisalsContext;

  

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push("/Appraisals");
    }
    //loading all appraisal
    getAppraisals();
    //get all users users
    
    // eslint-disable-next-line
  }, [isAuthenticated, props.history]);

  const onDelete = (id) => {
    if (window.confirm('Are you sure')) {
      deleteAppraisal(id);
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
                      Appraisals
                      <button className='btn btn-primary float-right'>
                      {/* <Link
                          to='/Appraisals/EditAppraisal'
                          className=' nav-link text-white'
                        >
                          Add Appraisal
                        </Link> */}
                      </button>
                    </div>
                    <div className='card-body'>
                      <table className='table'>
                        
                        <thead>
                          <tr>
                            <th scope="col">Employee ID</th>
                            
                            
                            <th scope="col">Overall Score</th>
                            <th scope="col">Status</th>
                          
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                          </tr>
                        </thead>

                        <tbody>
                          { appraisals && appraisals.map((appraisal) =>  (
                            
                            <Fragment>
                              
                              <tr key={appraisal._id}> 
                                <td>{appraisal.user}</td>
                                
                                <td>{appraisal.Overall_Score}</td>
                                <td>{appraisal.Status}</td>
                                

                                <td>
                                  <button onClick={() => setCurrent(appraisal)}>
                                  <Link to="/Appraisals/EditAppraisal">
                                    <i
                                      className=" fas fa-pencil-alt"
                
                                    ></i>
                                  </Link>
                                  </button>
                                </td>
                                <td>
                                  <button onClick={() => onDelete(appraisal._id)}>
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

export default Appraisals;
