import React, { Fragment, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import '../../../App.css';
import Bar from '../Bar';
// import Content from '../Content';
import AppraisalContext from "../../../context/appraisal/appraisalContext";
import UserContext from "../../../context/user/userContext";
import  'react-bootstrap';

const Feedback = (props) => {
  const appraisalContext = useContext(AppraisalContext);
  const userContext = useContext(UserContext);

  const { isAuthenticated, user, setCurrent} = userContext;

  

  const { loadappraisal,   appraisal  } = appraisalContext;


  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push("/Feedback");
    }
 
   
    setCurrent(user);
    //loading all appraisal
    loadappraisal();

    

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
                      Feedback
                      <button className='btn btn-primary float-right'>
                        
                      </button>
                    </div>
                    <div className='card-body'>
                      <table className='table'>
                        
                        <thead>
                          <tr>
                            <th scope="col">Appraisal Name</th>
                            <th scope="col">Communication SKills</th>
                            <th scope="col">Problem Solving</th>
                            <th scope="col">Overall Score</th>
                            
                          
                            <th scope="col">Status</th>
                            <th scope="col">Feedback</th>
                          </tr>
                        </thead>
                        <tbody>
                        { appraisal && appraisal.map((appraisal) =>  (
                            <Fragment>
                              <tr  >
                                <td>{appraisal.Appraisal_Name}</td>
                                <td>{appraisal.Communication_Skills}</td>
                                <td>{appraisal.Problem_solving}</td>
                                <td>{appraisal.Overall_Score}</td>
                                
                                <td>{appraisal.Status}</td>
                                <td>{appraisal.Feedback}</td>
                                

                                
                              </tr>
                            </Fragment>
                          ))};
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

export default Feedback;
