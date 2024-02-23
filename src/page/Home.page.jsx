import React, { useEffect } from "react";
import { PreventComponents } from "../components";
import { useNavigate, Outlet } from "react-router-dom";
import { getProfile } from "../service/auth.service";
import { IoLogOutOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { MdOutlineImportContacts } from "react-icons/md";
import { RiUserFollowLine } from "react-icons/ri";

const HomePage = () => {
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      const res = await getProfile();
      // console.log(res);
    })();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    nav("/");
  };

  const handleAdd = () => nav("/home/add");
  return (
    <PreventComponents check={!localStorage.getItem("auth")} fail={"/"}>
      <div className="h-auto bg-purple-50">
        <div className="w-[70%] h-auto mx-auto">
          <nav className="flex sticky top-0 bg-purple-50 justify-between items-center px-2 py-7">
            <h1
              onClick={() => nav("/home")}
              className="cursor-pointer text-xl tracking-wide font-bold text-purple-900 flex items-center gap-2"
            >
              {/* <MdOutlineImportContacts size={30} /> */}
              <span className="border bg-purple-800 rounded-full p-2">
                <RiUserFollowLine size={20} className="text-white stroke-1" />
              </span>
              ContactApp
            </h1>
            <div className="flex items-center gap-5">
              <button className="btn" onClick={handleAdd}>
                Add
                <FaPlus size={12} />
              </button>
              <button className="btn" onClick={handleLogout}>
                Logout
                <IoLogOutOutline size={20} />
              </button>
            </div>
          </nav>

          <Outlet />
        </div>
      </div>
    </PreventComponents>
  );
};

export default HomePage;
