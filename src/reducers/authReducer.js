"use client";

export const INITIAL_STATE = {
  user:
    // typeof window !== "undefined"
    //   ? JSON.parse(localStorage.getItem("currentuser")) || null
    //   : false,
    null,
  loading: false,
  error: null,
};

export const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        user: null,
        loading: false,
        error: action.payload,
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};
