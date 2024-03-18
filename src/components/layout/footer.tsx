import React from 'react';
import { BiSolidHome } from 'react-icons/bi';
import { BsThreeDots } from 'react-icons/bs';
import { BsChatDotsFill } from 'react-icons/bs';
import { FaFlipboard } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { FaUserFriends } from 'react-icons/fa';

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
          <FaUserFriends size="2rem" />
          <div>친구</div>
        </div>
        <div className="footer-item-style" onClick={() => onClickHandler('/chatting')}>
          <BsChatDotsFill size="2rem" />
          <div>채팅</div>
        </div>
        <div className="footer_item_style" onClick={() => onClickHandler('/board')}>
          <FaFlipboard size="2rem" />
          <div>게시판</div>
        </div>
        <div className="footer-item-style" onClick={() => onClickHandler('/setting')}>
          <BsThreeDots size="2rem" />
          <div>더보기</div>
        </div>
      </div>
    </>
  );
};
