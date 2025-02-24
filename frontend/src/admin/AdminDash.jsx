import Footer from "../component/Footer";
import AdminNav from "./AdminNav";
import UserManagement from "./UserManagement";

const AdminDash = () => {
  return (
    <div className="font-sans">
      {/* Navbar */}
      <AdminNav />

      {/* User Management */}
      <UserManagement />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AdminDash;
