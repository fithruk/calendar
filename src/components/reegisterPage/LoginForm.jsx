import React, { useState } from "react";
import { TextField, Box, Typography, Button, Alert } from "@mui/material";
import Spinner from "../spinner/Spinner";
import { setError } from "../reducers/eventsReducer/eventsActions";
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
    setInput((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await login(input);
    localStorage.setItem("token", res.candidate);
    toggleSpinner();
    if (res.candidate) {
      dispatch(setError({}));
      navigate(`/calendar`);
    } else {
      dispatch(setError(res));
    }
  };

  const toggleSpinner = () => {
    dispatch({ type: "TOGGLE_SPINNER" });
  };
  return (
    <>
      {displaySpinner && (
        <Box sx={{ position: "fixed", top: "100px", left: "23.5vw" }}>
          <Alert severity="warning">
            First launch of application can to take over 30 seconds, because
            server was placed on free plan and has limits to speed of loading
          </Alert>
          <Spinner />
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
        {error.msg && (
          <Alert severity="error">
            {" "}
            {error.err} - {error.msg}
          </Alert>
        )}
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
          onClick={toggleSpinner}
          disabled={input.lemail === "" || input.lpassword === ""}
        >
          submit
        </Button>
      </Box>
    </>
  );
};

export default LoginForm;
