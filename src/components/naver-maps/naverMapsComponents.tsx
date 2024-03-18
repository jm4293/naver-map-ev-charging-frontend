import { useEffect, useRef, useState } from 'react';
import style from './naverMapsComponents.module.css';
import { useForm } from 'react-hook-form';
import { useGetGeocode } from '../../api/naver-maps/useGetGeocode';
import SearchedLocationModal from './modal/searchedLocation.modal';
import {
  searchedLocationListInterface,
  searchKeywordDefaultValues,
  searchKeywordInterface,
  selectedLocationDefaultValues,
  selectedLocationInterface,
} from '../../interface/components/naver-maps/naver-maps.interfaece';

export const NaverMapsComponents = () => {
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

  const mapRef = useRef<HTMLDivElement>(null);
  const mapCurrent = useRef<naver.maps.Map | null>(null);

  // 현재 선택된 위치
  const [selectedLocation, setSelectedLocation] = useState<selectedLocationInterface>(selectedLocationDefaultValues);
  // 검색결과 리스트
  const [searchedLocationList, setSearchedLocationList] =
    useState<searchedLocationListInterface>(searchKeywordDefaultValues);

  // 검색결과 모달 상태
  const [isSearchedLocationModal, setIsSearchedLocationModal] = useState<boolean>(false);

  // 주소검색 api
  const getGeocode = useGetGeocode(isSearchedLocationModal, setIsSearchedLocationModal);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    const location = new naver.maps.LatLng(selectedLocation.x, selectedLocation.y);
    const mapOptions = {
      center: location,
      zoom: 15,
    };

    mapCurrent.current = new naver.maps.Map(mapRef.current, mapOptions);
  }, []);

  useEffect(() => {
    if (!mapCurrent.current) {
      return;
    }

    const location = new naver.maps.LatLng(selectedLocation.x, selectedLocation.y);
    mapCurrent.current.setCenter(location);
    mapCurrent.current.setZoom(15);

    new naver.maps.Marker({
      position: new naver.maps.LatLng(selectedLocation.x, selectedLocation.y),
      map: mapCurrent.current,
    });
  }, []);

  useEffect(() => {
    if (!mapCurrent.current) {
      return;
    }

    const location = new naver.maps.LatLng(selectedLocation.x, selectedLocation.y);
    mapCurrent.current.setCenter(location);
    mapCurrent.current.setZoom(15);

    new naver.maps.Marker({
      position: new naver.maps.LatLng(selectedLocation.x, selectedLocation.y),
      map: mapCurrent.current,
    });
  }, [selectedLocation]);

  const btn_onClick_search = (data: searchKeywordInterface) => {
    if (data.searchKeyword === '') {
      alert('검색어를 입력하세요.');
      return;
    }

    getGeocode
      .mutateAsync(data.searchKeyword)
      .then((response) => {
        console.log(response);

        if (response.data.addresses.length > 0) {
          setIsSearchedLocationModal(true);
        } else {
          alert('검색 결과가 없습니다.');
        }

        setSearchedLocationList(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert('서버 오류');
      });
  };

  return (
    <>
      {isSearchedLocationModal && (
        <SearchedLocationModal
          setIsSearchedLocationModal={setIsSearchedLocationModal}
          searchedLocationList={searchedLocationList}
          setSelectedLocation={setSelectedLocation}
        />
      )}

      <div className={style.container}>
        <div ref={mapRef} style={{ width: '100%', height: '100%' }} />

        <form className={style.searchContainer} onSubmit={handleSubmit(btn_onClick_search)}>
          <input className="input-search" {...register('searchKeyword')} placeholder="검색어를 입력하세요." />
          <button className="button-confirm">검색</button>
        </form>
      </div>
    </>
  );
};
