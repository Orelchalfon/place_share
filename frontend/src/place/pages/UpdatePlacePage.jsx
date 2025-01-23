/* eslint-disable no-unused-vars */
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Grid, IconButton } from "@mui/material";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import { PlaceShareContext } from "../../shared/context/PlaceShareContextProvider";
import { useForm } from "../../shared/hooks/FormHook";
import
{
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GridLoader } from "react-spinners";
import "./NewPlacePage.css";
const UpdatePlacePage = () =>
{
  const navTo = useNavigate()
  const { placeId } = useParams();

  const { places, updatePlace } = useContext(PlaceShareContext);

  const [formIsLoading, setFormIsLoading] = useState(true);

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

  const chosenPlace = places.find((place) => place.id === placeId);

  useEffect(() =>
  {
    if (chosenPlace)
      setFormData(
        {
          title: {
            value: chosenPlace.title,
            isValid: true,
          },
          description: {
            value: chosenPlace.description,
            isValid: true,
          },
        },
        true
      );

    setInterval(() =>
    {
      setFormIsLoading(false);
    }, 300);
  }, [setFormData, chosenPlace]);

  const submitUpdateForm = (e) =>
  {
    e.preventDefault();
    console.table(formState.inputs);

    updatePlace({placeId, ...formState.inputs});
    navTo(`/${chosenPlace.creator}/places`);

  };
  if (formIsLoading) {
    return (
      <div className="center">
        <GridLoader color="#d64a36" loading={formIsLoading} size={40} />
      </div>
    );
  }

  if (!chosenPlace) {
    return (
      <div className="center">
        <Card sx={{ padding: ".75rem" }}>
          <h2>{`could'nt find place`}</h2>
        </Card>
      </div>
    );
  }
  return (
    <form action="" onSubmit={submitUpdateForm} className="place-form">
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
        errorText="Please enter a valid title."
        defaultValue={formState.inputs.title.value}
        defaultValidation={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        onInput={inputHandler}
        errorText="Please enter a valid description (at least 5 characters)."
        defaultValue={formState.inputs.description.value}
        defaultValidation={formState.inputs.description.isValid}
      />
      <IconButton
        type="submit"
        variant="text"
        color="primary"
        className="updateBtn"
        size="large"
        disabled={!formState.formIsValid}
        TouchRippleProps={{ style: { color: "#60ccea", opacity: 0.325 } }}
        timeout={{ enter: 750, exit: 350 }}
      >
        <FontAwesomeIcon icon={faUpload} />
      </IconButton>
      {/* <Button disabled={!formState.formIsValid}>UPDATE PLACE</Button> */}
    </form>
  );
};

export default UpdatePlacePage;
