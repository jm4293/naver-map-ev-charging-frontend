export interface signUpInterface {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  phoneNumber: string;
  address: string;
  detailAddress: string;
}

export const signUpDefaultValues: signUpInterface = {
  email: '',
  password: '',
  passwordConfirm: '',
  name: '',
  phoneNumber: '',
  address: '',
  detailAddress: '',
};
