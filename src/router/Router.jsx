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
import User from "../features/user/User";
import Profile from "../pages/Profile";
import RequireRole from "../features/auth/RequireRole";
import Overview from "../pages/Overview";
import Patients from "../features/patients/Patients";
import Appointments from "../features/appointment/Appointments";
import Records from "../features/record/Records";
// import Stepper from "../test/Stepper";
import Onboard from "../pages/onboard/Onboard";
import Configuration from "../features/config/Configuration";
import Initialize from "../features/config/Initialize";
import PatientTest from "../features/patients/PatientTest";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Initialize />}>
      <Route element={<VerifyToken />}>
        <Route path="/" element={<RootRouteLayout />}>
          <Route index element={<Auth />} />
          <Route path="auth" element={<Auth />} />
          <Route element={<RequireAuth />}>
            <Route path="dashboard" element={<Dashboard />}>
              <Route index element={<Configuration />} />
              <Route path="config" element={<Configuration />} />
              <Route element={<RequireRole allowedRoles={["admin"]} />}>
                <Route path="users" element={<Users />} />
                <Route path="users/:userId" element={<User />} />
                <Route path="roles" element={<Roles />} />
              </Route>
              <Route path="config" element={<Configuration />} />
              {/* PROTOTYPE */}
              <Route path="patients" element={<Patients />} />
              <Route path="appointments" element={<Appointments />} />
              <Route path="profile" element={<Profile />} />
              <Route path="records" element={<Records />} />
            </Route>
          </Route>
          <Route path="patienttest" element={<PatientTest />}></Route>

          <Route path="drawer" element={<Drawer />} />
          <Route path="test" element={<Onboard />} />
          <Route path="onboard" element={<Onboard />} />
          <Route path="unauthenticated" element={<Unauthenticated />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    </Route>
  )
);

export default router;
