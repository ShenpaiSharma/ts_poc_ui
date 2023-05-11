import { isMobile } from "@utils";
import InboxSidenav from "./InboxSidenav";
import InboxContent from "./InboxContent";
import { createRef, useEffect, useState } from "react";
import { getAllMessage } from "./inboxService";

const AppInbox = () => {
  const container = createRef();
  let windowResizeListener;
  const [state, setState] = useState({
    mainSidenavOpen: true,
    secSidenavOpen: true,
    masterCheckbox: false,
    isMobile: false,
    messageList: [],
  });

  const toggleSidenav = (field) => {
    setState((prevState) => ({ ...prevState, [field]: !state[field] }));
  };

  useEffect(() => {
    if (isMobile()) {
      setState((prevState) => ({
        ...prevState,
        mainSidenavOpen: false,
        secSidenavOpen: false,
        isMobile: true,
      }));
    }
    if (window) {
      windowResizeListener = window.addEventListener("resize", (e) => {
        if (isMobile()) {
          setState((prevState) => ({
            ...prevState,
            mainSidenavOpen: false,
            secSidenavOpen: false,
            isMobile: true,
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            mainSidenavOpen: true,
            secSidenavOpen: true,
            isMobile: false,
          }));
        }
      });
      window.removeEventListener("resize", windowResizeListener);
    }

    getAllMessage().then((data) => {
      setState((prevState) => ({
        ...prevState,
        messageList: data.data,
      }));
    });
  }, []);

  useEffect(() => {
    if (window) window.removeEventListener("resize", windowResizeListener);
  }, [window]);

  let { mainSidenavOpen, secSidenavOpen, messageList } = state;

  return (
    <div className="inbox-main-sidebar-container sidebar-container">
      <InboxContent
        secSidenavOpen={secSidenavOpen}
        mainSidenavOpen={mainSidenavOpen}
        isMobile={state.isMobile}
        messageList={messageList}
        toggleSidenav={toggleSidenav}
      />
      <InboxSidenav open={mainSidenavOpen} toggleSidenav={toggleSidenav} />
    </div>
  );
};

export default AppInbox;
