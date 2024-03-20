import style from './siugnUp.module.css';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { signUpDefaultValues, signUpInterface } from '../../../interface/pages/users/signUp/signUp.interface';
import { signup_post } from '../../../api/users/user-api';
import { useSignupAPI } from '../../../api/users/useSignupAPI';

export const SignUp = () => {
  const navigate = useNavigate();

  const response = useSignupAPI();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<signUpInterface>({
    defaultValues: signUpDefaultValues,
  });

  const btn_onClick_signUp = (data: signUpInterface) => {
    console.log(data);
    console.log('signup_post', signup_post);

    response.mutate(data);
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
              <input
                className={`w-full h-20 ${errors.email ? 'active' : ''}`}
                {...register('email', {
                  required: '이메일을 입력하세요.',
                })}
                placeholder="이메일을 입력하세요."
              />
              {errors.email && <p className="validation-message">{errors.email.message}</p>}

              <input
                className={`w-full h-20 ${errors.password ? 'active' : ''}`}
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

              <input
                className={`w-full h-20 ${errors.passwordConfirm ? 'active' : ''}`}
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

              <input
                className={`w-full h-20 ${errors.name ? 'active' : ''}`}
                {...register('name', {
                  required: true,
                })}
                placeholder="이름을 입력하세요."
              />
              {errors.name && <p className="validation-message">이름을 입력하세요.</p>}

              <input className={`w-full h-20 `} {...register('phoneNumber')} placeholder="전화번호를 입력하세요." />
              {/*{errors.phoneNumber && <p className="validation-message">전화번호를 입력하세요.</p>}*/}

              <input className="w-full h-20" {...register('address')} placeholder="주소를 입력하세요." />
              <input className="w-full h-20" {...register('detailAddress')} placeholder="상세주소를 입력하세요." />
            </div>
            <button className="w-1/2 h-20 button-confirm">회원가입</button>
          </form>
        </div>
      </div>
    </>
  );
};
