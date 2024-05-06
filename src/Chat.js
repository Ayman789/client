import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom'; 

function Chat({socket, username, room}) {
        const [liveMessage, setLiveMessage] = useState("");
        const [messageOrder, setMessageOrder] = useState([]);

        const sendMessage = async () => {
            if (liveMessage !== "") {
                const messageData = {
                    room: room, 
                    user: username, 
                    message: liveMessage,
                    time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
                };

                await socket.emit("ChatMessage", messageData);
                setMessageOrder((list) => [...list, messageData]);
                setLiveMessage("");
            }
        };
                //This tracks the information which is sent to the server for users to converse with extra information
                //these being the room number, who sent it, and the time as well as the message contents, this being
                //tracked in the console

                //Line 19 allows for messages to be sent and works in tandem with line 27 in index.js

        useEffect(() => {
            socket.off("receiveMessage").on("receiveMessage", (data) => {
                setMessageOrder((list) => [...list, data]);
            });
        }, [socket]);

            //useEffect listens for any changes to the socket, for any messages that are incoming
            //Listens for the data being sent from front end to back end

    return (
        <div className="ChatterBoxUI">
            <div className="ChatterBoxHeader">
                <p>ChatterBox Live</p>
            </div>
            <div className="ChatterBoxBody">
                <ScrollToBottom className="MessageRepository">
                {messageOrder.map ((messageContent) => {
                    return (
                    <div className = "message" id={username === messageContent.user ? "User" : "Chatter"}>
                        <div> 
                            <div className="MessageBox">
                                <p>{messageContent.message}</p>
                            </div>

                            <div className="MessageContents"></div>
                                <p id="time">{messageContent.time}</p>
                                <p id="user">{messageContent.user}</p>
                        </div>
                        </div>
                    );
                })}
                </ScrollToBottom>
            </div>
            <div className="ChatterBoxFooter">
                <input type="text" value={liveMessage} placeholder="Enter message here..." onChange={(event) => 
                    {setLiveMessage(event.target.value)}} 
                    onKeyPress={(event) => {event.key === "Enter" && sendMessage()}}/>
                <button onClick = {sendMessage}> &#9658; </button>
            </div>
        </div>
    );
}

export default Chat