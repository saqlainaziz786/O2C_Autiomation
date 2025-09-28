import React from "react";

const Header = () => {
  return (
    <div>
      <div className="w-full bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 rounded-lg p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-white">
          Lead Management Dashboard
        </h1>
        <p className="text-blue-100 mt-2">
          Track and manage your sales leads efficiently
        </p>
      </div>
    </div>
  );
};

export default Header;
