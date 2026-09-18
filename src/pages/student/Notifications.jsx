import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("skilloraUser"));
  const userId = user?.id;

  const loadNotifications = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/notifications/${userId}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to load notifications");
      }

      if (data.success) {
        setNotifications(data.notifications);
      }
    } catch (error) {
      console.error("Notification Load Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, [userId]);

  const markAsRead = async (notificationId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/notifications/${notificationId}/read`,
        {
          method: "PUT",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to mark notification");
      }

      if (data.success) {
        setNotifications((previous) =>
          previous.map((notification) =>
            notification.id === notificationId
              ? { ...notification, is_read: 1 }
              : notification
          )
        );
      }
    } catch (error) {
      console.error("Mark Read Error:", error);
      alert(error.message);
    }
  };

  const deleteNotification = async (notificationId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this notification?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/notifications/${notificationId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to delete notification");
      }

      if (data.success) {
        setNotifications((previous) =>
          previous.filter(
            (notification) => notification.id !== notificationId
          )
        );
      }
    } catch (error) {
      console.error("Delete Notification Error:", error);
      alert(error.message);
    }
  };

  const unreadCount = notifications.filter(
    (notification) => notification.is_read === 0
  ).length;

  return (
    <DashboardLayout>
      <div className="page-header">
        <div>
          <h1>🔔 Notifications</h1>
          <p>Stay updated with your latest Skillora activities.</p>
        </div>

        <button
          className="primary-btn"
          onClick={loadNotifications}
        >
          🔄 Refresh
        </button>
      </div>

      {unreadCount > 0 && (
        <div
          style={{
            background: "#eef2ff",
            padding: "14px 18px",
            borderRadius: "10px",
            marginBottom: "20px",
            fontWeight: "600",
          }}
        >
          🔴 You have {unreadCount} unread notification
          {unreadCount > 1 ? "s" : ""}
        </div>
      )}

      {loading ? (
        <div className="empty-state">
          <h2>Loading Notifications...</h2>
        </div>
      ) : notifications.length === 0 ? (
        <div className="empty-state">
          <h2>🔔 No Notifications</h2>
          <p>You don't have any notifications yet.</p>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          {notifications.map((notification) => (
            <div
              key={notification.id}
              style={{
                background:
                  notification.is_read === 0 ? "#f5f7ff" : "#ffffff",
                border: "1px solid #e5e7eb",
                borderLeft:
                  notification.is_read === 0
                    ? "5px solid #6366f1"
                    : "5px solid #d1d5db",
                borderRadius: "12px",
                padding: "18px",
                boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "15px",
                }}
              >
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "8px",
                    }}
                  >
                    <span style={{ fontSize: "24px" }}>
                      {notification.notification_type === "message"
                        ? "💬"
                        : notification.notification_type === "proposal"
                        ? "📩"
                        : notification.notification_type === "review"
                        ? "⭐"
                        : "🔔"}
                    </span>

                    <h3 style={{ margin: 0 }}>
                      {notification.notification_type
                        ? notification.notification_type
                            .charAt(0)
                            .toUpperCase() +
                          notification.notification_type.slice(1)
                        : "Notification"}
                    </h3>

                    {notification.is_read === 0 && (
                      <span
                        style={{
                          background: "#6366f1",
                          color: "white",
                          padding: "3px 8px",
                          borderRadius: "20px",
                          fontSize: "11px",
                        }}
                      >
                        NEW
                      </span>
                    )}
                  </div>

                  <p
                    style={{
                      margin: "5px 0",
                      color: "#555",
                    }}
                  >
                    {notification.message}
                  </p>

                  <small style={{ color: "#888" }}>
                    {notification.created_at
                      ? new Date(
                          notification.created_at
                        ).toLocaleString()
                      : ""}
                  </small>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {notification.is_read === 0 && (
                    <button
                      className="small-btn"
                      onClick={() =>
                        markAsRead(notification.id)
                      }
                    >
                      ✅ Read
                    </button>
                  )}

                  <button
                    className="small-btn"
                    onClick={() =>
                      deleteNotification(notification.id)
                    }
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

export default Notifications;