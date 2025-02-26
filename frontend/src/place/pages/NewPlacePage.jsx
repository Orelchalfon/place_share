import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Button from "../../shared/components/FormElements/Button";
import { IconButton } from "@mui/material";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { GridLoader } from "react-spinners";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import Input from "../../shared/components/FormElements/Input";
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

const NewPlacePage = () =>
{
  const { userId, token } = usePlaceShare();
  const navigateTo = useNavigate();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      }
    },
    false
  );
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const placeSubmitHandler = async (event) =>
  {
    event.preventDefault();
    try {
      const formData = new FormData();

      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("address", formState.inputs.address.value);
      formData.append("creator", userId);
      formData.append("image", formState.inputs.image.value);
      console.log(`formState.inputs.image.value`, formState.inputs.image.value);
      await sendRequest(
        `${import.meta.env.VITE_BACKEND_URL}/places`,
        "POST",
        formData,
        {
          Authorization: "Bearer " + token,
        }

      );
      console.log("formData", formData);
      console.log(`formState`, formState);
      navigateTo(`/${userId}/places`);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Fragment>


      <ErrorModal error={error} onClear={clearError} />

      <form
        className="place-form"
        onSubmit={placeSubmitHandler}
      >
        {isLoading && <div className="loading-spinner__overlay">
          <GridLoader color="#f50057" loading={isLoading} size={50} />
        </div>}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <Input
          id="address"
          element="input"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address."
          onInput={inputHandler}
        />
        <ImageUpload center id="image" onInput={inputHandler} errorText={"Please provide an image!"} />
        <IconButton
          type="submit"
          variant="text"
          color="primary"
          size="large"
          disabled={!formState.formIsValid}
          TouchRippleProps={{ style: { color: "#60ccea", opacity: 0.325 } }}
          timeout={{ enter: 750, exit: 350 }}
        >
          <FontAwesomeIcon icon={faPlusCircle} />
        </IconButton>
      </form>
    </Fragment>
  );
};

export default NewPlacePage;
