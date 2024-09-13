import { Outlet } from "react-router";
import Sidebar from "../../components/Sidebar";

const dashboardLayout = () => {
  return (
    <section className="max-w-[90rem] mx-auto grid grid-cols-6">
      <div className=" hidden lg:col-span-1">
        <Sidebar />
      </div>
      <div className="col-span-5">
        <Outlet />
      </div>
    </section>
  );
};

export default dashboardLayout;