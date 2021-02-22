/* eslint-disable import/no-anonymous-default-export */
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    SEND_SUCCESS,
    SEND_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
    SET_CURRENT,
    CLEAR_CURRENT
  } from "../types";



  
  export default (state, action) => {
    switch (action.type) {
      case USER_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          user: action.payload,
        };
      case REGISTER_SUCCESS:
      case LOGIN_SUCCESS:
      case SEND_SUCCESS:
        localStorage.setItem("token", action.payload.token);
        return {
          ...state,
          ...action.payload,
          isAuthenticated: true,
          loading: false,
        };
      case REGISTER_FAIL:
      case AUTH_ERROR:
      case LOGIN_FAIL:
      case LOGOUT:
        localStorage.removeItem("token");
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
          user: null,
          error: action.payload,
        };
      case SEND_FAIL:
        localStorage.removeItem("token");
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
          send: null,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
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
  