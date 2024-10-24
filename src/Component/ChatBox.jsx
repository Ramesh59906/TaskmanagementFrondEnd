import React, { useState, useEffect } from 'react';
import Axios from '../Axios/Axios';
import "../App.css";
import "../css/ChatSidbar.css";
import NavBar from './NavBar';
import { FaSearch, FaUserCircle, FaTrash, FaEllipsisV } from 'react-icons/fa'; // Import FaTrash icon
import { ScaleLoader } from 'react-spinners';
import { Dropdown } from 'react-bootstrap';
import img from '../assets/3350441.jpg'

const Chatbox = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [clickedrecieverId, setClickedrecieverid] = useState(null);
    const [showSearchInput, setShowSearchInput] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);  // Add selectedFile to the state


  
    const userId = localStorage.getItem('user_id');
    
    

    useEffect(() => {
        fetchUsers();
    }, []);

    // Fetch all users from the API
    const fetchUsers = async () => {
        try {
            const response = await Axios.get(`/messages/?sender_id=${userId}`);
            setUsers(response.data.receivers);
            console.log(userId);
            
            setFilteredUsers(response.data.receivers);
            setTimeout(() => {
                setLoading(false); // Show data after the spinner has been shown twice
            }, 1000); // 5s * 2 = 10s
        } catch (err) {
            setError(err.message);
            setLoading(false); // Show data after the spinner has been shown twice

        }
    };

    // Function to search users based on query
    const searchUsers = async (query) => {
        if (query.trim() === '') {
            setFilteredUsers(users);
            console.log(users);
            
            return;
        }

        try {
            const response = await Axios.get(`/api/search_users/${query}/`);
            setFilteredUsers(response.data.users);


        } catch (err) {
            setError(err.message);
        }
    };

    // Handle search input change
    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        searchUsers(query);
    };

    // Function to select a user and fetch their conversation
    const selectUser = (user) => {
        setSelectedUser(user);
        console.log(selectedUser);
        
        setClickedrecieverid(user.id);
        console.log('dehfeiufgggggggggggggggggggggggg', user.id);
        fetchMessages(user.receiver_id);
    };


    const fetchMessages = async (receiverId) => {
        setLoading(true);
    
        try {
            const response = await Axios.get('/messages/conversation/', {
                params: {
                    sender_id: userId,
                    receiver_id: receiverId ? receiverId : clickedrecieverId
                }
            });
            
            // Set the messages to state
            setMessages(response.data.messages);
            
            // Check if there are messages and set the message IDs in localStorage
            if (response.data.messages && response.data.messages.length > 0) {
                // Store the message IDs in an array
                const messageIds = response.data.messages.map(message => message.message_id);
                localStorage.setItem('message_ids', JSON.stringify(messageIds)); // Store as an array
                console.log('Stored Message IDs:', messageIds); // Log the IDs to verify
            }
    
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setLoading(false);
        }
    };
    
    
    const sendMessage = async () => {
        if (newMessage.trim() === '' || !selectedUser) return;

        try {
            const response = await Axios.post('/send_message/', {
                message: newMessage,
                receiver_id: selectedUser.receiver_id ? selectedUser.receiver_id : clickedrecieverId,
                sender_id: userId,
                id_sender: userId,
            });
            setMessages((prevMessages) => [...prevMessages, response.data]);
            setNewMessage('');
            setms(response.data.message_id)
            console.log(response.data.message_id);
            
            
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };
    // const sendMessage = async () => {
    //     if (newMessage.trim() === '' && !selectedFile || !selectedUser) {
    //         console.error("Message content or file must be provided.");
    //         return;
    //     }
    
    //     const formData = new FormData();
    
    //     // Add message to FormData if it exists
    //     if (newMessage.trim() !== '') {
    //         formData.append('message', newMessage);
    //     }
    
    //     // Add the file to FormData if a file is selected
    //     if (selectedFile) {
    //         formData.append('file_data', selectedFile);  // Ensure the key 'file_data' matches the backend field for files
    //     }
    
    //     // Add the receiver and sender IDs
    //     formData.append('receiver_id', selectedUser.receiver_id ? selectedUser.receiver_id : clickedrecieverId);
    //     formData.append('sender_id', userId);
    
    //     try {
    //         // Send the message with file
    //         const response = await Axios.post('/send_message/', formData, {
    //             headers: {
    //                 'Content-Type': 'application/json',  // Important for file uploads
    //             },
    //         });
    
    //         // Update the state with the new message
    //         setMessages((prevMessages) => [...prevMessages, response.data]);
    
    //         // Clear the input fields
    //         setNewMessage('');
    //         setSelectedFile(null);
    
    //     } catch (error) {
    //         console.error('Error sending message:', error);
    //     }
    // };
    
    
    // Function to delete a message
    const deleteMessage = async (messageId) => {
        try {
            await Axios.delete(`/delete_message/?message_id=${messageId}`);
            // Remove the deleted message from the state
            setMessages((prevMessages) => prevMessages.filter((message) => message.message_id !== messageId));
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    if (loading) {
        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                fontSize: "100px",
                fontWeight: "700",
                color: "green",
            }}>
                <ScaleLoader color="#008287" loading={loading} size={200} />
            </div>
        );
    }

    if (error) {
        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap:"wrap",
                height: "100vh",
                fontSize: "30px",
                fontWeight: "300",
                color: "red",
            }}>
              <div>
              <img src="https://cdni.iconscout.com/illustration/premium/thumb/man-frustrated-with-404-error-illustration-download-in-svg-png-gif-file-formats--line-logo-page-not-found-internet-network-interruption-pack-design-development-illustrations-5059514.png?f=webp" alt="" />
         <br /><span className='fs-5'>    Error:"Looks like you're not connected to the internet"</span>
              </div>
      
            </div>
        );
    }
    
    return (
        <div>
            <div className='mt-0 mb-3'>
                <NavBar />
             

            </div>
            <div className="chatbox">
                <div className="sidebars">
                    <div className="con">
                        <h3 style={{ margin: 0, color: '' }} className='text-primary'>Chats</h3>
                        <div className="search-bar">
                            <FaSearch
                                className="search-icon"
                                onClick={() => setShowSearchInput(!showSearchInput)}
                            />
                            {showSearchInput && (
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearch}
                                    placeholder="Search for users..."
                                    autoFocus
                                />
                            )}
                        </div>
                    </div>
                    <hr style={{ borderColor: 'black' }} />
                    <ul>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <li style={{ color: "black" }}
                                    key={user.id}
                                    onClick={() => selectUser(user)}
                                    className={selectedUser?.id === user.id ? 'selected' : ''}>
                                    <FaUserCircle size={33} className="me-2 text-primary" />
                                    {user.username} {user.receiver_name}
                                </li>
                            ))
                        ) : (
                            <p style={{ color: "black" }}>No users found</p>
                        )}
                    </ul>
                </div>

                <div className="chat-window">
                    {selectedUser ? (
                        <>
                            <div className="chat-header d-flex justify-content-start align-items-center">
                            <FaUserCircle size={33} className="me-2 text-primary" />

                               <div>
                               <h4 className='text-black fw-bolder'>{selectedUser.receiver_name}</h4>
                               <h4 className='text-info fw-bolder' style={{fontSize:"14px", textTransform: "capitalize"}}>{selectedUser.receiver_role}</h4>
                               </div>
                            </div>
                            <div className="chat-body">
                                {loading ? (
                                    <p>Loading messages...</p>
                                ) : (
                                    messages.map((msg, index) => (
                                        <div
                                            key={index}
                                            className={`chat-message ${msg.sender === 'manager143' ? 'sender' : 'receiver'}`}
                                            style={{
                                                textAlign: msg.sender === 'manager143' ? 'right' : 'left', // Adjust text alignment based on the sender
                                            }}
                                        >

                                            <div>
                                                <p style={{ display: "flex" }} className="message-text">{msg.message}
                                                    <Dropdown>
                                                        <Dropdown.Toggle
                                                            as="span" // Display as span to look like an icon
                                                            id="dropdown-basic"
                                                            className="three-dots"
                                                            style={{ cursor: 'pointer', marginLeft: '10px' }}
                                                        >
                                                            {/* <FaEllipsisV /> */}
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu>
                                                            {/* Delete Option */}
                                                            <Dropdown.Item
                                                                onClick={() => deleteMessage(msg.message_id)}
                                                            >
                                                                Delete
                                                            </Dropdown.Item>
                                                            {/* Edit Option */}
                                                            <Dropdown.Item
                                                            // onClick={() => editMessage(msg.message_id)}
                                                            >
                                                                Edit
                                                            </Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </p>
                                                {/* Three-dot dropdown */}

                                                {/* </div> */}
                                            </div>
                                            <span className="timestamp">
                                                {new Date(msg.timestamp).toLocaleTimeString()} {/* Show the actual timestamp */}
                                            </span>

                                            {/* Show delete icon for messages sent by manager123 */}
                                            {/* {msg.sender === 'manager123' && ( */}

                                            {/* )}   */}
                                        </div>
                                    ))
                                )}
                            </div>




                            {/* <div className="chat-footer">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Type your message..."
                                />
                                <button onClick={sendMessage}>Send</button>
                            </div> */}
                            <div className="chat-footer">
    {/* Input for typing message */}
    <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message..."
    />

    {/* Input for selecting a file */}
    <input
        type="file"
        onChange={(e) => setSelectedFile(e.target.files[0])}  // Handler for file selection
        accept=".jpg,.png,.pdf,.docx"  // File types allowed
    />

    {/* Button to send message */}
    <button onClick={sendMessage}>Send</button>
</div>

                        </>
                    ) : (
                        <div className="select-user-message d-flex justify-content-center align-items-center vh-100">
                            {/* <p>Select a user to start a conversation.</p> */}
                            <img src={img} width={400} alt="" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Chatbox;

// import React, { useState, useEffect, useRef } from 'react';
// import Axios from '../Axios/Axios';
// import "../App.css";
// import "../css/ChatSidbar.css";
// import NavBar from './NavBar';
// import { FaSearch, FaUserCircle } from 'react-icons/fa'; 
// import { ScaleLoader } from 'react-spinners';
// import { Dropdown } from 'react-bootstrap';

// const Chatbox = () => {
//     const [users, setUsers] = useState([]);
//     const [filteredUsers, setFilteredUsers] = useState([]);
//     const [selectedUser, setSelectedUser] = useState(null);
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState('');
//     const [searchQuery, setSearchQuery] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [clickedReceiverId, setClickedReceiverId] = useState(null);
//     const [showSearchInput, setShowSearchInput] = useState(false);

//     const socketRef = useRef(null); // WebSocket ref
//     const userId = localStorage.getItem('user_id');


// // Function to handle WebSocket connection and reconnection
// const connectWebSocket = () => {
//     socketRef.current = new WebSocket(`ws://192.168.43.44/ws/chat/${userId}/`);

//     socketRef.current.onopen = () => {
//         console.log('WebSocket connection opened.');
//     };

//     socketRef.current.onmessage = (event) => {
//         const data = JSON.parse(event.data);
//         // Update messages only if they belong to the current selected user
//         if (data.receiver_id === clickedReceiverId || data.sender_id === clickedReceiverId) {
//             setMessages((prevMessages) => [...prevMessages, data]);
//         }
//     };

//     socketRef.current.onerror = (error) => {
//         console.error('WebSocket error:', error);
//     };

//     socketRef.current.onclose = (event) => {
//         if (!event.wasClean) {
//             console.log('WebSocket closed unexpectedly, retrying...');
//             setTimeout(connectWebSocket, 3000); // Retry after 3 seconds
//         }
//     };
// };

//     useEffect(() => {
//         fetchUsers();
//         connectWebSocket(); // Connect WebSocket on component mount

//         // Clean up WebSocket connection when component unmounts
//         return () => {
//             if (socketRef.current) {
//                 socketRef.current.close();
//             }
//         };
//     }, [clickedReceiverId]); // Reconnect WebSocket if receiver changes

//     const fetchUsers = async () => {
//         try {
//             const response = await Axios.get(`/messages/?sender_id=${userId}`);
//             setUsers(response.data.receivers);
//             setFilteredUsers(response.data.receivers);
//             setTimeout(() => setLoading(false), 1000);
//         } catch (err) {
//             console.error('Error fetching users:', err);
//         }
//     };

//     const searchUsers = async (query) => {
//         if (query.trim() === '') {
//             setFilteredUsers(users);
//             return;
//         }

//         try {
//             const response = await Axios.get(`/api/search_users/${query}`);
//             setFilteredUsers(response.data.users);
//         } catch (err) {
//             console.error('Error searching users:', err);
//         }
//     };

//     const handleSearch = (e) => {
//         const query = e.target.value;
//         setSearchQuery(query);
//         searchUsers(query);
//     };

//     const selectUser = (user) => {
//         setSelectedUser(user);
//         setClickedReceiverId(user.id);
//         fetchMessages(user.receiver_id);
//     };

//     const fetchMessages = async (receiverId) => {
//         setLoading(true);

//         try {
//             const response = await Axios.get('/messages/conversation/', {
//                 params: {
//                     sender_id: userId,
//                     receiver_id: receiverId || clickedReceiverId
//                 }
//             });
//             setMessages(response.data.messages);
//         } catch (error) {
//             console.error('Error fetching messages:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const sendMessage = async () => {
//         if (newMessage.trim() === '' || !selectedUser) return;
    
//         try {
//             const response = await Axios.post('/send_message/', {
//                 message: newMessage,
//                 receiver_id: selectedUser.receiver_id || clickedReceiverId,
//                 sender_id: userId,
//             });
    
//             // Send message via WebSocket for real-time updates
//             if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
//                 socketRef.current.send(JSON.stringify({
//                     message: newMessage,
//                     receiver_id: selectedUser.receiver_id || clickedReceiverId,
//                     sender_id: userId,
//                 }));
//             } else {
//                 console.error('WebSocket is not open. Message not sent.');
//             }
    
//             setMessages((prevMessages) => [...prevMessages, response.data]);
//             setNewMessage('');
//         } catch (error) {
//             console.error('Error sending message:', error);
//         }
//     };
    
    

//     const deleteMessage = async (messageId) => {
//         try {
//             await Axios.delete(`/delete_message/?message_id=${messageId}`);
//             setMessages((prevMessages) => prevMessages.filter((message) => message.message_id !== messageId));
//         } catch (error) {
//             console.error('Error deleting message:', error);
//         }
//     };

//     if (loading) {
//         return (
//             <div style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 height: "100vh",
//                 fontSize: "100px",
//                 fontWeight: "700",
//                 color: "green",
//             }}>
//                 <ScaleLoader color="#008287" loading={loading} size={200} />
//             </div>
//         );
//     }

//     return (
//         <div>
//             <div className='mt-0 mb-3'>
//                 <NavBar />
//             </div>
//             <div className="chatbox shadow">
//                 <div className="sidebars">
//                     <div className="con">
//                         <h3 style={{ margin: 0, color: 'black' }}>Chats</h3>
//                         <div className="search-bar">
//                             <FaSearch
//                                 className="search-icon"
//                                 onClick={() => setShowSearchInput(!showSearchInput)}
//                             />
//                             {showSearchInput && (
//                                 <input
//                                     type="text"
//                                     value={searchQuery}
//                                     onChange={handleSearch}
//                                     placeholder="Search for users..."
//                                     autoFocus
//                                 />
//                             )}
//                         </div>
//                     </div>
//                     <hr style={{ borderColor: 'black' }} />
//                     <ul>
//                         {filteredUsers.length > 0 ? (
//                             filteredUsers.map((user) => (
//                                 <li
//                                     key={user.id}
//                                     onClick={() => selectUser(user)}
//                                     className={selectedUser?.id === user.id ? 'selected' : ''}
//                                     style={{ color: "black" }}
//                                 >
//                                     <FaUserCircle size={33} className="me-2 text-success" />
//                                     {user.username} {user.receiver_name}
//                                 </li>
//                             ))
//                         ) : (
//                             <p style={{ color: "black" }}>No users found</p>
//                         )}
//                     </ul>
//                 </div>

//                 <div className="chat-window">
//                     {selectedUser ? (
//                         <>
//                             <div className="chat-header">
//                                 <h4>{selectedUser.receiver_name}</h4>
//                             </div>
//                             <div className="chat-body">
//                                 {loading ? (
//                                     <p>Loading messages...</p>
//                                 ) : (
//                                     messages.map((msg, index) => (
//                                         <div
//                                             key={index}
//                                             className={`chat-message ${msg.sender === userId ? 'sender' : 'receiver'}`}
//                                             style={{
//                                                 textAlign: msg.sender === userId ? 'right' : 'left',
//                                             }}
//                                         >
//                                             <div>
//                                                 <p style={{ display: "flex" }} className="message-text">
//                                                     {msg.message}
//                                                     <Dropdown>
//                                                         <Dropdown.Toggle
//                                                             as="span"
//                                                             id="dropdown-basic"
//                                                             className="three-dots"
//                                                             style={{ cursor: 'pointer', marginLeft: '10px' }}
//                                                         />
//                                                         <Dropdown.Menu>
//                                                             <Dropdown.Item onClick={() => deleteMessage(msg.message_id)}>
//                                                                 Delete
//                                                             </Dropdown.Item>
//                                                         </Dropdown.Menu>
//                                                     </Dropdown>
//                                                 </p>
//                                             </div>
//                                             <span className="timestamp">
//                                                 {new Date(msg.timestamp).toLocaleTimeString()}
//                                             </span>
//                                         </div>
//                                     ))
//                                 )}
//                             </div>

//                             <div className="chat-footer">
//                                 <input
//                                     type="text"
//                                     value={newMessage}
//                                     onChange={(e) => setNewMessage(e.target.value)}
//                                     placeholder="Type your message..."
//                                 />
//                                 <button onClick={sendMessage}>Send</button>
//                             </div>
//                         </>
//                     ) : (
//                         <div className="select-user-message d-flex justify-content-center align-items-center vh-100">
//                             <p>Select a user to start a conversation.</p>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Chatbox;
