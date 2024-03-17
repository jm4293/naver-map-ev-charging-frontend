import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { AiOutlineBell } from 'react-icons/ai';
import { MdOutlineDarkMode } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
// import { header_style } from '../../styles/layout/layout.style';

export const Header = () => {
  const navigate = useNavigate();

  const btn_onClick_login = () => {
    navigate(process.env.PUBLIC_URL + '/login');
  };

  return (
    <>
      <div className="header_style">
        <div>
          <div className="flex items-center gap-5 cursor-pointer" onClick={btn_onClick_login}>
            <AiOutlineUser size="2rem" />
            <div>로그인을 해주세요</div>
          </div>
        </div>

        <div className="flex gap-5">
          <AiOutlineBell size="2rem" />
          <MdOutlineDarkMode size="2rem" />
        </div>
      </div>
    </>
  );
};
