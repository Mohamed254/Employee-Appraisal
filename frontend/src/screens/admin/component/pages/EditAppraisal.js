import React, { useContext, useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import '../../../../App.css';
import BarTwo from '../BarTwo';

import AppraisalsContext from "../../context/appraisal/appraisalsContext";
import AuthContext from "../../context/auth/authContext";
import  'react-bootstrap';


const EditAppraisal = props => {
  const appraisalsContext = useContext(AppraisalsContext);
  const authContext = useContext(AuthContext);
  
  
  const { isAuthenticated } = authContext;


  const { updateAppraisal, current  } = appraisalsContext;



  

  

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push("/Appraisals/EditAppraisal");
    }
    // //clear errors
    // clearErrors();
    // eslint-disable-next-line
  }, [isAuthenticated, props.history]);

  

  const [ update, setUpdate] = useState({
    Communication_Skills: current.Communication_Skills,
    Problem_solving: current.Problem_solving,
    Feedback: current.Feedback,
    Status: current.Status,
    Overall_Score: current.Overall_Score,
    
    
    
  });

  const {
    Communication_Skills,
    Problem_solving,
    Feedback,
    Status,
    Overall_Score
    
    
  } = update;

  const onChange = e =>
    setUpdate({
      ...update,
      [e.target.name]: e.target.value
    });


 

    const onSubmit = e => {
      e.preventDefault();
    
    updateAppraisal({
      Communication_Skills,
      Problem_solving,
      Feedback,
      Status,
      Overall_Score
     
    },
      current
    );
    console.log({updateAppraisal});
    props.history.push("/Appraisals")
    
  };


  const rangeValue = document.getElementById("rangeValue");
  
  const onInput = () => (rangeValue.innerHTML = Overall_Score);
  
  
  
  


  


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
                      <b>APPRAISAL</b>
                      <button className=' btn btn-primary float-right '>
                        <Link
                          to='/Appraisals'
                          className=' nav-link text-white'
                        >
                          Check Appraisal
                        </Link>
                      </button>
                    </div>

                    <div className='card-body'>
                      <form onSubmit={onSubmit}>
                        <div className='form-row'>

                        

                          <div className='form-group col-md-12'>
                            <label htmlFor='inputPassword4'>Communication Skills </label>
                            <select className='form-control form-control-sm' 
                            id='inputPassword4'
                            name='Communication_Skills' 
                            value={Communication_Skills}
                            onChange={onChange} 
                            required 
                            >
                              <option></option>
                              <option>Exellent</option>
                              <option>Very Good</option>
                              <option>Good</option>
                              <option>Fair</option>
                              
                            </select>
                            
                          </div>

                          <div className='form-group col-md-12'>
                            <label htmlFor='inputPassword4'>Problem Solving </label>
                            <select className='form-control form-control-sm' 
                            id='inputPassword4'
                            name='Problem_solving' 
                            value={Problem_solving}
                            onChange={onChange} 
                            required 
                            >
                              <option></option>
                              <option>Exellent</option>
                              <option>Very Good</option>
                              <option>Good</option>
                              <option>Fair</option>
                              
                            </select>
                            
                          </div>
                        
                        

                          <div className='form-group col-md-12'>
                            <label htmlFor='inputPassword4'>Feedback</label>
                            <textarea
                              className='form-control'
                              id='exampleFormControlTextarea1'
                              rows='3'
                              placeholder='Comment'
                              name='Feedback' 
                              value={Feedback}
                              onChange={onChange} 
                            ></textarea>
                            
                          </div>


                          <div className='form-group col-md-12'>
                            <label htmlFor='inputPassword4'>Status </label>
                            <select className='form-control form-control-sm' 
                            id='inputPassword4'
                            name='Status' 
                            value={Status}
                            onChange={onChange} 
                            required 
                            >
                              <option></option>
                              <option>In Progress</option>
                              <option>Completed</option>
                              
                              
                            </select>
                            
                          </div>


                          
                          <div className='form-group col-md-12'>
                          <label htmlFor='inputPassword4'>Overall Scores </label>
                          <aside className="sliser">
                          
                            <input type="range" min="0" max="11" name = "Overall_Score" value= {Overall_Score} onInput = {onInput}  onChange={onChange} />
                            <p id="rangeValue"  onChange={onChange} ></p>
                          </aside>

                          
                          </div>
                         
                          


                          <div className='form-group col-md-12'>
                            <button
                              className='btn btn-success btn-block btn-lg'
                              type='submit'
                            >
                              Update Appraisal
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

export default EditAppraisal;
