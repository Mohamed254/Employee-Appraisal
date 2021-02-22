import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import setAuthToken from "../../utils/SetAuthToken";

import {
  // REGISTER_SUCCESS,
  // REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  ADMIN_LOADED,
  CLEAR_ERRORS,
  LOGIN_FAIL,
  AUTH_ERROR,
} from "../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    admin: null,
    errror: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);
 //Load User

  const loadAdmin = async () => {
    //@todo setAuthToken
    setAuthToken(localStorage.token);
    

    try {
      const res = await axios.get("/api/auth/me");

      dispatch({
        type: ADMIN_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };

  //register a user




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
      loadAdmin();
      
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


  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        loadAdmin,
        // register,
        login,
        logout,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );


};

export default AuthState
