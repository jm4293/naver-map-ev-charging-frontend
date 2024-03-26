import style from './siugnUp.module.css';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { signUpDefaultValues, signUpInterface } from '../../../interface/pages/users/signUp/signUp.interface';
import React, { useEffect, useState } from 'react';
import { DaumPostcode } from '../../../util/daum-postcode/daumPostcode';
import { useSignupAPI } from '../../../api';
import { useDuplicateEmail } from '../../../api/users/useDuplicateEmail';

export const SignUp = () => {
  const navigate = useNavigate();

  const [isDuplicateEmailClicked, setIsDuplicateEmailClicked] = useState(false);
  const [isDuplicateEmailPass, setIsDuplicateEmailPass] = useState(false);
  const [addressInfo, setAddressInfo] = useState({ zipcode: '', address: '' });

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<signUpInterface>({
    defaultValues: signUpDefaultValues,
  });

  const signupAPI = useSignupAPI({});
  const duplicateEmailAPI = useDuplicateEmail({ setState: setIsDuplicateEmailPass });

  useEffect(() => {
    if (isDuplicateEmailPass) {
      setError('email', {
        type: 'duplicateEmailPass',
      });
    } else {
      clearErrors('email');
    }
  }, [isDuplicateEmailPass]);

  const handleEmailChange = () => {
    setIsDuplicateEmailClicked(false);
  };

  const btn_onClick_duplicate_email = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();

    if (watch('email') === '') {
      setError('email', {
        type: 'required',
      });

      return;
    }

    duplicateEmailAPI.mutate({ email: watch('email') });
    setIsDuplicateEmailClicked(true);
  };

  const btn_onClick_signUp = (data: signUpInterface) => {
    if (!isDuplicateEmailClicked) {
      setError('email', {
        type: 'duplicateEmailClick',
      });

      return;
    }

    if (isDuplicateEmailPass) {
      setError('email', {
        type: 'duplicateEmailPass',
      });

      return;
    }

    if (data.password !== data.passwordConfirm) {
      setError('password', {
        type: 'incorrectPasswordConfirm',
      });
      setError('passwordConfirm', {
        type: 'incorrectPasswordConfirm',
      });
      return;
    }

    signupAPI.mutate({
      email: data.email,
      password: data.password,
      name: data.name,
      phone: data.phone,
      zipcode: addressInfo.zipcode,
      address: addressInfo.address,
      addressDetail: data.addressDetail,
    });
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.title}>ev-charging 회원가입</div>

        <div className="w-full pb-10">
          <form
            className="w-full flex flex-col justify-center items-center"
            onSubmit={handleSubmit(btn_onClick_signUp)}
          >
            <div className="w-1/2 flex flex-col pb-10 gap-10">
              <div className="flex gap-3">
                <div className="w-full">
                  <input
                    className={`w-full ${errors.email ? 'active' : ''}`}
                    {...register('email', {
                      required: '이메일을 입력하세요.',
                    })}
                    onChange={handleEmailChange}
                    placeholder="이메일을 입력하세요."
                  />
                  {errors.email && errors.email.type === 'required' && (
                    <p className="validation-message">이메일을 입력하세요.</p>
                  )}
                  {errors.email && errors.email.type === 'duplicateEmailClick' && (
                    <p className="validation-message">중복확인을 해주세요.</p>
                  )}
                  {errors.email && errors.email.type === 'duplicateEmailPass' && (
                    <p className="validation-message">중복된 이메일입니다.</p>
                  )}
                </div>

                <button className="btn-confirm-no-background-color" onClick={(e) => btn_onClick_duplicate_email(e)}>
                  중복확인
                </button>
              </div>

              <div>
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

              <div>
                <input
                  className={`w-full ${errors.passwordConfirm ? 'active' : ''}`}
                  {...register('passwordConfirm', {
                    required: true,
                    minLength: 8,
                  })}
                  placeholder="비밀번호를 다시 입력하세요."
                />
                {errors.passwordConfirm && errors.passwordConfirm.type === 'required' && (
                  <p className="validation-message">비밀번호를 다시 입력하세요.</p>
                )}
                {errors.passwordConfirm && errors.passwordConfirm.type === 'minLength' && (
                  <p className="validation-message">비밀번호는 8자 이상이어야 합니다.</p>
                )}
                {errors.passwordConfirm && errors.passwordConfirm.type === 'incorrectPasswordConfirm' && (
                  <p className="validation-message">비밀번호가 일치하지 않습니다.</p>
                )}
              </div>

              <div>
                <input
                  className={`w-full ${errors.name ? 'active' : ''}`}
                  {...register('name', {
                    required: true,
                  })}
                  placeholder="이름을 입력하세요."
                />
                {errors.name && <p className="validation-message">이름을 입력하세요.</p>}
              </div>

              <div>
                <input
                  className={`w-full ${errors.phone ? 'active' : ''}`}
                  {...register('phone', {
                    required: true,
                  })}
                  placeholder="휴대폰번호를 입력하세요."
                />
                {errors.phone && <p className="validation-message">휴대폰번호를 입력하세요.</p>}
              </div>

              <div className="flex items-center gap-3">
                <input
                  className="w-1/3"
                  {...register('zipcode')}
                  value={addressInfo.zipcode}
                  readOnly
                  placeholder="우편주소"
                />
                <input
                  className="w-2/3"
                  {...register('address')}
                  value={addressInfo.address}
                  readOnly
                  placeholder="주소"
                />
                {DaumPostcode({ setState: setAddressInfo })}
              </div>
              <input className="w-full" {...register('addressDetail')} placeholder="상세주소를 입력하세요." />
            </div>
            <button className="w-1/2 btn-confirm">회원가입</button>
          </form>
        </div>
      </div>
    </>
  );
};
