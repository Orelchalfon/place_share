// import {  Card, colors } from "@mui/material";

// import { useContext, useState } from "react";
// import Input from "../../shared/components/FormElements/Input";
// import { PlaceShareContext } from "../../shared/context/PlaceShareContextProvider";
// import { useForm } from "../../shared/hooks/FormHook";
// import { VALIDATOR_EMAIL, VALIDATOR_PASS } from "../../shared/utils/validators";
// import { VALIDATOR_REQUIRE } from "./../../shared/utils/validators";
// import "./AuthenticatePage.css";
// import { useNavigate } from "react-router-dom";
// import Button from "../../shared/components/UIElements/Button";

// const AuthenticatePage = () =>
// {
//   const navigate = useNavigate()
//   const [isLogin, setIsLogin] = useState(true);
//   const { login } = useContext(PlaceShareContext);
//   const [formState, inputHandler, setFormData] = useForm(
//     {
//       name: {
//         value: "",
//         isValid: false,
//       },
//       email: {
//         value: "",
//         isValid: false,
//       },
//       password: {
//         value: "",
//         isValid: false,
//       },
//     },
//     false
//   );
//   const switchMode = () =>
//   {
//     if (!isLogin) {
//       setFormData(
//         {
//           ...formState.inputs,
//           name: undefined,
//         },
//         formState.inputs.email.isValid && formState.inputs.password.isValid
//       );
//     } else {
//       setFormData(
//         {
//           ...formState.inputs,
//           name: {
//             value: "",
//             isValid: false,
//           },
//         },
//         false
//       );
//     }
//     setIsLogin((prevMode) => !prevMode);
//   };
//   const authSubmitHandler = (e) =>
//   {
//     e.preventDefault()
//     console.log(formState.inputs)
//     login()
//   }
//   return (
//     <Card className="authentication">
//       <form action="submit" onSubmit={authSubmitHandler}>
//         {!isLogin && (
//           <Input
//             id="name"
//             element="input"
//             type="text"
//             label="Name"
//             validators={[VALIDATOR_REQUIRE()]}
//             onInput={inputHandler}
//             errorText="Please enter a valid title."
//           />
//         )}
//         <Input
//           id="email"
//           element="input"
//           type="email"
//           label="E-Mail Address"
//           validators={[VALIDATOR_EMAIL()]}
//           onInput={inputHandler}
//           errorText="Please enter a valid title."
//         />
//         <Input
//           id="password"
//           element="input"
//           type="password"
//           label="Password"
//           validators={[VALIDATOR_PASS()]}
//           onInput={inputHandler}
//           errorText="Password must contains:at least 8 characters,1 Capital,1 lower and 1 symbol."
//         />


//         <Button
//           type="submit"
//           color="primary"

//           variant="outlined"
//           disabled={!formState.formIsValid}
//         >
//           {isLogin ? "Sign-In" : "Sign-Up"}
//         </Button>
//       </form>
//       <p>
//         {isLogin ? "Don't have an account?" : "Already have an account?"}
//         <Button
//           size="small"
//           sx={{
//             ":hover": {
//               backgroundColor: colors.lightBlue[700],
//               letterSpacing: "1px",
//             },
//             textTransform: "none",
//             marginInline: "15px",
//             color: colors.lightBlue[50],
//             backgroundColor: colors.lightBlue[800],
//           }}
//           onClick={() => switchMode()}
//         >
//           {isLogin ? "Sign-Up" : "Sign-In"}
//         </Button>
//       </p>
//     </Card>
//   );
// };

// export default AuthenticatePage;
import
{
  useState
} from 'react';

import Card from '@mui/material/Card';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { GridLoader } from 'react-spinners';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/UIElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { useForm } from '../../shared/hooks/FormHook';
import { usePlaceShare } from '../../shared/hooks/usePlaceShare';
import
{
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../shared/utils/validators';
import useHttpClient from './../../shared/hooks/http-hook';
import './AuthenticatePage.css';

const AuthenticatePage = () =>
{
  const auth = usePlaceShare();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const navigateTo = useNavigate();
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );
  const { isLoading, error, sendRequest, clearError } = useHttpClient();


  const switchModeHandler = async () =>
  {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false
          },
          image: {
            value: null,
            isValid: false
          }
        },
        false
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  const authSubmitHandler = async (event) =>
  {

    event.preventDefault();

    if (isLoginMode) {
      try {

        const responseData = await sendRequest(
          `${import.meta.env.VITE_BACKEND_URL}/users/login`,
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
          {
            'Content-Type': 'application/json'
          }
        );

        const { userId, token, expiration } = responseData;
        auth.login(userId, token, expiration);
        navigateTo('/');
      }
      catch (err) {
        console.log(err);
      }

    }
    else {
      try {
        const formData = new FormData();
        formData.append('email', formState.inputs.email.value);
        formData.append('name', formState.inputs.name.value);
        formData.append('password', formState.inputs.password.value);
        formData.append('image', formState.inputs.image.value);

        const responseData =
          await sendRequest(
            `${import.meta.env.VITE_BACKEND_URL}/users/signup`,
            'POST',
            formData

          );
        const { userId, token, expiration } = responseData;

        auth.login(userId, token, expiration);
        console.log(`responseData`, responseData);
        navigateTo('/');
      }
      catch (err) {
        console.log(err);
      }
    }

  };
  if (isLoading)
    return <div className="center">
      <GridLoader color="#f50057" loading={isLoading} size={50} />
    </div>;
  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <>
              <Input
                element="input"
                id="name"
                type="text"
                label="Your Name"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid name (at least 5 characters)."
                onInput={inputHandler}
              />
              <ImageUpload center id="image" onInput={inputHandler} />
            </>
          )}

          <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(8),]}
            errorText="Password must contains:at least 8 characters,1 Capital,1 lower and 1 symbol."
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.formIsValid}>
            {isLoginMode ? 'LOGIN' : 'SIGNUP'}
          </Button>
        </form>
        <Button inverse="true" onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
        </Button>
      </Card>

    </Fragment>
  );
};

export default AuthenticatePage;
