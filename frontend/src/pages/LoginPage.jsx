import { Outlet } from "react-router-dom";
import LoginNav from "../component/LoginNav.jsx";

const LoginPage = () => {
  return (
    <div>
      <div className="absolute top-0 left-0 right-0 z-10">
        <LoginNav />
      </div>
      <Outlet />
    </div>
  );
};

export default LoginPage;
