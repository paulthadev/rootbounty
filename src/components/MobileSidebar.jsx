import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { buyerlinks, farmerlinks } from "../constants/sidebarLinks";
import LogoutModal from "./dashboard/LogoutModal";
import { handleLogout } from "../utils/logout";
import useCurrentUser from "../hooks/useCurrentUser";
import { useDispatch, useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";
import { setOpenSidebar } from "../features/generalSlice";

const MobileSidebar = () => {
  const { userData } = useCurrentUser();
  const dispatch = useDispatch()

  const [isModalOpen, setModalOpen] = useState(false);

  const handleLogoutClick = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const { openSidebar } = useSelector((store) => store.general);

  const links = userData?.user_type === "buyer" ? buyerlinks : farmerlinks;

  return (
    <>
      <section className="bg-[#4CAF50] z-20 h-screen fixed top-0 right-0 w-[40vw]">
        <div>
          <div
            className="absolute  right-[2rem] top-[2rem] text-2xl text-white"
            onClick={() => dispatch(setOpenSidebar(false))}
          >
            <FaTimes />
          </div>
          <nav className="flex pt-[1.6rem] bg-[#4CAF50]">
            <Link to="/">
              <span className="uppercase text-white font-bold text-[2.5rem] px-10">
                rb
              </span>
            </Link>
          </nav>
          <div>
            <ul className="px-4 py-6">
              {links.map((link) => {
                const { subtitle, items } = link;

                return (
                  <li
                    key={subtitle}
                    className={`text-white mb-6 pb-[1.2rem] ${
                      subtitle === "overview"
                        ? "border-b-[2px] border-white"
                        : ""
                    }`}
                  >
                    <h3 className="uppercase text-[.625rem] mb-[.5rem]">
                      {subtitle}
                    </h3>

                    {items.map((item) => {
                      return item.title === "logout" ? (
                        <button
                          key={item.link}
                          onClick={handleLogoutClick}
                          className="block px-2 rounded-md text-white mb-[.81rem]"
                        >
                          <h5 className="text-base font-semibold capitalize">
                            {item.title}
                          </h5>
                        </button>
                      ) : (
                        <NavLink
                          to={`/dashboard${item.link}`}
                          key={item.link}
                          end
                          className={({ isActive }) =>
                            isActive
                              ? "bg-[#307333] block p-2 rounded-md text-white mb-[.81rem]"
                              : "block p-2 rounded-md text-white mb-[.81rem]"
                          }
                        >
                          <h5 className="text-base font-semibold capitalize">
                            {item.title}
                          </h5>
                        </NavLink>
                      );
                    })}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Use the LogoutModal component */}
          <LogoutModal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            onConfirm={handleLogout}
          />
        </div>
      </section>
    </>
  );
};

export default MobileSidebar;
