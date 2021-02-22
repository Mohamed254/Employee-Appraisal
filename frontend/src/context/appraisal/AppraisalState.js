import React, { useReducer } from "react";
import axios from "axios";
// import { v4 as uuidv4 } from "uuid";
// import uuid from "uuid";
// import { v4 as uuid } from "uuid";
// import {v4 as uuid} from "uuid";
import AppraisalContext from "./appraisalContext";
import appraisalReducer from "./appraisalReducer";

import {
    APPRAISAL_LOADED,
    GET_APPRAISALS,
    ADD_APPRAISAL,
    DELETE_APPRAISAL,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_APPRAISAL,
    
    
    
    
    APPRAISAL_ERROR,
  } from "../types";

  const AppraisalState = (props) => {
    const initialState = {
      current: null,
      loading: true,
      appraisal: [],
      appraisals: null,
      error: null,
    };
  
    const [state, dispatch] = useReducer(appraisalReducer, initialState);


  
    //load appraisal for the user to see the feedback
    const loadappraisal = async () => {

      
      
      try {
        const res = await axios.get(`/api/appraisal/getsingle`);
        dispatch({
          type: APPRAISAL_LOADED,
          payload: res.data,
        });
      } catch (err) {
        dispatch({
          type: APPRAISAL_ERROR,
          payload: err.message,
        });
      }
    };




    //getappraisals for the admin
    const getAppraisals = async () => {
      
      try {
        const res = await axios.get('/api/appraisal/getall');
        
        dispatch({
          type: GET_APPRAISALS,
          payload: res.data,
        });
      } catch (err) {
        dispatch({
          type: APPRAISAL_ERROR,
          payload: err.message,
        });
      }
    };



    //Add Appraisal
  const addAppraisal = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/appraisal/create", formData, config);

      dispatch({
        type: ADD_APPRAISAL,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: APPRAISAL_ERROR,
        payload: err.message,
      });
    }
  };



  //Update appraisal
  const updateAppraisal = async (formData, _id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(`/api/appraisal/${_id}`, formData, config);

      dispatch({
        type: UPDATE_APPRAISAL,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: APPRAISAL_ERROR,
        payload: err.response.message,
      });
    }
  };
  // Delete user
  const deleteAppraisal = async (_id) => {
    try {
      await axios.delete(`/api/appraisal/${_id}`);

      dispatch({
        type: DELETE_APPRAISAL,
        payload: _id,
      });
    } catch (err) {
      dispatch({
        type: APPRAISAL_ERROR,
        payload: err.response.msg,
      });
    }
  };



  //Set Current User
  const setCurrent = (appraisal) => {
    dispatch({
      type: SET_CURRENT,
      payload: appraisal,
    });

    console.log(appraisal);
    console.log('err');
  };
  //Clear Current User
  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT,
    });
  };

    return (
        <AppraisalContext.Provider
          value={{
            appraisal: state.appraisal,
            appraisals: state.appraisals,
            current: state.current,
            error: state.error,
            loadappraisal,
            addAppraisal,
            getAppraisals,
            setCurrent,
            clearCurrent,
            updateAppraisal,
            deleteAppraisal
            // addUser,
            // deleteUser,
            // loaduser,
            // setCurrent,
            // clearCurrent,
            // updateUser
          }}
        >
          {props.children}
        </AppraisalContext.Provider>
      );


  };


  export default AppraisalState;