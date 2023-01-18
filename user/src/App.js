import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { fetchToCurl } from 'fetch-to-curl';
import parse from "html-react-parser";
import './App.css';


const App=() => {
  //const [timer, setTimer] = useState(0);

  const ask_api =async () => {
    //setTimer(setInterval(ask_api, 1))
    const url = 'http://localhost:8000/';
    const options = {
      headers: {
        accept: 'application/json'
      },
      method: 'get'
    };
    console.log(fetchToCurl(url, options));
    fetch(url, options).then((Response) => {
      return Response.json()
    }).then((data) => {
      console.log(data);
      alert(JSON.stringify(data)) //+ "| " +  timer + "ms")
      //console.log("time stop", timer)
    })
    console.log("delay")
   // setTimer(0)
  };
  
  const [display, setDisplay] = useState("");
  const [displayw, setDisplayw] = useState("");

  const ask_api_stream =async () => {
    setDisplay("")
    const url = 'http://localhost:8000/movie';
    const options = {
      headers: {
        accept: 'application/json'
      },
      method: 'get'
    };
    console.log(fetchToCurl(url, options));
    fetch(url, options).then((Response) => {
      console.log(Response)
      return Response.json()
    }).then((data) => {
      console.log(data)
      setDisplay(data)

    })

  };

  const ask_api_webcam =async () => {
    setDisplayw("")
    const url = 'http://localhost:8000/webcam';
    const options = {
      headers: {
        accept: 'application/json'
      },
      method: 'get'
    };
    console.log(fetchToCurl(url, options));
    fetch(url, options).then((Response) => {
      console.log(Response)
      return Response.json()
    }).then((data) => {
      console.log(data)
      setDisplayw(data)

    })

  };

  return (
    <div className="App">
      <header className="App-header">
        <Button variant="contained" onClick={ () => alert("I'm an alert")}>Hello World</Button>
        <br></br>
        <Button variant="contained" onClick={() => ask_api()}>Delay</Button>
        <br></br>
        <Button variant="contained" onClick={() => ask_api_stream()}>Stream</Button>
        <br></br><div>{parse(display)}</div>
        <Button variant="contained" onClick={() => ask_api_webcam()}>Webcam</Button>
        <br></br><div>{parse(displayw)}</div>
      </header>
    </div>
  );
}

export default App;
