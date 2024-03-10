import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { AiOutlineBell } from 'react-icons/ai';
import { MdOutlineDarkMode } from 'react-icons/md';
// import { header_style } from '../../styles/layout/layout.style';

export const Header = () => {
  return (
    <>
      <div className="header_style">
        <div>
          <div className="flex items-center gap-5">
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
