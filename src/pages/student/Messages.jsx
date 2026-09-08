import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";

function Messages() {

  const [selectedChat, setSelectedChat] = useState("TechNova");
  const [message, setMessage] = useState("");

  const [chatMessages, setChatMessages] = useState({
    TechNova: [
      {
        text: "Hi! Can you share the project update?",
        type: "received"
      },
      {
        text: "Sure! I'll send it today 👍",
        type: "sent"
      }
    ],

    Brandify: [
      {
        text: "Hello! We would like to discuss the design project.",
        type: "received"
      },
      {
        text: "Sure! I am available for the discussion.",
        type: "sent"
      }
    ]
  });


  const sendMessage = () => {

    if (message.trim() === "") {
      return;
    }

    setChatMessages({
      ...chatMessages,
      [selectedChat]: [
        ...chatMessages[selectedChat],
        {
          text: message,
          type: "sent"
        }
      ]
    });

    setMessage("");
  };


  const handleKeyDown = (e) => {

    if (e.key === "Enter") {
      sendMessage();
    }

  };


  const selectChat = (chat) => {
    setSelectedChat(chat);
    setMessage("");
  };


  return (
    <DashboardLayout>

      <div className="page-header">

        <div>
          <h1>Messages 💬</h1>
          <p>Connect with clients and discuss your projects.</p>
        </div>

      </div>


      <div className="messages-box">

        {/* CHAT LIST */}

        <div className="chat-list">

          <div
            className={`chat-user ${
              selectedChat === "TechNova"
                ? "active-chat"
                : ""
            }`}
            onClick={() => selectChat("TechNova")}
          >
            🏢 TechNova

            <small>
              Can you share the update?
            </small>
          </div>


          <div
            className={`chat-user ${
              selectedChat === "Brandify"
                ? "active-chat"
                : ""
            }`}
            onClick={() => selectChat("Brandify")}
          >
            🎨 Brandify

            <small>
              Project discussion
            </small>
          </div>

        </div>


        {/* CHAT AREA */}

        <div className="chat-area">

          <h3>
            {selectedChat === "TechNova"
              ? "🏢 TechNova"
              : "🎨 Brandify"}
          </h3>


          {/* MESSAGES */}

          <div className="messages-container">

            {chatMessages[selectedChat].map(
              (msg, index) => (

                <div
                  key={index}
                  className={`message ${msg.type}`}
                >
                  {msg.text}
                </div>

              )
            )}

          </div>


          {/* MESSAGE INPUT */}

          <div className="message-input">

            <input
              type="text"
              placeholder={`Message ${selectedChat}...`}
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              onKeyDown={handleKeyDown}
            />

            <button onClick={sendMessage}>
              Send ➤
            </button>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Messages;