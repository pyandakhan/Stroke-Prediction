import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, RequiredRole }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  if (!token) {
    return <Navigate to="/login/userlogin" replace />;
  }
  if (role !== RequiredRole) {
    return <Navigate to={`/${role}home`} replace />;
  }

  return children;
};

export default ProtectedRoute;
