import { useEffect, useRef, useState } from 'react';
import style from './naverMapsComponents.module.css';
import { useForm } from 'react-hook-form';
import { useGetGeocode } from '../../api/naver-maps/useGetGeocode';

interface mapPointInterface {
  x: null;
  y: null;
}

interface locationInterface {
  latitude: number;
  longitude: number;
}

interface searchKeywordInterface {
  searchKeyword: string;
}

export const NaverMapsComponents = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const windowNaver = useRef<any>(window.naver).current;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<searchKeywordInterface>({
    defaultValues: {
      searchKeyword: '',
    },
  });

  const [mapPoint, setMapPoint] = useState<mapPointInterface>({ x: null, y: null });
  const [myLocation, setMyLocation] = useState<locationInterface | string>('');

  // const [searchKeyword, setSearchKeyword] = useState<string>('');

  const getGeocode = useGetGeocode();

  useEffect(() => {
    // const mapDiv = document.getElementById('map');
    const mapDiv = mapRef.current;

    if (mapDiv) {
      // Naver 지도 초기화
      const map = new window.naver.maps.Map(mapDiv, {
        center: new naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 15,
      });

      // 지도에 마커 추가 예시
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(37.5665, 126.978),
        map: map,
      });

      window.naver.maps.Event.addDOMListener(mapDiv, 'click', () => {
        // const coordinate = { x: map.data.map.center.x, y: map.data.map.center.y };
        // setMapPoint({ x: coordinate.x, y: coordinate.y });

        console.log(map.data); // 데이터 객체의 구조 확인

        // const coordinate = { x: map.data.center.x, y: map.data.center.y };
        // setMapPoint({ x: coordinate.x, y: coordinate.y });
      });
    }
  }, []);

  const btn_search_onClick = (data: searchKeywordInterface) => {
    if (data.searchKeyword === '') {
      alert('검색어를 입력하세요.');
      return;
    }

    getGeocode(data.searchKeyword)
      .then((response) => {
        console.log('response', response.data);
      })
      .catch();
  };

  return (
    <div className={style.container}>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />

      <form className={style.searchContainer} onSubmit={handleSubmit(btn_search_onClick)}>
        <input className={style.searchInput} {...register('searchKeyword')} placeholder="검색어를 입력하세요." />
        <button className={style.searchButton}>검색</button>
      </form>
    </div>
  );
};
