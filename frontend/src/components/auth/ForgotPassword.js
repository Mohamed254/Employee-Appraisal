import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../context/user/userContext";
import AlertContext from "../../context/alert/alertContext";



const ForgotPassword = (props) => {

  const alertContext = useContext(AlertContext);
  const userContext = useContext(UserContext);

  

  const { sendEmail, error, clearErrors, isAuthenticated } = userContext;

  const { setAlert } = alertContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/Forgot");
    }

    if (error === "There is no user with this email address") {
      setAlert(error, "danger");
      clearErrors();
    }
    //eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [send, setSend] = useState({
    
    email: ""
  });

  const {
  
    email
    
  } = send;

  const onChange = (e) => setSend({ ...send, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    // console.log('submitted');

    if ( email === "" ) {
      setAlert("There is no user with this email address", "danger");
    
    } else {
      // console.log("registered");
      // console.log({ name, email, password });
      sendEmail({
        
        email
        
      });
      
      
      props.history.push("/")
    }
    
    
  };





    return (
        <div className='container-fluid mt-5'>
      <div className='row h-100 justify-content-center align-items-center'>
        <div className='col-md-4'>
          <div className='card br-10 bg-dark'>
          <div className='card-header'>
              <h3 className='text-center text-white'>Forgot Password</h3>
            </div>
            <div class='card-body'>
              <form onSubmit={onSubmit}>
                <input type='hidden' name='' />{" "}
                <div className='input-group mb-3'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text'>
                      <i className='fa fa-user'></i>
                    </span>
                  </div>
                  <input
                    type='email'
                    className='form-control form-control-lg'
                    name='email'
                    value={email}
                    onChange={onChange}
                    placeholder='Email'
                    
                    required
                  />
                </div>
               
                <div className='row'>
                  <div className='col'>
                    <button
                      type='submit'
                      className='btn btn-block btn-lg btn-primary'
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
  );
    
}

export default ForgotPassword
