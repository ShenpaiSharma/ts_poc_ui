import { lazy } from "react";

const Inbox = lazy(() => import("./AppInbox"));

const inboxRoutes = [
  {
    path: "/inbox",
    // exact: true,
    element: <Inbox />,
  },
];

export default inboxRoutes;
