import React from 'react';
import { BiSolidHome } from 'react-icons/bi';
import { RiBattery2ChargeFill } from 'react-icons/ri';
import { IoIosWallet } from 'react-icons/io';
import { FaCar } from 'react-icons/fa6';
import { BsThreeDots } from 'react-icons/bs';
import { BsChatDotsFill } from 'react-icons/bs';

// import { useRouterStore } from '../../store/zustand/router.store';
import { useNavigate } from 'react-router-dom';

export const Footer = () => {
  const navigate = useNavigate();
  const BASE_URL = process.env.PUBLIC_URL;

  const onClickHandler = (url: string) => {
    navigate(BASE_URL + url);
  };

  return (
    <>
      <div className="footer-style">
        <div className="footer-item-style" onClick={() => onClickHandler('/home')}>
          <BiSolidHome size="2rem" />
          <div>홈</div>
        </div>
        <div className="footer-item-style" onClick={() => onClickHandler('/charging')}>
          <RiBattery2ChargeFill size="2rem" />
          <div>충전소 찾기</div>
        </div>
        <div className="footer-item-style" onClick={() => onClickHandler('/chatting')}>
          <BsChatDotsFill size="2rem" />
          <div>채팅</div>
        </div>
        <div className="footer-item-style" onClick={() => onClickHandler('/setting')}>
          <BsThreeDots size="2rem" />
          <div>더보기</div>
        </div>
      </div>
    </>
  );
};
