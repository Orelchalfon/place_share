/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useReducer, useEffect } from "react";
import { validate } from "../../utils/validators";
import "./Input.css";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "BLUR":
      return {
        ...state,
        isBlur: true,
      };
    case "FOCUS":
      return {
        ...state,
        isFocused: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.defaultValue || "",
    isValid: props.defaultValidation || false,
    isFocused: false,
    isBlur: false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;
  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const inputChangeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  const element =
    props.element === "input" ? (
      <input
        className="inp"
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        value={inputState.value}
        onChange={inputChangeHandler}
        onBlur={() => dispatch({ type: "BLUR" })}
        onFocus={() => dispatch({ type: "FOCUS" })}
      />
    ) : (
      <textarea
        className="inp"
        id={props.id}
        rows={props.rows || 3}
        value={inputState.value}
        onChange={inputChangeHandler}
        onBlur={() => dispatch({ type: "BLUR" })}
        onFocus={() => dispatch({ type: "FOCUS" })}
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isBlur && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isBlur && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
