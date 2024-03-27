import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { MutationParamaterInterface } from '../../interface/api/mutationParamater.interface';
import { useNavigate } from 'react-router-dom';

export const useSignupAPI = ({ state, setState }: MutationParamaterInterface) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: any) => await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, data),
    onSuccess: (data, variables, context) => {
      alert('회원가입이 완료되었습니다.');

      navigate(process.env.PUBLIC_URL + '/login');
    },
    onError: (err: any, variables, context) => {
      alert(err.response.data.data);
    },
  });
};
