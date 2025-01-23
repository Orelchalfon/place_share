import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
// import Button from "../../shared/components/FormElements/Button";
import { IconButton } from "@mui/material";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import "./NewPlacePage.css";
import { useForm } from "../../shared/hooks/FormHook";

const NewPlacePage = () => {
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
    },
    false
  );
  // const [formState, dispatch] = useReducer(formReducer, {
  //
  // });

  // const inputHandler = useCallback((id, value, isValid) => {
  //   // console.log(id, value, isValid);
  //   // console.log(formState.formIsValid);
  //   dispatch({ type: "INPUT_CHANGE", value, isValid, inputId: id });
  // }, []);

  return (
    <form
      className="place-form"
      onSubmit={(e) => {
        console.table(formState);
        e.preventDefault();
      }}
    >
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
  );
};

export default NewPlacePage;
