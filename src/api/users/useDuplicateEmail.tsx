import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { MutationParamaterInterface } from '../../interface/api/mutationParamater.interface';

export const useDuplicateEmail = ({ state, setState }: MutationParamaterInterface) => {
  return useMutation({
    mutationFn: async (data: any) => await axios.post(`${process.env.REACT_APP_API_URL}/auth/exists-email`, data),
    onSuccess: (data, variables, context) => {
      if (setState) {
        setState(data.data.exists);
      }

      return data;
    },
    onError: (err: any, variables, context) => {
      alert(err.response.data.data);
    },
  });
};
