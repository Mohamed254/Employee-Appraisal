import React, { useReducer } from "react";
import axios from "axios";
import UserContext from "./userContext";
import userReducer from "./userReducer";
import setAuthToken from "../../utils/SetAuthToken";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  SEND_SUCCESS,
  SEND_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  USER_LOADED,
  CLEAR_ERRORS,
  LOGIN_FAIL,
  AUTH_ERROR,
  SET_CURRENT,
  CLEAR_CURRENT
} from "../types";

const UserState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    current: null,
    errror: null,
  };

  const [state, dispatch] = useReducer(userReducer, initialState);
 //Load User

  const loadUser = async () => {
    //@todo setAuthToken
    setAuthToken(localStorage.token);
    

    try {
      const res = await axios.get("/api/auth/me");

      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };

//Register user
const register = async (formData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post("/api/auth/register", formData, config);

    // console.log(res.data);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    loadUser();
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response.data.message,
    });
  }
};


  //forgot password

  const sendEmail = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    try {
      const res = await axios.post("/api/auth/forgotPassword", formData, config);
  
      // console.log(res.data);
  
      dispatch({
        type: SEND_SUCCESS,
        payload: res.data,
      });
  
      loadUser();
    } catch (err) {
      dispatch({
        type: SEND_FAIL,
        payload: err.response.data.message,
      });
    }
  };







  //reset password
  //resetPassword

  const resetPassword = async (formData, resetToken) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    try {
      const res = await axios.put(`/api/auth/resetpassword/${resetToken}`, formData, config);
  
      // console.log(res.data);
  
      dispatch({
        type: SEND_SUCCESS,
        payload: res.data,
      });
  
      loadUser();
    } catch (err) {
      dispatch({
        type: SEND_FAIL,
        payload: err.response.data.message,
      });
    }
  };




  //login user
  
  const login = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/auth/login", formData, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      loadUser();
      
    } catch (err) {
      
      dispatch({
        type: LOGIN_FAIL,
        payload:err.response.data.message
        
      });
      console.log(err);
      
    }
  };

  //logout
  const logout = () => {
    dispatch({
      type: LOGOUT,
    });
  };
  //clear error
  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS,
    });
  };


  const setCurrent = (current) => {
    dispatch({
      type: SET_CURRENT,
      payload: current,
    });

    console.log();
  };
  //Clear Current User
  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT,
    });
  };


  return (
    <UserContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        current: state.current,
        loadUser,
        register,
        resetPassword,
        sendEmail,
        login,
        logout,
        clearErrors,
        setCurrent,
        clearCurrent
      }}
    >
      {props.children}
    </UserContext.Provider>
  );


};

export default UserState
