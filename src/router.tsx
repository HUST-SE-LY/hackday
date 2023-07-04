import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Graph from "./pages/Graph";
import Login from "./pages/Login";
import User from "./pages/User";

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
  },
  {
    path: 'user',
    element: <User />
  },
]);

export default router;
