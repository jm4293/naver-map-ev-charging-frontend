import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useSignupAPI = (state?: any, setState?: any, success?: any, error?: any) => {
  return useMutation({
    mutationFn: async (data: any) => await axios.post(`${process.env.REACT_APP_API_URL}/users/signup`, data),
    onSuccess: (data, variables, context) => {
      console.log('data', data);
      console.log('variables', variables);
      console.log('context', context);

      if (success) {
      }
    },
    onError: (err, variables, context) => {
      console.log('err', err);
      console.log('variables', variables);
      console.log('context', context);

      if (error) {
      }
    },
  });
};
