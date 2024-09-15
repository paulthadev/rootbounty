import { Outlet } from "react-router";
import Sidebar from "../../components/Sidebar";
import { FaBars } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setOpenSidebar } from "../../features/generalSlice";
import MobileSidebar from "../../components/MobileSidebar";

const DashboardLayout = () => {
  const { openSidebar } = useSelector((store) => store.general);
  const dispatch = useDispatch();

  return (
    <section className="max-w-[90rem] mx-auto grid grid-cols-6 h-[100vh]">
      <div className=" hidden  lg:col-span-1 lg:block">
        <Sidebar />
      </div>
      <div className="col-span-5 bg-[#F2F2F2] w-[100vw] h-screen overflow-scroll lg:w-auto sm:px-[70px] px-4 py-[2rem]">
        <span
          className="lg:hidden flex  justify-end text-2xl my-6 cursor-pointer"
          onClick={() => dispatch(setOpenSidebar(true))}
        >
          <FaBars />
        </span>
        {openSidebar && <MobileSidebar />}
        <Outlet />
      </div>
    </section>
  );
};

export default DashboardLayout;
