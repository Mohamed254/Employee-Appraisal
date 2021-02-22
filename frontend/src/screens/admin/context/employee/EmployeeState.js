import React, { useReducer } from "react";
import axios from "axios";
// import { v4 as uuidv4 } from "uuid";
// import uuid from "uuid";
// import { v4 as uuid } from "uuid";
// import {v4 as uuid} from "uuid";
import employeeContext from "./employeeContext";
import employeeReducer from "./employeeReducer";

import {
    
    GET_EMPLOYEES,
    UPDATE_EMPLOYEE,
    DELETE_EMPLOYEE,
    SET_CURRENT,
    EMPLOYEE_ERROR,
    CLEAR_CURRENT,
    
    
    
    
    
    
  } from "../types";


  const EmployeeState = (props) => {
    const initialState = {
      current: null,
      loading: true,
      users: null,
      error: null,
    };
  
    const [state, dispatch] = useReducer(employeeReducer, initialState);


    




    //Register user
    

  
    //load appraisal for the user to see the feedback
    // const loadappraisal = async () => {

      
      
    //   try {
    //     const res = await axios.get(`/api/appraisal/getsingle`);
    //     dispatch({
    //       type: APPRAISAL_LOADED,
    //       payload: res.data,
    //     });
    //   } catch (err) {
    //     dispatch({
    //       type: APPRAISAL_ERROR,
    //       payload: err.message,
    //     });
    //   }
    // };




    //getappraisals for the admin
    const getEmployees = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      
      try {
        const res = await axios.get('/api/auth/getusers', config);
        
        dispatch({
          type: GET_EMPLOYEES,
          payload: res.data,
        });
      } catch (err) {
        dispatch({
          type: EMPLOYEE_ERROR,
          payload: err.msg,
        });
      }
    };



  //Update appraisal
  const updateEmployee = async (formData, user) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(`/api/users/${user._id}`, formData, config);

      dispatch({
        type: UPDATE_EMPLOYEE,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: EMPLOYEE_ERROR,
        payload: err.message,
      });
    }
  };
  // Delete user
  const deleteUser = async (_id) => {

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.delete(`/api/users/${_id}`, config);

      dispatch({
        type: DELETE_EMPLOYEE,
        payload: _id,
      });
    } catch (err) {
      dispatch({
        type: EMPLOYEE_ERROR,
        payload: err.response.message,
      });
    }
  };




  //Set Current User
  const setCurrent = (user) => {
    dispatch({
      type: SET_CURRENT,
      payload: user,
    });

    console.log(user);
    console.log('err');
  };
//   //Clear Current User
  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT,
    });
  };

    return (
        <employeeContext.Provider
          value={{
            users: state.users,
            error: state.error,
            current: state.current,
            getEmployees,
            updateEmployee,
            setCurrent,
            clearCurrent,
            deleteUser

            
            // addUser,
            // deleteUser,
            // loaduser,
            
            // updateUser
          }}
        >
          {props.children}
        </employeeContext.Provider>
      );


  };


  export default EmployeeState;