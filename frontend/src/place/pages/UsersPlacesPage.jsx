/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import PlaceItemList from "../components/PlaceItemList";
import { PlaceShareContext } from "../../shared/context/PlaceShareContextProvider";

const UsersPlacesPage = () => {
  const { places } = useContext(PlaceShareContext);
  const { uId } = useParams();
  const userPlaces = places.filter((place) => place.creator === uId);
  return <PlaceItemList items={userPlaces} />;
};

export default UsersPlacesPage;
