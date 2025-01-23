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
import { useContext, useState } from 'react';

import Card from '@mui/material/Card';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/UIElements/Button';
import { PlaceShareContext } from '../../shared/context/PlaceShareContextProvider';
import { useForm } from '../../shared/hooks/FormHook';
import
{
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../shared/utils/validators';
import './AuthenticatePage.css';
import { useNavigate } from 'react-router-dom';

const AuthenticatePage = () =>
{
  const auth = useContext(PlaceShareContext);
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

  const switchModeHandler = () =>
  {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined
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
          }
        },
        false
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  const authSubmitHandler = event =>
  {
    event.preventDefault();
    console.log(formState.inputs);
    auth.login();
    navigateTo('/');

  };

  return (
    <Card className="authentication">
      <h2>Login Required</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <Input
            element="input"
            id="name"
            type="text"
            label="Your Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name."
            onInput={inputHandler}
          />
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
          validators={[VALIDATOR_MINLENGTH(8)]}
          errorText="Password must contains:at least 8 characters,1 Capital,1 lower and 1 symbol."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.formIsValid}>
          {isLoginMode ? 'LOGIN' : 'SIGNUP'}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
      </Button>
    </Card>
  );
};

export default AuthenticatePage;
