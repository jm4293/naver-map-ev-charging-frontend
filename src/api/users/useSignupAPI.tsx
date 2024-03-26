import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { MutationParamaterInterface } from '../../interface/api/mutationParamater.interface';

export const useSignupAPI = ({ state, setState }: MutationParamaterInterface) => {
  return useMutation({
    mutationFn: async (data: any) => await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, data),
    onSuccess: (data, variables, context) => {},
    onError: (err: any, variables, context) => {
      alert(err.response.data.data);
    },
  });
};
