import { useEffect } from "react";
import useCurrentUser from "../hooks/useCurrentUser";
import { links } from "../constants/sidebarLinks";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const { useData, loading } = useCurrentUser();

  return (
    <section className="bg-[#4CAF50CF] h-screen  ">
      <nav className="pt-[1.6rem] bg-[#4CAF50]">
        <span className="uppercase text-white font-bold text-[2.5rem] px-10">
          rb
        </span>
      </nav>
      <div>
        <ul className="px-4 py-6">
          {links.map((link) => {
            const { subtitle, items } = link;

            return (
              <li
                key={subtitle}
                className={`text-white mb-6 pb-[1.2rem] ${
                  subtitle === "overview" ? "border-b-[2px] border-white" : ""
                }`}
              >
                <h3 className="uppercase text-[.625rem] mb-[.5rem]">
                  {subtitle}
                </h3>

                {items.map((item) => {
                  return (
                    <NavLink
                      to={`/dashboard${item.link}`}
                      key={item.link}
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
                <h4></h4>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Sidebar;
