import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import EmployeeRecordsPage from "./pages/EmployeeRecordsPage";
import NotFoundPage from "./pages/NotFoundPage";
import CreateEmployeeModal from "./modals/CreateEmployeeModal";
import Toast from "./components/Toast";

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <EmployeeRecordsPage />,
      errorElement: <NotFoundPage />,
      children: [
        {
          path: "/create",
          element: <CreateEmployeeModal />,
        },
        {
          path: "/id/:id",
          element: <CreateEmployeeModal />,
        },
        {
          path: "/name/:name",
          element: <CreateEmployeeModal />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Toast />
    </>
  );
};

export default App;
