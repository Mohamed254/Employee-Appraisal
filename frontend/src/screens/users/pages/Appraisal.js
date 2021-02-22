/* eslint-disable react/style-prop-object */
import React, { Fragment, useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../../../App.css';
import Bar from '../Bar';
import AppraisalContext from "../../../context/appraisal/appraisalContext";
import UserContext from "../../../context/user/userContext";



const Appraisal = (props) => {
  const appraisalContext = useContext(AppraisalContext);
  const userContext = useContext(UserContext);

  const { isAuthenticated } = userContext;

  const { addAppraisal } = appraisalContext;

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push("/RegisteredAppraisal/Appraisal");
    }
    // //clear errors
    // clearErrors();
    // eslint-disable-next-line
  }, [isAuthenticated, props.history]);

  // const { addUser } = userContext();

  const [appraisal, setAppraisal] = useState({
    Appraisal_Name: "",
    Communication_Skills: "",
    Teamwork: "",
    Interpersonal_Skills: "",
    Problem_solving: "",
    Integrity: "",
    Status: "",
    
    Overall_Score: "",
    File_Upload: "",
    
  });

  const {
    Appraisal_Name,
    Communication_Skills,
    Teamwork,
    Interpersonal_Skills,
    Problem_solving,
    Integrity,
    Status,
    Overall_Score,
    File_Upload
    
  } = appraisal;

  const onChange = (e) => setAppraisal({ ...appraisal, [e.target.name]: e.target.value });


 

  const onSubmit = (e) => {
    e.preventDefault();
    
    addAppraisal({
      Appraisal_Name,
      Communication_Skills,
      Teamwork,
      Interpersonal_Skills,
      Problem_solving,
      Integrity,
      Status,
      Overall_Score,
      File_Upload
    });
    props.history.push("/RegisteredAppraisal")
    console.log({addAppraisal});
  };


  const rangeValue = document.getElementById("rangeValue");
  
  const onInput = () => (rangeValue.innerHTML = Overall_Score);
  
  
  
  


  // var slider = document.getElementById


  return (
    <Fragment>
      <Bar />
      
      {/* <!-- cards --> */}
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
                          to='/Appraisal'
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
                            <label for='inputPassword4'>Appraisal Name</label>
                            <select className='form-control form-control-sm' 
                            name='Appraisal_Name' 
                            value={Appraisal_Name}
                            onChange={onChange} 
                            required 
                            >
                              <option></option>
                              <option>Daily</option>
                              <option>Weekly</option>
                              <option>Monthly</option>
                              <option>Quarterly</option>
                              <option>Semiannually</option>
                              <option>Annually</option>
                              
                              
                              
                            </select>
                            
                          </div>
                        <div className='form-group col-md-12'>
                            <label for='inputPassword4'>Communication Skills </label>
                            <select className='form-control form-control-sm' 
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
                            <label for='inputPassword4'>Teamwork </label>
                            <select className='form-control form-control-sm' 
                            name='Teamwork' 
                            value={Teamwork}
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
                            <label for='inputPassword4'>Interpersonal Skills </label>
                            <select className='form-control form-control-sm' 
                            name='Interpersonal_Skills' 
                            value={Interpersonal_Skills}
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
                            <label for='inputPassword4'>Problem Solving </label>
                            <select className='form-control form-control-sm' 
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
                            <label for='inputPassword4'>Integrity </label>
                            <select className='form-control form-control-sm' 
                            name='Integrity' 
                            value={Integrity}
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
                            <label for='inputPassword4'>Status </label>
                            <select className='form-control form-control-sm' 
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


                          {/* <div className='form-group col-md-12'>
                            <label for='inputPassword4'>Feedback</label>
                            <textarea
                              className='form-control'
                              id='exampleFormControlTextarea1'
                              rows='3'
                              placeholder='Comment'
                              name='Feedback' 
                              value={Feedback}
                              onChange={onChange} 
                            ></textarea>
                            
                          </div> */}


                          <div className='form-group col-md-12'>
                          <label for='inputPassword4'> </label>
                          <input type="file" name="File_Upload" value={File_Upload} onChange={onChange} />
                          </div>

                          <div className='form-group col-md-12'>
                          <label for='inputPassword4'>Overall Scores </label>
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
                              Submit
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

export default Appraisal;
