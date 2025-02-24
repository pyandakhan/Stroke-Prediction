import Footer from "../component/Footer";
import AdminNav from "./AdminNav";
import DoctorManagement from "./DoctorManagement";

const AdminDoc = () => {
  return (
    <div className="font-sans">
      {/* Navbar */}
      <AdminNav />

      {/* User Management */}
      <DoctorManagement />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AdminDoc;
