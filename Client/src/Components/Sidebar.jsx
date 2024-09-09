import React, { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };




  return (
    <div className="flex fixed w-full md:w-auto">
      {isOpen ? (
        <div
          id="mySidebar"
          className="md:min-h-screen bg-[#111] w-[100%] md:w-auto z-10 flex flex-col overflow-hidden"
        >
          <div className="flex justify-between ">
            <a
              href="/dashboard"
              className="sidebar_user text-center md:ms-8 w-full text-lg md:text-xl font-sans my-6 text-slate-300"
            >
              <i className="fa fa-user" aria-hidden="true"></i>
              <h2 className="mt-2 mx-auto w-full">Mohit Sharma</h2>
            </a>
            <button
              id="closebtn"
              className="closebtn text-white mx-3 hidden md:block text-4xl"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </div>
          <div className="font-mono flex text-base md:text-base gap-x-5 px-3 mt-0 md:mt-7 md:flex-col text-slate-400 flex-wrap">
            <a
              href="/dashboard"
              className="py-2 md:px-10 m-auto md:m-0 hover:bg-[#222222] hover:text-gray-100"
            >
              DASHBOARD
            </a>
            <a
              href="/converstaions"
              className="py-2 md:px-10 m-auto md:m-0 hover:bg-[#222222] hover:text-gray-100"
            >
              PREVIOUS CHATS
            </a>
            <button
              onClick={handleLogout}
              className="py-2 text-start md:px-10 m-auto md:m-0 hover:bg-[#222222] hover:text-gray-100"
            >
              LOGOUT
            </button>
          </div>
        </div>
      ) : (
        <div id="main">
          <button
            className="text-3xl my-5 mx-8 openbtn "
            id="openbtn"
            onClick={() => setIsOpen(true)}
          >
            ☰
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
