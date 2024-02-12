import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";

const ChatPage = ({ socket, title }) => {
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState("");
  const lastMessageRef = useRef(null);
  let [searchParams, setSearchParams] = useSearchParams();
  const room = searchParams.get("room");

  useEffect(() => {
    socket.on("messageResponse", (data) => {
      setMessages([...messages, data]);
      console.log(data);
    });
  }, [socket, messages]);

  useEffect(() => {
    socket.on("typingResponse", (data) => {
      setTypingStatus(data);
      console.log(data);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("doneTypingResponse", () => setTypingStatus(""));
  }, [socket]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className="chat">
      <ChatBar socket={socket} room={room} />
      <div className="chat__main">
        <ChatBody
          messages={messages}
          typingStatus={typingStatus}
          lastMessageRef={lastMessageRef}
          room={room}
          title={title}
          socket={socket}
        />
        <ChatFooter socket={socket} room={room} />
      </div>
    </div>
  );
};

export default ChatPage;
