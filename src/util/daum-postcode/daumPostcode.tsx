import React, { Dispatch, SetStateAction } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';

interface PostcodeProps {
  setState: Dispatch<SetStateAction<any>>;
}

export const DaumPostcode = ({ setState }: PostcodeProps) => {
  const open = useDaumPostcodePopup('https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js');

  const handleComplete = (data: any) => {
    setState({
      zipcode: data.zonecode,
      address: data.roadAddress,
    });
  };

  const handleClose = (data: any) => {
    if (data === 'FORCE_CLOSE') {
      setState({
        zipcode: '',
        address: '',
      });
    }
  };

  const handleClick = () => {
    open({ onComplete: handleComplete, onClose: handleClose });
  };

  return (
    <button className="btn-confirm-no-background-color" type="button" onClick={handleClick}>
      찾기
    </button>
  );
};
