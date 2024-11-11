import React, { useEffect, useState, useRef } from "react";

const Chat = ({ socket, username, room }) => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const messageContainerRef = useRef(null);

  useEffect(() => {
    socket.emit('room', room);

    socket.on('messageReturn', (data) => {
      setMessageList((prev) => [...prev, data]);
    });

    return () => {
      socket.off('messageReturn');
    };
  }, [socket, room]);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messageList]);

  function formatTimeWithLeadingZeros() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;

    return hours + ":" + minutes;
  }

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      const messageContent = {
        username: username,
        message: message,
        room: room,
        date: formatTimeWithLeadingZeros(),
      };
      await socket.emit('message', messageContent);
      setMessageList((prev) => [...prev, messageContent]);
      setMessage("");
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4 h-[600px] bg-white relative">
        <div className="w-full h-16 bg-gray-700 p-2 flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-full"></div>
          <div className="text-white">Room - {room}</div>
        </div>
        <div
          className="w-full h-[485px] overflow-y-auto overflow-x-hidden"
          ref={messageContainerRef}
        >
          {messageList?.map((data, index) => (
            <div
              className={` ${
                username === data.username
                  ? "flex justify-end"
                  : "flex justify-start"
              }`}
              key={index}
            >
              <div
                className={` 
                  ${username === data.username ? "bg-green-600" : "bg-blue-600"}  
                  w-2/3 h-full  text-white text-md m-2 rounded-xl rounded-br-none p-3 overflow-hidden break-words`}
              >
                <div>{data.message}</div>
                <div className="w-full flex justify-end text-xs">
                  {data.username} {data.date}
                </div>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={sendMessage} className="absolute bottom-0 left-0 w-full outline-none">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-3/4 h-12 border p-3"
            type="text"
            placeholder="message send"
          />
          <button
            className="w-1/4 bg-indigo-600 text-white h-12 hover:opacity-70 outline-none"
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
