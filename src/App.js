import './App.css';
import io from 'socket.io-client'     //Used to establish a connection with io
import {useState} from "react";
import Chat from './Chat';

const socket = io.connect("http://localhost:3001");     //The url link of where I will be running the server

function App() {
  const [username, setUsername]= useState("");    
  const [room, setRoom]= useState("");
  const [showChat, setShowChat]= useState(false);

  //line 9 works together with line 32 to change the value set for the username
  //line 10 works together with line 33 to change the value set for the room 

  const joinRoom = () => {                
    if (username !== "" && room !== ""){    
      socket.emit("JoinChatterBoxChat", room);       
      setShowChat(true);
    }
  };

//Establish a connection in order to allow user to enter room they want to enter - line 14
//This makes it so user has to have a name and a room number in order to confirm the operation - line 15
//This is what is recieved as 'data' in index.js - line 16

  return (
    <div className="ChatApp">
      {!showChat ? (
      <div className="ChatterBoxJoin">

      <h1>ChatterBox - Join a Room</h1>

      <h2>
      <input type="text" placeholder="Name Here" onChange={(event) => {setUsername(event.target.value)}}/>
      <input type="text" placeholder="Room Number Here" onChange={(event) => {setRoom(event.target.value)}}/>   
      <button onClick = {joinRoom}>Join A Room</button>   
      </h2>

    </div>

    ///User enters name to enter the chat room, sets username to whatever is input - line 31
    //User enters a chat room that they choose to, sets room name to whatever is input - line 32
    //Button to confirm joining the room - line 33

      )
    : (
      <Chat socket = {socket} username={username} room={room} />
    )}
    </div>
  );
}

export default App;
