import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AdminDash from "./admin/AdminDash";
import AdminDoc from "./admin/AdminDoc";
import AdminDocMod from "./admin/AdminDocMod";
import AdminLogin from "./admin/adminLogin";
import DoctorHome from "./doctor_pages/DoctorHome";
import DoctorLogin from "./doctor_pages/DoctorLogin";
import DoctorSignup from "./doctor_pages/DoctorSignup";
import Patients from "./doctor_pages/Patients";
import BMICalc from "./pages/BMICalc";
import EducationalResources from "./pages/EducationalResources";
import GlucoseCalc from "./pages/Glucose";
import History from "./pages/History";
import HomePage from "./pages/HomePage";
import HospitalLocator from "./pages/HospitalLocator";
import LoginPage from "./pages/LoginPage";
import Predictor from "./pages/Predictor";
import ProtectedRoute from "./pages/protectedRoute.jsX";
import SignUpPage from "./pages/SignUpPage";
import StrokePrevent from "./pages/StrokePrevent";
import StrokeRecover from "./pages/StrokeRecover";
import StrokeRisk from "./pages/StrokeRisk";
import UserLogin from "./pages/UserLogin";
import UserProfile from "./pages/UserProfile";
import UserSignup from "./pages/UserSignup";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="topright" />
      <Routes>
        <Route index element={<Navigate to="/login/userlogin" />} />
        <Route path="/login" element={<LoginPage />}>
          <Route path="userlogin" element={<UserLogin />} />
          <Route path="doctorlogin" element={<DoctorLogin />} />
          <Route path="adminlogin" element={<AdminLogin />} />
        </Route>
        <Route path="/signup" element={<SignUpPage />}>
          <Route path="usersignup" element={<UserSignup />} />
          <Route path="doctorsignup" element={<DoctorSignup />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/userassessment" element={<UserProfile />} />
        <Route path="bmi" element={<BMICalc />} />
        <Route path="strokerisk" element={<StrokeRisk />} />
        <Route path="strokeprevent" element={<StrokePrevent />} />
        <Route path="strokerecovery" element={<StrokeRecover />} />
        <Route path="glucose" element={<GlucoseCalc />} />
        <Route
          path="/userhome"
          element={
            <ProtectedRoute RequiredRole="user">
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctorhome"
          element={
            <ProtectedRoute RequiredRole="doctor">
              <DoctorHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="patients"
          element={
            <ProtectedRoute RequiredRole="doctor">
              <Patients />
            </ProtectedRoute>
          }
        />
        <Route
          path="adminhome"
          element={
            <ProtectedRoute RequiredRole="admin">
              <AdminDash />
            </ProtectedRoute>
          }
        />
        <Route
          path="admindoc"
          element={
            <ProtectedRoute RequiredRole="admin">
              <AdminDoc />
            </ProtectedRoute>
          }
        />
        <Route
          path="admindochome"
          element={
            <ProtectedRoute RequiredRole="admin">
              <AdminDocMod />
            </ProtectedRoute>
          }
        />
        <Route path="/history" element={<History />} />
        <Route path="/predictor" element={<Predictor />} />
        <Route
          path="/EducationalResources"
          element={<EducationalResources />}
        />
        <Route path="/HospitalLocator" element={<HospitalLocator />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
