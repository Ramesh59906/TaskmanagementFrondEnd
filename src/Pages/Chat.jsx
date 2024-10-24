import React, { useEffect, useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [users, setUsers] = useState([]);
  const [receiverId, setReceiverId] = useState("");

  const fetchAllUsers = async () => {
    try {
      const response = await fetch("http://192.168.1.34:8000/get_all_users");
      if (response.ok) {
        const data = await response.json();
        setUsers(data.data); // Assuming the response has a 'data' array
      } else {
        console.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    if (loggedIn) {
      const ws = new WebSocket(`ws://192.168.1.34:8000/ws/${localStorage.getItem('user_id')}`);
      setSocket(ws);

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, data]);
      };

      fetchAllUsers();

      return () => {
        ws.close();
      };
    }
  }, [loggedIn]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && receiverId) {
      socket.send(
        JSON.stringify({
          sender_id: userId,
          sender_username: username,
          receiver_id: receiverId,
          message: message,
        })
      );
      setMessage("");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email.trim()) {
      try {
        const response = await fetch("http://192.168.1.34:8000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
        if (response.ok) {
          const data = await response.json();
          setUsername(data.username);
          setUserId(data.id);
          setLoggedIn(true);
          localStorage.setItem('user_id', data.id);
        } else {
          alert("Login failed. User not found.");
        }
      } catch (error) {
        console.error("Login error:", error);
      }
    }
  };

  if (!loggedIn) {
    return (
      <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
        <h1>Login to Chat</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h1>Chat as {username}</h1>

      <div style={{ marginBottom: "20px" }}>
        <h2>Select a User to Chat</h2>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {users.map((user) => (
            <li
              key={user.id}
              onClick={() => setReceiverId(user.id)}
              style={{
                cursor: "pointer",
                padding: "5px",
                border: "1px solid #ccc",
                margin: "5px 0",
                backgroundColor: receiverId === user.id ? "#e0f7fa" : "#fff",
              }}
            >
              {user.username}
            </li>
          ))}
        </ul>
      </div>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          height: "400px",
          overflowY: "scroll",
          marginBottom: "20px",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: msg.sender_id === userId ? "flex-end" : "flex-start",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                backgroundColor: msg.sender_id === userId ? "#dcf8c6" : "#fff",
                padding: "5px 10px",
                borderRadius: "10px",
                maxWidth: "70%",
                wordWrap: "break-word",
              }}
            >
              <strong>{msg.sender_id === userId ? "You" : msg.sender_username}: </strong>
              {msg.message}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} style={{ marginTop: "20px" }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          style={{ width: "80%" }}
        />
        <button type="submit" style={{ width: "18%", marginLeft: "2%" }}>Send</button>
      </form>
    </div>
  );
}

export default App;