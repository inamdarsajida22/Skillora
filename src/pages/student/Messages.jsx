import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";

function Messages() {

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      text: "Hi! Can you share the project update?",
      type: "received"
    },
    {
      text: "Sure! I'll send it today 👍",
      type: "sent"
    }
  ]);

  const sendMessage = () => {

    if (message.trim() === "") {
      return;
    }

    setMessages([
      ...messages,
      {
        text: message,
        type: "sent"
      }
    ]);

    setMessage("");
  };

  const handleKeyDown = (e) => {

    if (e.key === "Enter") {
      sendMessage();
    }

  };

  return (
    <DashboardLayout>

      <div className="page-header">

        <div>
          <h1>Messages 💬</h1>
          <p>Connect with clients.</p>
        </div>

      </div>

      <div className="messages-box">

        {/* CHAT LIST */}

        <div className="chat-list">

          <div className="chat-user active-chat">
            🏢 TechNova
            <small>Can you share the update?</small>
          </div>

          <div className="chat-user">
            🎨 Brandify
            <small>Project discussion</small>
          </div>

        </div>


        {/* CHAT AREA */}

        <div className="chat-area">

          <h3>🏢 TechNova</h3>

          {/* MESSAGES */}

          <div className="messages-container">

            {messages.map((msg, index) => (

              <div
                key={index}
                className={`message ${msg.type}`}
              >
                {msg.text}
              </div>

            ))}

          </div>


          {/* MESSAGE INPUT */}

          <div className="message-input">

            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
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