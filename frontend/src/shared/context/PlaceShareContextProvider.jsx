/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useCallback, useEffect, useState } from "react";
import PlaceShareContext from "../hooks/usePlaceShare.js";

/**  NOTE
 * Initial create Context is just for helping the development process {autocomplete}
 
 */

// const initialState = {
//   isLoggedIn: false,
//   userId: null,
//   token: null
// };

// const actionTypes = {
//   LOGIN: 'LOGIN',
//   LOGOUT: 'LOGOUT'
// };

// const authReducer = (state, action) =>
// {
//   switch (action.type) {
//     case actionTypes.LOGIN:
//       return {
//         ...state,
//         isLoggedIn: true,
//         userId: action.payload.userId,
//         token: action.payload.token
//       };
//     case actionTypes.LOGOUT:
//       return {
//         ...state,
//         isLoggedIn: false,
//         userId: null,
//         token: null
//       };
//     default:
//       return state;
//   }
// };
let logoutTimer;
const PlaceShareContextProvider = ({ children }) =>
{

  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState(null);


  const login = useCallback((userId, token, expirationDate) =>
  {

    setToken(token);
    setUserId(userId);
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);

    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId,
        token,
        expiration: tokenExpirationDate.toISOString()
      }));
  }, []);

  const logout = useCallback(() =>
  {
    setToken(null);
    setUserId(null);
    setTokenExpirationDate(null);
    localStorage.removeItem('userData');
  }, []);


  useEffect(() =>
  {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    }
    else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => 
  {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
      login(storedData.userId, storedData.token, new Date(storedData.expiration));
    }

  }, [login]);




  const contextValue = {
    isLoggedIn: !!token,
    userId,
    token,
    login,
    logout
  };

  return (
    <PlaceShareContext.Provider value={contextValue}>
      {children}
    </PlaceShareContext.Provider>
  );


};

export default PlaceShareContextProvider;
