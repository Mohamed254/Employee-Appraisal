import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../context/user/userContext";
import AlertContext from "../../context/alert/alertContext";



const ResetPassword= (props) => {

  const alertContext = useContext(AlertContext);
  const userContext = useContext(UserContext);

  const { setAlert } = alertContext;

  const { resetPassword, error, clearErrors, isAuthenticated } = userContext;

  const resetToken = props.match.params.token;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/Reset");
    }

    if (error === "User already exist") {
      setAlert(error, "danger");
      clearErrors();
    }
    //eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [send, setReset] = useState({
    
    password: ""
  });

  const {
  
    password,
    
  } = send;

  const onChange = (e) => setReset({ ...send, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    // console.log('submitted');

    if ( password === "" ) {
      setAlert("Please Enter All Fields", "danger");
    
    } else {
      // console.log("registered");
      // console.log({ name, email, password });
      resetPassword({
        
        password,
        
        
      }, resetToken);
      props.history.push("/login")
    }
  };






    return (
        <div className='container-fluid mt-5'>
      <div className='row h-100 justify-content-center align-items-center'>
        <div className='col-md-4'>
          <div className='card br-10 bg-dark'>
          <div className='card-header'>
              <h3 className='text-center text-white'>Reset Password</h3>
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
                    type='password'
                    className='form-control form-control-lg'
                    name='password'
                    value={password}
                    onChange={onChange}
                    placeholder='password'
                    
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

export default ResetPassword
