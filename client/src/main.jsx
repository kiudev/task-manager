import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "./App.jsx";
import { SignIn } from "./pages/SignIn.jsx";
import { SignUp } from "./pages/SignUp.jsx";
import { ProtectedRoute } from "./pages/ProtectedRoute.jsx";

const appRouter = createBrowserRouter([
   {
      path: "/",
      element: <SignIn />,
   },
   {
      path: "/",
      element: <ProtectedRoute />,
      children: [
         {
            path: "/home",
            element: <App />,
         },
      ],
   },
   {
      path: "/account",
      element: <SignUp />,
   },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <RouterProvider router={appRouter} />
   </React.StrictMode>
);
