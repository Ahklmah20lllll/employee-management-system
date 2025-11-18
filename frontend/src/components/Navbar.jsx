import React from "react";

const Navbar = () => {
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;
  
    const logout = () => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location.href = "/login";
    };
  
    return (
      <div className="flex justify-between items-center bg-white shadow-md px-6 py-4">
  
        <h1 className="text-xl font-bold">
          Welcome {user?.name || user?.email || "User"}
        </h1>
  
        <button onClick={logout} className="px-4 py-2 bg-red-600 text-white rounded">
          Logout
        </button>
  
      </div>
    );
  };
  
  export default Navbar;
  