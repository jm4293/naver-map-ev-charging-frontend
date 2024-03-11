import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useCallback } from 'react';

export const useGetGeocode = () => {
  const mutation = useMutation({
    mutationFn: async (searchKeyword: string) =>
      axios.get(`http://localhost:4100/api/geocoding?searchKeyword=${searchKeyword}`),
  });

  return useCallback(async (searchKeyword: string) => await mutation.mutateAsync(searchKeyword), [mutation]);
};
