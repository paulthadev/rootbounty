import { Outlet } from "react-router";
import Sidebar from "../../components/Sidebar";

const DashboardLayout = () => {
  return (
    <section className="max-w-[90rem] mx-auto grid grid-cols-6 h-[100vh]">
      <div className=" hidden  lg:col-span-1 lg:block">
        <Sidebar />
      </div>
      <div className="col-span-5 bg-[#F2F2F2] w-[100vw] h-screen overflow-scroll lg:w-auto sm:px-[70px] px-4 py-[2rem]">
        <Outlet />
      </div>
    </section>
  );
};

export default DashboardLayout;