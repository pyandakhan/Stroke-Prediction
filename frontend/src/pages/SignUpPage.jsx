import { Outlet } from "react-router-dom";
import SignNav from "../component/SignNav";

function SignUpPage() {
  return (
    <div>
      <div className="absolute top-0 left-0 right-0 z-10">
        <SignNav />
      </div>
      <Outlet />
    </div>
  );
}

export default SignUpPage;
