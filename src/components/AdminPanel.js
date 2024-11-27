
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [contactMessages, setContactMessages] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  useEffect(() => {
    if (isLoggedIn) {
      axios.get('http://localhost:5000/api/contact')
        .then((response) => setContactMessages(response.data))
        .catch((error) => console.error(error));
    }
  }, [isLoggedIn]);

  return (
    <div>
      {isLoggedIn ? (
        <>
          <h1>Admin Panel - Contact Messages</h1>
          <ul>
            {contactMessages.map((message) => (
              <li key={message._id}>
                <p><strong>{message.name}</strong> ({message.email})</p>
                <p>{message.message}</p>
                <p><em>Submitted on: {new Date(message.createdAt).toLocaleString()}</em></p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Please log in to view the contact messages.</p>
      )}
    </div>
  );
};

export default AdminPanel;
