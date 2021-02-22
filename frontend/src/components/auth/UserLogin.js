import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../context/user/userContext";
import AlertContext from "../../context/alert/alertContext";
import { Link } from 'react-router-dom';

const UserLogin = (props) => {
  const userContext = useContext(UserContext);
  const alertContext = useContext(AlertContext);
  const { login, error, clearErrors, isAuthenticated } = userContext;
  const { setAlert } = alertContext;
  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/user/Navbar");
    }
    // console.log(error);
    if (error === "The username or password you provided is incorrect. Please try again.") {
      setAlert(error, "danger");
    }
    clearErrors();
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user;

  const onChange = (e) =>
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();
    //check for validation
    if (email === "" || password === "") {
      setAlert("The username or password you provided is incorrect. Please try again.", "danger");
    } else {
      login({
        email,
        password,
      });
    }
    console.log({email, password});
  };

  return (
    <div className='container-fluid mt-5'>
      <div className='row h-100 justify-content-center align-items-center'>
        <div className='col-md-4'>
          <div className='card br-10 bg-dark'>
            <div className='card-header'>
              <h3 className='text-center text-white'>User Sign In</h3>
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
                    placeholder='Email'
                    onChange={onChange}
                    required
                  />
                </div>
                <div className='input-group mb-3'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text'>
                      <i className='fa fa-key'></i>
                    </span>
                  </div>
                  <input
                    type='password'
                    class='form-control form-control-lg'
                    name='password'
                    placeholder='Password'
                    value={password}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className='row'>
                  <div className='col'>
                    <button
                      type='submit'
                      className='btn btn-block btn-lg btn-primary'
                    >
                      Login
                    </button>
                  </div>
                </div>
                <br></br>
                
                <div className='row'>
                  <div className='col'>
                  <button type="button" >
                  

                  
                  <p className="text-right">
                  <Link to='/Forgot' >Forgot Your Password?
                  </Link>
                  </p>
                  
            
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
};

export default UserLogin;
