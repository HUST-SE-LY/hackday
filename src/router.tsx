import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Graph from "./pages/Graph";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/graph",
    element: <Graph />,
  },
  {
    path: "login",
    element: <Login />,
  }
]);

export default router;
