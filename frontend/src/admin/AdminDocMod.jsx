import Footer from "../component/Footer";
import AdminNav from "./AdminNav";
import ModifyDoc from "./ModifyDoc";

function AdminDocMod() {
  return (
    <div className="font-sans">
      {/* Navbar */}
      <AdminNav />

      {/* User Management */}
      <ModifyDoc />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default AdminDocMod;
