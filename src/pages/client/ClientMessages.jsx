import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";

function ClientMessages() {

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      text: "Hello! I have completed the homepage.",
      type: "received"
    },
    {
      text: "Great! Please share the preview.",
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
    <DashboardLayout type="client">

      <div className="page-header">

        <div>
          <h1>Messages 💬</h1>
          <p>Chat with students and freelancers.</p>
        </div>

      </div>

      <div className="messages-box">

        {/* CHAT LIST */}

        <div className="chat-list">

          <div className="chat-user active-chat">
            👩‍💻 Aarohi
            <small>Project update</small>
          </div>

          <div className="chat-user">
            👨‍💻 Rahul
            <small>Proposal discussion</small>
          </div>

        </div>


        {/* CHAT AREA */}

        <div className="chat-area">

          <h3>👩‍💻 Aarohi</h3>

          {/* Messages */}

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


          {/* INPUT */}

          <div className="message-input">

            <input
              type="text"
              placeholder="Type message..."
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

export default ClientMessages;