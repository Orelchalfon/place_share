/* eslint-disable no-unused-vars */
import React from "react";
import { useParams } from "react-router-dom";
import { usePlaceShare } from "../../shared/hooks/usePlaceShare";
import PlaceItemList from "../components/PlaceItemList";

const UsersPlacesPage = () =>
{
  const { places } = usePlaceShare();
  const { uId } = useParams();
  const userPlaces = places.filter((place) => place.creator === uId);
  return <PlaceItemList items={userPlaces} />;
};

export default UsersPlacesPage;
