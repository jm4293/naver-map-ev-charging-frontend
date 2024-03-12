import { useEffect, useRef, useState } from 'react';
import style from './naverMapsComponents.module.css';
import { useForm } from 'react-hook-form';
import { useGetGeocode } from '../../api/naver-maps/useGetGeocode';
import SearchedLocationModal from './modal/searchedLocation.modal';
import {
  locationInterface,
  mapPointInterface,
  searchedLocationInterface,
  searchKeywordInterface,
  selectedLocationInterface,
} from '../../interface/components/naver-maps/naver-maps.interfaece';

const searchKeywordDefaultValues: searchedLocationInterface = {
  addresses: [],
  errorMessage: '',
  meta: {
    totalCount: 0,
    page: 0,
    count: 0,
  },
  status: '',
};

const selectedLocationDefaultValues: selectedLocationInterface = {
  roadAddress: '',
  englishAddress: '',
  x: 37.3595704,
  y: 127.105399,
};

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

  const [selectedLocation, setSelectedLocation] = useState<selectedLocationInterface>(selectedLocationDefaultValues);
  const [searchedLocation, setSearchedLocation] = useState<searchedLocationInterface>(searchKeywordDefaultValues);
  const [isSearchedLocationModal, setIsSearchedLocationModal] = useState<boolean>(false);

  const getGeocode = useGetGeocode(isSearchedLocationModal, setIsSearchedLocationModal);

  // getGeocode.mutate();

  useEffect(() => {
    const mapDiv = mapRef.current;

    if (mapDiv) {
      // Naver 지도 초기화
      const map = new window.naver.maps.Map(mapDiv, {
        center: new naver.maps.LatLng(selectedLocation.x, selectedLocation.y),
        zoom: 15,
      });

      // // 지도에 마커 추가 예시
      // const marker = new window.naver.maps.Marker({
      //   position: new window.naver.maps.LatLng(37.5665, 126.978),
      //   map: map,
      // });

      // window.naver.maps.Event.addDOMListener(mapDiv, 'click', () => {
      //   const coordinate = { x: map.data.map.center.x, y: map.data.map.center.y };
      //   setMapPoint({ x: coordinate.x, y: coordinate.y });
      //
      //   console.log(map.data); // 데이터 객체의 구조 확인
      //
      //   const coordinate = { x: map.data.center.x, y: map.data.center.y };
      //   setMapPoint({ x: coordinate.x, y: coordinate.y });
      // });
    }
  }, [selectedLocation.x, selectedLocation.y]);

  const btn_search_onClick = (data: searchKeywordInterface) => {
    if (data.searchKeyword === '') {
      alert('검색어를 입력하세요.');
      return;
    }

    getGeocode
      .mutateAsync(data.searchKeyword)
      .then((response) => {
        if (response.data.addresses.length > 0) {
          setIsSearchedLocationModal(true);
        }

        setSearchedLocation(response.data);
      })
      .catch();
  };

  // console.log('searchedLocation', searchedLocation);
  // console.log('isSearchedLocationModal', isSearchedLocationModal);
  console.log('selectedLocation', selectedLocation);

  return (
    <>
      {isSearchedLocationModal && (
        <SearchedLocationModal
          setIsSearchedLocationModal={setIsSearchedLocationModal}
          searchedLocation={searchedLocation}
          setSelectedLocation={setSelectedLocation}
        />
      )}

      <div className={style.container}>
        <div ref={mapRef} style={{ width: '100%', height: '100%' }} />

        <form className={style.searchContainer} onSubmit={handleSubmit(btn_search_onClick)}>
          <input className={style.searchInput} {...register('searchKeyword')} placeholder="검색어를 입력하세요." />
          <button className={style.searchButton}>검색</button>
        </form>
      </div>
    </>
  );
};
