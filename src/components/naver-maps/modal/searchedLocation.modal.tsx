import React, { FC } from 'react';
import {
  searchedLocationInterface,
  selectedLocationInterface,
} from '../../../interface/components/naver-maps/naver-maps.interfaece';

interface Props {
  setIsSearchedLocationModal: (value: boolean) => void;
  searchedLocation: searchedLocationInterface;
  setSelectedLocation: (value: selectedLocationInterface) => void;
}

const SearchedLocationModal: FC<Props> = ({ setIsSearchedLocationModal, searchedLocation, setSelectedLocation }) => {
  const btn_onClick = (el: selectedLocationInterface) => {
    setSelectedLocation(el);
    setIsSearchedLocationModal(false);
  };

  return (
    <>
      <div className="fixed inset-0 z-10 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="relative w-10/12 mx-auto my-6 z-50">
          <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
              <h3 className="text-3xl font-semibold">검색 결과</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setIsSearchedLocationModal(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                {searchedLocation.addresses.map((el: selectedLocationInterface) => {
                  return (
                    <div
                      key={el.roadAddress}
                      className="border-b-2 mb-5 cursor-pointer hover:bg-gray-200"
                      onClick={() => btn_onClick(el)}
                    >
                      <div>도로명 주소: {el.roadAddress}</div>
                      <div>영문 주소: {el.englishAddress}</div>
                      <div>x: {el.x}</div>
                      <div>y: {el.y}</div>
                    </div>
                  );
                })}
              </p>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                type="button"
                style={{ transition: 'all .15s ease' }}
                onClick={() => setIsSearchedLocationModal(false)}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
        <div className="fixed inset-0 z-40 bg-black opacity-50" />
      </div>
    </>
  );
};

export default SearchedLocationModal;
