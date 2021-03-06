import React, { useState, useEffect, useContext } from "react";
import EmployeeContext from "../../context/employee/employeeContext";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../../../context/alert/alertContext";
// import { Link } from 'react-router-dom';

const AddEmployee = (props) => {
  const alertContext = useContext(AlertContext);
  const employeeContext = useContext(EmployeeContext);
  const authContext = useContext(AuthContext);
  

  const { isAuthenticated } = authContext;

  const { setAlert } = alertContext;

  const { addEmployee, error, clearErrors } = employeeContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/Employee");
    }

    if (error === "User already exist") {
      setAlert(error, "danger");
      clearErrors();
    }
    //eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
    confirmpassword: "",
  });

  const {
    name,
    email,
    role,
    password,
    confirmpassword,
  } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    // console.log('submitted');

    if (name === "" || email === "" || password === "") {
      setAlert("Please Enter All Fields", "danger");
    } else if (password !== confirmpassword) {
      setAlert("Passwords do not match", "danger");
    } else {
      // console.log("registered");
      // console.log({ name, email, password });
      addEmployee({
        name,
        email,
        role,
        password,
        confirmpassword,
      });
    }
  };

  return (
    <section>
    <div className="container">
      <div className="row">
        <div className="col-xl-10 col-lg-9 col-md-8 ml-auto">
          <div className="row pt-md-5 mt-md-3 mb-5">
            <div className="col-md-12 mb-3">
              <div className="card">
                <div className="card-header">
                  User Registration
                  
                </div>

                <div className="card-body">
                  <form onSubmit={onSubmit}>
                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <label for="inputName1"></label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputName1"
                          placeholder="Emloyee Name"
                          name="name"
                          value={name}
                          onChange={onChange}
                          required
                        />
                      </div>

                      

                      <div className="form-group col-md-12">
                        <label for="inputEmail1"></label>
                        <input
                          type="email"
                          className="form-control"
                          id="inputEmail1"
                          placeholder="Email"
                          name="email"
                          value={email}
                          onChange={onChange}
                          required
                        />
                      </div>

                      <div className="form-group col-md-12">
                        <label for="inputPhone1"></label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputPhone1"
                          placeholder="Role"
                          name="role"
                          value={role}
                          onChange={onChange}
                          required
                        />
                      </div>
                      

                      

                      <div className="form-group col-md-6">
                        <label for="inputPassword1">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="inputPassword1"
                          placeholder="Password"
                          name="password"
                          value={password}
                          onChange={onChange}
                          required
                          minLength="6"
                        />
                      </div>

                      <div className="form-group col-md-6">
                        <label for="inputPassword2">Confirm Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="inputPassword2"
                          placeholder="Confirm Password"
                          name="confirmpassword"
                          value={confirmpassword}
                          onChange={onChange}
                          required
                          minLength="6"
                        />
                      </div>

                      <div className="form-group col-md-12">
                        <button
                          className="btn btn-success btn-block btn-lg"
                          type="submit"
                          onChange={onChange}
                        >
                          Add User
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
  );
};

export default AddEmployee;
