import { lazy } from "react";

const ContactTable = lazy(() => import("./ContactTable"));
const ContactList = lazy(() => import("./ContactList"));
const ContactCard = lazy(() => import("./ContactCard"));
const ContactDetails = lazy(() => import("./ContactDetails"));

const contactRoutes = [
  {
    path: "/contact/table",
    element: <ContactTable />,
  },
  {
    path: "/contact/list",
    element: <ContactList />,
  },
  {
    path: "/contact/card",
    element: <ContactCard />,
  },
  {
    path: "/contact/details",
    element: <ContactDetails />,
  },
];

export default contactRoutes;
