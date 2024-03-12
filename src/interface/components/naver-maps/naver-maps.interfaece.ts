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
