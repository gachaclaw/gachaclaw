import axios from "axios";
import { useState, useEffect } from "react";
//import sendDataToDjango from "src/backend/crud/sendDataToDjango"

export default function SignUpForm(){

  const [data, setData] = useState([])
  useEffect(() => {
      console.log(import.meta.env.VITE_API_URL);
      async function fetchData(){
        try{
          const response = await fetch(`${import.meta.env.VITE_API_URL}posts`);
          if(!response.ok){
            throw new Error("Network response failed to establish a connection");
          }
          const result = await response.json();
          console.log(result);
          setData(result);
        }catch(error){
          console.error("Error fetching data: ", error)
        }
      }

      fetchData();
  }, []);

  const handleClick = () => {
    const myObject = {
      username: "tailer",
      password: "1234",
      email: "asdfasdf@gmail.com",
      money: 50.0,
    };
    //sendDataToDjango(myObject);
  };
  return (
    <>
      <p> Test</p>
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