/* eslint-disable import/no-anonymous-default-export */
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


  export default (state, action) => {
    switch (action.type) {
      case APPRAISAL_LOADED:
        return {
          ...state,
          loading: false,
          appraisal: action.payload,
        };
      case GET_APPRAISALS:
        return {
          ...state,
          loading: false,
          appraisals: action.payload,
        }
      case ADD_APPRAISAL:
        return {
          ...state,
          appraisal: [...state.appraisal, action.payload],
          loading: false,
        };
        case UPDATE_APPRAISAL:
          return {
            ...state,
            appraisals: state.appraisals.map((appraisal) =>
              appraisal._id === action.payload._id ? action.payload : appraisal
            ),
            loading: false,
          };
    
        case DELETE_APPRAISAL:
          return {
            ...state,
            appraisals: state.appraisals.filter(
              (appraisal) => appraisal._id !== action.payload
            ),
            loading: false,
          };
        case APPRAISAL_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
      case CLEAR_CURRENT:
        return {
          ...state,
          current: null,
        };
        default:
      return state;
  }
};