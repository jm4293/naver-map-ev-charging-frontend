import style from './login.module.css';
import { useForm } from 'react-hook-form';
import { loginDefaultValues, loginInterface } from '../../../interface/pages/users/login/login.interface';
import { useNavigate } from 'react-router-dom';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { useSignInAPI } from '../../../api/users/useSignIn-API';
import React from 'react';

export const Login = () => {
  const navigate = useNavigate();
  const postCode = useDaumPostcodePopup('https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js');

  const signInAPI = useSignInAPI();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<loginInterface>({
    defaultValues: loginDefaultValues,
  });

  const btn_onClick_login = (data: loginInterface) => {
    if (data.email === '') {
      setError('email', {
        type: 'required',
      });

      return;
    }

    if (data.password === '') {
      setError('password', {
        type: 'required',
      });

      return;
    }

    signInAPI.mutate(data);
  };

  const btn_onClick_findIdPassword = () => {};

  const btn_onClick_signUp = () => {
    navigate(process.env.PUBLIC_URL + '/signup');
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.title}>ev-charging 로그인</div>

        <div className="w-full pb-10">
          <form className="flex flex-col items-center" onSubmit={handleSubmit(btn_onClick_login)}>
            <div className="w-3/4 flex flex-col items-center pb-10 gap-10">
              <div className="w-full">
                <input
                  className={`w-full ${errors.email ? 'active' : ''}`}
                  {...register('email', {
                    required: '이메일을 입력하세요.',
                  })}
                  placeholder="이메일을 입력하세요."
                />
                {errors.email && <p className="validation-message">이메일을 입력하세요.</p>}
              </div>
              <div className="w-full">
                <input
                  className={`w-full ${errors.password ? 'active' : ''}`}
                  {...register('password', {
                    required: true,
                    minLength: 8,
                  })}
                  placeholder="비밀번호를 입력하세요."
                />
                {errors.password && errors.password.type === 'required' && (
                  <p className="validation-message">비밀번호를 입력하세요.</p>
                )}
                {errors.password && errors.password.type === 'minLength' && (
                  <p className="validation-message">비밀번호는 8자 이상이어야 합니다.</p>
                )}
              </div>
              <button className="w-full btn-confirm">로그인</button>
            </div>
          </form>
        </div>

        <div className="w-full flex justify-center">
          <div className="w-3/4 flex justify-center gap-5">
            <button className="btn-confirm-no-background-color" onClick={btn_onClick_findIdPassword}>
              아이디 비밀번호 찾기
            </button>
            <button className="btn-confirm-no-background-color" onClick={btn_onClick_signUp}>
              회원가입
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
