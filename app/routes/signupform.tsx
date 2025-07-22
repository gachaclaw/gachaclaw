import React, { useState, useEffect } from "react";
import axios from "axios";
import sendDataToDjango from "src/backend/crud/sendDataToDjango"

export default function SignUpForm(){
  const handleClick = () => {
    const myObject = {
      username: "tailer",
      password: "1234",
      email: "asdfasdf@gmail.com",
      money: 50.0,
    };
    sendDataToDjango(myObject);
  };
  return (
    <>
      <div className="text-2xl">Click to send data:</div>
      <button
        onClick={handleClick}
        className="bg-purple-600 text-white p-2 rounded mt-2"
      >
        Send Data
      </button>
    </>
  );
}