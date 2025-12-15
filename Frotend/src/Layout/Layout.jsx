import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

const Layout = () => {
  const location = useLocation();

 
  const hideNavbar = ["/login", "/signup"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Outlet />
    </>
  );
};

export default Layout;
