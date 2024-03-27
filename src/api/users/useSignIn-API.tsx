import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const useSignInAPI = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: any) =>
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/signin`, data, {
        withCredentials: true,
      }),
    onSuccess: (res, variables, context) => {
      alert('로그인이 완료되었습니다.');

      sessionStorage.setItem('accessToken', res.data.data.accessToken);
      localStorage.setItem('refreshToken', res.data.data.refreshToken);
      navigate(process.env.PUBLIC_URL + '/');
    },
    onError: (err: any, variables, context) => {
      console.log('err', err);
      alert(err.response.data.data);
    },
  });
};
