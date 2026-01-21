import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "./App.css";
import HomePage from "./components/home/HomePage";
import FactorBoard from "./components/factor_board/FactorBoard";
import RequestListPage from "./pages/RequestListPage";
import ManagerRequestView from "./pages/ManagerRequestView";
import FactorRequestView from "./pages/FactorRequestView";
import ManagerRequestsListPage from "./pages/ManagerRequestsListPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/manager",
    element: <ManagerRequestsListPage />,
  },
  {
    path: "/postman",
    element: <FactorBoard />,
  },
  {
    path: "/requests",
    element: <RequestListPage />,
  },
  {
    path: "/manager/requests",
    element: <ManagerRequestsListPage />,
  },
  {
    path: "/manager/request/:id",
    element: <ManagerRequestView />,
  },
  {
    path: "/postman/request/:id",
    element: <FactorRequestView />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
