/* eslint-disable react/prop-types */

import {
    Button,
    Drawer,
    List,
    TextField,
} from "@mui/material";
import MessagesDrawerItem from "../utils/MessagesDrawerItem";
import { useContext, useEffect, useState } from "react";
import useFetch from "../utils/useFetch";
import AuthContext from "../../context/AuthContext";
import websocketinstance from "../utils/Websocket";

const MessagesDrawer = ({
    setSocketConnection,
    setChatId,
    setReceiver,
    setFetching,
    socketConnection,
    fetching,
}) => {
    const { user } = useContext(AuthContext);
    const api = useFetch();
    const [chats, setChats] = useState([]);

    const drawerWidth = 270;

    const get_user_cahts = async () => {
        console.log("getting chats");
        const { response, data } = await api(
            `/chat/${user.account_id}/`,
            "GET"
        );
        if (response.status === 200) {
            setChats(data);
        }
        setFetching(false);
    };

    // const start_new_chat = async () => {
    //     const { response, data } = api(`get-contact/${receiver}`, "GET");
    // };

    useEffect(() => {
        get_user_cahts();
    }, [fetching]);

    const connect_to_websocket = (chat_id) => {
        if (!socketConnection) {
            websocketinstance.connect(user.account_id);
            // console.log("Setting socket connection");
            setSocketConnection(true);
        }
        setTimeout(() => {
            websocketinstance.fetchMessages(user.user_id, chat_id);

            // Set the chat id to be used in sending messages
            setChatId(chat_id);
        }, 100);
    };

    const display_chats = chats.map((chat, index) => {
        return (
            <MessagesDrawerItem
                connect={() => connect_to_websocket(chat.id)}
                chat={chat}
                key={index}
                setReceiver={setReceiver}
            />
        );
    });

    return (
        <>
            <Drawer
                open
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    overflowY: "auto",
                }}
            >
                <List sx={{ mt: "4rem" }}>
                    {chats.length === 0 ? (
                        <div
                            style={{
                                width: "240px",
                                padding: "2rem",
                                marginTop: "30vh", // Make this dynamic
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                                pt: "4rem",
                            }}
                        >
                            <p
                                style={{
                                    fontFamily: "monospace",
                                }}
                            >
                                No Chats...
                            </p>
                            <TextField
                                type="text"
                                placeholder="Enter username"
                                size="small"
                                sx={{ mt: "20px" }}
                                color="primary"
                            />
                            <Button
                                color="primary"
                                variant="contained"
                                sx={{ mt: "20px" }}
                                // onclick={start_new_chat}
                            >
                                Start chat
                            </Button>
                        </div>
                    ) : (
                        display_chats
                    )}
                </List>
            </Drawer>
        </>
    );
};

export default MessagesDrawer;
