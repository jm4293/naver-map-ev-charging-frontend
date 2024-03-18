import React from 'react';
import { Outlet } from 'react-router-dom';

export const Main = () => {
  return (
    <>
      <div className="main-style">
        <Outlet />
      </div>
    </>
  );
};
