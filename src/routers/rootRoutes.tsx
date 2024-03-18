import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages/home/home';
import { Layout } from '../components/layout/layout';
// import { Landing } from '../pages/landing/landing';
import { Friend } from '../pages/friends/friend';
import { Setting } from '../pages/setting/setting';
import { Chatting } from '../pages/chatting/chatting';
import { Login } from '../pages/users/login/login';
import { Boards } from '../pages/boards/boards';

export const RootRouters = () => {
  const BASE_URL = process.env.PUBLIC_URL;

  return (
    <Routes>
      <Route path={BASE_URL + '/login'} element={<Login />} />

      <Route path={BASE_URL} element={<Layout />}>
        <Route path={BASE_URL + '/home'} element={<Home />} />
        <Route path={BASE_URL + '/charging'} element={<Friend />} />
        <Route path={BASE_URL + '/chatting'} element={<Chatting />} />
        <Route path={BASE_URL + '/board'} element={<Boards />} />
        <Route path={BASE_URL + '/setting'} element={<Setting />} />
      </Route>
    </Routes>
  );
};
