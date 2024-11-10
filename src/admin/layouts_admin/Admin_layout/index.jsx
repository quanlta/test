// src/layouts/AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import "../../../assets/sass/style.scss";
import Sidebar from "../Sidebar_admin";
import Header from "../Header_admin"; 
import { useContext } from "react";
import { Mycontext } from "../../../App"; 


const AdminLayout = () => {
  const { isToggleSidebar } = useContext(Mycontext);

  return (
    <div className="admin-layout">
      <Header />
      <div className="main d-flex">
        <div className={`sidebarWrapper ${isToggleSidebar ? "toggle" : ""}`}>
          <Sidebar />
        </div>
        <div className={`content ${isToggleSidebar ? "toggle" : ""}`}>
          <Outlet />
          
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
