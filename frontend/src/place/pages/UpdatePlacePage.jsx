/* eslint-disable no-unused-vars */
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Grid, IconButton } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GridLoader } from "react-spinners";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/UIElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useForm } from "../../shared/hooks/FormHook";
import useHttpClient from "../../shared/hooks/http-hook";
import { usePlaceShare } from "../../shared/hooks/usePlaceShare";
import
  {
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
  } from "../../shared/utils/validators";
import "./NewPlacePage.css";
const UpdatePlacePage = () =>
{
  const { userId, token } = usePlaceShare();
  const navTo = useNavigate()
  const { placeId } = useParams();

  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const [loadedPlace, setLoadedPlace] = useState();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );


  useEffect(() =>
  {
    const fetchPlace = async () =>
    {
      try {
        const responseData = await sendRequest(
          `${import.meta.env.VITE_BACKEND_URL}/places/${placeId}`
        );
        setLoadedPlace(responseData.place);
        setFormData(
          {
            title: {
              value: responseData.place.title,
              isValid: true,
            },
            description: {
              value: responseData.place.description,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {
        console.log(err);
      }
    }
    fetchPlace();
  }, [sendRequest, placeId, setFormData]);

  const submitUpdateForm = async (e) =>
  {
    e.preventDefault();
    try {
      await sendRequest(
        `${import.meta.env.VITE_BACKEND_URL}/places/${placeId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        }



      );
      navTo(`/${userId}/places`);
    } catch (error) {
      console.error(error);

    }
  };


  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedPlace && <form onSubmit={submitUpdateForm} className="place-form">
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          errorText="Please enter a valid title."
          defaultValue={loadedPlace.title}
          defaultValidation={true}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          onInput={inputHandler}
          errorText="Please enter a valid description (at least 5 characters)."
          defaultValue={loadedPlace.description}
          defaultValidation={true}
        />

        <Button disabled={!formState.formIsValid}>UPDATE PLACE</Button>
      </form>}
    </Fragment>
  );
};

export default UpdatePlacePage;
