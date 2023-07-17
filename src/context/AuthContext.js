"use client";

import { createContext, useEffect, useReducer } from "react";
import { INITIAL_STATE, AuthReducer } from "../reducers/authReducer";
import axios from "axios";
import { useRouter } from "next/navigation";
// typeof window !== "undefined"
//       ? JSON.parse(localStorage.getItem("currentUser"))._id || null
//       : false,
// const INITIAL_STATE = {
//   user:
//     // typeof window !== "undefined"
//     //   ? JSON.parse(localStorage.getItem("currentuser")) || null
//     //   : false,
//     null,
//   loading: false,
//   error: null,
// };

// export const AuthContext = createContext(INITIAL_STATE);

export const AuthContext = createContext();

// const AuthReducer = (state, action) => {
//   switch (action.type) {
//     case "LOGIN_START":
//       return {
//         user: null,
//         loading: true,
//         error: null,
//       };
//     case "LOGIN_SUCCESS":
//       return {
//         user: action.payload,
//         loading: false,
//         error: null,
//       };
//     case "LOGIN_FAILURE":
//       return {
//         user: null,
//         loading: false,
//         error: action.payload,
//       };
//     case "LOGOUT":
//       return {
//         user: null,
//         loading: false,
//         error: null,
//       };
//   }
// };

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  const router = useRouter();

  // useEffect(() => {
  //   const currentUser = JSON.parse(localStorage.getItem("currentuser"));
  //   if (currentUser) {
  //     dispatch({ type: "LOGIN_SUCCESS", payload: currentUser });
  //   }
  // }, []);

  console.log("From AuthContext", state);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      // Clear user data from localStorage
      localStorage.removeItem("currentuser");
      // Dispatch LOGOUT action
      dispatch({ type: "LOGOUT" });
      // Redirect to login page
      router.push("/login");
      // Perform additional actions here, such as removing cookies
      // ...
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
