import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import Graph from "./pages/Home/Graph";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: '/graph',
    element: <Graph />
  }
]);

export default router;
