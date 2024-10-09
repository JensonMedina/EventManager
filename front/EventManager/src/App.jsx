import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthPage from "./screens/AuthPage";
import Dashboard from "./screens/Dashboard";
import Protected from "./routes/Protected";
import CreateEvent from "./screens/CreateEvent";
import EventDetail from "./screens/EventDetail";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/auth",
      element: <AuthPage />,
    },
    {
      path: "/",
      element: (
        // <Protected>
        <MainLayout />
        // </Protected>
      ),
      children: [
        { path: "/", element: <Dashboard /> },
        { path: "/create-event", element: <CreateEvent /> },
        { path: "/event-detail/:idEvent", element: <EventDetail /> },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
