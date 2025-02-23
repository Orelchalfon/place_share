/* eslint-disable no-unused-vars */
import React, { Fragment, Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { default as LoadingGridLayer, default as LoadingSpinner } from "../../shared/components/UIElements/LoadingGrid";
import useHttpClient from "../../shared/hooks/http-hook";
import PlaceItemList from "../components/PlaceItemList";



const UsersPlacesPage = () =>
{
  const [loadUserPlaces, setLoadUserPlaces] = useState([]);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const { uId } = useParams();

  useEffect(() =>
  {
    const fetchUserPlaces = async () =>
    {
      try {
        const responseData = await sendRequest(
          `${import.meta.env.VITE_BACKEND_URL}/places/user/${uId}`
        );
        setLoadUserPlaces(responseData.places);

      } catch (err) {
        console.log(err);
      }
    };

    fetchUserPlaces();

  }, [sendRequest, uId]);

  const deletePlaceHandler = (deletedPlaceId) =>
  {
    setLoadUserPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== deletedPlaceId)
    );
  }
  return <Fragment>

    <ErrorModal error={error} onClear={clearError} />
    {isLoading && <LoadingGridLayer asOverlay />}
    {!isLoading && loadUserPlaces && <PlaceItemList items={loadUserPlaces} onDeletePlace={deletePlaceHandler} />}
  </Fragment>
};

export default UsersPlacesPage;
