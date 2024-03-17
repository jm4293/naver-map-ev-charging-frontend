import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages/home/home';
import { Layout } from '../components/layout/layout';
// import { Landing } from '../pages/landing/landing';
import { ChargingStation } from '../pages/chargingStation/chargingStation';
import { Setting } from '../pages/setting/setting';
import { Chatting } from '../pages/chatting/chatting';

export const RootRouters = () => {
  const BASE_URL = process.env.PUBLIC_URL;

  return (
    <Routes>
      <Route path={BASE_URL} element={<Layout />}>
        <Route path={BASE_URL + '/home'} element={<Home />} />
        <Route path={BASE_URL + '/charging'} element={<ChargingStation />} />
        <Route path={BASE_URL + '/chatting'} element={<Chatting />} />
        <Route path={BASE_URL + '/setting'} element={<Setting />} />
      </Route>
    </Routes>
  );
};
