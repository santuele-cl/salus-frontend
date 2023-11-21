import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import RootRouteLayout from "./RootRouteLayout";
import Auth from "../pages/Auth";
import NotFound from "../pages/error/NotFound";
import Unauthorized from "../pages/Unauthorized";
import Unauthenticated from "../pages/Unauthenticated";
import Dashboard from "../pages/Dashboard";
import Drawer from "../components/Drawer";
import Test from "../pages/Test";

import VerifyToken from "../features/auth/VerifyToken";
import RequireAuth from "../features/auth/RequireAuth";
import Roles from "../features/role/Roles";
import Users from "../features/user/Users";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<VerifyToken />}>
      <Route path="/" element={<RootRouteLayout />}>
        <Route index element={<Auth />} />
        <Route path="auth" element={<Auth />} />

        <Route element={<RequireAuth />}>
          <Route path="dashboard" element={<Dashboard />}>
            <Route path="users" element={<Users />} />
            <Route path="roles" element={<Roles />} />
          </Route>
        </Route>

        <Route path="drawer" element={<Drawer />} />

        <Route path="roles" element={<Drawer />} />
        <Route path="roles" element={<Drawer />} />

        <Route path="test" element={<Test />} />

        <Route path="unauthenticated" element={<Unauthenticated />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Route>
  )
);

export default router;
