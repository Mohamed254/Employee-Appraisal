import React, {  useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import '../../../App.css';
import Bar from '../Bar';
// import AppraisalContext from "../../../context/appraisal/appraisalContext";
import UserContext from "../../../context/user/userContext";
import  'react-bootstrap';

const RegisteredAppraisal = (props) => {
  
  const userContext = useContext(UserContext);

  const { isAuthenticated } = userContext;

  


  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push("/RegisteredAppraisal");
    }
    //loading user
    // loadappraisal();
    //get all users users

    // eslint-disable-next-line
  }, [isAuthenticated, props.history]);

  // const onDelete = (id) => {
  //   deleteAppraisal(id);
  //   console.log("Deleted");
  //   clearCurrent();
  // };  




    return (
      
        <div>
          <Bar />
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
                        <Link
                          to='/RegisteredAppraisal/Appraisal'
                          className=' nav-link text-white'
                        >
                          Add Appraisal
                        </Link>
                      </button>
                    </div>
                    <div className='card-body'>
                      <table className='table'>
                        {/* <caption>List of Appraisal</caption> */}
                        <thead>
                          {/* <tr>
                            <th scope="col">Employee Name</th>
                            <th scope="col">Communication SKills</th>
                            <th scope="col">Team Work</th>
                            <th scope="col">Interpersonal Skills</th>
                            <th scope="col">Problem Solving</th>
                          
                            {/* <th scope="col">Edit</th>
                            <th scope="col">Delete</th> */}
                          {/* </tr> */} 
                        </thead>
                        {/* <tbody>
                        {appraisal && appraisal.map((appraisal) => (
                            <Fragment>
                              <tr>
                                <td>{appraisal.name}</td>
                                <td>{appraisal.Communication_SKills}</td>
                                <td>{appraisal.Teamwork}</td>
                                <td>{appraisal.Interpersonal_Skills}</td>
                                <td>{appraisal.Problem_solving}</td>
                                

                                <td>
                                  <button onClick={() => setCurrent(appraisal) }>
                                  <Link to="/UserRegistration/edit">
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
                        </tbody> */}
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

export default RegisteredAppraisal
