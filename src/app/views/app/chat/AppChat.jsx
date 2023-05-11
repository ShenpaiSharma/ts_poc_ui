import {
  getAllContact,
  sendNewMessage,
  getContactById,
  getRecentContact,
  getChatRoomByContactId,
} from "./chatService";
import ChatSidenav from "./ChatSidenav";
import ChatContainer from "./ChatContainer";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { isMobile } from "@utils";

const AppChat = () => {
  const [state, setState] = useState({
    currentUser: {
      id: "7863a6802ez0e277a0f98534",
    },
    contactList: [],
    recentContactList: [],
    messageList: [],
    currentChatRoom: "",
    opponentUser: null,
    open: true,
    isMobile: false,
  });

  let bottomRef = React.createRef();
  let windowResizeListener;

  const updateRecentContactList = () => {
    let { id } = state.currentUser;
    getRecentContact(id).then((data) => {
      setState((prevState) => ({
        ...prevState,
        recentContactList: [...data.data],
      }));
    });
  };

  const handleContactClick = (contactId) => {
    if (isMobile()) toggleSidenav();

    getContactById(contactId).then(({ data }) => {
      setState((prevState) => ({
        ...prevState,
        opponentUser: { ...data },
      }));
    });

    getChatRoomByContactId(state.currentUser.id, contactId).then(({ data }) => {
      let { chatId, messageList, recentListUpdated } = data;

      setState((prevState) => ({
        ...prevState,
        currentChatRoom: chatId,
        messageList,
      }));
      if (recentListUpdated) {
        updateRecentContactList();
      }
    });
  };

  useEffect(() => {
    let { id } = state.currentUser;
    getContactById(id).then((data) => {
      setState((prevState) => ({
        ...prevState,
        currentUser: {
          ...data.data,
        },
      }));
    });
    getAllContact(state.currentUser.id).then((data) =>
      setState((prevState) => ({
        ...prevState,
        contactList: [...data.data],
      }))
    );
    updateRecentContactList();

    if (isMobile())
      setState((prevState) => ({
        ...prevState,
        open: false,
        isMobile: true,
      }));
    if (window) {
      const windowResizeListener = window.addEventListener("resize", (e) => {
        if (isMobile())
          setState((prevState) => ({
            ...prevState,
            open: false,
            isMobile: true,
          }));
        else
          setState((prevState) => ({
            ...prevState,
            open: true,
            isMobile: false,
          }));
      });
      return () => window.removeEventListener("resize", windowResizeListener);
    }
  }, []);

  useEffect(() => {
    if (window) window.removeEventListener("resize", windowResizeListener);
  }, [window]);

  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleMessageSend = (message) => {
    const { currentUser, opponentUser, currentChatRoom, messageList } = state;
    const { id } = currentUser;
    if (!currentChatRoom) return;
    sendNewMessage({
      chatId: currentChatRoom,
      text: message,
      contactId: id,
      time: new Date(),
    }).then((data) => {
      setState({
        ...state,
        messageList: [...data.data],
      });

      setTimeout(() => {
        sendNewMessage({
          chatId: currentChatRoom,
          text: `Hi, I'm ${opponentUser.name}. Your imaginary friend.`,
          contactId: opponentUser.id,
          time: new Date(),
        }).then((data) => {
          setState({
            ...state,
            messageList: [...data.data],
          });
        });
      }, 750);
    });
  };

  const toggleSidenav = () => {
    setState((prevState) => ({
      ...prevState,
      open: !prevState.open,
    }));
  };

  const setBottomRef = (ref) => {
    bottomRef.current = ref;
  };

  let {
    open,
    currentUser,
    contactList,
    recentContactList,
    messageList,
    opponentUser,
    currentChatRoom,
  } = state;

  return (
    <Card className="chat-sidebar-container sidebar-container">
      <ChatSidenav
        open={open}
        isMobile={state.isMobile}
        toggleSidenav={toggleSidenav}
        contactList={contactList}
        recentContactList={recentContactList}
        handleContactClick={handleContactClick}
      />
      <ChatContainer
        open={open}
        isMobile={state.isMobile}
        toggleSidenav={toggleSidenav}
        messageList={messageList}
        currentUser={currentUser}
        opponentUser={opponentUser}
        currentChatRoom={currentChatRoom}
        setBottomRef={setBottomRef}
        handleMessageSend={handleMessageSend}
      />
    </Card>
  );
};

export default AppChat;
