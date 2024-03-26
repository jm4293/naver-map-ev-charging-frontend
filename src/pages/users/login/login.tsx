import style from './login.module.css';
import { useForm } from 'react-hook-form';
import { loginDefaultValues, loginInterface } from '../../../interface/pages/users/login/login.interface';
import { useNavigate } from 'react-router-dom';
import { useDaumPostcodePopup } from 'react-daum-postcode';

export const Login = () => {
  const navigate = useNavigate();
  const postCode = useDaumPostcodePopup('https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<loginInterface>({
    defaultValues: loginDefaultValues,
  });

  const btn_onClick_login = (data: loginInterface) => {
    console.log(data);
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
              <input className="w-full h-20" {...register('email')} placeholder="이메일을 입력하세요." />
              <input className="w-full h-20" {...register('password')} placeholder="비밀번호를 입력하세요." />
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
