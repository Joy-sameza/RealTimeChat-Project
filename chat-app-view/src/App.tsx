import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import socket from "./api/socket";
// import LoginForm from "./pages/LoginForm";

function App() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to the server");
    });

    socket.on("message", (data) => {
      console.log("New message:", data);
    });

    return () => {
      socket.off("connect");
      socket.off("message");
    };
  }, []);
  return <div className="App">{/* <LoginForm /> */}</div>;
}

export default App;
