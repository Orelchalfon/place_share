/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useCallback, useEffect, useState } from "react";
import PlaceShareContext from "../hooks/usePlaceShare.js";
import Place from "../models/Place";
import User from "../models/User";
import imgs from "../utils/imgs.js";
const initialPlaces = [
  new Place(
    "p1",
    "Empire State Building",
    "One of the most famous sky scrapers in the world!",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Empire_State_Building_from_the_Top_of_the_Rock.jpg/1200px-Empire_State_Building_from_the_Top_of_the_Rock.jpg",
    "avnei derech 1",
    {
      lat: 40.7484405,
      lng: -73.9878531,
    },
    "u1"
  ),
  new Place(
    "p2",
    "Empire State Building",
    "One of the most famous sky scrapers in the world!",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Empire_State_Building_from_the_Top_of_the_Rock.jpg/1200px-Empire_State_Building_from_the_Top_of_the_Rock.jpg",
    "avnei derech 1",
    {
      lat: 40.7484405,
      lng: -73.9878531,
    },
    "u3"
  ),
  new Place(
    "p2",
    "Empire State Building",
    "One of the most famous sky scrapers in the world!",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Empire_State_Building_from_the_Top_of_the_Rock.jpg/1200px-Empire_State_Building_from_the_Top_of_the_Rock.jpg",
    "dizengoff center",
    {
      lat: 40.7484405,
      lng: -73.9878531,
    },
    "u2"
  ),
  new Place(
    "p6",
    "dizengoff center",
    "One of the most famous sky scrapers in the world!",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Empire_State_Building_from_the_Top_of_the_Rock.jpg/1200px-Empire_State_Building_from_the_Top_of_the_Rock.jpg",
    "dizengoff center",
    {
      lat: 40.7484405,
      lng: -73.9878531,
    },
    "u2"
  ),
];

/**  NOTE
 * Initial create Context is just for helping the development process {autocomplete}
 
 */



const PlaceShareContextProvider = ({ children }) =>
{
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [users, setUsers] = useState([]);
  const [places, setPlaces] = useState([]);

  const login = useCallback(() =>
  {
    setIsLoggedIn(true);

  }, []);
  const logout = useCallback(() =>
  {
    setIsLoggedIn(false);
  }, []);
  const addPlace = (place) =>
  {
    setPlaces((prevPlaces) => [...prevPlaces, place]);
  };
  const updatePlace = (place) =>
  {
    console.log(place);
    setPlaces((prevPlaces) =>
    {
      const placeIndex = prevPlaces.findIndex((p) => p.id === place.placeId);
      const updatedPlaces = [...prevPlaces];
      updatedPlaces[placeIndex] = place;
      return updatedPlaces;
    });
  };
  const deletePlace = (placeId) =>
  {
    setPlaces((prevPlaces) => prevPlaces.filter((p) => p.id !== placeId));
  };

  return (
    <PlaceShareContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        users,
        setUsers,
        places,
        setPlaces,
        addPlace,
        updatePlace,
        deletePlace,
      }}
    >
      {children}
    </PlaceShareContext.Provider>
  );
};

export default PlaceShareContextProvider;
