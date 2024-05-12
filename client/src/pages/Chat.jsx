import ChatList from "./ChatList";
import { useSelector } from "react-redux";
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardHeader from "../components/DashboardHeader";
export default function Chat() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const [otherID, setOtherID] = useState(location.state?.otherID || "");
  const [messageText, setMessageText] = useState(""); // State to hold the input text for the message
  const [messages, setMessages] = useState([]); // Updated to store messages from API
  const [firstID, setFirstID] = useState("");
  const [otherUserName, setOtherUserName] = useState("");
  const [toggleOpen, setToggleOpen] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const isOtherIDInitialized = useRef(false);

  const sendMessage = async () => {
    if (!otherID || !messageText) {
      console.log("OtherID or message text is missing.");
      return; // Don't proceed if there's no recipient or message text
    }

    try {
      const response = await fetch(`/api/message/send/${otherID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageText,
          senderID: firstID, // Assuming this should be currentUser._id
          receiverId: otherID,
        }),
      });

      if (!response.ok) {
        // Enhanced error handling for debugging
        const errorBody = await response.text(); // Attempt to read the error response
        throw new Error(
          `Network response was not ok: ${response.status} - ${errorBody}`
        );
      }

      const newMessage = await response.json(); // Assuming this returns the new message object
      console.log("Message sent successfully:", newMessage);
      setMessageText("");
      // Optimistically update the UI with the new message
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Optionally, refresh the message list from the server
      // getMessage();
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const getMessage = async () => {
    if (!otherID) {
      console.error("otherID is required");
      return;
    }
    const senderId = currentUser._id; // Assuming you want to use the current user's ID as senderID
    const url = `/api/message/get/${otherID}?senderID=${senderId}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(
          `Network response was not ok: ${response.status} - ${errorBody}`
        );
      }
      const data = await response.json();

      setMessages(data); // Update the messages state with fetched data
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      setFirstID(currentUser._id);
      // Delay the getConversations to ensure it doesn't immediately override otherID from navigate state
      setTimeout(() => {
        getConversations();
      }, 1000);
    }
  }, [currentUser]);
  useEffect(() => {
    if (!isOtherIDInitialized.current && location.state?.otherID) {
      setOtherID(location.state.otherID);
      isOtherIDInitialized.current = true; // Set the ref once otherID is initialized
    }
  }, [location.state]);

  useEffect(() => {
    if (
      currentUser &&
      location.state?.autoStart &&
      isOtherIDInitialized.current
    ) {
      console.log("Auto-starting chat with ID:", otherID);

      getMessage();
    }
  }, [currentUser, otherID, location.state]);
  useEffect(() => {
    if (otherID) {
      getMessage();
    }
  }, [otherID]); // Make sure to add dependencies that trigger the effect correctly

  useEffect(() => {
    async function fetchUserName() {
      if (otherID && !otherUserName) {
        try {
          const response = await fetch(`/api/user/${otherID}`, {
            // Updated endpoint
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${currentUser.token}`, // Assuming you store the token in currentUser
            },
          });
          const userData = await response.json();
          if (response.ok) {
            setOtherUserName(userData.username);
          } else {
            throw new Error("Failed to fetch user details");
          }
        } catch (error) {
          console.error("Failed to fetch user name:", error);
        }
      }
    }

    fetchUserName();
  }, [otherID, otherUserName, currentUser.token]); // Include dependencies as needed

  const getConversations = async () => {
    if (!isOtherIDInitialized.current) {
      try {
        const response = await fetch("/api/conversation", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const users = await response.json();

        const otherUser = users.find((user) => user._id !== currentUser._id);
        if (otherUser) {
          setOtherID(otherUser._id);
        }
      } catch (error) {
        console.error("Failed to fetch user list:", error);
      }
    }
  };

  const handleUserSelect = (id, name) => {
    setOtherID(id);
    setOtherUserName(name); // Set the user's name when selected
  };
  // useEffect(() => {
  //   if (currentUser) {
  //     getConversations();
  //   }
  // }, [currentUser]);

  // Function to determine message styling based on sender
  // Adjusted to compare with currentUser._id for dynamic styling
  const messageStyle = (senderId) => {
    return senderId === currentUser._id
      ? {
          container: "flex flex-col items-end",
          bubble: "bg-[#FFE0A4] text-black p-2 rounded-lg",
        }
      : {
          container: "flex flex-col items-start",
          bubble: "bg-white text-black p-2 rounded-lg border",
        };
  };

  // Function to navigate to the dashboard
  function takeMeToDasboard() {
    navigate("/dashboard");
  }

  // Function to open a toggle with a "Pay Now" button
  const openToggle = () => {
    setToggleOpen(!toggleOpen); // Toggle the visibility state
  };

  // Handler for the Pay Now button to toggle the image display
  const handlePayNow = () => {
    setShowImage(!showImage);
  };
  return (
    <div className="w-full h-screen bg-no-repeat bg-center bg-cover bg-[url('https://gyde-webapp-reactjs.onrender.com/dashboardimg.png')] ">
      <button onClick={takeMeToDasboard}>
        <DashboardHeader />
      </button>
      <div
        className="  ml-32 mr-20 flex h-screen text-black
    "
      >
        <ChatList onUserSelect={handleUserSelect} />

        <div className="flex mt-10 mb-10 flex-col w-2/3 bg-no-repeat bg-center bg-cover overflow-hidden rounded-lg  bg-[url('https://gyde-webapp-reactjs.onrender.com/chatbgimg.png')]">
          {/* Messages section */}
          <h2 className="text-lg font-semibold mb-4 bg-white p-3">
            {otherUserName || "Loading..."}
          </h2>
          <div className="p-4 overflow-auto flex-grow">
            <div className="space-y-2">
              {messages.map((message) => {
                return (
                  <div
                    key={message._id}
                    className={messageStyle(message.senderId).container}
                  >
                    <div className={messageStyle(message.senderId).bubble}>
                      <span>{message.message}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {showImage && (
            <img
              src="https://gyde-webapp-reactjs.onrender.com/paymentqr.jpeg"
              className="w-1/2 h-1/2 object-cover"
            />
          )}
          {/* Input section */}
          <div className="p-4 ">
            <div className="flex items-center ">
              {toggleOpen && (
                <button
                  className="bg-black text-white py-2 px-4 rounded-lg mr-2"
                  onClick={handlePayNow}
                >
                  Pay Now
                </button>
              )}
              <button
                className="bg-white text-black px-2 text-4xl rounded-lg text-center items-center"
                onClick={openToggle}
              >
                +
              </button>
              <input
                className="flex-grow p-2 border rounded-l-lg"
                placeholder="Type your message here ..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault(); // Prevents the default action of the enter key
                    sendMessage();
                  }
                }}
              />
              l
              <button
                className="bg-black text-[#FFE0A4]  py-2 px-4 rounded-r-lg"
                onClick={sendMessage}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
