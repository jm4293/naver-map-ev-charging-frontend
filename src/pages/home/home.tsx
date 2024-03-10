import React, { useEffect } from 'react';

export const Home = () => {
  useEffect(() => {
    // Naver 지도 초기화
    const map = new window.naver.maps.Map('map', {
      center: new window.naver.maps.LatLng(37.5665, 126.978), // 서울의 좌표
      zoom: 10, // 줌 레벨
    });

    // 지도에 마커 추가 예시
    const marker = new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(37.5665, 126.978),
      map: map,
    });
  }, []);

  return (
    <>
      <div id="map" style={{ width: '100%', height: '50%' }}></div>
    </>
  );
};
