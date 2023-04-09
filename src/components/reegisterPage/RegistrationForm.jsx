import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { registration } from "../../gateway/apiEndpoints";
import Spinner from "../spinner/Spinner";
import { setMessages } from "../reducers/eventsReducer/eventsActions";
import { TextField, Box, Typography, Button, Alert } from "@mui/material";
import { useNavigate } from "react-router";

const RefistrationForm = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const { messages } = useSelector((state) => state.events);
  const { displaySpinner } = useSelector((state) => state.spinner);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const inputHandler = (e) => {
    setInput((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await registration(input);
      if (res.msg) {
        toggleSpinner();
        navigate("/");
        dispatch(setMessages(res));
        setInput({ name: "", email: "", password: "", confirm: "" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleSpinner = () => {
    dispatch({ type: "TOGGLE_SPINNER" });
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      dispatch({ type: "SET_MESSAGES", payload: {} });
    }, 5000);

    return () => {
      clearTimeout(timeOut);
    };
  }, [messages]);

  const isDisable = (input) => {
    return Object.values(input).some((i) => i === "");
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
        {messages.msg && <Alert severity="success">{messages.msg}</Alert>}
        <Typography component={"h1"} textAlign={"center"}>
          Register
        </Typography>
        <TextField
          id="name"
          label="name"
          name="name"
          variant="outlined"
          value={input.name}
          onChange={inputHandler}
          sx={{ marginTop: "10px" }}
        />
        <TextField
          id="email"
          label="email"
          name="email"
          variant="outlined"
          value={input.email}
          onChange={inputHandler}
          sx={{ marginTop: "10px" }}
        />
        <TextField
          id="password"
          label="password"
          name="password"
          variant="outlined"
          value={input.password}
          onChange={inputHandler}
          type="password"
          sx={{ marginTop: "10px" }}
        />
        <TextField
          id="confirm password"
          label="confirm password"
          name="confirm"
          variant="outlined"
          value={input.confirm}
          onChange={inputHandler}
          type="password"
          sx={{ marginTop: "10px" }}
        />
        <Button
          type="submit"
          disabled={isDisable(input)}
          onClick={toggleSpinner}
        >
          submit
        </Button>
      </Box>
    </>
  );
};

export default RefistrationForm;
