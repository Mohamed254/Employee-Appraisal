/* eslint-disable import/no-anonymous-default-export */
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    GET_EMPLOYEES,
    UPDATE_EMPLOYEE,
    DELETE_EMPLOYEE,
    SET_CURRENT,
    EMPLOYEE_ERROR,
    CLEAR_CURRENT,
    
    
    
    
    
    
  } from "../types";


  export default (state, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
        
        localStorage.setItem("token", action.payload.token);
        return {
          ...state,
          ...action.payload,
          isAuthenticated: true,
          loading: false,
        };
      case REGISTER_FAIL:
      
        localStorage.removeItem("token");
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
          user: null,
          error: action.payload,
        };
      
      case GET_EMPLOYEES:
        return {
          ...state,
          loading: false,
          users: action.payload,
        }
      
        case UPDATE_EMPLOYEE:
          return {
            ...state,
            users: state.users.map((user) =>
              user._id === action.payload._id ? action.payload : user
            ),
            loading: false,
          };
    
        case DELETE_EMPLOYEE:
          return {
            ...state,
            users: state.users.filter(
              (user) => user._id !== action.payload
            ),
            loading: false,
          };
        case EMPLOYEE_ERROR:
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