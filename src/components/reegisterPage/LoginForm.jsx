import React, { useState } from "react";
import { TextField, Box, Typography, Button, Alert } from "@mui/material";
import Spinner from "../spinner/Spinner";
import { setError } from "../reducers/eventsReducer/eventsActions";
import { inputValidator } from "../../utils/formValidator";
import { login } from "../../gateway/apiEndpoints";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";

const LoginForm = () => {
  const [input, setInput] = useState({
    lemail: "",
    lpassword: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, messages } = useSelector((state) => state.events);
  const { displaySpinner } = useSelector((state) => state.spinner);
  const inputHandler = (e) => {
    if (error.msg) {
      console.log(error);
      dispatch(
        setError({
          type: "SET_ERRORS",
          payload: null,
        })
      );
    }
    setInput((state) => ({
      ...state,
      [e.target.name]: e.target.value.toLowerCase(),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputValidator(input.lemail)) {
      return dispatch(
        setError({
          type: "SET_ERRORS",
          payload: "Input correct email",
        })
      );
    }

    const res = await login(input);
    localStorage.setItem("token", res.candidate);
    toggleSpinner();
    if (res.candidate) {
      dispatch(
        setError({
          type: "SET_ERRORS",
          payload: null,
        })
      );
      toggleSpinner();
      navigate(`/calendar`);
    } else {
      dispatch(
        setError({
          type: "SET_ERRORS",
          payload: res.msg,
        })
      );
      toggleSpinner();
    }
  };

  const toggleSpinner = () => {
    dispatch({ type: "TOGGLE_SPINNER" });
  };
  console.log(error);
  return (
    <>
      {displaySpinner && (
        <Box sx={{ position: "fixed", top: "100px", left: "23.5vw" }}>
          <Alert severity="warning">
            First launch of application can to take over 30 seconds, because
            server was placed on free plan and has limits to speed of loading
          </Alert>
        </Box>
      )}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "40vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: "30vh auto",
        }}
        noValidate
        autoComplete="off"
      >
        {error.msg && <Alert severity="error"> {error.msg}</Alert>}
        {messages.msg && <Alert security="succes">{messages.msg} </Alert>}
        <Typography component={"h1"} textAlign={"center"}>
          Login
        </Typography>
        <TextField
          id="email"
          label="email"
          name="lemail"
          variant="outlined"
          value={input.lemail}
          onChange={inputHandler}
          sx={{ marginTop: "10px" }}
        />
        <TextField
          id="password"
          label="password"
          name="lpassword"
          variant="outlined"
          value={input.lpassword}
          onChange={inputHandler}
          type="password"
          sx={{ marginTop: "10px" }}
        />

        <Button
          type="submit"
          onClick={(e) => handleSubmit(e)}
          disabled={input.lemail === "" || input.lpassword === ""}
        >
          {displaySpinner ? <Spinner /> : "submit"}
        </Button>
      </Box>
    </>
  );
};

export default LoginForm;
