import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useGetGeocode = (state?: any, setState?: any) => {
  return useMutation({
    mutationFn: async (queryString: string) =>
      axios.get(`http://localhost:4100/api/geocoding?searchKeyword=${queryString}`),
  });
};
