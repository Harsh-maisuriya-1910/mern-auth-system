import { RouterProvider } from "react-router-dom";
// CHANGE APPLIED: Fixed casing of router import (from uppercase Router to lowercase router) and file reference (router.jsx instead of Router.jsx) to resolve runtime crash.
import { router } from "./routes/router.jsx";

function App() {
  return (
    <div>
        <RouterProvider router={router} />
    </div>
  );
}

export default App;