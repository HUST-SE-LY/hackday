import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Graph from "./pages/Graph";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/graph",
    element: <Graph />,
  },
]);

export default router;
