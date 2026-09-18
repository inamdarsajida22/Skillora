import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";

function Messages() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  // Logged-in user
  const storedUser = localStorage.getItem("skilloraUser");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userId = user?.id;

  /*
    For now we use a client ID manually.
    Later we will make this dynamic from applications.
  */
  const clientId = 1;

  // ================= LOAD CHAT =================

  useEffect(() => {
    if (!selectedChat || !userId) {
      return;
    }

    const loadMessages = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://skillora-ex4a.onrender.com/api/messages/${userId}/${selectedChat.id}`
        );

        if (!response.ok) {
          throw new Error("Failed to load messages.");
        }

        const data = await response.json();

        const formattedMessages = (data.messages || []).map(
          (item) => ({
            id: item.id,
            text: item.message,
            type:
              item.sender_id === userId
                ? "sent"
                : "received",
          })
        );

        setChatMessages(formattedMessages);

      } catch (err) {
        console.error(err);
        setError("❌ Unable to load messages.");
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, [selectedChat, userId]);

  // ================= SEND MESSAGE =================

  const sendMessage = async () => {
    if (!message.trim()) {
      return;
    }

    if (!userId) {
      setError("Please login first.");
      return;
    }

    if (!selectedChat) {
      setError("Please select a chat.");
      return;
    }

    try {
      setSending(true);
      setError("");

      const params = new URLSearchParams();

      params.append("sender_id", userId);
      params.append("receiver_id", selectedChat.id);
      params.append("message", message);

      const response = await fetch(
        `https://skillora-ex4a.onrender.com/api/messages/?${params.toString()}`,
        {
          method: "POST",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Failed to send message."
        );
      }

      setChatMessages((prev) => [
        ...prev,
        {
          id: data.data.id,
          text: data.data.message,
          type: "sent",
        },
      ]);

      setMessage("");

    } catch (err) {
      console.error(err);
      setError(`❌ ${err.message}`);
    } finally {
      setSending(false);
    }
  };

  // ================= ENTER KEY =================

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  // ================= SELECT CHAT =================

  const selectChat = (chat) => {
    setSelectedChat(chat);
    setMessage("");
    setError("");
  };

  // ================= CHAT USERS =================

  const chats = [
    {
      id: clientId,
      name: "Client",
      icon: "🏢",
    },
  ];

  return (
    <DashboardLayout>

      {/* HEADER */}

      <div className="page-header">
        <div>
          <h1>Messages 💬</h1>

          <p>
            Connect with clients and discuss your projects.
          </p>
        </div>
      </div>


      {/* MESSAGES BOX */}

      <div className="messages-box">

        {/* CHAT LIST */}

        <div className="chat-list">

          {chats.map((chat) => (

            <div
              key={chat.id}
              className={`chat-user ${
                selectedChat?.id === chat.id
                  ? "active-chat"
                  : ""
              }`}
              onClick={() => selectChat(chat)}
            >
              {chat.icon} {chat.name}

              <small>
                Click to open conversation
              </small>
            </div>

          ))}

        </div>


        {/* CHAT AREA */}

        <div className="chat-area">

          {!selectedChat ? (

            <div className="empty-state">
              <div className="big-icon">
                💬
              </div>

              <h2>
                Select a conversation
              </h2>

              <p>
                Choose a client from the left.
              </p>
            </div>

          ) : (

            <>

              <h3>
                {selectedChat.icon}{" "}
                {selectedChat.name}
              </h3>


              {/* ERROR */}

              {error && (
                <p className="error">
                  {error}
                </p>
              )}


              {/* MESSAGES */}

              <div className="messages-container">

                {loading ? (

                  <p>
                    Loading messages...
                  </p>

                ) : chatMessages.length > 0 ? (

                  chatMessages.map((msg) => (

                    <div
                      key={msg.id}
                      className={`message ${msg.type}`}
                    >
                      {msg.text}
                    </div>

                  ))

                ) : (

                  <div className="empty-state">
                    <p>
                      No messages yet. Start the conversation!
                    </p>
                  </div>

                )}

              </div>


              {/* INPUT */}

              <div className="message-input">

                <input
                  type="text"
                  placeholder={`Message ${selectedChat.name}...`}
                  value={message}
                  onChange={(e) =>
                    setMessage(e.target.value)
                  }
                  onKeyDown={handleKeyDown}
                  disabled={sending}
                />

                <button
                  onClick={sendMessage}
                  disabled={sending}
                >
                  {sending
                    ? "Sending..."
                    : "Send ➤"}
                </button>

              </div>

            </>

          )}

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Messages;