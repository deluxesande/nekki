import {
    Box,
    Container,
    IconButton,
    TextField,
    Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import "../../css/MessagesTab.css";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import websocketinstance from "../utils/Websocket";
import { TramOutlined } from "@mui/icons-material";

const MessagesTab = ({ socketConnection, setFetching, chatId, receiver }) => {
<<<<<<< HEAD
    const [messages, setMessages] = useState([]);
    const [showInput, setShowInput] = useState(false);
    const { user } = useContext(AuthContext);
=======
  const [messages, setMessages] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const { user } = useContext(AuthContext);
>>>>>>> 1e18610d1bd4ddd666d45296b3ebeb5270848245

    const send_data_to_server = () => {
        let message = document.querySelector("#message-input").value;

        const send_message = {
            sender: user.account_id,
            receiver: receiver,
            content: message,
            chat_id: chatId,
        };

        websocketinstance.newChatMessage(send_message);
        websocketinstance.fetchMessages(user.user_id, chatId);

        setFetching(true);

        // Clear the input field
        document.querySelector("#message-input").value = "";
    };

    const addMessage = (message) => {
        // console.log("Messages updated");
        setMessages(...messages, message);
    };

    const setSocketMessages = (messages) => {
        // console.log("Setting messages");
        setMessages(messages);
    };

    const waitForConnection = () => {
        websocketinstance.addCallBacks(setSocketMessages, addMessage);
    };

    const waitForSocketConnection = () => {
        if (socketConnection) {
            setTimeout(() => {
                if (websocketinstance.state() === 1) {
                    // console.log("Connection secure");
                    waitForConnection();
                } else {
                    console.log("Waiting for connection");
                }
            }, 100);
        }
    };

    useEffect(() => {
        waitForSocketConnection();
        setTimeout(() => {
            if (socketConnection) {
                websocketinstance.fetchMessages(user.user_id, chatId);
            }
        }, 300);
    });

    const chats_to_display = messages.map((message, index) => {
        if (message.contact === user.username) {
            return (
                <Box key={index} className="message outgoing-message">
                    <Typography className="text">
                        {message.content}{" "}
                        <span>{message.sent.slice(0, 5)}</span>
                    </Typography>
                </Box>
            );
        } else {
            return (
                <Box key={index} className="message incoming-message">
                    <Typography className="text">
                        {message.content}{" "}
                        <span>{message.sent.slice(0, 5)}</span>
                    </Typography>
                </Box>
            );
        }
    });

    if (messages.length > 0 && !showInput) {
        setShowInput(true);
    }

<<<<<<< HEAD
    return (
        <Container
            sx={{
                mt: "4rem",
                width: "100%",
                height: "90vh",
            }}
        >
            <Box className="message-box">{chats_to_display}</Box>

            <Box className="message-input-box">
                {showInput ? (
                    <>
                        <TextField
                            id="message-input"
                            className="message-input"
                            type="text"
                            placeholder="Enter Message"
                            size="small"
                        />
                        <IconButton
                            aria-label="send"
                            aria-hidden={false}
                            onClick={send_data_to_server}
                        >
                            <SendIcon className="icon" sx={{ color: "#fff" }} />
                        </IconButton>
                    </>
                ) : (
                    <Typography
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50deg, -50deg)",
                            fontFamily: "monospace",
                        }}
                        variant="h4"
                    >
                        Start chats...
                    </Typography>
                )}
            </Box>
        </Container>
    );
=======
  useEffect(() => {
    waitForSocketConnection();
    setTimeout(() => {
      if (socketConnection) {
        websocketinstance.fetchMessages(user.user_id, chatId);
      }
    }, 300);
  });

  const chats_to_display = messages.map((message, index) => {
    if (message.contact === user.username) {
      return (
        <Box key={index} className="message outgoing-message">
          <Typography className="text">
            {message.content} <span>{message.sent.slice(0, 5)}</span>
          </Typography>
        </Box>
      );
    } else {
      return (
        <Box key={index} className="message incoming-message">
          <Typography className="text">
            {message.content} <span>{message.sent.slice(0, 5)}</span>
          </Typography>
        </Box>
      );
    }
  });

  if (messages.length > 0 && !showInput) {
    setShowInput(true);
  }

  return (
    <Container
      sx={{
        mt: "4rem",
        width: "100%",
        height: "90vh",
      }}
    >
      <Box className="message-box">{chats_to_display}</Box>

      <Box className="message-input-box">
        {showInput ? (
          <>
            <TextField
              id="message-input"
              className="message-input"
              type="text"
              placeholder="Enter Message"
              size="small"
            />
            <IconButton
              aria-label="send"
              aria-hidden={false}
              onClick={send_data_to_server}
            >
              <SendIcon className="icon" sx={{ color: "#fff" }} />
            </IconButton>
          </>
        ) : (
          <Typography
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50deg, -50deg)",
              fontFamily: "monospace",
            }}
            variant="h4"
          >
            Start chats...
          </Typography>
        )}
      </Box>
    </Container>
  );
>>>>>>> 1e18610d1bd4ddd666d45296b3ebeb5270848245
};

export default MessagesTab;
