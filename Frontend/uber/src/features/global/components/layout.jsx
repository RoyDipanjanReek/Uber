import React from "react";
import Navbar from "./navbar";
import { Outlet } from "react-router-dom";
import Footer from "./footer";
import { Toaster } from "@/components/ui/sonner"


const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
        <Toaster />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
