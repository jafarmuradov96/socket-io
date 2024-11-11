import React from "react";

const Room = ({ username, setUsername, room, setRoom, setChatscreen, socket}) => {

    const sendRoom = () => {
        socket.emit('room', {room});
        setChatscreen(true)
    }

  return (
    <div className=" flex items-center justify-center h-full">
      <div className="w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4 h-[320px] bg-indigo-600 flex flex-col space-y-4 p-3 rounded-lg">
            <h1 className=" text-white text-center my-4  font-bold text-2xl ">Welcome To Chat</h1>
            <input value={username} onChange={e => setUsername(e.target.value)} className="h-12 rounded-xl p-3 outline-none" type="text"  placeholder="Username"/>
            <input value={room} onChange={e => setRoom(e.target.value)} className="h-12 rounded-xl p-3 outline-none" type="text"  placeholder="Room"/>
            <div onClick={sendRoom} className= "tracking-wider bg-indigo-900 text-white cursor-pointer h-12 pt-2 text-xl text-center rounded-xl hover:opacity-70">Chat!</div>
      </div>
    </div>
  );
};

export default Room;
