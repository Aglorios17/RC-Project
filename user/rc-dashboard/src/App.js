import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
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
  const [webcam, setWebcam] = useState(false);

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

  const ask_command =(command) => {
    console.log(command)
    const url = 'http://192.168.1.140:8000/mouvement/'+ command;
    const options = {
      method: 'post',
    };
    fetch(url, options).then((Response) => {
      console.log(Response)
      return Response.json()
    }).then((data) => {
      console.log(data)
    })
  }

  const show_webcam =() => {
    setWebcam(!webcam)
    if (webcam)
      window.location.reload(false);
  }

  return (
    <div className="App">
      <header className="App-header">
        <Button variant="contained" onClick={ () => alert("I'm an alert")}>Hello World</Button>
        <br></br>
        <Button variant="contained" onClick={() => ask_api()}>Delay</Button>
        <br></br>
        <Button variant="contained" onClick={() => ask_api_stream()}>Stream</Button>
        <br></br><div>{parse(display)}</div>
        <Button variant="contained" onClick={() => show_webcam()}>Webcam</Button>
        {webcam && <div class="container">
          <div class="row">
                <div class="col-lg-8  offset-lg-2">
                        <h3 class="mt-5">Live Streaming</h3>
                        <img src="http://192.168.1.140:8000/feed" width="100%"/>
                </div>
                <Button variant="contained" onClick={() => ask_command("left")}>Left</Button>
                <Button variant="contained" onClick={() => ask_command("forward")}>Forward</Button>
                <Button variant="contained" onClick={() => ask_command("backwad")}>backward</Button>
                <Button variant="contained" onClick={() => ask_command("right")}>Right</Button>

          </div>
        </div>}
      </header>
    </div>
  );
}

export default App;
