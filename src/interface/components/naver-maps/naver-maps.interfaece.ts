export interface mapPointInterface {
  x: null;
  y: null;
}

export interface locationInterface {
  latitude: number;
  longitude: number;
}

export interface searchKeywordInterface {
  searchKeyword: string;
}

export interface selectedLocationInterface {
  roadAddress: string;
  englishAddress: string;
  x: number;
  y: number;
}

export const selectedLocationDefaultValues: selectedLocationInterface = {
  roadAddress: '',
  englishAddress: '',
  x: 35.132965,
  y: 129.091799,
};

export interface searchedLocationListInterface {
  addresses: [];
  errorMessage: string;
  meta: {
    totalCount: number;
    page: number;
    count: number;
  };
  status: string;
}

export const searchKeywordDefaultValues: searchedLocationListInterface = {
  addresses: [],
  errorMessage: '',
  meta: {
    totalCount: 0,
    page: 0,
    count: 0,
  },
  status: '',
};
