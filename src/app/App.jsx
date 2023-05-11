import "../fake-db";
import "../styles/app/app.scss";
import Auth from "./auth/Auth";
import React from "react";
import routes from "./routes";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <Auth>
      <RouterProvider router={routes} />
    </Auth>
  );
}

export default App;
