import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { RootRouteLayout } from "./RootRouteLayout";
import { Auth } from "../pages/Auth";
import NotFound from "../pages/NotFound";
import Unauthorized from "../pages/Unauthorized";
import Unauthenticated from "../pages/Unauthenticated";
import Dashboard from "../pages/Dashboard";
import Drawer from "../components/Drawer";
import Test from "../pages/Test";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootRouteLayout />}>
      <Route index element={<Auth />} />
      <Route path="auth" element={<Auth />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="drawer" element={<Drawer />} />

      <Route path="test" element={<Test />} />

      <Route path="unauthenticated" element={<Unauthenticated />} />
      <Route path="unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default router;
