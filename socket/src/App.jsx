import { useState } from "react";
import Chat from "./components/Chat";
import Room from "./components/Room";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [chatScreen, setChatscreen] = useState(false);


  return (
    <div className="App">

      {chatScreen ? (
        <Chat socket ={socket} username ={username} room = {room}/>
      ) : (
        <Room
          username={username}
          setUsername={setUsername}
          room={room}
          setRoom={setRoom}
          setChatscreen={setChatscreen}
          socket={socket}
        />
      )}

      
    </div>
  );
}

export default App;
